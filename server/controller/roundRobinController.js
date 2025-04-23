const RoundRobinTournament = require('../models/RoundRobinTournament');
const Team = require('../models/Team');
const mongoose = require('mongoose'); 
// Create new round robin tournament
exports.createTournament = async (req, res) => {
    try {
      console.log('Request body:', req.body); // Debug log
      
      const { name, description, teams: teamNames = [], hasTwoLegs = false } = req.body;
  
      // Validate teams array exists and has at least 2 teams
      if (!Array.isArray(teamNames) || teamNames.length < 2) {
        return res.status(400).json({ 
          error: 'At least 2 teams are required',
          received: teamNames 
        });
      }
  
      // Filter out empty team names
      const validTeams = teamNames.filter(name => name && name.trim() !== '');
      if (validTeams.length < 2) {
        return res.status(400).json({ 
          error: 'At least 2 valid team names are required',
          received: teamNames 
        });
      }
  
      // Create teams with IDs
      const teams = validTeams.map((name, index) => ({
        _id: new mongoose.Types.ObjectId(),
        name: name.trim(),
        seed: index + 1
      }));
  
      // Rest of your controller logic...
      const groups = [{
        name: "Group A",
        teams: teams.map(team => team._id),
        standings: teams.map(team => ({
          team: team._id,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0
        })),
        matches: []
      }];
  
      // Generate matches
      const matches = [];
      const groupTeams = [...teams];
      
      // First leg
      for (let i = 0; i < groupTeams.length; i++) {
        for (let j = i + 1; j < groupTeams.length; j++) {
          matches.push({
            homeTeam: groupTeams[i]._id,
            awayTeam: groupTeams[j]._id,
            leg: 1,
            played: false
          });
        }
      }
  
      // Second leg if enabled
      if (hasTwoLegs) {
        for (let i = 0; i < groupTeams.length; i++) {
          for (let j = i + 1; j < groupTeams.length; j++) {
            matches.push({
              homeTeam: groupTeams[j]._id,
              awayTeam: groupTeams[i]._id,
              leg: 2,
              played: false
            });
          }
        }
      }
  
      // Assign matches to group
      groups[0].matches = matches;
  
      const tournament = new RoundRobinTournament({
        name,
        description,
        teams,
        groups,
        hasTwoLegs
      });
  
      await tournament.save();
      res.status(201).json(tournament);
      console.log('Tournament created sucessfully:', tournament);
  
    } catch (error) {
      console.error('Error in createTournament:', error);
      res.status(400).json({ 
        error: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
      });
    }
  };

// Helper to generate round robin matches
function generateRoundRobinMatches(group, teams, leg) {
  const numTeams = teams.length;
  
  // Fixed first team, rotate others
  for (let i = 0; i < numTeams - 1; i++) {
    for (let j = i + 1; j < numTeams; j++) {
      const homeTeam = leg === 1 ? teams[i] : teams[j];
      const awayTeam = leg === 1 ? teams[j] : teams[i];
      
      group.matches.push({
        homeTeam,
        awayTeam,
        leg,
        played: false
      });
    }
  }
}

// Update match result
exports.updateMatchResult = async (req, res) => {
  try {
    const { tournamentId, groupId, matchId } = req.params;
    const { homeScore, awayScore } = req.body;
    
    const tournament = await RoundRobinTournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    
    const group = tournament.groups.id(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    
    const match = group.matches.id(matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    // Update match
    match.homeScore = homeScore;
    match.awayScore = awayScore;
    match.played = true;
    
    // Update standings
    updateGroupStandings(group, match, tournament.pointsForWin, tournament.pointsForDraw);
    
    await tournament.save();
    
    // Populate teams in response
    const populatedTournament = await tournament.populate([
      { path: 'teams' },
      { path: 'groups.teams' },
      { path: 'groups.matches.homeTeam' },
      { path: 'groups.matches.awayTeam' },
      { path: 'groups.standings.team' }
    ]);
    
    res.json(populatedTournament);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Helper to update group standings
function updateGroupStandings(group, match, pointsForWin, pointsForDraw) {
  const homeStanding = group.standings.find(s => s.team.equals(match.homeTeam));
  const awayStanding = group.standings.find(s => s.team.equals(match.awayTeam));
  
  homeStanding.played += 1;
  awayStanding.played += 1;
  
  homeStanding.goalsFor += match.homeScore;
  homeStanding.goalsAgainst += match.awayScore;
  
  awayStanding.goalsFor += match.awayScore;
  awayStanding.goalsAgainst += match.homeScore;
  
  if (match.homeScore > match.awayScore) {
    homeStanding.wins += 1;
    homeStanding.points += pointsForWin;
    awayStanding.losses += 1;
  } else if (match.homeScore < match.awayScore) {
    awayStanding.wins += 1;
    awayStanding.points += pointsForWin;
    homeStanding.losses += 1;
  } else {
    homeStanding.draws += 1;
    awayStanding.draws += 1;
    homeStanding.points += pointsForDraw;
    awayStanding.points += pointsForDraw;
  }
}

// Get tournament details
exports.getTournament = async (req, res) => {
  try {
    const tournament = await RoundRobinTournament.findById(req.params.id)
      .populate('teams')
      .populate('groups.teams')
      .populate('groups.matches.homeTeam')
      .populate('groups.matches.awayTeam')
      .populate('groups.standings.team');
      
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    
    // Sort standings by points, GD, GF
    tournament.groups.forEach(group => {
      group.standings.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        const bGD = b.goalsFor - b.goalsAgainst;
        const aGD = a.goalsFor - a.goalsAgainst;
        if (bGD !== aGD) return bGD - aGD;
        return b.goalsFor - a.goalsFor;
      });
    });
    
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};