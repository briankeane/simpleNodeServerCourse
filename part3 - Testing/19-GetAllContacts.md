## Get All Contacts

Go ahead!

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
  describe('GET /contacts', function () {
    it ('gets all the contacts', function (done) {
      request(app)
        .get('/contacts')
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            var results = res.body;
            expect(results.length).to.equal(5);
            
            // check the first results to make sure it worked.
            // We may want to change the order later, so that's why
            // we are just checking for existence here.
            expect(results[0].name).to.exist;
            expect(results[0].email).to.exist;
            expect(results[0].id).to.exist;

            // now make sure it got them all with no duplicates
            var ids = results.map((result) => result.id);
            expect(ids).to.contain(1);
            expect(ids).to.contain(2);
            expect(ids).to.contain(3);
            expect(ids).to.contain(4);
            expect(ids).to.contain(5);
            done();
          }
        });
    });
  });
```
and `server.js`:
```
app.get('/contacts', function (req, res) {
  Contact.find({}, function (err, foundContacts) {
    return res.status(200).send(foundContacts);
  });
});
```