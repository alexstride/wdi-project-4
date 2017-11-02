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

const homeworks = [{
  name: 'Week 1 Homework',
  hasBeenSubmitted: true,
  setDate: 'Mon Oct 16 2017 00:00:00',
  dueDate: 'Fri Oct 20 2017 00:00:00',
  problems: [{
    description: 'Make this code print "hello, world!"',
    starterCode: 'def sayHello():\n  pirnt(\'hello, world!\')\n\nsayHello()',
    pupilCode: 'def sayHello():\n  print(\'hello, world!\')\n\nsayHello()',
    feedback: 'Good work!'
  },{
    description: 'Print the numbers one to five inclusive, using a list.',
    starterCode: 'numbers =\n\ndef showNum():\n  for n in numbers:\n  print(n)\n\nshowNum()',
    pupilCode: 'numbers =[1,2,3,4,5]\n\ndef showNum():\n  for n in numbers:\n    print(n)\n\nshowNum()',
    feedback: 'Nice job.'
  },{
    description: 'Use a dictionary to shift each letter along the alphabet by one and pring the sentence.',
    starterCode: 'sentence = \'I am learning Python\'\n\ndef letterShifter(phrase):\n  for letter in phrase:\n\n\nletterShifter()',
    pupilCode: 'sentence =\'I am learning Python\'\n\ndef letterShifter(phrase):\n  shifter = {a: \'b\', b: \'c\', c: \'d\', d: \'e\', e: \'f\', f: \'g\', g: \'h\', h: \'i\', i: \'j\', j: \'k\', k: \'l\', l: \'m\', m: \'n\', n: \'o\', o: \'p\', p: \'q\', q: \'r\', r: \'s\', s: \'t\', t: \'u\', v: \'w\', w: \'x\', x: \'y\', y: \'z\', z: \'a\', u: \'v\', }\n  for letter in phrase:\n  print(shifter[letter])\n\nletterShifter()',
    feedback: 'Good try but there is a better way.'
  }]
},{
  name: 'Week 2 Homework',
  hasBeenSubmitted: true,
  setDate: 'Mon Oct 23 2017 00:00:00',
  dueDate: 'Fri Oct 27 2017 00:00:00',
  problems: [{
    description: 'Count how many times f appears in the sentence',
    starterCode: 'sentence = \'sad to say goodbye to the folks in WDI\'',
    pupilCode: 'sentence = \'sad to say goodbye to the folks in WDI\'\ncounter = 0\nfor letter in sentence:\n  if letter == \'f\':\n    ++counter\n\nprint(counter)',
    feedback: 'I like it!'
  },{
    description: 'What is the sum of the digits of the number 2 to the power 1000',
    starterCode: '##No starter code this time',
    pupilCode: 'def sumOfPower(n):\n  power = 2 ** n\n  powerStr = str(power)\n  powerLst = []\n  for x in powerStr:\n    powerLst.append(int(x))\n  powerSum = sum(powerLst)\n  print(powerSum)\n\nsumOfPower(1000)',
    feedback: 'An excellent sollution'
  },{
    description: 'What is the index of the first term in the Fibonacci sequence to contain 1000 digits?',
    starterCode: '##No starter code this time',
    pupilCode: 'fList = [1,1]\n\nwhile len(str(fList[-1])) < 1000:\n  fList.append(fList[-1] + fList[-2])\n\nprint(len(fList))',
    feedback: 'Nice succinct answer.'
  }]
}];

Promise
  .all(promises)
  .then(() => {
    return Teacher
      .create([
        {
          email: 'alex@alex.com',
          password: 'pass',
          passwordConfirmation: 'pass',
          firstname: 'Alex',
          lastname: 'Stride',
          school: 'GA WDI 29'
        }
      ]);
  })
  .then(teachers => {
    console.log(`${teachers.length} teachers created`);
    return Pupil
      .create([
        {
          firstname: 'Ben',
          lastname: 'Jones',
          email: 'ben@ben.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Mike',
          lastname: 'Hayden',
          email: 'mike@mike.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Emily',
          lastname: 'Isacke',
          email: 'emily@emily.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Matt',
          lastname: 'Studdert',
          email: 'matt@matt.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'William',
          lastname: 'Tye',
          email: 'william@william.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Bradley',
          lastname: 'Lebetkin',
          email: 'brad@brad.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Andy',
          lastname: 'Stavrinou',
          email: 'andy@andy.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Casey',
          lastname: 'Nailer',
          email: 'casey@casey.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Daniel',
          lastname: 'Izquierdo',
          email: 'dani@dani.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Giovanni',
          lastname: 'Galiero',
          email: 'gio@gio.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Goran',
          lastname: 'Angelovski',
          email: 'goran@goran.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Guy',
          lastname: 'Harper',
          email: 'guy@guy.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Hannah',
          lastname: 'Siu-Yin Jadavji',
          email: 'han@han.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Josh',
          lastname: 'Lynch',
          email: 'josh@josh.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Paul',
          lastname: 'Marden',
          email: 'paul@paul.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Savva',
          lastname: 'Lambin',
          email: 'sav@sav.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Vlad',
          lastname: 'Turcu',
          email: 'vlad@vlad.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Ralph',
          lastname: 'Wendt',
          email: 'ralph@ralph.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Sibusiso',
          lastname: 'Zwane',
          email: 'tito@tito.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Will',
          lastname: 'Evans',
          email: 'will@will.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        },{
          firstname: 'Astrid',
          lastname: 'Haizet',
          email: 'astrid@astrid.com',
          teacher: teachers[0],
          password: 'pass',
          passwordConfirmation: 'pass',
          homeworks: homeworks
        }
      ]);
  })
  .then(pupils =>  console.log(`${pupils.length} pupils have been created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
