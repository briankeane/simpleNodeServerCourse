## Supertest

For our integration tests, we're going to use a an outside library called "supertest" that makes actual /GET /PUT /POST /DELETE requests to our app.

In the terminal type: `npm install --save-dev supertest`.

Then at the top of our new contact.api.spec.js file, add this:
```
const app = require('./server.js');
const request = require('supertest');
```
We also need to give supertest access to our app, so we've got to expose it in server.js.  At the bottom of server.js, add this line:
```
module.exports = app;
```

I like to store supertest in a variable called 'request' because whenver we call it we are making a request, so it's easy to read in the test file.  In our integration tests, we pass our app to supertest and supertest will start our app send it whatever requests we specify.  For our first test/ let's check the GET /contacts/:id endpoint and make sure it returns the correct contact info.

```
  describe('GET /contacts/:id', function () {
    it ('404s if not found', function (done) {
      request(app)
        .get('/contacts/3')       // GET request to /contacts/:id with 999 as id
        .expect(200)                // EXPECT it to 
        .end(function(err, res){
          if(err) {
            // this will only execute if you are getting the wrong
            // status code
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
  });
```

Now run the code.. it will fail because our setup code sets up the Contact.contacts array, and we don't have that plugged into our GET function yet.  Go ahead and require our new Contact at the top of server.js.  

Then you can replace the code in app.get('/contacts/:id') with a call to Contact.findById(Number(req.params.id), function (err, foundContact))...  See if you can get the test to pass with the new setup.  Solution Below:
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
//     Scroll for solution
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

app.get('/contacts/:id', function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (foundContact) {
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
});
```