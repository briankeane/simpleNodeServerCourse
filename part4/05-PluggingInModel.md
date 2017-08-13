# Plugging In the Model

Ok -- that's a lot to digest.  What's important to internalize is how we're aiming for flexibility in the tests.  Now that you know how testing works in general, from here on out we'll actually write the tests to be more flexible.

We could go a step further and replace any tests for string literals with references to the original seed objects.  For example, instead of saying:
```
  expect(res.body.email).to.equal('bob@bob.com');
```
we should say
```
  expect(res.body.email).to.equal(savedContacts[0].email);
```

That statement will always be true even if we need to drastically change our seed data for some reason.  Any time you 'break' a test with a change to implementation, it's best to take a look at how you structured the test in the first place and see if there was a way to do it without breaking the test.  That way in the future you can spend more time writing code instead of adapting tests.

Ok time to really test things out!  Open move your `.only` back to the top of `contact.spec.js`.  Then change in `contact.spec.js` change the line:
```
const Contact = require('./contact.js');
```
to 
```
const Contact = require('./contact.model.js');
```
Run `npm test` and check out the error you get:

```
1) A Contact find "before each" hook for "finds by name":
     TypeError: Contact.clearAll is not a function
```

If this were a bigger app, then this would be a VERY useful error, because it would tell us that we've forgotten a function on our interface.  In other words, our `contact.model.js` does not appear to the rest of the code to be functioning exactly like `contact.js`.  Let's add our `clearAll` function to `contact.model.js`.  


The way we add a class method to a mongoose model is a little different from how we add it to a constructor object.  It's just a different syntax you have to use in mongoose -- no need to memorize it because you can always google it or look for an example in your own code (that's what I did for this tutorial).

Type this just above the `const Contact = mongoose.model('Contact', ContactSchema);` line.
```
ContactSchema.statics.clearAll = function (callback) {
  this.find({}).remove(function (err) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null);
    }
  });
};
```
As you can see, we're building a function that looks to outside code exactly like the clearAll function in `contact.js`, so we're preserving our "interface."  This function just "wraps" the mongo syntax -- telling mongo to find and remove all the models.  Save that file and run your tests again.

You should have only one failure for `removes by id`.  This is what's amazing about having good, strong, non-brittle tests.  Changing `contact.model.js` was a huge change to our app -- we completely unplugged our old implementation and plugged in a new one, but because we have strong tests we were able to know that only two small pieces of the interface were broken: `remove` and `clearAll`.  Next we'll fix remove.