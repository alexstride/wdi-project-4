const Homework = require('../models/homework');
const Pupil = require('../models/pupil');

function hwSet(req, res, next) {
  Pupil
    .find()
    .then(pupils => {
      pupils.forEach(pupil => {
        const newHomework = pupil.homeworks.create(req.body);
        pupil.homeworks.push(newHomework);
        return pupil.save();
      });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

function hwIndex(req, res, next) {
  Homework
    .find()
    .exec()
    .then(hws => res.json(hws))
    .catch(next);
}

function hwShow(req, res, next) {
  Homework
    .findById(req.params.id)
    .exec()
    .then(hw => {
      if (!hw) return res.notFound();
      res.json(hw);
    })
    .catch(next);
}

function hwUpdate(req, res, next) {
  Homework
    .findById(req.params.id)
    .exec()
    .then(hw => {
      if (!hw) return res.notFound();
      hw = Object.assign(hw, req.body);
      return hw.save();
    })
    .then(hw => res.json(hw))
    .catch(next);
}

function hwUpdateProblem(req, res, next) {
  Homework
    .findById(req.params.id)
    .exec()
    .then(hw => {
      if (!hw) return res.notFound();
      const problem = hw.problems.id(req.params.problemId);
      Object.assign(problem, req.body);
      return hw.save();
    })
    .then(hw => res.json(hw))
    .catch(next);
}

module.exports = {
  // set: hwSet,
  index: hwIndex,
  show: hwShow,
  update: hwUpdate,
  updateProblem: hwUpdateProblem
};
