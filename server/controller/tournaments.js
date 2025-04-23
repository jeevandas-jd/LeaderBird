const Tournament = require('../models/Tournament');
const mongoose = require('mongoose');
// Generate matches for knockout tournament
function generateMatches(teams) {
  const matches = [];
  let round = 1;
  let currentRoundTeams = [...teams];
  
  while (currentRoundTeams.length > 1) {
    const nextRoundTeams = [];
    const matchesInRound = [];
    
    for (let i = 0; i < currentRoundTeams.length; i += 2) {
      const matchNumber = matchesInRound.length + 1;
      const team1 = currentRoundTeams[i];
      const team2 = currentRoundTeams[i + 1] || null; // Handle odd number of teams
      
      const match = {
        round,
        matchNumber,
        team1: team1._id,
        team2: team2?._id,
        winner: null,
        score1: 0,
        score2: 0,
        completed: false
      };
      
      matchesInRound.push(match);
      
      // For simulation, randomly pick a winner (will be updated by user later)
      if (team2) {
        nextRoundTeams.push(Math.random() > 0.5 ? team1 : team2);
      } else {
        nextRoundTeams.push(team1); // Bye for odd number of teams
      }
    }
    
    matches.push(...matchesInRound);
    currentRoundTeams = nextRoundTeams;
    round++;
  }
  
  return matches;
}

// Create a new tournament

exports.createTournament = async (req, res) => {
    try {
      const { name, teams } = req.body;
      console.log("createTournament Called");
      // Create teams with explicit IDs
      const seededTeams = teams.map((team, index) => ({
        _id: new mongoose.Types.ObjectId(), // CRITICAL: Add explicit ID
        name: typeof team === 'string' ? team : team.name, // Handle both string and object inputs
        seed: index + 1
      }));
      
      const matches = generateMatches(seededTeams);
      
      const tournament = new Tournament({
        name,
        teams: seededTeams,
        matches
      });
      
      await tournament.save();
      
      // Prepare properly populated response
      const teamMap = {};
      seededTeams.forEach(team => {
        teamMap[team._id.toString()] = team;
      });
      
      const response = {
        ...tournament.toObject(),
        matches: tournament.matches.map(match => ({
          ...match.toObject(),
          team1: teamMap[match.team1.toString()],
          team2: match.team2 ? teamMap[match.team2.toString()] : null,
          winner: null
        }))
      };
      
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.error('Error creating tournament:', error);
    }
  };
  
// Get all tournaments
exports.getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().sort({ createdAt: -1 });
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single tournament

exports.getTournament = async (req, res) => {
  try {
    // First get the tournament without population
    const tournament = await Tournament.findById(req.params.id).lean();
    
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    
    // Create a map of team IDs to team objects for quick lookup
    const teamMap = {};
    tournament.teams.forEach(team => {
      teamMap[team._id.toString()] = team;
    });
    
    // Manually populate the matches by looking up teams in our map
    const populatedMatches = tournament.matches.map(match => {
      return {
        ...match,
        team1: match.team1 ? teamMap[match.team1.toString()] : null,
        team2: match.team2 ? teamMap[match.team2.toString()] : null,
        winner: match.winner ? teamMap[match.winner.toString()] : null
      };
    });
    
    // Return the tournament with populated matches
    res.json({
      ...tournament,
      matches: populatedMatches
    });
  } catch (error) {
    console.error('Error fetching tournament:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
};  
// Update match result
exports.updateMatchResult = async (req, res) => {
  try {
    const { tournamentId, matchId } = req.params;
    const { score1, score2, winnerId } = req.body;
    
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    
    const match = tournament.matches.id(matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    match.score1 = score1;
    match.score2 = score2;
    match.winner = winnerId;
    match.completed = true;
    
    await tournament.save();
    
    // Update subsequent matches with the winner
    const nextRound = match.round + 1;
    const nextMatchNumber = Math.ceil(match.matchNumber / 2);
    
    const nextMatch = tournament.matches.find(
      m => m.round === nextRound && m.matchNumber === nextMatchNumber
    );
    
    if (nextMatch) {
      const isFirstTeam = match.matchNumber % 2 === 1;
      if (isFirstTeam) {
        nextMatch.team1 = winnerId;
      } else {
        nextMatch.team2 = winnerId;
      }
      
      await tournament.save();
    }
    
    res.json(tournament);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};