# Put Contact

Now you need to do a put request.  Checking for a 404 when the address is wrong is easy -- we don't even need an expectation because supertest checks the status code for us.  Go ahead and fill that one in, remembering to change .get or .post to .put in the supertest call.

Next you'll want to write a successful PUT /contacts/:id call.  Pick a contact and modify the email and name.  Then verify that the changes occured in the res.body and on the server.

When you've finished writing the test, move the .only and make it pass!

Solutions below:
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

    it('modifies a contact', function (done) {
      request(app)
        .put('/contacts/3')
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
            expect(res.body.id).to.equal(3);
            
            // now make sure it got changed on the server
            Contact.findById(3, function (err, foundContact) {
              expect(foundContact.name).to.equal('newName');
              expect(foundContact.email).to.equal('newEmail@newEmail.com');
              expect(foundContact.id).to.equal(3);
              done();
            });
          }
        });
    });

```

new `server.js` endpoint:
```
app.put('/contacts/:id', function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (foundContact) {
      foundContact = Object.assign(foundContact, req.body);
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
});

```