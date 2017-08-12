## Create Contact

Ok now we can get and return requests, but that's really not very interesting.  Let's add the ability to store contacts.

### Rest Architecture
There is a convention for determining what http address/verb combinations are supposed to do.  We'll use contacts for an example.  In a typical 'REST' framework, the following combinations are what you use:

1. POST /contacts  -- create a new contact
2. GET /contacts/:id  -- get a contact with a particular id
3. GET /contacts   -- get a list of all contacts
4. PUT /contacts/:id  -- modify the contact with a particular id
5. DELETE /contacts/:id  -- delete the contact with a particular id

We'll take these one at a time.

## POST /contacts
We'll need a place to store all these created contacts -- for now we'll just put them in memory.  At the top of server.js, just under the require statements, type this:
```
var contacts = [];
```

This will initialize our contacts store whenever the program is started (not ideal because we'll lose data every time with push a new version or the app crashes, but we can fix that later).

We'll also need a unique id for each contact.  Add this line, too.
```
var contactID = 1;
```

Now let's create the post function.  Add a post route just above app.listen. For now let's just log the req object so we can take a look at it.
```
app.post('/contacts', function (req, res) {
  console.log(req);
  res.send('ok');
});
```

Web browsers are pretty crappy for sending POST requests, so it's time to switch to something better.  Download Postman from `https://app.getpostman.com/app/download/osx64` and install it.  Once it's installed open it up.

Change the drop-down menu on the left from a "GET" request to a "POST" request.  In the address field type `localhost:3000/contacts`.  Then click on the 'Body' tab.  Choose 'raw' from the buttons just underneath.  Then change the dropdown menu from 'text' to 'JSON(application/json)'.

Now type in the big top field:
```
{
  "name": "bob",
  "email": "bob@bob.com"
}
```

Now restart our server and hit the Send button -- it will send a POST request to our app, and our app will log our req object to the terminal output.

There are a lot of useful properties on the req object, but one thing you'll notice is that there is no 'body' object on there, and that our "name":"bob" or "email":"bob@bob.com" is not showing up at all.  This is because node and express by themselves are not able to translate an http JSON object into a javascript object by themselves.  For that we need to install another middleware.

PRACTICE: Install the new middleware -- it's an npm library called 'body-parser'
HINT:  you'll need to run npm install and then you'll have to put one line in just after our morgan line in server.js.  You'll have to google `npm body-parser` to find the instructions for plugging it in.