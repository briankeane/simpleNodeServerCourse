# Test Find

Ok!  Now that we've got the test passing, go ahead and make a git commit with the message "add find with test for find by name."  Don't forget to push the name of your branch instead of `master`

Now we need to write the same test for find by name.  We'd like to run both of these tests at once to make sure that if we modify any code, we don't break the first test.  Move the `only` up to the enclosing `Describe` block:

```
describe.only('find', function () {
  ...
```

We can use the exact same setup for each of these tests, but it'd be easier not to type them twice.  We can have them share the setup code by adding a `beforeEach` block.

A `beforeEach` block will be executed before any test called within it's describe block.  For example, comment out your entire test file and replace it with this:
```
describe('Level1', function () {
  beforeEach(function () {
    console.log('beforeEach level 1');
  });

  describe('level2', function () {
    beforeEach(function () {
      console.log('beforeEach level 2');
    });
    describe('level3', function () {
      beforeEach(function () {
        console.log('beforeEach level 3');
      });

      it('does stuff in level 3', function () {
        console.log('performing test in level 3');
      });

      describe('level4', function () {
        beforeEach(function () {
          console.log('beforeEach level 4');
        });
        it ('does stuff in level 4', function () {
          console.log('performing test in level 4')
        });
      });
    });
  });
});
```
As you can see -- level 4 gets all described blocks run.  Level 3 has them all run except level 4.

Now put contact.spec.js back like it was.  Let's move the setup code to a before block, so we only have to type it (or... in the future, change it) once.
```
  describe.only('find', function () {
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
    
    it.only ('finds by name', function (done) {
      Contact.find({ name: 'bob' }, function (err, foundContacts) {
        expect(foundContacts.length).to.equal(2);
        var ids = foundContacts.map((contact) => contact.id);
        expect(ids).to.contain(1);
        expect(ids).to.contain(4);

        Contact.find({ name: 'sam' }, function (err, otherFoundContacts) {
          expect(otherFoundContacts.length).to.equal(1);
          expect(otherFoundContacts[0].id).to.equal(2);
          done();
        });
      });
    });

    it ('finds by name', function () {

    });
  });
```
Now add our email tests.  Go ahead and try before you look -- you can almost copy/paste it all.

Solution:
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
//

    it ('finds by email', function (done) {
      Contact.find({ email: 'bob@bob.com' }, function (err, foundContacts) {
        expect(foundContacts.length).to.equal(2);
        var ids = foundContacts.map((contact) => contact.id);
        expect(ids).to.contain(1);
        expect(ids).to.contain(4);

        Contact.find({ email: 'sam@sam.com' }, function (err, otherFoundContacts) {
          expect(otherFoundContacts.length).to.equal(1);
          expect(otherFoundContacts[0].id).to.equal(2);
          done();
        });
      });
    });
```

Run your tests and see them pass!  It's a good idea to make sure your new test fails with a bad result.
