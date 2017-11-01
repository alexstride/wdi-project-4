const Pupil = require('../models/pupil');

function pupilsIndex(req, res, next) {
  Pupil
    .find({ teacher: req.params.id })
    .exec()
    .then(pupils => {
      res.json(pupils);
    })
    .catch(next);
}

function pupilsShow(req, res, next) {
  Pupil
    .findById(req.params.id)
    .exec()
    .then(pupil => {
      if (!pupil) res.notFound();
      res.json(pupil);
    })
    .catch(next);
}

function pupilsDelete(req, res, next) {
  Pupil
    .findById(req.params.id)
    .exec()
    .then(pupil => pupil.remove())
    .then(() => res.status(204).end())
    .catch(next);
}

function pupilsCreate(req, res, next) {
  Pupil
    .create(req.body)
    .then(pupil => {
      return res.status(201).json(pupil);
    })
    .catch(next);
}

function homeworksIndex(req, res, next) {
  Pupil
    .findById(req.params.id)
    .exec()
    .then(pupil => res.json(pupil.homeworks))
    .catch(next);
}

function homeworksShow(req, res, next) {
  Pupil
    .findById(req.params.id)
    .exec()
    .then(pupil => {
      const hw = pupil.homeworks.id(req.params.homeworkId);
      return res.json(hw);
    })
    .catch(next);
}

function homeworksUpdate(io) {
  return (req, res, next) => {
    Pupil
      .findById(req.params.id)
      .exec()
      .then(pupil => {
        pupil.homeworks = pupil.homeworks.map(hw => {
          if(hw.id === req.params.homeworkId) {
            Object.assign(hw, req.body);
          }
          return hw;
        });
        return pupil.save();
      })
      .then((pupil) => {
        io.emit('submitted', {pupilId: req.params.id});
        const response = pupil.homeworks.id(req.params.homeworkId);
        res.json(response);
      })
      .catch(next);
  };
}

function homeworksProblemUpdate(io) {
  return (req, res, next) => {
    Pupil
      .findById(req.params.id)
      .exec()
      .then(pupil => {
        let currentProblem = null;
        const hw = pupil.homeworks.id(req.params.homeworkId);
        hw.problems.map(prob => {
          if(prob.id === req.params.problemId) {
            currentProblem = Object.assign(prob, req.body);
            return currentProblem;
          } else {
            return prob;
          }
        });
        return pupil.save().then(() => {
          io.emit('submitted', { pupilId: req.params.id });
          res.json(currentProblem);
        });
      })
      .catch(next);
  };
}

module.exports = {
  pupilsShow,
  pupilsIndex,
  pupilsCreate,
  pupilsDelete,
  homeworksIndex,
  homeworksShow,
  homeworksUpdate,
  homeworksProblemUpdate
};
