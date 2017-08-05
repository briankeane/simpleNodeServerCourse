# Planning the Tests

Ok -- let's go ahead and add a skeleton of all the rest of the tests we'll need.  You can just copy/paste from below.  Something to notice: some of the tests that have not been written yet start with `xit` instead of `it`.  The `x` tells mocha to ignore that test for now.

```
const app = require('./server.js');
const request = require('supertest');

const expect = require('chai').expect;
const Contact = require('./contact.js');

describe.only('/contacts', function () {
  beforeEach(function () {
    Contact.contacts = [
                          {
                            name: 'bob',
                            email: 'bob@bob.com',
                            id: 1
                          },
                          {
                            name: 'sam',
                            email: 'sam@sam.com',
                            id: 2
                          },
                          {
                            name: 'bill',
                            email: 'bill@bill.com',
                            id: 3
                          },
                          {
                            name: 'bob',
                            email: 'bob@bob.com',
                            id: 4
                          },
                          {
                            name: 'bill',
                            email: 'bill@bill.com',
                            id: 5
                          }
                        ];
  });

  describe('GET /contacts/:id', function () {
    it ('GETs a contact if it exists', function (done) {
      request(app)
        .get('/contacts/3')
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            expect(res.body.name).to.equal('bill');
            expect(res.body.email).to.equal('bill@bill.com');
            expect(res.body.id).to.equal(3);
            done();
          }
        });
    });

    it('returns 404 if id not found', function (done) {
      request(app)
        .get('/contacts/999')
        .expect(404)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            done();
          }
        });
    });
  });

  describe('POST /contacts', function () {
    xit ('creates a new contact', function (done) {
      done();
    });
  });

  describe('PUT /contacts/:id', function () {
    xit ('returns 404 if the provided id does not exist', function (done) {
      done();
    });

    xit('modifies a contact', function (done) {
      done();
    });
  });

  describe('DELETE /contacts/:id', function () {
    xit ('returns 404 if the provided id does not exist', function (done) {
      done();
    });
    
    xit ('deletes a contact', function (done) {
      done();
    });
  });

  describe('GET /contacts', function () {
    xit ('gets all the contacts', function (done) {
      done();
    });
  });

  describe('GET /search', function (done) {
    xit ('searches by email', function (done) {

    });

    xit ('searches by name', function (done) {

    });

    xit ('searches by both name and email', function (done) {

    });
  });
});

```