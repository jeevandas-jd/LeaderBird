function generateBracket(teams) {
    let rounds = [];
    let currentRound = teams.map((team, index) => ({
        team: team,
        seed: index + 1
    }));

    while (currentRound.length > 1) {
        rounds.push([...currentRound]); // Store current round
        const nextRound = [];

        // Pair teams for the next round
        for (let i = 0; i < currentRound.length; i += 2) {
            nextRound.push({
                match: `${currentRound[i].team} vs ${currentRound[i + 1].team}`,
                teams: [currentRound[i], currentRound[i + 1]]
            });
        }

        // Prepare the next round's teams (winners placeholders)
        currentRound = nextRound.map((match, index) => ({
            team: `Winner of Match ${index + 1}`,
            seed: index + 1
        }));
    }

    // Add the final round
    rounds.push(currentRound);

    return rounds;
}

exports.createBracket = (req, res) => {
    console.log("createBracket Called")
    const { teams } = req.body;

    console.log(`teams listed = > ${teams}`)

    // Validate teams
    if (!Array.isArray(teams) || teams.length < 2 || (teams.length & (teams.length - 1)) !== 0) {
        return res.status(400).json({ 
            success: false, 
            message: "Number of teams must be a power of 2 (e.g., 4, 8, 16, 32)" 
        });
    }

    // Generate bracket
    const bracket = generateBracket(teams);

    res.json({
        success: true,
        message: "Knockout tournament created successfully!",
        bracket
    });
    console.log("Bracket Created\n",bracket)};
