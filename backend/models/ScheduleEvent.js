const mongoose = require('mongoose');

const scheduleEventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String, // 'class', 'deadline', 'exam', 'holiday'
    required: true
  },
  title: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('ScheduleEvent', scheduleEventSchema);
