## FindById and Remove

Ok -- now that all the setup is complete you should be able to figure out findById and remove.  For remove we could have it remove based on email, name, or id -- but for now let's just use id.  Here is a good test for remove:

```
    it('removes by id', function (done) {
      Contact.remove({ id: 3 }, function (err) {
        expect(Contact.contacts.length).to.equal(4);
        var ids = Contact.contacts.map((contact) => contact.id);
        expect(ids).to.not.contain(3);

        Contact.remove({ id: 1 }, function (err) {
          expect(Contact.contacts.length).to.equal(3);
          var ids = Contact.contacts.map((contact) => contact.id);
          expect(ids).to.not.contain(1);
          done();
        });
      });
    });
```

Now copy/paste/edit the code from server.js until you get the test to pass.  Then make a git commit.

PRACTICE: Create a good test for findById.  Calling findById properly should look like this:

```
  Contact.findById(3, function (err, foundContact) {
    // notice that foundContact is a single contact instead of an array of contacts
  });
```

1. write a test for passing an id that does not exist. (foundContact should be undefined or null)
2. One more test for an edge case -- what happens if you pass `null` or `undefined` for the id -- in that case both `err` and `foundContact` should be undefined or null.

Now make the tests pass!  Solutions below:
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
//     Scroll for solution
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
//
```
in contacts.spec.js:
```
  it ('finds by id', function (done) {
      Contact.findById(3, function (err, foundContact) {
        expect(foundContact.name).to.equal('bill');
        expect(foundContact.id).to.equal(3);

        Contact.findById(2, function (err, foundContact) {
          expect(foundContact.name).to.equal('sam');
          expect(foundContact.id).to.equal(2);
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

in contact.js:
```
  this.findById = function (id, callback) {
    for (var i=0;i<self.contacts.length;i++) {
      if (self.contacts[i].id == id) {
        return callback(null, self.contacts[i]);
      }
    }
    return callback(null, null);
  };
```