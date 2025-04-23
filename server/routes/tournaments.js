const express = require('express');
const router = express.Router();
const tournamentController = require('../controller/tournaments');

// Create a new tournament
router.post('/', tournamentController.createTournament);

// Get all tournaments
router.get('/', tournamentController.getAllTournaments);

// Get a single tournament
router.get('/:id', tournamentController.getTournament);

// Update match result
router.put('/:tournamentId/matches/:matchId', tournamentController.updateMatchResult);

module.exports = router;