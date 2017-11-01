const Teacher = require('../../models/teacher');
const Pupil = require('../../models/pupil');

const teacherData = [{
  email: 'teacher@teacher.com',
  password: 'pass',
  passwordConfirmation: 'pass',
  firstname: 'John',
  lastname: 'Burston',
  school: 'St. Olave\'s'
}, {
  email: 'teacher2@teacher2.com',
  password: 'pass',
  passwordConfirmation: 'pass',
  firstname: 'Danny',
  lastname: 'Rowland',
  school: 'St. Albans\'s'
}];

const yeildPupils = (teacher1Id, teacher2Id) => {
  return [
    {
      firstname: 'Ben',
      lastname: 'Jones',
      email: 'ben@ben.com',
      teacher: teacher1Id,
      password: 'pass',
      passwordConfirmation: 'pass',
      homeworks: [{
        name: 'Printing for Lemons',
        hasBeenSubmitted: true,
        setDate: 'Fri Oct 27 2017 21:24:53 GMT+0100 (BST)',
        dueDate: 'Fri Nov 03 2017 00:00:00',
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
    },
    {
      firstname: 'Josh',
      lastname: 'Lynch',
      email: 'josh@josh.com',
      teacher: teacher2Id,
      password: 'pass',
      passwordConfirmation: 'pass',
      homeworks: [{
        name: 'Printing for Lemons',
        hasBeenSubmitted: true,
        setDate: 'Fri Oct 27 2017 21:24:53 GMT+0100 (BST)',
        dueDate: 'Fri Nov 03 2017 00:00:00',
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
    },
    {
      firstname: 'Alex',
      lastname: 'Stride',
      email: 'alex@alex.com',
      teacher: teacher2Id,
      password: 'pass',
      passwordConfirmation: 'pass',
      homeworks: [{
        name: 'Printing for Lemons',
        hasBeenSubmitted: true,
        setDate: 'Fri Oct 27 2017 21:24:53 GMT+0100 (BST)',
        dueDate: 'Fri Nov 03 2017 00:00:00',
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
  ];
};

module.exports = { teacherData, yeildPupils };
