# Search Solution

There are a few ways to do this... Here is what I settled on.
```
app.get('/search', function (req, res) {
  var nameToMatch = req.query.name;
  var emailToMatch = req.query.email;

  console.log(req.query);

  var results = [];

  for (var i=0;i<contacts.length;i++) {
    var matchesName = true;
    var matchesEmail = true;

    // IF a name was provided and it doesn't match...
    if (nameToMatch && (contacts[i].name != nameToMatch)) {
      matchesName = false;
    }

    // IF an email was provided and it doesn't match
    if (emailToMatch && (contacts[i].email != emailToMatch)) {
      matchesEmail = false;
    }

    // IF it passed both tests, include it in the results
    if (matchesName && matchesEmail) {
      results.push(contacts[i]);
    }
  }
  return res.status(200).send({ results: results });
});
```

Now push up to github and heroku and test the online version!