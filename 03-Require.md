## Understanding Require

You'll notice that node has loaded up "require('./nameCaller.js');" with the exact contents of whatever we assigned to module.exports within the nameCaller.js file. 


To see what I mean, open up "nameCaller.js" and change the module.exports line to:
```
module.exports = 'this is a string';
```

Then open up example.js, delete everything, and replace it with the line:

```
var myString = require('./nameCaller.js');
console.log(myString);
```

Now running `node example.js` should print the line 'this is a string.'  

The point is that we can set modules.export to anything we want -- a string, a function, or an object with a bunch of strings and functions.

Since 'this is a string' is what we stored in 'module.exports,' that string is what gets exposed to the other modules.