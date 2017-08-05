## Create Contacts

Let's start with the first test.  Put a `.only` on the `it` function for 'creates a new contact' so that we can isolate the test while we work on it.

Since this is our first `POST` test with supertest, I'll just include the supertest function call so you can see what it looks like:

```
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
            done();
          }
        });
    });
```

You can see that to send a `POST` instead of a `GET` we just change the first line after `request(app)` to `.post('/contacts')`.  The POST body gets included with `.send({ name: 'sue', email: 'sue@sue.com' })`.

Now you'll want to check these things under the `} else {` line and before you call `done()`.

1. res.body.name
2. res.body.email
3. res.body.id (exists)

Then we need to make sure that the POST actually changed the data on our server.  For that, find the new contact on the server and check:

1. name
2. email
3. id

Finally, check the length of the Contact.contacts array and make sure it increased by 1.  Make the test and then use it to fix that endpoint inside of server.js.

Scroll down for the solution.
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
//
//
//
//
//
//
//
//
//

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
              expect(Contact.contacts.length).to.equal(6);
              done();
            });
          }
        });
    });
```

new `server.js` endpoint
```
app.post('/contacts', function (req, res) {
  Contact.Create(req.body, function (err, createdContact) {
    res.status(201).send(createdContact);
  });
}); 
```