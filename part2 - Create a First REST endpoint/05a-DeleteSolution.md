## Solution to the DELETE endpoint

This code should now be in your server.js file:
```
app.delete('/contacts/:id', function (req, res) {
  for (var i=0;i<contacts.length;i++) {
    if (contacts[i].id == Number(req.params.id)) {
      contacts.splice(i,1);
      return res.status(200).send({ message: 'contact deleted' });
    }
  }
  return res.status(404).send({ message: 'contact not found' });
});
```