# API Tests

Ok now it's time to see what our api tests tell us about our implementation.  Go ahead and change require statements at the top of both `contact.api.spec.js` and `contact.controller.js` to use our new `model`.  Run the tests and see what happens!

And HOLY SHIT our app exploded!  10 test failures!

This feels terrible but it's actually OK.  We are getting the useful information that something is not at all what it seems to be.  Let's concentrate on them one at a time.

My first failure is:
```
/contacts searches by email
```
So put a `.only` in front of that test.  Since we already know something is wrong, let's add a `console.log(res.body);` statement just after the `} else {` statement, so that we can see the entire response body.  This usually clears a lot up right away.

```
    it.only ('searches by email', function (done) {
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
```

run the tests and check out the body.  You should immediately see the problem.
```
{ results:
   [ { _id: '5990a95a7decbf8c85b79019',
       name: 'bob',
       email: 'bob@bob.com',
       __v: 0 },
     { _id: '5990a95a7decbf8c85b7901c',
       name: 'bob',
       email: 'bob@bob.com',
       __v: 0 } ] }
```
We are getting back an `id` in each contact, but we're checking for an `id`!

While it is common convention to use '_id' internally, it is also common convention to proved `id` externally.  There's really no way for you to know that except to work on a few apps or ask somebody.

So what we want is to transform the way our object looks just at the last step as it's on the way out of our app.  We could do this individually in the controller, but luckily mongoose has a special method specifically for this purpose.

Open up `contact.model.js` and add this code:
```
var ContactSchema = new Schema({
  name:                 { type: String },
  email:                { type: String },
}, {
  toJSON: {
    transform: function (doc, ret) {
      return {
        message: 'hi'
      };
    }
  }
});
```
Again there's no way for you to know how to add this function or that it exists except to be told by someone or to read the docs.  If I didn't know how to do it, I'd probably google 'mongoose change api version from model' and click around until I found a solution.  There's no way to know the syntax without looking it up.

If you look at http://mongoosejs.com/docs/api.html under the "transform" section, you can see a description of what this is doing.  Basically, our model gets converted to a JSON object right before it gets sent (as part of `res.send` in our `contact.controller.js` file). 

Open up `contact.controller.js` and add a `console.log` to our `search` function so we can see the results before they are sent out:
```
module.exports.search = function (req, res) {
  Contact.find(req.query, function (err, results) {
    console.log('results:');
    console.log(results);
    return res.status(200).send({ results: results });
  });
};
```

Now run the tests and you'll get something like below:
```
Example app listening on port 3000!
  /contacts
results:
[ { _id: 5990abe17721a38cbb4201b1,
    name: 'bob',
    email: 'bob@bob.com',
    __v: 0 },
  { _id: 5990abe17721a38cbb4201b4,
    name: 'bob',
    email: 'bob@bob.com',
    __v: 0 } ]
GET /contacts/search?email=bob%40bob.com 200 21.404 ms - 47
{ results: [ { message: 'hi' }, { message: 'hi' } ] }
```

As you can see, our results look normal when we get them back from `find`, but they are "transformed" as they are being sent out through the api.

Now let's turn that into something useful.  Delete the console.logs and open up `contact.model.js` again.  Let's adapt the object so that it looks exactly the way we want.  The `ret` argument provides a javascript object that is what the transformation looks like by default.  We can just grab the properties we care about.
```
var ContactSchema = new Schema({
  name:                 { type: String },
  email:                { type: String },
}, {
  toJSON: {
    transform: function (doc, ret) {
      return {
        id: ret._id,
        email: ret.email,
        name: ret.name
      };
    }
  }
});
```
Now save it and run the test again.  It should pass!  Then delete the `console.log(res.body)` and remove the `.only`.  Run `npm test` again.  We're down to 3 failing tests.

So you can see, often you'll get a single issue that affects many tests.  These 3 failing tests also happen to be connected, so we're almost there.

