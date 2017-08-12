# Spec Helper

There are two main reasons why our tests were so brittle:
  1. We had to totally change the way we create test code.
  2. We relied on a lot of 'hard-coded' values.  (If we want to change the specific id, email, or name that was stored, we have to make the same change in our test).

The best way to avoid this is to separate the code that creates and holds our seed data.

We're going to make a new module for the tests to use.  Let's make a new folder inside of '/server' called 'utilities'.  Then inside that folder, create a file called 'SpecHelper.js'.

SpecHelper will be an object that all our tests can talk to, so lets start with the boilerplate code for creating and exporting an object:

```
function SpecHelper() {
  var self = this;
}

module.exports = new SpecHelper();
```

Now let's add a property for us to store our contacts in.

```
function SpecHelper() {
  var self = this;

  this.contacts = [];


}

module.exports = new SpecHelper();
```

Ok!  The most obvious thing we'll need is a clearDatabase() function that creates our seed data and saves it to the database.  Here's the skeleton:

```
function SpecHelper() {
  var self = this;

  this.contacts = [];

  this.clearDatabase = function (callback) {

  };

}

module.exports = new SpecHelper();
```

Go ahead and try to fill in the code.  You can use `contact.spec.js`'s beforeEach block as a template.  This function should clear the database... if there's an error, log the error and execute the callback with the error.  If there's no error, call the callback with null.  Don't forget to require our Contact model at the top of the file!

Solution Below:
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
//
//
//
//
//
//
//
//
//
const Contact = require('../api/contact/contact.model.js');

function SpecHelper() {
  var self = this;

  this.contacts = [];

  this.clearDatabase = function (callback) {
    Contact.find({}).remove(function (err) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null);
      }
    });
  };
}

module.exports = new SpecHelper();
```