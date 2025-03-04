const mongoose = require("mongoose");

// Bracket Schema
const BracketSchema = new mongoose.Schema({
  teams: {
    type: [String],
    required: true,
  },
  noRounds: {
    type: Number,
    required: true,
  },
  rounds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Round",
    },
  ],
});

// Match Schema (for individual matches in a round)
const MatchSchema = new mongoose.Schema({
  team1: {
    type: String,
    required: true,
  },
  team2: {
    type: String,
    required: true,
  },
});

// Result Schema (for storing match results)
const ResultSchema = new mongoose.Schema({
  matchNo: {
    type: Number,
    required: true,
  },
  score: {
    type: [Number],
    required: true,
  },
  winner: {
    type: String,
    required: true,
  },
});

// Round Schema
const RoundSchema = new mongoose.Schema({
  roundNo: {
    type: Number,
    required: true,
  },
  matches: [MatchSchema],
  results: [ResultSchema],
  winners: {
    type: [String],
    default: [],
  },
  bracketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bracket",
    required: true,
  },
});

// Define Mongoose models
const Bracket = mongoose.model("Bracket", BracketSchema);
const Round = mongoose.model("Round", RoundSchema);
const Match = mongoose.model("Match", MatchSchema);

// Export both models
module.exports = { Bracket, Round, Match };