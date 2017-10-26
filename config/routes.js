const router = require('express').Router();
const auth = require('../controllers/auth');

const homeworks = require('../controllers/homeworks');

router.route('/homeworks')
  .get(homeworks.index);

router.route('/homeworks/:id/problems/:problemId')
  .put(homeworks.updateProblem);

router.route('/homeworks/:id')
  .get(homeworks.show)
  .put(homeworks.update);

router.route('/teachers/login')
  .post(auth.teacherLogin);

router.route('/teachers/register')
  .post(auth.teacherRegistration);

router.route('/pupils/login')
  .post(auth.pupilLogin);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
