## Modules

In node, each separate file of code is called a 'module,' and modules are able to talk to each other through "require" statements.  Make a new file in the root directory called nameCaller.js.  In nameCaller.js type this:
```
var callName = function (name) {
  console.log('your name is ' + name ' and you are a poopyface');
}
```

Save nameCaller.js and reopen example.js.  Delete all the contents and replace it with this.
```
var NameCaller = require('./nameCaller.js');    // the ./ means "within this folder"

NameCaller('barry');
```

Now run the program with:
```
node example.js
```

## Exports
You will get a big fat error saying that NameCaller is not a function.  The reason is that we have to explicitly tell node what parts of the code to expose to outside modules.  The way we do this is with "module.export."  module.export is a variable that holds everything we want other modules to be able to see.  Go back to nameCaller.js and at the very bottom of the file add the line:

```
module.exports = callName;
```

Save nameCaller and rerun example.js.  This time it should work.

PRACTICE: create a new file called nameShouter.js that does the same thing in all caps.  Import that function into example.js and use it.