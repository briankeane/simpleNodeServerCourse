# First Test Continued

So why did that test pass?  The answer is because we have an asyncronous function in our test.  The test-runner does not fail the test because it does not know to wait for the async function to return.

In our contact.spec.js file:
```
describe('A Contact', function () {                 // line 1
  it('creates a contact', function () {             // line 2
    Contact.Create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {   // line 3
      expect(createdContact.name).to.equal('bob');        // line 4
      expect(createdContact.email).to.equal('bob@bob.com');    // line 5
    });          // line 6
  });            // line 7
});
```

Execution of the test starts with line 9.  Remember that calling the async function means... "when you're done... perform this callback."  That means after passing the callback, this function is done executing.  It skips to line 7, finds the end of the function, and returns.  It does not wait for the callback to be executed.

You can tell that this is what's happening if you add a failing expectation after the callback function, like this:
```
describe('A Contact', function () {                 // line 1
  it('creates a contact', function () {             // line 2
    Contact.Create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {   // line 3
      expect(createdContact.name).to.equal('bob');        // line 4
      expect(createdContact.email).to.equal('bob@bob.com');    // line 5
    });          // line 6
    expect(true).to.equal(false);
  });            // line 7
});
```

Fortunately it's easy to tell mocha to wait for a callback. We do that with the "done()" callback.  If a test is syncronous, you leave the argument in "it"'s callback empty.  To tell mocha that a test is async, pass a "done" argument to the "it" function, and call it when you're finished.  (I know that's a mouthful... just look at this example).
```
describe('A Contact', function () {
  it('creates a contact', function (done) {       // THIS LINE IS DIFFERENT
    Contact.Create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {
      expect(createdContact.name).to.equal('bob');
      expect(createdContact.email).to.equal('bob@bob.com');
      done();         // AND THIS LINE SAYS WE'RE FINISHED
    });
  });
});
```

Now run the test and get a proper failure.  Every time you create a new test, it's a good idea to run the test and see it fail before you write any code to make it pass.  That way you can be sure that it's YOUR new code that's making it pass instead of some kind of fluke.