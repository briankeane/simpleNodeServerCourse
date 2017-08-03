## Require with Lots of Functions and Vars

Usually when you create a module, you want to expose a bunch of related functions and variables instead of just one.  One way to do this is by constructing an object that includes all those functions and then exporting that object.  Go back into nameCaller.js and change the code to this:

```
function NameCaller() {
  var self = this;      // I'll explain this later. for now just know that 'self' will pretty much
                        // act like you'd expect, but 'this' does some weird things.

  this.message = 'hello';
  
  this.callName = function (name) {
    console.log('your name is ' + name ' and you are a poopyface');
  };

  this.sayMessage = function () {
    console.log('the message is: ' + self.message);
  }
}

module.exports = new NameCaller();      // this creates the NameCaller object and exposes it
                                        // to other modules
```

Now go back into example.js and try this:
```
var NameCaller = require('./nameCaller.js');

console.log(NameCaller.message);
NameCaller.callName();
NameCaller.sayMessage();
```

Cool huh?