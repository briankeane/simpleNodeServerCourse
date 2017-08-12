# Cleanup Continued

I'm sure that last section was very confusing and that's ok. The thing to remember is that the way we've got it set up now is functionally the same as when we had the entire app in `server.js`.  Now, though, any code that deals with a `contact` (tests and all) is in the `contact` folder, and in the future all code dealing with a `user` or any other object we might add has a specific and easily findable place.

There is one more thing we can do to clean everything up.  If you open up `contact.routes.js` you see that all of our request handling is done in that file.  But it is nice to separate the routing from the functionality.

Make a new file in our contact folder called `contact.controller.js`.  Let's move all our request handling functions over to this file, so that we only have routes in our routes file.

Let's move the router.post function into the controller.  Open up `contact.controller.js`, copy and paste our router.post function, but edit it to look like this:
```
const Contact = require('./contact.js');

module.exports.create = function (req, res) {
  Contact.create(req.body, function (err, createdContact) {
    res.status(201).send(createdContact);
  });
};
```

Now open up `contact.routes.js`.  At the top of the file, let's import the controller.
```
const express = require('express');
const router = express.Router();
const controller = require('./contact.controller.js');
const Contact = require('./contact.js')
```

Then replace our router.post with a reference to our new controller property:

```
router.post('/', controller.create);
```

Now we can do that with the rest of the functions!  It doesn't really matter what we call the functions in the controller, just try to make them make sense.  When you're done, you can remove the `const Contact = require('./contact.js');` line from `contact.routes.js`.

 My new routes file looks like this:
```
const express = require('express');
const router = express.Router();
const controller = require('./contact.controller.js');

// POST
router.post('/', controller.create); 

// GET
router.get('/search', controller.search);
router.get('/:id', controller.show);
router.get('/', controller.list);

// PUT
router.put('/:id', controller.modify);

// DELETE
router.delete('/:id', controller.delete);

module.exports = router;
```

As you can see -- if I really want to work on a route (like change the address or move it's location to deal with a matching problem), I can open this file and now it's very clean.

I also have a clean controller file:
```
const Contact = require('./contact.js');

module.exports.create = function (req, res) {
  Contact.create(req.body, function (err, createdContact) {
    res.status(201).send(createdContact);
  });
};

module.exports.search = function (req, res) {
  Contact.find(req.query, function (err, results) {
    return res.status(200).send({ results: results });
  });
};

module.exports.show = function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (foundContact) {
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
};

module.exports.modify = function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (foundContact) {
      foundContact = Object.assign(foundContact, req.body);
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
};

module.exports.delete = function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (!foundContact) {
      return res.status(404).send({ message: 'contact not found' });
    }
    Contact.remove({ id: Number(req.params.id) }, function (err) {
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

I know that any code that deals with a contact-oriented request originates here, so it's easy to get to for troubleshooting.

Now run `npm test` and make sure everything still works!  Once it does, push everything up.
```
git add --all
git commit -m "refactor routes into separate controller and routes files."
git push origin addTests
```

Then merge your branch into master to make it the new master, now that we know we're going to keep everything.
```
git checkout master
git merge addTests
git push origin master
```

You can also push up to heroku and make sure it's still working!
```
git push heroku master
```

That's it for this section!