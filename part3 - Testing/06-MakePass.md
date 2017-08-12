# Make it Pass

Now it's time to make the test pass.  See if you can complete the code in contacts.js to make it work.  It will be similar to what we have in server.js, but this time it needs to be async and call a callback function when complete.  HINT: You'll have to use the 'self' that we assigned to "this" in the constructor function.

When you think you've come up with something that works, run the test and see if it passes.  If it doesn't, use the information in the failure or error message (and feel free to add some console.logs) to fix it.
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

  this.create = function (attrs, callback) {
    attrs.id = self.contactsID;
    self.contactsID++;
    this.contacts.push(attrs);
    callback(null, attrs);
  };

```