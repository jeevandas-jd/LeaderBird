const { Bracket, Round, Match } = require("../models/tournamentModel/bracketModel");

async function generateBracket(teams) {
    console.log("Generating Bracket...");

    // Ensure power of 2 teams
    const nextPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(teams.length)));
    while (teams.length < nextPowerOfTwo) {
        teams.push(`Dummy Team ${teams.length + 1}`);
    }

    const numberOfRounds = Math.log2(teams.length);
    const bracket = new Bracket({ teams, noRounds: numberOfRounds, rounds: [] });
    await bracket.save();

    const rounds = [];
    for (let i = 0; i < numberOfRounds; i++) {
        const round = await Round.create({ roundNo: i + 1, matches: [], bracketId: bracket._id });
        rounds.push(round._id);
    }

    bracket.rounds = rounds;
    await bracket.save();

    await scheduleMatches(1, teams, bracket._id);
    console.log("Bracket Generation Complete!");
    return bracket;
}

async function scheduleMatches(roundNo, teams, bracketId) {
    const numberOfRounds = Math.log2(teams.length);
    if (roundNo > numberOfRounds) return;

    console.log(`Scheduling matches for Round ${roundNo}`);

    let matches = [];
    for (let i = 0; i < teams.length; i += 2) {
        const match = await Match.create({
            team1: teams[i],
            team2: teams[i + 1],
            roundNo: roundNo,
        });
        matches.push(match._id);
    }

    await Round.findOneAndUpdate(
        { roundNo: roundNo, bracketId },
        { $set: { matches } },
        { new: true }
    );

    console.log(`Matches scheduled for Round ${roundNo}`);
}

async function updateResult(roundNo, matchNo, score1, score2, bracketId) {
    const round = await Round.findOne({ roundNo, bracketId }).populate("matches");
    if (!round) return console.log("Round not found");

    const match = round.matches[matchId];
    if (!match) return console.log("Match not found");

    match.result = [score1, score2];
    await match.save();

    const winner = score1 > score2 ? match.team1 : match.team2;
    round.winners = round.winners || [];
    round.winners.push(winner);
    await round.save();

    console.log(`Result updated: ${match.team1} (${score1}) vs ${match.team2} (${score2})`);

    if (roundNo < Math.log2(round.teams.length)) {
        await scheduleMatches(roundNo + 1, round.winners, bracketId);
    }
}

exports.createBracket = async (req, res) => {
    console.log("createBracket Called")
    const { teams } = req.body;

    const noTeams = teams.length;

    if (noTeams > 0 && Math.log2(noTeams) % 1 !== 0) {
        let nextPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(noTeams)));
        while (teams.length < nextPowerOfTwo) {
            teams.push("Dummy Team");
        }
    }
    console.log(`Teams listed => ${teams}`);

    // Validate teams
    if (!Array.isArray(teams) || teams.length < 2 || (teams.length & (teams.length - 1)) !== 0) {
        return res.status(400).json({ 
            success: false, 
            message: "Number of teams must be a power of 2 (e.g., 4, 8, 16, 32)" 
        });
    }

    // Generate bracket (fetch actual rounds instead of IDs)
    const bracket = await generateBracket(teams);

    // Fetch full details of each round from DB

    
    
    const roundDetails = await Round.find({ _id: { $in: bracket.rounds } });
    const bracketDetails=
    res.json({
        success: true,
        message: "Knockout tournament created successfully!",
        bracket: {
            bracket,  
            rounds: roundDetails // Replace round IDs with actual round details
        }
    });

    console.log("Bracket Created\n", bracket);
};

exports.expUpdateResult = async (req, res) => {
    const { roundNo, matchNo, score1, score2, bracketId } = req.body;
    console.log("data fetched")
    if (!roundNo || !matchNo || !score1 || !score2 || !bracketId) {
        console.log("Invalid input");
        return res.status(400).json({ success: false, message: "Invalid input" });
        
    }

    await updateResult(roundNo, matchNo, score1, score2, bracketId);
    console.log("Result Updated");
    res.json({ success: true, message: "Result updated successfully" });
    console.log("Result Updated");
}

exports.expScheduleMatches = async (req, res) => {
    const { roundNo, teams, bracketId } = req.body;

    if (!roundNo || !teams || !bracketId) {
        return res.status(400).json({ success: false, message: "Invalid input" });
    }

    await scheduleMatches(roundNo, teams, bracketId);
    res.json({ success: true, message: "Matches scheduled successfully" });
}