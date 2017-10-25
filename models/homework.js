const mongoose = require('mongoose');

const problemSchema = mongoose.Schema({
  description: { type: String, required: true },
  starterCode: { type: String, requried: true },
  pupilCode: { type: String, required: true }
});

const homeworkSchema = mongoose.Schema({
  name: { type: String, requried: true },
  hasBeenSubmitted: { type: Boolean, required: true },
  problems: [ problemSchema ]
});

module.exports = mongoose.model('Homework', homeworkSchema);
