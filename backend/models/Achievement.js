const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  bg: {
    type: String,
    default: "bg-yellow-100"
  },
  border: {
    type: String,
    default: "border-yellow-400"
  },
  buttonBg: {
    type: String,
    default: "bg-yellow-400"
  }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
