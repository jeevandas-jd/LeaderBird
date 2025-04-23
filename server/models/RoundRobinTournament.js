const mongoose = require('mongoose');

const teamStandingSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  played: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  goalsFor: { type: Number, default: 0 },
  goalsAgainst: { type: Number, default: 0 },
  points: { type: Number, default: 0 }
});

const groupSchema = new mongoose.Schema({
  name: String,
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  standings: [teamStandingSchema],
  matches: [{
    homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    homeScore: Number,
    awayScore: Number,
    played: { type: Boolean, default: false },
    leg: { type: Number, default: 1 }, // 1 for first leg, 2 for second leg
    date: Date
  }]
});

const roundRobinTournamentSchema = new mongoose.Schema({
  name: String,
  description: String,
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  groups: [groupSchema],
  pointsForWin: { type: Number, default: 3 },
  pointsForDraw: { type: Number, default: 1 },
  hasTwoLegs: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RoundRobinTournament', roundRobinTournamentSchema);