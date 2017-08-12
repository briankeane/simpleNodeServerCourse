# Mongoose Model

Now that mongoose is plugged in -- let's go ahead and connect our `contact` to our database model.

Since it's so different from our contacts handler, let's make a new file called `contact.model.js` inside of our `server/contact` folder and open it up.

Paste this code into it:
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name:                 { type: String },
  email:                { type: String },
});

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;
```

This code is pretty confusing -- but you should know that I just copy/paste/edit every time I create a new DB model, so it's nothing you have to memorize.

The 'Schema' defines how the db document will map to our model object.  The 2nd to last line (`const Contact = mongoose.model('Contact', ContactSchema);`) is where most of the work gets done.

`mongoose.model` creates a class out of the schema.  It automatically attaches some methods to the class, like 'find, findById, create, and remove.'  These commands do pretty much exactly what our custom versions did, only instead of searching the in-memory array they search our new database.

What's really cool is that we can use our `contacts.spec.js` file to make sure our new mongoose models will function just like our old ones.

Save `contact.model.js` and open up `contacts.spec.js`.  Then change the first line `const Contact = require('./contact.js')` to use our new model file instead: `const Contact = require('./contact.model.js');`

Most of our tests can stay the same!  Except now that we are using a database, our beforeEach is going to have to change so that it sets up the database instead of our contacts array.

First lets add a beforeEach block at the top level to clear the database before every test:
```
describe('A Contact', function () {  // this line was already there
  beforeEach(function (done) {
    Contact.find({}).remove(function (err) {
      done();
    });
  });
```

Notice that we can pass `done()` to a 'beforeEach' function as well as an 'it' function.  The `find({}).remove` line is mongoose's syntax for removing all documents for the `Contact` model.

Let's see if Contact.create is working yet.  Put a `.only` in front of the `it ('creates a contact'` test and run `npm test`.  If we're lucky it should work!

We need to do one more thing -- we've checked to make sure that `createdContact` has all the right properties, but for a really thorough test we should actually check the database and make sure that it has been written to with the correct info.  We do that by searching the db with a mongoose class function called `findById`, and then making sure that the model we find has all the correct info.

The final new 'it' block should look like this:
```
it.only('creates a contact', function (done) {
    Contact.create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {
      console.log(createdContact);
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

Now run `npm test` and see what you get!

