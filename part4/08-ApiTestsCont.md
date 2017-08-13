# Api Tests

Ok now we have 3 failing tests.  The first one for me is:
```
  1) /contacts GET /contacts/:id GETs a contact if it exists:
     Error: expected 200 "OK", got 404 "Not Found"
```
So open up `contact.api.spec.js` and put a `.only` in front of the 'GETs a contact' test.

We're getting a 404 so lets open up `contact.controller.js` and see what's going on.

There are 2 reasons we could get a 404.  The routing could be wrong, in which case it's not even executing our `show` function code.  Let's make sure that code is being called by placing a `console.log('im here');` as the first line in `contacts.controller.js`'s 'show' function:
```
module.exports.show = function (req, res) {
  console.log('im here');
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (foundContact) {
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
};
```

Then run `npm test`.  Do you see the `im here` output?  So now we know our code is executing.

One thing we are not doing in the controller that is pretty standard is checking for an error from `findById`.  This is always a good practice and is normally included 100% of the time.

The response code for a server error is 500, so if there's an error we are going to: 1) log it, and 2) respond to the api request with a 500 and the error.

Our `show` should now look like this:
```
module.exports.show = function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (foundContact) {
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
};
```

Now run the test and see what happens.  Now you get a much more useful error message logged to the screen and a 500 status code:
```
Example app listening on port 3000!
  /contacts
    GET /contacts/:id
{ MongooseError: Cast to ObjectId failed for value "NaN" at path "_id"
```

Ok -- findById is having trouble converting req.params.id to a mongoose ID.  Do you see the problem?

We are casting it to a Number and we don't need to do that anymore.  Go ahead and remove the `Number()` function from `show`. While you're at it, might as well remove it from `modify` and `delete` as well.  (It's in `delete` twice!).

Also go ahead and add error handling to every function so that in the future, these useful errors will be printed out instead of getting ignored.  Your final `contact.controller.js` file should look like this:
```
const Contact = require('./contact.model.js');

module.exports.create = function (req, res) {
  Contact.create(req.body, function (err, createdContact) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.status(201).send(createdContact);
  });
};

module.exports.search = function (req, res) {
  Contact.find(req.query, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send({ results: results });
  });
};

module.exports.show = function (req, res) {
  Contact.findById(req.params.id, function (err, foundContact) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (foundContact) {
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
};

module.exports.modify = function (req, res) {
  Contact.findById(req.params.id, function (err, foundContact) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (foundContact) {
      foundContact = Object.assign(foundContact, req.body);
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
};

module.exports.delete = function (req, res) {
  Contact.findById(req.params.id, function (err, foundContact) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (!foundContact) {
      return res.status(404).send({ message: 'contact not found' });
    }
    Contact.remove({ id: req.params.id }, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      return res.status(200).send({ message: 'contact deleted' });
    });
  });
};

module.exports.list = function (req, res) {
  Contact.find({}, function (err, foundContacts) {
    return res.status(200).send(foundContacts);
  });
};
```
Go ahead and run the tests and...  5 errors!  This is also OK.  Let's keep taking them one at a time and see what's going on shows up.