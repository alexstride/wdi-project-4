/* global api, describe, it, expect, beforeEach, afterEach */

require('../helper');

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
  homeworks: []
};

describe('POST /api/pupils/multiple', () => {

  let teacherId = null;

  beforeEach(done => {
    Teacher.create(teacherToCreate, (err, teacher) => {
      pupilToCreate.teacher = teacher.id;
      teacherId = teacher.id;
      done(err);
    });
  });

  afterEach(done => {
    Teacher.collection.remove();
    Pupil.collection.remove();
    done();
  });

  it('should return a 201 response on success', function(done) {
    api
      .post('/api/pupils/multiple')
      .set('Accept', 'application/json')
      .send(pupilToCreate)
      .expect(201, done);
  });

  it('should return an object', function(done) {
    api
      .post('/api/pupils/multiple')
      .set('Accept', 'application/json')
      .send(pupilToCreate)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct pupil data', function(done) {
    api
      .post('/api/pupils/multiple')
      .set('Accept', 'application/json')
      .send(pupilToCreate)
      .end((err, res) => {
        const pupil = res.body;
        expect(pupil.firstname).to.equal('Ben');
        expect(pupil.lastname).to.equal('Jones');
        expect(pupil.email).to.equal('ben@ben.com');
        expect(pupil.teacher).to.equal(teacherId);
        done();
      });
  });

});
