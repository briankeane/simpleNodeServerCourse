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
const Contact = require('../contact/contact.model.js');

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
const app = require('../server.js');
const request = require('supertest');

const expect = require('chai').expect;
const Contact = require('./contact.model.js');
const mongoose = require('mongoose');
const SpecHelper = require('../utilities/specHelper.js');

describe('/contacts', function () {
  beforeEach(function (done) {
    SpecHelper.clearDatabase(function (err) {
      done();
    });
  });
```

Now run `npm test` and make sure it still works.

At this point it looks like the same amount of code, so what's the advantage of making SpecHelper?  There are two main reasons for it:

1. Eventually clearing the database will require a lot more code (once we add users or any more models).  By separating this out now we will only have to write that code once, instead of re-writing it in every test every time we add a model.

2.  If we want to drastically change the way our database is cleared (go back to storing our data in an array, or switch to a different type of database), our tests will only break in one place.

The basic idea is that we want everything in our test files to work independently of our internals.

Now let's create a seedDatabase function that loads our data.
