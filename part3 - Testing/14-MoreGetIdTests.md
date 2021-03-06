# More Get Tests

Ok now let's finish our get tests.  When the id is not found, we want to receive a 404:
```
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
```

We don't need any `expect`s because supertest is checking for us in the line `.expect(404)`.

That's all the tests we need for our /contacts/:id endpoint!  

Not only were these integration tests useful for running our code over and over while we built it, but also now we can leave these tests in place and later if we decide to make drastic changes to how we store contacts (storing in a db, changing the type of db, etc...) as long as these pass we know that this endpoint is doing ok.  (Although we may have to change the beforeEach block for how we set up the environment).

Now commit your changes!