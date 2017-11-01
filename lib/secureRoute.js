const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/environment');
const Teacher = require('../models/teacher');
const Pupil = require('../models/pupil');

function secureRouteTeacher(req, res, next) {
  if(!req.headers.authorization) return res.unauthorized();

  const token = req.headers.authorization.replace('Bearer ', '');

  jwt.verifyAsync(token, secret)
    .then((payload) => {
      return Teacher.findById(payload.teacherId);
    })
    .then(teacher => {
      if(!teacher) return res.unauthorized();
      req.currentUser = teacher;
      return next();
    })
    .catch(next);
}

function secureRouteAll(req, res, next) {
  console.log(!!req.header.authorization);
  if(!req.headers.authorization) return res.unauthorized();
  const token = req.headers.authorization.replace('Bearer ', '');

  jwt.verifyAsync(token, secret)
    .then(payload => {
      if('teacherId' in payload) {
        return Teacher.findById(payload.teacherId);
      } else {
        return Pupil.findById(payload.pupilId);
      }
    })
    .then(user => {
      if(!user) return res.unauthorized();
      req.currentUser = user;
      return next();
    })
    .catch(next);
}

module.exports = { secureRouteTeacher, secureRouteAll };
