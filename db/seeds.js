const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, { useMongoClient: true });

const Pupil = require('../models/pupil');
const Homework = require('../models/homework');

const promises = [
  Pupil.remove(),
  Homework.remove()
];

Promise
  .all(promises)
  .then(() => {
    return Homework
      .create([
        {
          name: 'Homework Test',
          hasBeenSubmitted: false,
          problems: [
            {
              description: 'Make this code print "Hello, World!"',
              starterCode: 'def printHello():\n  pirnt(\'Hello, World\')\nprintHello()\n',
              pupilCode: 'def printHello():\n  pirnt(\'Hello, World\')\nprintHello()\n'
            },{
              description: 'Make this code add 3 and 5',
              starterCode: 'def addNumbers(a, b):\n  print(a + b)\naddNumbers()',
              pupilCode: 'def addNumbers(a, b):\n  print(a + b)\naddNumbers()'
            }
          ]
        }
      ]);
  })
  .then(homework => {
    console.log(`${homework.length} homework created`);
    return Pupil
      .create([
        {
          email: 'test@test.com',
          password: 'pass',
          homework: homework[0]
        }
      ]);
  })
  .then(pupil => console.log(`${pupil.length} pupils created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
