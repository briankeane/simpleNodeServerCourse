# First Test

Ok now it's time to make our first test.  Mocha will look for and run any file that ends with `.spec.js`, so create a new file called `contact.spec.js`. Open it up and type this:
```
const expect = require('chai').expect;
const Contact = require('./contact.js');

describe('A Contact', function () {
  it('creates a contact', function () {
    Contact.create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {
      expect(createdContact.name).to.equal('bob');
      expect(createdContact.email).to.equal('bob@bob.com');
    });
  });
});
```
Here's what's going on there:

The line `const expect = require('chai').expect;` imports the `expect` function into our test file.  We don't need the entire Chai library -- all we care about is the expect function so we don't even bother saving chai.  (We could do it like this: )
```
const chai = require('chai');
const expect = chai.expect;
```

Then we import our ContactHandler with the next line, assigning it the name Contact with a capital 'c' -- this is also a convention when you're dealing with "models."  A Class will be capitalized, an "instance" will be lowercase (like the createdContact instance above).

The describe and it blocks are both part of mocha.  

Describe has no purpose other than to provide a string describing the group of 'it' blocks it contains.  Things like: 'A User', or 'GET /contacts/:id'.

The 'it' block contains the actual test.  The three steps of testing are:
  1. set up the environment
  2. run the code that's being tested
  3. check the environment to make sure that:
    a. what we wanted to change has changed
    b. anything that may have accidentally been changed has remained the same.

We don't really need any setup code because we're creating a contact, so the app's initial state is perfect.  Then we run the code we are testing with the `Contact.create` line.  Finally, we check the environment again to make sure that a new record was created and that it contains the information we wanted it to.

Logically, this test should fail because we have no code in our Contact.Create function -- but run the test with `npm test` and see what happens (it's a little surprising).