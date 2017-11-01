const router = require('express').Router();

const auth = require('../controllers/auth');
const homeworks = require('../controllers/homeworks');
const pupils = require('../controllers/pupils');
const { secureRouteTeacher, secureRouteAll } = require('../lib/secureRoute');

router.route('/homeworks')
  .post(secureRouteTeacher, homeworks.set);

// the below route has been deprecated by the the pupils/:id/homeworks/:homeworkId/problems/:problemId route
// router.route('/homeworks/:id/problems/:problemId')
//   .put(homeworks.updateProblem);

// the below routes have been deprecated by the pupils/:id/homeworks/homeworks/:homeworkId route
// router.route('/homeworks/:id')
//   .get(homeworks.show)
//   .put(homeworks.update);

router.route('/teachers/login')
  .post(auth.teacherLogin);

router.route('/teachers')
  .post(auth.teacherRegistration);

router.route('/teachers/:id/pupils')
  .get(secureRouteTeacher, pupils.pupilsIndex);

router.route('/pupils/:id')
  .get(secureRouteAll, pupils.pupilsShow)
  .delete(secureRouteTeacher, pupils.pupilsDelete);

router.route('/pupils/login')
  .post(auth.pupilLogin);

router.route('/pupils/multiple')
  .post(secureRouteTeacher, pupils.pupilsCreate);

router.route('/pupils/:id/homeworks')
  .get(secureRouteAll, pupils.homeworksIndex);

router.route('/pupils/:id/homeworks/:homeworkId')
  .get(secureRouteAll, pupils.homeworksShow)
  .put(secureRouteAll, pupils.homeworksUpdate);

router.route('/pupils/:id/homeworks/:homeworkId/problems/:problemId')
  .put(secureRouteAll, pupils.homeworksProblemUpdate);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
