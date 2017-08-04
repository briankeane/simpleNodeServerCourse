# Search

Let's add a new request where you can search for a range of objects.  You should try this one on your own.

Add a new endpoint for GET /contacts/search.  For now, let's make it only search by name or email.  Use the req.query object for the search parameters.  Let's say you have a set of:

```
{
  "name": "bill",
  "email": "bill@bill.com"
},
{
  "name": "bob",
  "email": "bob@bob.com"
},
{
  "name": "bill",
  "email": "bill@otherBill.com"
},
{
  "name": "bob",
  "email": "bob@otherBob.com"
}
```

You want to be able to send this GET request:
```
localhost:3000/contacts/search?name=bob
```

And get this back (with a 200 status code):
```
200 OK
{
  results: [
    {
      "name": "bob",
      "email": "bob@bob.com"
    },
    {
      "name": "bob",
      "email": "bob@otherBob.com"
    }
  ]
}
```

Answer on the next page.