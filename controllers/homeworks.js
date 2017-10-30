const Pupil = require('../models/pupil');

function hwSet(req, res, next) {
  Pupil
    .find({ teacher: req.body.teacherId })
    .then(pupils => {
      console.log(pupils);
      const promises = pupils.map(pupil => {
        pupil.homeworks.push(req.body);
        console.log(pupil.homeworks);
        return pupil.save();
      });
      Promise
        .all(promises)
        .then(() => res.json({worked: true}))
        .catch(next);
    });
}

module.exports = {
  set: hwSet
};
