# First Test

Ok now it's time to make our first test.  Create a new file called `contact.spec.js`.  Test files typically "mirror" the files that they are testing.  Open up contact.spec.js and type this:
```
const expect = require('chai').expect;
const Contact = require('./contact.js');

describe('A Contact', function () {
  it('creates a contact', function () {
    Contact.Create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {
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

The describe and it blocks are both part of mocha.  Describe has no purpose other than to group a set of related tests and to describe what makes them related.  We'll be nesting describe blocks later (and this will make more sense then).

Now we've set up a test that should fail, because there is no code yet for creating a contact.  Run the test and see what happens (it's a little surprising).