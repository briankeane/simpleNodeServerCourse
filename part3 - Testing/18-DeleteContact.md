## Delete Endpoint

You've probably gotten the hang of it by now.  Go ahead and try this one on your own.

HINT: you'll have to make an initial call to Contact.findById to make sure the contact exists, because our `remove` function doesn't give us any feedback as to whether the contact actually existed or not.  We need to know whether to send a 404 or a 200.

Solution below:
```
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
  describe('DELETE /contacts/:id', function () {
    it ('returns 404 if the provided id does not exist', function (done) {
      request(app)
        .delete('/contacts/999')
        .expect(404)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            done();
          }            
        });
    });
    
    it ('deletes a contact', function (done) {
      request(app)
        .delete('/contacts/3')
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            // check the response body
            expect(Contact.contacts.length).to.equal(4);
            var ids = Contact.contacts.map((contact) => contact.id);
            expect(ids).to.not.contain(3);
            done();
          }            
        });
    });
  });
```

and in `server.js`:
```
app.delete('/contacts/:id', function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (!foundContact) {
      return res.status(404).send({ message: 'contact not found' });
    }
    Contact.remove({ id: Number(req.params.id) }, function (err) {
      return res.status(200).send({ message: 'contact deleted' });
    });
  });
});
```