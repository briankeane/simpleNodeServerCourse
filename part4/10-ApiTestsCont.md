# API Tests (cont)

Now the first test that's failing for me is this:
```
 1) /contacts PUT /contacts/:id modifies a contact:

      Uncaught AssertionError: expected 'bill' to equal 'newName'
      + expected - actual

      -bill
      +newName

      at server/contact/contact.api.spec.js:146:44
```

Our PUT is not actually replacing the name like we want it to.  Let's look in `contact.controller.spec` and see what the issue is.

Since we were dealing with plain objects before (instead of database models), we didn't have to save anything to the db.  Now we need to update our `modify` method to set any updated properties and save the result.  This code is a little complicated:

```
module.exports.modify = function (req, res) {
  Contact.findById(req.params.id, function (err, foundContact) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (foundContact) {
      for (var propertyName in req.body) {
        if (req.body.hasOwnProperty(propertyName)) {
          foundContact[propertyName] = req.body[propertyName];
        }
      }
      foundContact.save(function (err, savedContact) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        return res.status(200).send(savedContact);
      });
    } else {
      return res.status(404).send({ message: 'contact not found'});
    }
  });
};
```

Ok what makes this code confusing is the weird "for loop."  In javascript, every object has some special convenience properties added to it.  These are things like the functions `.toString()` or `.valueOf()` or even `.hasOwnProperty()` (which we are using).  When you loop over an object's properties, you usually just want the ones that are at the "top level".  In this case, that's "email" and "name".  

The function `.hasOwnProperty()` returns true if it's a top level property only.  So `req.body.hasOwnProperty('email')` will return `true`, whereas `req.body.hasOwnProperty('toString')` will return `false`.  This code loops over all properties of `req.body` but only adds the top-level properties to the model.

Here's the psuedocode:
```
      // FOR every propertyName in req.body 
      for (var propertyName in req.body) {

        // IF the property belongs to the top level
        if (req.body.hasOwnProperty(propertyName)) {

          // assign that property to the model
          foundContact[propertyName] = req.body[propertyName];
        }
      }
```

After all this we need to save the model to the database.  Save the file and rerun the test.  Then delete `.only`.  Just one more failing test to go.