# API Tests Continued

The first test I have failing now is:
```
 1) /contacts GET /contacts/:id returns 404 if id not found:
     Error: expected 404 "Not Found", got 500 "Internal Server Error"
```

Put a `.only` in front of this test and see what happens.  We get the useful error:
```
Example app listening on port 3000!
  /contacts
    GET /contacts/:id
{ MongooseError: Cast to ObjectId failed for value "999" at path "_id"
```

Mongoose requires a specific type of hex string as an id.  If it doesn't receive that type of string, it throws an error.  What we need is a way to get a genuine looking `id` that doesn't match anything in our db.

Fortunately, mongoose provides an id generator.  Lets provide that in our model so that if we change databases or something, we can just replace that generateID code instead of changing our tests.

In `contact.model.js` add this function:
```
ContactSchema.statics.generateID  = function () {
  return mongoose.Types.ObjectId();
};
```

That just gives us a new, unused mongoose id.  Let's use our new function in our tests anywhere that we need a fake id.  (The two 404 tests).
```
    it('returns 404 if id not found', function (done) {
      request(app)
        .get(`/contacts/${Contact.generateID()}`)
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

// and

    it ('returns 404 if the provided id does not exist', function (done) {
      request(app)
        .put(`/contacts/${Contact.generateID()}`)
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

// and
    it ('returns 404 if the provided id does not exist', function (done) {
      request(app)
        .delete(`/contacts/${Contact.generateID()}`)
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
Now remove the `.only` and run `npm test`.  Back down to 2 errors!
