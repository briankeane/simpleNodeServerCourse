# API Tests (cont)

At this point, you should have 8 failing tests.  This can be intimidating at first, but each one is really not so bad and each error message gives you specific info about what is failing.  Let's start with the first failure and work our way down (they may be in a different order for you...) 

The first error for me is:
```
4) /contacts PUT /contacts/:id modifies a contact:
     Error: expected 200 "OK", got 404 "Not Found"
      at Test._assertStatus (node_modules/supertest/lib/test.js:266:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:281:11)
      at Test.assert (node_modules/supertest/lib/test.js:171:18)
      at Server.assert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1544:8)
      at _combinedTickCallback (internal/process/next_tick.js:71:11)
      at process._tickCallback (internal/process/next_tick.js:98:9)
```

Ok scroll down to `it('modifies a contact'`.  Why are we getting a 404 error?  In this line:
```
.put('/contacts/3')
```
We are using an old id instead of a real id.  Let's replace it with the id we want:
```
.put(`/contacts/${savedContacts[2].id}`)
```
Now run `npm test` again -- still getting a `404`!

We get a 404 under 2 conditions:
  1. the route is not defined properly,
  2. the user was not found.

Let's test both conditions with console.logs.  Open up `contact.controller.js` and make `modify` look like this:
```
module.exports.modify = function (req, res) {
  console.log('im in the controller');
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    console.log('err');
    console.log(err);
    console.log('foundContact:');
    console.log(foundContact);
    if (foundContact) {
      foundContact = Object.assign(foundContact, req.body);
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
};
```
If `i'm in the controller` never logs to the terminal, then we know it's a bad route.  If it does log and continues through, we check the error and the foundContact to give us some more clues.

Now run `npm test` again.  For me the output was:
```
Example app listening on port 3000!
  /contacts
    PUT /contacts/:id
connected
im in the controller
err
{ MongooseError: Cast to ObjectId failed for value "NaN" at path "_id"
    at CastError (/Users/briankeane/code/learn/nodeCourse/node_modules/mongoose/lib/error/cast.js:26:11)
    at ObjectId.cast (/Users/briankeane/code/learn/nodeCourse/node_modules/mongoose/lib/schema/objectid.js:149:13)
    at ObjectId.SchemaType._castForQuery (/Users/briankeane/code/learn/nodeCourse/node_modules/mongoose/lib/schematype.js:1064:15)
```
OK!  Now we're getting somewhere.  Notice that the (err) exists but we never checked for it -- we just checked to see if anything got found.  We would have caught this a lot sooner if we had checked for the error in the first place. 

The status code for a server error is `500`, so whenever an error occurs, let's `console.log` it (so it'll show up in our logs) and let's res.send the error back to the front end, too.  Add this after each call that may have produced an error:
```
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
```
Our new `modify` should look like this:
```
module.exports.modify = function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
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
```
Now run `npm test`.  Now we're getting a 500 status code, and if you scroll up you can see that the whole error we were missing before has been logged to the screen.  Next time we won't have to dig around for the error message.

Now let's take a look at that error message: 
```
Cast to ObjectId failed for value "NaN" at path "_id".  
```

That means the error is in our `findById` call.  Can you see it?

We are trying to cast something like '598e25fdb487e2590e557aee' to a number, even though it's not a number anymore.  Go ahead and change `Number(req.params.id)` to just `req.params.id`. 

While you're at it, fix the same problem in the `show` and `delete` functions.  Also add error logging/responses to any callbacks that might have errors.  In the end your `contact.controller.js` should look like this:
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
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send(foundContacts);
  });
};
```

Ok go ahead and run `npm test` and... FAILED again!  But it's getting better.