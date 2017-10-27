const mongoose = require('mongoose');

const problemSchema = mongoose.Schema({
  feedback: { type: String},
  description: { type: String, required: true },
  starterCode: { type: String, requried: true },
  pupilCode: { type: String, required: true }
});

const homeworkSchema = mongoose.Schema({
  name: { type: String, requried: true },
  hasBeenSubmitted: { type: Boolean, required: true },
  problems: [ problemSchema ],
  setDate: { type: Date, req: 'A homework set date is required'}
});

module.exports = mongoose.model('Homework', homeworkSchema);
