const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const Pupil = require('../models/pupil');

function pupilLogin(req, res, next) {
  Pupil
    .findOne({ email: req.body.email })
    .then((pupil) => {
      if(!pupil || !pupil.validatePassword(req.body.password)) return res.status(401).json({ message: 'Unauthorized' });

      const token = jwt.sign({ pupilId: pupil.id, userType: 'pupil' }, secret, { expiresIn: '6hr' });
      return res.json({ message: `Welcome back ${pupil.email}`, token });
    })
    .catch(next);
}



module.exports = {
  pupilLogin
};
