# API Tests cont.

I'm sure by now this is a tiring process... The good news is that we just made a major change to our code, and the tests are telling us exactly what code was affected by those changes, without us having to guess and run Postman over and over.  But making a major project change is never fun. Luckily this is the last big change we'll have to do.

The other thing is that the pattern with a large change is that typically at first the errors are a little difficult, and then they get gradually easier and easier as you eliminate them.

So let's continue!  The next one I've got is:
```
  1) /contacts searches by email continued:
     Uncaught AssertionError: expected '598e3181d1bf1c5affcf3ae9' to equal 2
      at Test.<anonymous> (server/contact/contact.api.spec.js:305:38)
```
Easy enough -- the bad line is `expect(results[0].id).to.equal(2);` where `2` needs to be an id.  Change it to `expect(results[0].id).to.equal(savedContacts[1].id);`.  Now run the test again and it should pass!

The next test:
```
/contacts GET /contacts/:id GETs a contact if it exists:
     Error: expected 200 "OK", got 500 "Internal Server Error"
      at Test._assertStatus (node_modules/supertest/lib/test.js:266:12)
```

If you look at GETs a contact if it exists, you'll see 2 obvious errors.  `.get('/contacts/3')` instead of:
```
.get(`/contacts/${savedContacts[2].id}`);

and 

```
expect(res.body.id).to.equal(3);
```
instead of 
```
expect(res.body.id).to.equal(savedContacts[2].id);
```

2 down!

```
1) /contacts GET /contacts/:id returns 404 if id not found:
     Error: expected 404 "Not Found", got 500 "Internal Server Error"
```
This one is tougher -- go ahead and run it with a `.only` and take a closer look at the error that is logged.

We're passing `999` as the id, but the error that we're getting is `MongooseError: Cast to ObjectId failed for value "999" at path "_id"`.  A mongoose _id is a hex string of a certain length, and when it doesn't get a valid mongoose id to search for mongoose puts an error in the callback instead of saying 'not found'.  What we need is a valid mongoose ID string to pass into the test that doesn't exist yet.

Fortunately mongoose has an easy way to do this.  At the top of `contact.api.spec.js` add: `const mongoose = require('mongoose');`.  Then in our test replace `.get('/contacts/999')` with:
```
  .get(`/contacts/${mongoose.Types.ObjectId()}`)
```

1 more Down!

The next one I have is:
```
1) /contacts POST /contacts creates a new contact:
     Uncaught TypeError: Cannot read property 'length' of undefined
      at server/contact/contact.api.spec.js:107:38
```
You should tackle this one.  What's wrong with `expect(Contact.contacts.length).to.equal(6)` and how can we fix the test?

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
              Contact.find({}, function (err, allContacts) {
                expect(allContacts.length).to.equal(6);
                done();
              });
            });
          }
        });
    });
```