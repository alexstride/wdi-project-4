const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const homeworkSchema = require('./homework').schema;

const pupilSchema = mongoose.Schema({
  firstname: { type: String, req: 'A pupil requires a first name' },
  lastname: { type: String, req: 'A pupil requires a last name' },
  email: { type: String, unique: 'The provided email must be unique', requried: 'an email must be provided' },
  password: { type: String, required: 'A password must be provided' },
  homeworks: [ homeworkSchema ],
  teacher: { type: mongoose.Schema.ObjectId, ref: 'Teacher', required: true }
});

pupilSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

pupilSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }
  next();
});

pupilSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

pupilSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Pupil', pupilSchema);
