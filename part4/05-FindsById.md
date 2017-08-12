# Finds By Id Test

The way that mongoose deals with IDs makes our 'find by id' test a little trickier.

Mongoose automatically creates a unique id for each record.  Even though it looks like a String, it is not a String -- it is actually an object with it's own special properties.  This 'id' object is actually stored on the '_id' property.

Each model has what's called a 'virtual' property called 'id' which is the String version of that property.  That's why when you call contact.id, you are getting a string... but that string isn't actually stored on the model.

To see what I mean, put a `.only` in front of the very first test in `contact.spec` (`it ('creates a contact' `).  Just after the first Contact.create, add some console.log statements
```
  it('creates a contact', function (done) {
    Contact.create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {

      console.log('createdContact: ');
      console.log(createdContact);
      console.log('createdContact.id ' + createdContact.id);      
      
      expect(createdContact.name).to.equal('bob');
      expect(createdContact.email).to.equal('bob@bob.com');
      expect(createdContact.id).to.exist;

      // Also check the db
      Contact.findById(createdContact.id, function (err, foundContact) {
        expect(foundContact.name).to.equal('bob');
        expect(foundContact.email).to.equal('bob@bob.com');
        expect(foundContact.id).to.exist;
        done();
      });
    });
  });
```

Notice that 'id' does not exist when we `console.log` the createdContact, but it does when we call it with the . operator.  This is all very, very confusing, and it's ok not to understand it right now.  The main thing to know is that 'id' is a convenience property for us, humans, to use in our app, but '_id' is the actual property that the database uses.

With that in mind, we need to change the 'remove' query in 'removes by id' so that it is searching the `_id` property in the database (which exists) instead of the `id` property, which doesn't.

The other thing we need to change is that we can no longer check the contacts array to see if an contact was removed -- now we need to check the database.  Immediately after the two remove statements, place a `find({}` call, which finds all records, and check the array that it gives you instead of the no-longer-existing Contact.contacts array.

Then go ahead and remove those console.log statements and the .only that we just played around with, and run our new test.

Solution below.
```
    it('removes by id', function (done) {
      Contact.remove({ _id: savedContacts[2].id }, function (err) {
        Contact.find({}, function (err, allContacts) {
          expect(allContacts.length).to.equal(4);
          var ids = allContacts.map((contact) => contact.id);
          expect(ids).to.not.contain(savedContacts[2].id);

          Contact.remove({ _id: savedContacts[0].id }, function (err) {
            Contact.find({}, function (err, newAllContacts) {
              expect(newAllContacts.length).to.equal(3);
              var ids = newAllContacts.map((contact) => contact.id);
              expect(ids).to.not.contain(savedContacts[0].id);
              done();
            })
          });
        })
      });
    });
```