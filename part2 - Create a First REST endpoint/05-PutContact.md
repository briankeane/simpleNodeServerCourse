# PUT and DELETE contact

Ok now it's time to allow modification of the contact.  Add this new route to our server.js file:
```
app.put('/contacts/:id', function (req, res) {
  for (var i=0;i<contacts.length;i++) {
    if (contacts[i].id == Number(req.params.id)) {
      contacts[i] = Object.assign(contacts[i], req.body);
      return res.status(200).send(contacts[i]);
    }
  }
  return res.status(404).send({ message: 'contact not found'});
});
```

This one is a lot like GET.  Object.assign is a new javascript command that overwrites any properties from the 2nd object onto the first object.

Restart the server and load a few bobs into the server with Postman.  Then create a new Postman tab and make a new PUT request to `localhost:3000/contacts/2`.  Make it raw JSON and put this in the body window:
```
{
  "email": "different@different.com",
  "someOtherProperty": false
}
```

Go ahead and make that PUT request.  You should receive a modified contact with a 200 status from the server.  Switch to the GET request tab and use the address for id: 2.  It should give you the modified contact.

PRACTICE: Add and test the `DELETE /contacts/:id`, making sure you receive a 404 afterwards when you make a GET request to that address.  The solution is on the next page... HINT: google 'remove element from array at index javascript'