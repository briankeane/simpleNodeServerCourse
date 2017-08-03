# Create Contact (continued)

Now that we have body-parser up and running, go ahead and send that post request again.  Now if you look at the terminal log, you should see a 'body' that our body-parser middleware attached to the request object just before our function started.

Now we can use that body to create a new contact:
```
app.post('/contacts', function (req, res) {
  // grab the posted info
  var contactInfo = req.body;

  // add an id
  contactInfo.id = contactID;

  // increment the id for the next time
  contactID++;

  // add it to the in-memory array
  contacts.push(contactInfo);

  // tell the message sender that the contact has been added
  res.status(201).send({ message: 'contact created' });
});

```

One more thing to notice.  The final line sends an http status code along with the response.  These codes are shortcuts for telling the requester things like (CREATED, NOT_FOUND, etc).  201 means 'CREATED'.  There is a list of the codes here: http://www.restapitutorial.com/httpstatuscodes.html

When we get new info, we create a new unique id, store the info in the array, and tell the message sender that we finished.  Just so that we can see our changes, put a `console.log(contacts);` statement just before the res.status line.  Then go ahead and restart the server and resend the POST request via postman.  Hit the SEND button several times and you can see the array grow.

If you look at the response section of the Postman app, you'll see that we receive a copy the new contact with it's new `id` property.  Now let's build a GET request for that id that responds with that contact's info.