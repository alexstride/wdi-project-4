const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teacherSchema = mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  school: { type: String },
  email: { type: String, unique: 'the provided email must be unique', required: 'an email must be provided' },
  password: { type: String, required: 'a password must be provided' }
});

teacherSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

teacherSchema.pre('validate', function checkPassword(next) {
  if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }
  next();
});

teacherSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

teacherSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Teacher', teacherSchema);
