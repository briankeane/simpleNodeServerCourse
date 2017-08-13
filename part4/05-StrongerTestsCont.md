# Stronger Tests (continued)

Go ahead and try to adapt all of `contact.api.spec.js` in the same way that we just adapted `contact.spec.js`.  You need to:

1. Change the beforeEach blocks to use our new `clearAll` function and our new method for creating seed data.

2. Anywhere you see an 'id' referred to literally, replace it with a reference to the proper contact in the array's id.  Don't forget to change it in your `params`, too (for instance, in 'GETs a contact if it exists' you should change `.get('/contacts/3')` to `.get(\`/contacts/${savedContacts[2].id}\`)

After you're done, run `npm test` and make sure your tests still work.  (Don't forget to move the `.only` from `contact.spec.js` so the right tests are running.)

Solution below:
```
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// scroll for solution
//
//
//
//
//
//
//
//
//
//
//
//
// 
const app = require('../server.js');
const request = require('supertest');

const expect = require('chai').expect;
const Contact = require('./contact.js');

describe('/contacts', function () {
  var savedContacts;
  beforeEach(function (done) {
    Contact.clearAll(function (err) {
      Contact.create({
                       name: 'bob',
                       email: 'bob@bob.com'
                    }, function (err, savedContact0) {
        Contact.create({
                       name: 'sam',
                       email: 'sam@sam.com'
                    }, function (err, savedContact1) {
          Contact.create({
                       name: 'bill',
                       email: 'bill@bill.com'
                    }, function (err, savedContact2) {
            Contact.create({
                       name: 'bob',
                       email: 'bob@bob.com'
                    }, function (err, savedContact3) {
              Contact.create({
                       name: 'bill',
                       email: 'bill@bill.com'
                    }, function (err, savedContact4) {
                savedContacts = [
                                  savedContact0,
                                  savedContact1,
                                  savedContact2,
                                  savedContact3,
                                  savedContact4
                                ];
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('GET /contacts/:id', function () {
    it ('GETs a contact if it exists', function (done) {
      request(app)
        .get(`/contacts/${savedContacts[2].id}`)
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            expect(res.body.name).to.equal('bill');
            expect(res.body.email).to.equal('bill@bill.com');
            expect(res.body.id).to.equal(savedContacts[2].id);
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
    it ('creates a new contact', function (done) {
      request(app)
        .post('/contacts')
        .send({ name: 'sue', email: 'sue@sue.com' })
        .expect(201)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            expect(res.body.name).to.equal('sue');
            expect(res.body.email).to.equal('sue@sue.com');
            expect(res.body.id).to.exist;

            Contact.findById(res.body.id, function (err, foundContact) {
              expect(foundContact.name).to.equal('sue');
              expect(foundContact.email).to.equal('sue@sue.com');
              expect(foundContact.id).to.equal(res.body.id);
              Contact.find({}, function (err, allContacts) {
                expect(allContacts.length).to.equal(6);
                done();
              });
            });
          }
        });
    });
  });

  describe('PUT /contacts/:id', function () {
    it ('returns 404 if the provided id does not exist', function (done) {
      request(app)
        .put('/contacts/999')
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

    it('modifies a contact', function (done) {
      request(app)
        .put(`/contacts/${savedContacts[2].id}`)
        .send({ email: 'newEmail@newEmail.com', name: 'newName' })
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            // check the response body
            expect(res.body.name).to.equal('newName');
            expect(res.body.email).to.equal('newEmail@newEmail.com');
            expect(res.body.id).to.equal(savedContacts[2].id);
            
            // now make sure it got changed on the server
            Contact.findById(savedContacts[2].id, function (err, foundContact) {
              expect(foundContact.name).to.equal('newName');
              expect(foundContact.email).to.equal('newEmail@newEmail.com');
              expect(foundContact.id).to.equal(savedContacts[2].id);
              done();
            });
          }
        });
    });
  });

  describe('DELETE /contacts/:id', function () {
    it ('returns 404 if the provided id does not exist', function (done) {
      request(app)
        .delete('/contacts/999')
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
    
    it ('deletes a contact', function (done) {
      request(app)
        .delete(`/contacts/${savedContacts[2].id}`)
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            // check the response body
            expect(Contact.contacts.length).to.equal(4);
            Contact.find({}, function (err, allContacts) {
              var ids = allContacts.map((contact) => contact.id);
              expect(ids).to.not.contain(savedContacts[2].id);
              done();
            });
          }            
        });
    });
  });

  describe('GET /contacts', function () {
    it ('gets all the contacts', function (done) {
      request(app)
        .get('/contacts')
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            var results = res.body;
            expect(results.length).to.equal(5);
            
            // check the first results to make sure it worked.
            // We may want to change the order later, so that's why
            // we are just checking for existence here.
            expect(results[0].name).to.exist;
            expect(results[0].email).to.exist;
            expect(results[0].id).to.exist;

            // now make sure it got them all with no duplicates
            var ids = results.map((result) => result.id);
            expect(ids).to.contain(savedContacts[0].id);
            expect(ids).to.contain(savedContacts[1].id);
            expect(ids).to.contain(savedContacts[2].id);
            expect(ids).to.contain(savedContacts[3].id);
            expect(ids).to.contain(savedContacts[4].id);
            done();
          }
        });
    });
  });

  describe('GET /search', function (done) {
    it ('searches by name', function (done) {
     request(app)
        .get('/contacts/search')
        .query({ name: 'bob' })
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            var results = res.body.results;
            expect(results.length).to.equal(2);
            var ids = results.map((contact) => contact.id);
            expect(ids).to.contain(savedContacts[0].id);
            expect(ids).to.contain(savedContacts[3].id);
            done();
          }
      });
    });

    it ('searches by name continued', function (done) {
        request(app)
        .get('/contacts/search')
        .query({ name: 'sam' })
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            var results = res.body.results;
            expect(results.length).to.equal(1);
            expect(results[0].id).to.equal(savedContacts[1].id);
            done();
          }
        });
    });
  });

    it ('searches by email', function (done) {
      request(app)
        .get('/contacts/search')
        .query({ email: 'bob@bob.com' })
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            console.log(res.body);
            var results = res.body.results;
            expect(results.length).to.equal(2);
            var ids = results.map((contact) => contact.id);
            expect(ids).to.contain(savedContacts[0].id);
            expect(ids).to.contain(savedContacts[3].id);
            done();
          }
        });
    });

    it ('searches by email continued', function (done) {
      request(app)
        .get('/contacts/search')
        .query({ email: 'sam@sam.com' })
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            var results = res.body.results;
            expect(results.length).to.equal(1);
            expect(results[0].id).to.equal(savedContacts[1].id);
            done();
          }
        });
    });

  it ('searches by both name and email', function (done) {
    Contact.create({ name: 'bob@bob.com', email: 'totallyDifferentEmail@different.com' }, function (err, createdContact) {
      request(app)
        .get('/contacts/search')
        .query({ email: 'bob@bob.com', email: 'totallyDifferentEmail@different.com' })
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            var results = res.body.results;
            expect(results.length).to.equal(1);
            expect(results[0].id).to.equal(createdContact.id);
            done();
          }
        });
    })
  });
});

```