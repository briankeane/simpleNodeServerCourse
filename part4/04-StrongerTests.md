# Stronger Tests

When we created our tests, we were just getting to know how mocha worked, and as a result are tests are what we call 'brittle', meaning that if we actually have more code to change in our tests than in our implementation.  Ideally, we'd want our tests to completely work no matter how things are implemented behind the scenes.

The biggest issue with our tests is that we directly set the `contacts` array in our setup.  That means all of our setup code relies on us having a contacts array, and since we won't have that array anymore, we need to change our setup to reflect that.

First -- we're missing something in our `contact.js` file that we need -- we don't have any way to clear all contacts.  Open up `contact.js` and add this function:

```
  this.clearAll = function (callback) {
    self.contacts = [];
    self.contactsID = 1;
    callback(null);
  };
```

Now our tests can call `clearAll()` no matter what the internal implementation is.

Open up `contact.spec.js` and replace the beforeEach block with this:
```
 describe('find', function () {
    var savedContacts;
    beforeEach(function (done) {
      Contact.clearAll(function (err) {
        Contact.create({
                         name: 'bob',
                         email: 'bob@bob.com'
                      }, function (err, savedContact0) {
          Contact.create({
                         name: 'sam',
                         email: 'sam@sam.com'
                      }, function (err, savedContact1) {
            Contact.create({
                         name: 'bill',
                         email: 'bill@bill.com'
                      }, function (err, savedContact2) {
              Contact.create({
                         name: 'bob',
                         email: 'bob@bob.com'
                      }, function (err, savedContact3) {
                Contact.create({
                         name: 'bill',
                         email: 'bill@bill.com'
                      }, function (err, savedContact4) {
                  savedContacts = [
                                    savedContact0,
                                    savedContact1,
                                    savedContact2,
                                    savedContact3,
                                    savedContact4
                                  ];
                  done();
                });
              });
            });
          });
        });
      });
    });
```

We are using Contact itself to create the seed data.  We create each contact, one at a time, and store it in our new savedContacts array (which we declare outside the beforeEach scope so that our `it` blocks can also see and access it.)

With this code, it doesn't matter whether our implementation uses an array or a database or a local file or whatever.  As long as our 'interface' remains the same, our setup code will not break.

Notice, also, that we are no longer hard-coding the ids into the tests -- instead we are allowing `Contact.create` to provide us with an id.  That means we don't know exactly what an id will be anymore.

Let's replace every expectation in `contact.spec.js` where we check the id against our new savedContacts.  For example, `'finds by name'` should now look like this:
```
    it ('finds by name', function (done) {
      Contact.find({ name: 'bob' }, function (err, foundContacts) {
        expect(foundContacts.length).to.equal(2);
        var ids = foundContacts.map((contact) => contact.id);
        expect(ids).to.contain(savedContacts[0].id);
        expect(ids).to.contain(savedContacts[3].id);

        Contact.find({ name: 'sam' }, function (err, otherFoundContacts) {
          expect(otherFoundContacts.length).to.equal(1);
          expect(otherFoundContacts[0].id).to.equal(savedContacts[1].id);
          done();
        });
      });
    });
```

That way, 'id' can be anything -- a number, a string, a timestamp, whatever -- and if our implementation of 'id' changes it won't break our tests.

Go ahead and make that same correction to:

  1. finds by email
  2. removes by id -- (don't forget to change the calls to `remove`. Also you'll have to replace `Contact.contacts.length` with a call to `Contact.find({}, function (err, allContacts) {})`.
  3. finds by id -- (also change the call to findById)

Full revised `contact.spec.js` below.  After you're done, put a `.only` in front of the top describe block and run `npm test` to makesure our tests still work.


