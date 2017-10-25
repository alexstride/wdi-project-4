const Homework = require('../models/homework');

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
  index: hwIndex,
  show: hwShow,
  update: hwUpdate,
  updateProblem: hwUpdateProblem
};
