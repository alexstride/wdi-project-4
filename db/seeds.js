const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, { useMongoClient: true });

const Pupil = require('../models/pupil');
const Homework = require('../models/homework');
const Teacher = require('../models/teacher');

const promises = [
  Pupil.remove(),
  Homework.remove(),
  Teacher.remove()
];

Promise
  .all(promises)
  .then(() => {
    return Pupil
      .create([
        {
          firstname: 'Ben',
          lastname: 'Jones',
          email: 'test@test.com',
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: []
        }
      ]);
  })
  .then(pupil => {
    console.log(`${pupil.length} pupils created`);
    return Teacher
      .create([
        {
          email: 'teacher@teacher.com',
          password: 'pass',
          passwordConfirmation: 'pass',
          pupil: pupil[0],
          firstname: 'John',
          lastname: 'Burston',
          school: 'St. Olave\'s'
        }
      ]);
  })
  .then(teacher =>  console.log(`${teacher.length} teachers have been created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
