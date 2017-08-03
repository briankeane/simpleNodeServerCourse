# Intro to Node

Node JS is a program for executing javascript code from the command-line instead of in the browser.

From the root directory of this folder, make a new empty node file by typing:

```
touch example.js
```

Then open up the directory in sublime text by typing:

```
subl .   // the dot is linux's way of saying 'this folder'
```

Now in sublime text double click on example.js and type this code:

```
console.log('statement 1');
console.log('statement 2');

var sayName = function () {
  console.log('hi i am brian');
};
```

Save the file.  Go back to the terminal.

In order to execute a file with node, you type:
```
node [filepath]
```

so for this you type:
```
node example.js
```

Node will open the file and execute every statement in order.  It will print the first two statements, and then execute the third statement.

It does not print 'hi i am brian' because the function does not actually get called anywhere -- the statement just loads that function into the variable called 'sayName'.

Now open up example.js and at the bottom add the statement:
```
sayName();
```

Now when you type `node sayName` it will:
  1. print statement 1
  2. print statement 2.
  3. load the function into the var sayName
  4. execute the function (printing 'hi i am brian')

For practice:
Make a new file that loads a function into a variable and then calls the function.  Then execute it with `node [filename]`