/* global api, describe, it, expect, beforeEach, afterEach */

require('../helper');

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Pupil = require('../../../models/pupil');
const Teacher = require('../../../models/teacher');

const homeworkOne = {
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
};

const teacherToCreate = {
  firstname: 'Joseph',
  lastname: 'Gordon',
  school: 'Wallington',
  email: 'joe@joe.com',
  password: 'test',
  passwordConfirmation: 'test'
};

const pupilOneToCreate = {
  firstname: 'Ben',
  lastname: 'Jones',
  email: 'ben@ben.com',
  password: 'test',
  passwordConfirmation: 'test',
  homeworks: [homeworkOne]
};

const pupilTwoToCreate = {
  firstname: 'Alex',
  lastname: 'Stride',
  email: 'alex@alex.com',
  password: 'test',
  passwordConfirmation: 'test',
  homeworks: [homeworkOne]
};

describe('GET /api/teachers/:id/pupils', () => {

  let teacherId = null;
  let token = null;

  beforeEach(done => {
    Teacher.create(teacherToCreate, (err, teacher) => {
      token = jwt.sign({teacherId: teacher.id }, secret, { expiresIn: '1hr'});
      pupilOneToCreate.teacher = teacher.id;
      pupilTwoToCreate.teacher = teacher.id;
      teacherId = teacher.id;
      Pupil.create([pupilOneToCreate, pupilTwoToCreate]);
      done(err);
    });
  });

  afterEach(done => {
    Teacher.collection.remove();
    Pupil.collection.remove();
    done();
  });

  it('should return a 401 response when not authorised', function(done) {
    api
      .get(`/api/teachers/${teacherId}/pupils`)
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('should return a 200 response on success', function(done) {
    api
      .get(`/api/teachers/${teacherId}/pupils`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });

  it('should return an object', function(done) {
    api
      .get(`/api/teachers/${teacherId}/pupils`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return the correct pupil data', function(done) {
    api
      .get(`/api/teachers/${teacherId}/pupils`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        const pupils = res.body;
        expect(pupils.length).to.equal(2);
        expect(pupils[0].firstname).to.equal('Ben' || 'Alex');
        expect(pupils[0].lastname).to.equal('Jones' || 'Stride');
        expect(pupils[0].email).to.equal('ben@ben.com' || 'alex@alex.com');
        expect(pupils[0].teacher).to.equal(teacherId);
        expect(pupils[0].homeworks.length).to.equal(1);
        done();
      });
  });

});
