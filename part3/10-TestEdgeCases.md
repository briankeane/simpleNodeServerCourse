## Edge Cases

Another great thing about testing is we get to test all the edge cases and make sure they work like we think they should.  In the future when we add a db, there will be a lot more edge cases for us to test for.  What happens if we pass an empty string?  What happens if we accidentally pass a number instead of a string?

There's only one 'edge case' for us to test in this case right now.  The convention for a find function is that if you do not pass any 'conditions' to it (`email: or name:` in our case) then it should return all existing results.  Our code may or may not work that way, but we didn't design it with that it mind, so instead of closely examining the code to get a 90% sure answer, it's quicker just to add a test for that condition.

PRACTICE: Add a new `it` block within the same `describe` block that passes an empty search object (`Contact.find({}, function (err, foundContacts) {`) and make sure that you receive the entire contacts array back.  (Just check the length).  Once you get it working, commit your changes to git!

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
//     Scroll for solution
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

    it('returns all contacts if search object is empty', function (done) {
      Contact.find({}, function (err, foundContacts) {
        expect(foundContacts.length).to.equal(5);
        done();
      });
    });

```