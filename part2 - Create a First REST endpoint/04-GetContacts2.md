# Get Contacts 2

Something to notice about the solution code:
```
app.get('/contacts/:id', function (req, res) {
  for (var i=0;i<contacts.length;i++) {
    if (contacts[i].id == Number(req.params.id)) {
      return res.status(200).send(contacts[i]);
    }
  }
  return res.status(404).send({ message: 'contact not found' });
```
Since in async javascript with callbacks the return doesn't matter, you can use it to terminate the function... I returned res.status(200).send(contacts[i]) just to stop the for loop and to keep it from reaching the bottom line.