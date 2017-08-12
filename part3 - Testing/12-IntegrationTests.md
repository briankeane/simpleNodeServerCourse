## Integration Tests

Now it's time to refactor `server.js` so that it uses our new contact.js file.  Instead of using Postman we're going to build some 'integration tests' to make requests in exactly the same way Postman does.  We start a server, send the actual request from outside the app, and then check to see if we got the right response and if the environment was changed correctly.

Up until now we have been building 'unit' tests.  Unit tests are designed to test ONLY the small section of code that you are working on.  In a unit test, you design the test so that no other code executes except the code that you are working on.

An integration test, you hit an endpoint and you let ALL the code in your app run.  Then you test the response body and make sure the environment changed properly. Since you let the entire app function, you can change the way things are done internally without having to change the integration tests.

Normally you write the unit tests at the same time as when you are building the code, so it may not be obvious until later how much making integration tests speeds up the development process.. but even though you are writing twice as much code (source code and test code) the fact that you never have to open up Postman makes it much faster overall to code with tests.

Ok let's start!  I like to call my integration test files `[endpoint].api.spec.js` (because they are testing the "api" -- the interface with the outside world). In the terminal type `touch contact.api.spec.js`.  Also remove any remaining `.only`s from contact.spec.js.  Make a new describe block with the same setup code that we were using before:

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