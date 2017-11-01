/* global api, describe, it, expect, beforeEach, afterEach */

require('../helper');

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Pupil = require('../../../models/pupil');
const Teacher = require('../../../models/teacher');

const teacherToCreate = {
  firstname: 'Joseph',
  lastname: 'Gordon',
  school: 'Wallington',
  email: 'joe@joe.com',
  password: 'test',
  passwordConfirmation: 'test'
};

const pupilToCreate = {
  firstname: 'Ben',
  lastname: 'Jones',
  email: 'ben@ben.com',
  password: 'test',
  passwordConfirmation: 'test',
  homeworks: [{
    name: 'Printing for Lemons',
    hasBeenSubmitted: false,
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
  }]
};

const params = {
  pupilId: null,
  homeworkId: null
};

describe('PUT /api/pupils/:id/homeworks/:homeworkId', () => {

  let token = null;
  const putObject = { hasBeenSubmitted: true };

  beforeEach(done => {
    Teacher.create(teacherToCreate, (err, teacher) => {
      token = jwt.sign({teacherId: teacher.id }, secret, { expiresIn: '1hr'});
      pupilToCreate.teacher = teacher.id;
      Pupil.create(pupilToCreate, (err, pupil) => {
        params.pupilId = pupil.id;
        params.homeworkId = pupil.homeworks[0].id;
        done(err);
      });
    });
  });

  afterEach(done => {
    Teacher.collection.remove();
    Pupil.collection.remove();
    done();
  });

  it('should return a 401 response if not authorised', function(done) {
    api
      .put(`/api/pupils/${params.pupilId}/homeworks/${params.homeworkId}`)
      .set('Accept', 'application/json')
      .send(putObject)
      .expect(401, done);
  });

  it('should return a 200 response on success', function(done) {
    api
      .put(`/api/pupils/${params.pupilId}/homeworks/${params.homeworkId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(putObject)
      .expect(200, done);
  });

  it('should return an object', function(done) {
    api
      .put(`/api/pupils/${params.pupilId}/homeworks/${params.homeworkId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(putObject)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct homework data', function(done) {
    api
      .put(`/pupils/${params.pupilId}/homeworks/${params.homeworkId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(putObject)
      .end((err, res) => {
        console.log('reponse received by test suite: ', res.body);
        expect(res.body.name).to.equal('Printing for Lemons');
        done(err);
      });
  });

  it('should return the correct homework data', function(done) {
    api
      .put(`/pupils/${params.pupilId}/homeworks/${params.homeworkId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(putObject)
      .end((err, response) => {
        console.log('reponse received by test suite in new copy: ', response.body);
        done(err);
      });
  });

});
