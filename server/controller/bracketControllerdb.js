const { Tournament, Team, Round, Match } = require('../models/tournamentModel');

// 📌 Utility function to get next power of 2
const getNextPowerOfTwo = (num) => Math.pow(2, Math.ceil(Math.log2(num)));

// 📌 Generate Bracket Function
function generateBracket(teams) {
    let rounds = [];
    let currentRound = teams.map((team, index) => ({
        team: team,
        seed: index + 1
    }));

    while (currentRound.length > 1) {
        rounds.push([...currentRound]); // Store current round
        const nextRound = [];

        for (let i = 0; i < currentRound.length; i += 2) {
            nextRound.push({
                match: `${currentRound[i].team} vs ${currentRound[i + 1].team}`,
                teams: [currentRound[i], currentRound[i + 1]]
            });
        }

        currentRound = nextRound.map((_, index) => ({
            team: `Winner of Match ${index + 1}`,
            seed: index + 1
        }));
    }

    rounds.push(currentRound);
    return rounds;
}

// 📌 Create Tournament & Save to DB
exports.createTournament = async (req, res) => {
    try {
        console.log("createTournament Called");
        let { name, teams } = req.body;

        if (!name || !Array.isArray(teams) || teams.length < 2) {
            return res.status(400).json({ success: false, message: "Tournament name and at least 2 teams are required" });
        }

        let totalTeams = teams.length;
        let nextPowerOfTwo = getNextPowerOfTwo(totalTeams);
        while (teams.length < nextPowerOfTwo) {
            teams.push(`Dummy Team ${teams.length + 1}`);
        }

        console.log(`Teams listed => ${teams}`);

        // 📌 Save Tournament
        const tournament = await Tournament.create({ name });

        // 📌 Save Teams
        const teamDocs = await Team.insertMany(teams.map(team => ({ name: team, tournamentId: tournament._id })));
        const teamIds = teamDocs.map(team => team._id);

        // 📌 Generate Bracket Rounds
        let currentRoundTeams = [...teamIds];
        let roundNumber = 1;
        const rounds = [];

        while (currentRoundTeams.length > 1) {
            const round = await Round.create({
                tournamentId: tournament._id,
                roundNumber,
            });

            let matches = [];
            for (let i = 0; i < currentRoundTeams.length; i += 2) {
                matches.push({
                    tournamentId: tournament._id,
                    roundId: round._id,
                    matchNumber: (i / 2) + 1,
                    teamA: currentRoundTeams[i],
                    teamB: currentRoundTeams[i + 1],
                });
            }

            const matchDocs = await Match.insertMany(matches);
            round.matches = matchDocs.map(m => m._id);
            await round.save();
            rounds.push(round._id);

            currentRoundTeams = matchDocs.map((_, idx) => `Winner of Match ${idx + 1}`);
            roundNumber++;
        }

        // 📌 Update Tournament with Rounds
        tournament.teams = teamIds;
        tournament.rounds = rounds;
        await tournament.save();

        res.status(201).json({
            success: true,
            message: "Tournament and bracket created successfully!",
            tournament
        });

    } catch (error) {
        console.error("Error creating tournament:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// 📌 Fetch Tournament Details
exports.getTournament = async (req, res) => {
    try {
        const { id } = req.params;
        const tournament = await Tournament.findById(id)
            .populate({
                path: "rounds",
                populate: {
                    path: "matches",
                    populate: ["teamA", "teamB"]
                }
            })
            .populate("teams");

        if (!tournament) {
            return res.status(404).json({ success: false, message: "Tournament not found" });
        }

        res.json({ success: true, tournament });
    } catch (error) {
        console.error("Error fetching tournament:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
