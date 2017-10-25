const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const pupilSchema = mongoose.Schema({
  email: { type: String, unique: 'The email address must be unique' },
  password: { type: String },
  homework: { type: mongoose.Schema.ObjectId, ref: 'Homework' }
});

pupilSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

pupilSchema.pre('validate', function checkPassword(next) {
  if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
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
