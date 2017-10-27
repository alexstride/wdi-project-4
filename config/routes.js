const router = require('express').Router();

const auth = require('../controllers/auth');
const homeworks = require('../controllers/homeworks');
const pupils = require('../controllers/pupils');

router.route('/homeworks')
  .get(homeworks.index)
  .post(homeworks.create);

// the below route has been deprecated by the the pupils/homeworks/problems route
// router.route('/homeworks/:id/problems/:problemId')
//   .put(homeworks.updateProblem);

router.route('/homeworks/:id')
  .get(homeworks.show)
  .put(homeworks.update);

router.route('/teachers/login')
  .post(auth.teacherLogin);

router.route('/teachers/register')
  .post(auth.teacherRegistration);

router.route('/pupils/login')
  .post(auth.pupilLogin);

router.route('pupils/:id/homeworks/')
  .get(pupils.homeworksIndex);

router.route('pupils/:id/homeworks/:homeworkId/problems/:problemId')
  .put(pupils.homeworkProblemUpdate);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
