## Test Find

Ok now let's add our tests for find, (which is going to be similar to what we did in our 'search' function in `server.js`)  This test requires a little bit more setup.  We have to make sure that the contacts array has a few in it, so that we can be sure we retrieve the right number of contacts. Let's set up the environment by making our ContactHandler look exactly how it would look if we had send 5 POST requests with sample data.  Don't forget to change the contactsID counter, 


Since we'll have a few different tests of the 'find' function, let's put them inside their own nested 'Describe' block.  Now your test file with our skeleton of tests looks like this:

```
describe('A Contact', function () {
  it('creates a contact', function (done) {
    Contact.create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {
      expect(createdContact.name).to.equal('bob');
      expect(createdContact.email).to.equal('bob@bob.com');
      expect(createdContact.id).to.exist;
      done();
    });
  });

  describe('find', function () {
    it ('finds by email', function () {
      
    });

    it ('finds by name', function () {
      
    });
  });
});
```

Step 1 is to set up the environment.  Let's set up our ContactsHandler so that it looks exactly like it would if we send 5 POST requests in Postman. Since our contacts array is exposed to the outside world (`this.contacts` in contact.js), we can access it directly in the tests via Contact.contacts like this:
```
  describe('find', function () {
    it ('finds by name', function (done) {
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

```
 Now we've got two bill's, two bob's and a sam to search for.  It's time to write the test to make sure find returns an array with anything matching the search properties we provide.  Let's call find twice and check the results:
 ```
    it ('finds by name', function (done) {
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

 ```

In this code, we set up the contacts array and the id iterator. Then we search for 'bob.'  Since it's an async call, be sure to add `done` as an `it` callback argument, so that mocha knows to wait for the functions to finish.

The line `var ids = foundContacts.map((contact) => contact.id);` uses the .map convenience function to create an array with only the found ids so that it's easy for us to test whether or not the right ids are included.  (We don't care about the order for now, as long as the entries are included in the results)

Now lets run the test and see it fail. Mocha has a great option called 'only' that tells mocha only to run the tests you specify.  Change `it('finds by name' ...)` to `it.only('finds by name' ...)` and run the tests to make sure they fail.  You should get `Error: Timeout of 2000ms exceeded`.  This is good!  It means that mocha is waiting for the `done()` call, but since we never execute a callback inside Contact.find it never happens, and mocha runs out of time to wait before it sees `done()` executed.
