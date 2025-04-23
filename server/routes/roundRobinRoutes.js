const express = require('express');
const router = express.Router();
const roundRobinController = require('../controller/roundRobinController');

// Create new tournament
router.post('/', roundRobinController.createTournament);

// Get tournament details
router.get('/:id', roundRobinController.getTournament);

// Update match result
router.put('/:tournamentId/groups/:groupId/matches/:matchId', roundRobinController.updateMatchResult);

module.exports = router;