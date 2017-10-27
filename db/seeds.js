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

          homeworks: [{
            name: 'Printing for Lemons',
            hasBeenSubmitted: true,
            setDate: 'Fri Oct 27 2017 21:24:53 GMT+0100 (BST)',
            problems: [{
              description: 'Find the error in the following code',
              starterCode: 'bla',
              pupilCode: 'blabla',
              feedback: 'Very good effort. More required next time'
            }, {
              description: 'Fix the problems with the code',
              starterCode: 'bla',
              pupilCode: 'blabla',
              feedback: 'Not so good this time'
            }, {
              description: 'Do something else to this code',
              starterCode: 'bla',
              pupilCode: 'blabla',
              feedback: 'Good bla bla bla. Some text here'
            }]
          }, {
            name: 'Arrays and Lists',
            hasBeenSubmitted: false,
            setDate: 'Fri Oct 27 2017 21:29:41 GMT+0100 (BST)',
            problems: [{
              description: 'Change the array',
              starterCode: 'bla',
              pupilCode: 'blabla',
              feedback: 'Very good effort. More required next time'
            }, {
              description: 'Use this List to create a ladder',
              starterCode: 'bla',
              pupilCode: 'blabla',
              feedback: 'Not so good this time'
            }, {
              description: 'Swim across this code and clap 5 times',
              starterCode: 'bla',
              pupilCode: 'blabla',
              feedback: 'Good bla bla bla. Some text here'
            }]
          }]

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
