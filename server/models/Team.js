const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  seed: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Team', teamSchema);