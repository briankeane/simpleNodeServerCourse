# Mongoose Models (cont. 2)

There's still a little bit of work we have to do to get our `contact.spec.js` file completely working with mongoose.  The main thing we need to do is change how we set up the saved contacts, since we are no longer using the contacts array.  Lets change the beforeEach under the `describe('find'` block:
```
 describe('find', function () {
    var savedContacts;
    beforeEach(function (done) {
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
```

The first thing we do is declare an empty variable called `savedContacts` immediately under the describe block, but before the beforeEach block.  This is so that both the beforeEach block and the 'it' block can see it.  (If we declared the var inside of beforeEach, our 'it' blocks could not see the array).

Then we create 5 contacts and store the returned contacts in the array.  You can see what a pain creating multiple mongoose models is, since we have callback inside of callback inside of callback.  We'll figure out a way to fix that later.

Notice that we do not provide an `id` to Contact.create anymore -- mongoose automatically assigns an id for us.  We'll need to account for that in our tests.

Move your `.only` to the `it('finds by name'` test and run it.  It will fail in the `expect(ids).to.contain(1)` line, because our id is now a long string provided by mongoose instead of the number 1.  To account for that, lets change the test so that it compares it to the correct contact in the `savedContacts` array that we loaded up in `beforeEach`.  Change the expectation to: `expect(ids).to.contain(savedContacts[0].id);`.

You should be able to fix the rest of the tests on your own except for 'removes by id'.  That one is a special case so change the `it` in front of it to `xit` and we'll handle it in the next lesson,

Go ahead and run the tests over and over again, making changes until they are all passing (except `removes by id`).  When you are done, delete the `.only` and run all the tests, taking note of which tests fail.  Then one-by-one put the `.only` in front of that test and replace the old ids with code that takes advantage of our `savedContacts` array.

new versions of the `it` blocks below:
```
//
//
//
//
//
//
//
//
//
//
//
    it ('finds by name', function (done) {
      Contact.find({ name: 'bob' }, function (err, foundContacts) {
        console.log(foundContacts);
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

    it ('finds by email', function (done) {
      Contact.find({ email: 'bob@bob.com' }, function (err, foundContacts) {
        expect(foundContacts.length).to.equal(2);
        var ids = foundContacts.map((contact) => contact.id);
        expect(ids).to.contain(savedContacts[0].id);
        expect(ids).to.contain(savedContacts[3].id);

        Contact.find({ email: 'sam@sam.com' }, function (err, otherFoundContacts) {
          expect(otherFoundContacts.length).to.equal(1);
          expect(otherFoundContacts[0].id).to.equal(savedContacts[1].id);
          done();
        });
      });
    });

    it('returns all contacts if search object is empty', function (done) {
      Contact.find({}, function (err, foundContacts) {
        expect(foundContacts.length).to.equal(5);
        done();
      });
    });

    it ('finds by id', function (done) {
      Contact.findById(savedContacts[2].id, function (err, foundContact) {
        expect(foundContact.name).to.equal('bill');
        expect(foundContact.id).to.equal(savedContacts[2].id);

        Contact.findById(savedContacts[1].id, function (err, foundContact) {
          expect(foundContact.name).to.equal('sam');
          expect(foundContact.id).to.equal(savedContacts[1].id);
          done();
        });
      });
    });

    it ('calls back with null if not found', function (done) {
      Contact.findById(12, function (err, foundContact) {
        expect(foundContact).to.not.exist;
        done();
      });
    });

    it ('calls back with null for foundContact if id arg is null', function (done) {
      Contact.findById(null, function (err, foundContact) {
        expect(foundContact).to.not.exist;
        done();
      });
    });

```