const mongoose = require('mongoose');

const problemSchema = mongoose.Schema({
  feedback: { type: String, required: true },
  description: { type: String, required: 'A description of the problem is required' },
  starterCode: { type: String, requried: 'You need to povide starter code for the problem' },
  pupilCode: { type: String, required: true }
});

const homeworkSchema = mongoose.Schema({
  name: { type: String, required: 'A name for the homework is required' },
  hasBeenSubmitted: { type: Boolean, required: true },
  problems: [ problemSchema ],
  setDate: { type: Date, req: 'A homework set date is required'},
  dueDate: { type: Date }
});

module.exports = mongoose.model('Homework', homeworkSchema);
