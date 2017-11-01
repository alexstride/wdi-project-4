/* global api, describe, it, expect, beforeEach afterEach */

require('../helper');

const { teacherData, yeildPupils } = require('../seedData');

const Teacher = require('../../../models/teacher');
const Pupil = require('../../../models/pupil');

describe('get /api/pupils/:id', () => {
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
        Pupil
          .create(yeildPupils(teachers[0].id, teachers[1].id))
          .then(pupils => {
            pupil = pupils[0];
            done();
          });
      });
  });

  it('should return a 200 response', function(done) {
    api
      .get(`/api/pupils/${pupil.id}`)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an object', function(done){
    api
      .get(`/api/pupils/${pupil.id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get(`/api/pupils/${pupil.id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        const pupilObj = res.body;
        expect(pupilObj.id).to.be.a('string');
        expect(pupilObj.password).to.be.undefined;
        expect(pupilObj.firstname).to.equal(pupil.firstname);
        expect(pupilObj.lastname).to.equal(pupil.lastname);
        expect(pupilObj.email).to.equal(pupil.email);
        expect(pupilObj.teacher).to.equal(pupil.teacher.toString());
        done();
      });
  });
});
