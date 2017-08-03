## Get List Solution

```
app.get('/contacts', function (req, res) {
  return res.status(200).send(contacts);
});
```

Now push the whole thing up to heroku and play around with it on Postman a little.