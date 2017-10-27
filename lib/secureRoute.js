const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/environment');
const Teacher = require('../models/teacher');

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

module.exports = { secureRouteTeacher };
