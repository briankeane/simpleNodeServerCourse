# Get Contact

Let's add a GET `/contacts/:id` endpoint to the app.

Under our new app.post, add a new endpoint.
```
app.get('/contacts/:id', function (req, res) {
  var id = req.params.id;

  // search the array for a matching id
  
  // IF you found a contact
    // res.status(200).send(contactInfo);
  // ELSE
    // res.status(404).send({ message: 'contact not found' });  // 404 status is for NOT_FOUND

});
```

Now you go ahead and fill in the rest.  Step through the contacts array and find one that matches.  (Potential gotcha: ids will come in as a string, so watch out for something like `if ("9" == 9)`.

To test it, start the server and load up a few contacts with Postman.  You probably want to use slightly different names ("bob1", "bob2") to make sure you retrieve the right one.

Then make a new tab in Postman and set up a GET /contacts/2 request and see if you can get it to work!