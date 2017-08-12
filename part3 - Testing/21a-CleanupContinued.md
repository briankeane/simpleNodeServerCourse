## Cleanup Continued

Now would be a great time to commit and push your changes.  After you've pushed them up, jump over to the master branch:
```
git checkout master
```
In sublime text, notice how much has changed.  If moving all these folders around had broken everything and we decided to revert to our old structure, the line `git checkout master` is all we need to set everything back the way it was.  You can see how useful it is to make a new branch anytime you are working on a change of any significance.

Now go back to the new branch:
```
git checkout addTesting
```

While our structure is much cleaner than it was a few minutes ago, if we were blindly looking at our app we would probably assume that the code to handle our `contacts` requests would be somewhere in our `contacts` folder.  Also our `contact.api.spec.js` file is testing code that is in our main `server` folder.  It would be better if `contacts` were the only place we had to look for any code that has to do with `contacts`, so lets move all of the `routes` into our `contacts` folder.

This may not seem all that much better as it is, but imagine once we have 10 different 'models' (user, contact, company, etc...).  ALL of that code would be inside of `server.js` so we'd have to do a lot of searching in order to find it.

In the terminal, cd into our contact folder and type: `touch contact.routes.js`.  Then open our new file and our server.js file side by side (in sublime text, press `command-option-2` for side-by-side windows).

Cut all the routes from server.js and paste them into contactRoutes.js.  Also remove the line `const Contact = require('./contact/contact.js')` and move that into our new contact.routes.js file as `const Contact = require('./contact.js');`.

Our server.js should just look like this now:
```
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

module.exports = app;
```
Now take a look at `contact.routes.js`.  Since we don't have the 'app' to add the routes to in this file, we can make an express "Router()", register all the contacts routes to that, and then add the Router as middleware in `server.js`.  I'm sure that's confusing but it's easier to do than it sounds.

In contact.routes.js add this to the top:
```
const express = require('express');
const router = express.Router();
```

Then change all `app.post`, `app.get`, etc, to `router.post` and `router.get`.  Then at the bottom let's export the router with `module.exports = router;`

Also delete '/contacts' from the addresses since they all have that in common, and we'll tell `server.js` to call this file anytime the route starts with `/contacts`.  Your final `contacts.routes.js` file should look like this:
```
const express = require('express');
const router = express.Router();
const Contact = require('./contact.js')

router.post('/', function (req, res) {
  Contact.create(req.body, function (err, createdContact) {
    res.status(201).send(createdContact);
  });
}); 

router.get('/search', function (req, res) {
  console.log('here');
  Contact.find(req.query, function (err, results) {
    return res.status(200).send({ results: results });
  });
});

router.get('/:id', function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (foundContact) {
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
});

router.put('/:id', function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (foundContact) {
      foundContact = Object.assign(foundContact, req.body);
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
});

router.delete('/:id', function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (!foundContact) {
      return res.status(404).send({ message: 'contact not found' });
    }
    Contact.remove({ id: Number(req.params.id) }, function (err) {
      return res.status(200).send({ message: 'contact deleted' });
    });
  });
});

router.get('/', function (req, res) {
  Contact.find({}, function (err, foundContacts) {
    return res.status(200).send(foundContacts);
  });
});

module.exports = router;
```

Now let's import the router into `server.js` by adding the line `app.use('/contact', require('./contacts/contacts.routes.js'));` just under the middleware.  The entire `server.js` file should now look like this:
```
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes
app.use('/contact', require('./contacts/contacts.routes.js'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

module.exports = app;
```

Now run `npm test` and see if we broke anything!  If not, make a git commit and push it up!  One more thing to do...