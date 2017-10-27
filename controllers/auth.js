const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const Pupil = require('../models/pupil');
const Teacher = require('../models/teacher');

function pupilLogin(req, res, next) {
  Pupil
    .findOne({ email: req.body.email })
    .then((pupil) => {
      if(!pupil || !pupil.validatePassword(req.body.password)) return res.status(401).json({ message: 'Unauthorized' });

      const token = jwt.sign({ pupilId: pupil.id, userType: 'pupil' }, secret, { expiresIn: '6hrs' });
      return res.json({ message: `Welcome back ${pupil.email}`, token });
    })
    .catch(next);
}

function teacherLogin(req, res, next) {
  Teacher
    .findOne({ email: req.body.email })
    .then(teacher => {
      if(!teacher || !teacher.validatePassword(req.body.password))  return res.status(401).json({ message: 'Unauthorized' });
      const token = jwt.sign({ teacherId: teacher.id, userType: 'teacher' }, secret, { expiresIn: '6hrs'});
      return res.json({ message: `Welcome back ${teacher.firstname} ${teacher.lastname}`, token });
    })
    .catch(next);
}

function teacherRegistration(req, res, next) {
  Teacher
    .create(req.body)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next);
}

module.exports = {
  pupilLogin,
  teacherLogin,
  teacherRegistration
};
