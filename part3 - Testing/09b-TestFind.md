## Test Find (cont.)

Ok!  Now make the test pass -- you can copy/paste most of the logic from `server.js` and then make the changes you need.  The difference is that we need to:
  1. make our logic into an async function with a callback, and
  2. change the `server.js` references to the `contacts` variable into a `self.contacts` property in `contact.js`

Every time you think it might be working or even close to working, run your test and the results will give you clues as to what your code is really doing.

NOTE: When you need to change a variable name throughout a function in Sublime Text, double-click on the word or highlight it with your mouse.  Then press `Command-D` once.  Every time you press `Command-D` it will highlight the next instance of that word in your file.  Keep going until all the ones you need to change are highlighted, and then you can change them all at once.  (Press the left arrow, type `self.` and then click anywhere to go back to a single cursor.)

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

  this.find = function (attrs, callback) {
    var nameToMatch = attrs.name;
    var emailToMatch = attrs.email;
    var results = [];

    for (var i=0;i<self.contacts.length;i++) {
      var matchesName = true;
      var matchesEmail = true;

      // IF a name was provided and it doesn't match...
      if (nameToMatch && (self.contacts[i].name != nameToMatch)) {
        matchesName = false;
      }

      // IF an email was provided and it doesn't match
      if (emailToMatch && (self.contacts[i].email != emailToMatch)) {
        matchesEmail = false;
      }

      // IF it passed both tests, include it in the results
      if (matchesName && matchesEmail) {
        results.push(self.contacts[i]);
      }
    }
    callback(null, results);
  };
```