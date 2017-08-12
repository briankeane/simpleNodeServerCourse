# First Test Continued

So why did that test pass?  The answer is because we have an asyncronous function in our test.  The test-runner does not fail the test because it does not know to wait for the async function to return.

In our contact.spec.js file:
```
describe('A Contact', function () {                 // line 1
  it('creates a contact', function () {             // line 2
    Contact.create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {   // line 3
      expect(createdContact.name).to.equal('bob');        // line 4
      expect(createdContact.email).to.equal('bob@bob.com');    // line 5
    });          // line 6
  });            // line 7
});
```

Something about async coding that is difficult to get used to is that lines 4 and 5 will not get executed until later -- for now we are just passing them to the Contact.create function and Contact.create is storing the function until it's done with whatever it is doing.

Mocha runs line 3, which stores lines 4 and 5 for later use but does not execute them.  With lines 4-6 stored, the next line to execute is line 7, which is the end of our test function.  Mocha reaches the end of the test function and assumes that the tests passed because no test has failed yet.

Check out what happens if we put a failing test just after we've loaded the callback into memory.

```
describe('A Contact', function () {                 // line 1
  it('creates a contact', function () {             // line 2
    Contact.create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {   // line 3
      expect(createdContact.name).to.equal('bob');        // line 4
      expect(createdContact.email).to.equal('bob@bob.com');    // line 5
    });          // line 6
    expect(true).to.equal(false);
  });            // line 7
});
```

What we need to do is to tell mocha to wait for those expectations to run.  Mocha provides us with a special callback function called `done()` for async functions to tell mocha when the last line of code that we want to test has been run.  If we provide the callback, mocha continues to 'listen' for test failures until `done()` is executed -- instead of stopping with the end of the function.  All we have to do is pass `done` as an argument to our `it` block (line 2), and then call it after our final test (the new line 6).


```
describe('A Contact', function () {
  it('creates a contact', function (done) {       // THIS LINE IS DIFFERENT
    Contact.create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {
      expect(createdContact.name).to.equal('bob');
      expect(createdContact.email).to.equal('bob@bob.com');
      done();         // AND THIS LINE SAYS WE'RE FINISHED
    });
  });
});
```

Now run the test and get a proper failure.  

Every time you create a new test, it's a good idea to run the test while you know it should fail and make sure that you actually see it fail before you write any code.  That way you can be sure that it's the new code that's making it pass instead of some kind of fluke in your testing setup.