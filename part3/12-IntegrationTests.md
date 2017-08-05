## Integration Tests

Now it's time to refactor `server.js` so that it uses our new contact.js file.  This is not too big a file, so we could do the entire thing with Postman and get away with it.  But it's much easier if we first add integration tests.

To me, integration tests are much, much more helpful than the unit tests we just build.  Unit tests call a small piece of the code and make sure that the small piece we're calling works exactly like we think it does.  In a unit test, we make sure that no other code is run except the code that is being tested.  If it talks to any other code within our app, we fake that interaction (we'll get to that later).  As a result, these tests break a lot.  If you're not careful you end up spending as much time maintaining your tests as you do building or editing your old code.

Integration tests are different though -- they set up the database in some way and then make calls to the api exactly like an outside machine would do.  We do not fake any communication within the app.  When you have integration tests you can feel very secure because no matter how much you change the guts of the code (changing databases, switching out entire modules, etc) as long as the integration tests pass you know that nothing is broken.

It's kind of a pain to add all these tests afterwards, so this won't be quite as useful as if we'd started with them from the beginning, but I wanted you to see how it is developing with Postman so you can see the advantage of automating that process.

Ok!  I like to call my integration test files `[endpoint].api.spec.js` (because they are testing the api), so in the terminal type `touch contact.api.spec.js`.  Also remove any remaining `.only`s from contact.spec.js.  Make a new describe block with the same setup code that we were using before:

contact.api.spec.js:
```
const expect = require('chai').expect;
const Contact = require('./contact.js');

describe.only('/contacts', function () {
  beforeEach(function () {
    Contact.contacts = [
                          {
                            name: 'bob',
                            email: 'bob@bob.com',
                            id: 1
                          },
                          {
                            name: 'sam',
                            email: 'sam@sam.com',
                            id: 2
                          },
                          {
                            name: 'bill',
                            email: 'bill@bill.com',
                            id: 3
                          },
                          {
                            name: 'bob',
                            email: 'bob@bob.com',
                            id: 4
                          },
                          {
                            name: 'bill',
                            email: 'bill@bill.com',
                            id: 5
                          }
                        ];
    Contact.contactsID = 6;
  });
});
```