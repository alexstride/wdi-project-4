const Pupil = require('../models/pupil');

function hwSet(req, res, next) {
  const promises = [];

  Pupil
    .find()
    .then(pupils => {
      pupils.forEach(pupil => {
        pupil.homeworks.push(req.body);
        promises.push(
          pupil.save()
            .catch(err => console.log(err))
        );
      });
      Promise.all(promises).then(() => res.json({worked: true})).catch(next);
    });
}

module.exports = {
  set: hwSet
};
