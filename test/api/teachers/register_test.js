/* global api, describe, it, expect, afterEach */

require('../helper');

const Teacher = require('../../../models/teacher');

const teacherToCreate = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

describe('POST /api/teachers', () => {

  afterEach(done => {
    Teacher.collection.remove();
    done();
  });

  it('should return a 201 response on success', function(done) {
    api
      .post('/api/teachers')
      .set('Accept', 'application/json')
      .send(teacherToCreate)
      .expect(201, done);
  });

  it('should return an object', function(done) {
    api
      .post('/api/teachers')
      .set('Accept', 'application/json')
      .send(teacherToCreate)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return Registration successful', function(done) {
    api
      .post('/api/teachers')
      .set('Accept', 'application/json')
      .send(teacherToCreate)
      .end((err, res) => {
        expect(res.body.message).to.equal('Registration successful');
        done();
      });
  });

  it('should return 422 status for missing email', function(done) {
    api
      .post('/api/teachers')
      .set('Accept', 'application/json')
      .send(Object.assign(teacherToCreate, {email: null}))
      .expect(422, done);
  });

  it('should return 422 status for creating with email which is already registered', function(done) {
    api
      .post('/api/teachers')
      .set('Accept', 'application/json')
      .send(teacherToCreate)
      .end(() => {
        api
          .post('/api/teachers')
          .set('Accept', 'application/json')
          .send(teacherToCreate)
          .expect(422, done);
      });
  });

  it('should return error object for invalid input', function(done) {
    api
      .post('/api/teachers')
      .set('Accept', 'application/json')
      .send(Object.assign(teacherToCreate, {email: null}))
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

});
