/* global api, describe, it, beforeEach afterEach */

require('../helper');

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const { teacherData, yeildPupils } = require('../seedData');

const Teacher = require('../../../models/teacher');
const Pupil = require('../../../models/pupil');

describe('DELETE /api/pupils/:id', () => {
  let token = null;
  let pupil = null;

  afterEach(done => {
    Teacher.collection.remove();
    Pupil.collection.remove();
    done();
  });

  beforeEach(done => {
    Teacher
      .create(teacherData)
      .then(teachers => {
        token = jwt.sign({teacherId: teachers[0].id }, secret, { expiresIn: '1hr'});
        Pupil
          .create(yeildPupils(teachers[0].id, teachers[1].id))
          .then(pupils => {
            pupil = pupils[0];
            done();
          });
      });
  });

  it('should return a 204 response', function(done) {
    api
      .delete(`/api/pupils/${pupil.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(204, done);
  });

  it('should return a 401 response without a token', function(done) {
    api
      .delete(`/api/pupils/${pupil.id}`)
      .set('Accept', 'application/json')
      .expect(401, done);
  });

});
