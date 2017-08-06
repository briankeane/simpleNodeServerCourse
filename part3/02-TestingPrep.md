# Preparation for Testing

There are a few things we need to do to our app to get it ready for testing.

The first problem to deal with is that only our server.js file can see or add users -- there's no interface where the test file reach it in order to set it up.

What we need is a new module to handle contacts that both our tests and our app can talk to.

Make a new file called contact.js (singular noun for the filename is the common convention -- not sure why but I think it's pretty arbitrary)

```
touch contact.js
```

Now lets move our logic into contacts.
```
function ContactsHandler() {
  var self = this;

  this.contacts = [];
  this.contactsID = 1;

  this.find = function (attrs, callback) {

  };

  this.findById = function (attrs, callback) {

  };

  this.create = function (attrs, callback) {

  };

  this.remove = function (attrs, callback) {

  };
}

module.exports = new ContactsHandler();
```

Go ahead and save the file.  

We could just implement these functions with Postman, but as long as we're adding testing we might as well go ahead and use it.