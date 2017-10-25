const mongoose = require('mongoose');

const pupilSchema = mongoose.Schema({
  email: { type: String, unique: 'The email address must be unique' },
  password: { type: String },
  homework: { type: mongoose.Schema.ObjectId, ref: 'Homework' }
});

module.exports = mongoose.model('Pupil', pupilSchema);
