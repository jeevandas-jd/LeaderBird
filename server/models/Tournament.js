const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  round: Number,
  matchNumber: Number,
  team1: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  team2: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  score1: Number,
  score2: Number,
  completed: { type: Boolean, default: false }
});

const teamSchema = new mongoose.Schema({
  name: String,
  seed: Number
});

const tournamentSchema = new mongoose.Schema({
  name: String,
  teams: [teamSchema],
  matches: [matchSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tournament', tournamentSchema);