# More Api Tests

The new error I'm getting is:
```
  1) /contacts PUT /contacts/:id modifies a contact:

      Uncaught AssertionError: expected 'bill' to equal 'newName'
      + expected - actual

      -bill
      +newName

      at server/contact/contact.api.spec.js:148:44
```

This is great -- it's a lot of specific information to tell us what's wrong in the controller.

Looking at `modify` in the controller, I can see the problem is that mongoose objects must be "saved", whereas before we were just modifying them in the array.  Let's put a `save` in there, with an error check.  Let's also explicitly check for `(!foundContact)` just to make it clearer what's going on:
```
module.exports.modify = function (req, res) {
  Contact.findById(req.params.id, function (err, foundContact) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (!foundContact) {
      return res.status(404).send({ message: 'contact not found' });
    }
    if (req.body.email) {
      foundContact.email = req.body.email;
    }
    if (req.body.name) {
      foundContact.name = req.body.name;
    }
    foundContact.save(function (err, savedContact) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      return res.status(200).send(savedContact);
    });
  });
};
```
Now run your test... PASS!  Awesome.  Remove `.only` and see how many we have to go...  back up to 10!  Shit... well we are making progress.
