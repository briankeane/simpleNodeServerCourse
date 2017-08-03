## Understanding Require

You'll notice that node has loaded up "require('./nameCaller.js');" with the exact contents of whatever we assigned to module.exports within the nameCaller.js file.  To see what I mean, open up "nameCaller.js" and change the module.exports line to:
```
module.exports = 'this is a string';
```

Then open up example.js, delete everything, and replace it with the line:

```
console.log(require('./nameCaller.js'));
```

Now running `node example.js` should print the line 'this is a string.'  

Since 'this is a string' is what we stored in 'module.exports,' that string is what gets exposed to the other modules.