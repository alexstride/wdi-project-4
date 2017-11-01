/* global describe, it, api, expect, beforeEach, afterEach */

require('../helper');

const Teacher = require('../../../models/teacher');

const badLoginTeacher = {
  email: 'notAnEmail',
  password: 'notAPassword'
};

const goodLoginTeacher = {
  email: 'joe@joe.com',
  password: 'pass'
};

describe('POST /api/teachers/login', () => {

  let name = null;

  beforeEach(done => {
    Teacher.create({
      firstname: 'Joseph',
      lastname: 'Gordon',
      school: 'Wallington',
      email: 'joe@joe.com',
      password: 'pass',
      passwordConfirmation: 'pass'
    }, (err, teacher) => {
      name = `${teacher.firstname} ${teacher.lastname}`;
      done(err);
    });
  });

  afterEach(done => {
    Teacher.collection.remove();
    done();
  });

  it('should return a 401 response', done => {
    api
      .post('/api/teachers/login')
      .set('Accept', 'application/json')
      .send(badLoginTeacher)
      .expect(401, done);
  });

  it('should return a 200 response when login with correct credentials', done => {
    api
      .post('/api/teachers/login')
      .set('Accept', 'application/json')
      .send(goodLoginTeacher)
      .expect(200, done);
  });

  it('should return an object', done => {
    api
      .post('/api/teachers/login')
      .set('Accept', 'application/json')
      .send(goodLoginTeacher)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/teachers/login')
      .set('Accept', 'application/json')
      .send(goodLoginTeacher)
      .end((err, res) => {
        const userItem = res.body;
        expect(userItem.token).to.be.a('string');
        expect(userItem.message).to.equal('Welcome back ' + name);
        done();
      });
  });

});
