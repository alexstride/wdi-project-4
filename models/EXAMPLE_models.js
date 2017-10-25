const mongoose = require('mongoose');

const pupilProblemSchema = mongoose.Schema({
  parentProblem: { type: mongoose.Schema.ObjecId, ref: 'teacherProblemSchema' },
  pupilCode: { type: String },
  teacherFeedback: { type: String }
});

const teacherProblemSchema = mongoose.Schema({
  solution: { type: String },
  description: { type: String },
  starterCode: { type: String }
});

const homeworkAssignmentSchema = mongoose.Schema({
  problems: [ pupilProblemSchema ],
  dueDate: { type: Date },
  setDate: { type: Date },
  pupilSubmitted: { type: Boolean }
});

const homeworkTemplateSchema = mongoose.Schema({
  teacherOwner: { type: mongoose.Schema.ObjectId, ref: 'teacherUserSchema'},
  problems: [ teacherProblemSchema ]
});

const pupilUserSchema = mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  password: { type: String },
  homeworks: [ homeworkAssignmentSchema ],
  set: { type: mongoose.Schema.ObjecId, ref: 'setSchema' }
});

const setSchema = mongoose.Schema({
  name: { type: String },
  teacher: { type: mongoose.Schema.ObjecId, ref: 'teacherUserSchema' }
});

const teacherUserSchema = mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  title: { type: String },
  email: { type: String },
  password: { type: String }
});

module.exports = {
  pupilProblemSchema,
  teacherProblemSchema,
  homeworkAssignmentSchema,
  pupilUserSchema,
  setSchema,
  teacherUserSchema,
  homeworkTemplateSchema
};
