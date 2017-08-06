# Search Contacts

I realized that I have accidentally been including the route `/search` instead of the correct route `/contacts/search`, so go ahead and make that change in the server.js file.  (change `app.get('/search', ...)` to `app.get('/contacts/search', ...)`).

This small change caused the biggest 'gotcha' I've found in the code so far -- but it also illuminates how useful tests really are.

Go ahead and build the 'search by name' test first.  You can use our unit find test in contact.spec.js as a template for the search terms and what to test for.  Scroll down when you're ready, but know that you are likely to get a 404 instead of a 200 for these api calls, and it's a difficult one to figure out...  I'll tell you why below:

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
//
//
//
//
//
//
//

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
            expect(ids).to.contain(1);
            expect(ids).to.contain(4);
            done();
          }
      });
    });
```

So why do we keep getting a 404?  Look inside of our `server.js` file... The order tha the routes are listed in matters because express will stop looking once it finds a match.  In this case, `/contacts/:id` is a match -- our app thinks we are trying to GET a contact with an id of "search".

You can see that the GET code is being executed if you put a console.log in our GET code:
```
app.get('/contacts/:id', function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (foundContact) {
      return res.status(200).send(foundContact);
    }
    console.log('YOU ARE INSIDE GET/:ID FUNCTION');
    return res.status(404).send({ message: 'contact not found'});
  });
});
```

This is a very confusing situation and it took me a good 10 minutes to figure it out.  But it probably would have taken me an hour if I had to keep rebuilding the environment with Postman.

To fix this, all we have to do is move our app.get('/contacts/search') function up above the app.get('/contacts/:id') function.  This is a case where a test tells us quickly that something unexpected has broken, whereas without tests we'd have to use Postman to check it manually.

Go ahead and finish up the rest of the search tests.  Here's mine below with an extra couple tests for email and name searches.
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
            expect(ids).to.contain(1);
            expect(ids).to.contain(4);
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
            expect(results[0].id).to.equal(2);
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
            expect(ids).to.contain(1);
            expect(ids).to.contain(4);
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
            expect(results[0].id).to.equal(2);
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
```
and `server.js`:
```
app.get('/contacts/search', function (req, res) {
  console.log('here');
  Contact.find(req.query, function (err, results) {
    return res.status(200).send({ results: results });
  });
});
```