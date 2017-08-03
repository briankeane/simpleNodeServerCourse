# Using an Outside Library

Using an outside library of someone else's code in Node is very easy with npm (Node Package Manager).  In the terminal, in the main directory of the project, type:
```
npm init
```

Just press enter through all the questions - or answer them (doesn't matter -- this info won't get used).  Since it performs all the setup for npm, you'll only need to `run init` once per project.  

A new file will be generated in your root folder called 'package.json'.  npm uses your package.json to keep track of all the outside libraries you are using. 

Now to install express, just type:

```
npm install --save express
```

"express" is the name of the package.  The '--save' flag tells npm to add "express" to your package.json file so it can keep track of it in the future.  If you forget --save, express will still be installed but it won't add it to your package.json file.

Open up your package.json file and notice that there's a new section called "dependencies" with an entry called "express" and the version number that's installed.  If you want to remove express from your project later, you just go in and delete this line.  Also if you want to update to a newer version, you open up the package and change the version number.

Now in the terminal type `open .` to open a finder window of the current directory.  You'll see that npm made a new folder called 'node_modules'.  NPM stores all outside libraries in this folder.  If you open up that folder you'll see that there are a zillion libraries in there -- not just express.  This is because it has to install all of express's dependencies, too.  NPM's main job is to keep track of all of these folders and makes sure there aren't any conflicts between the different versions of each library.  If there are, it tells you so you can tweak the version numbers until they work together.  That usually isn't necessary, though.

After you've installed a library, it is available in any module via the 'require' keyword.  So now you can go back into server.js and replace the contents with the line

```
var express = require('express');
```

Notice that the string you pass to require is not './node_modules/express' That's because node automatically searches your node_modules folder if it doesn't find the require string somewhere else.  So, if the library is in your node_modules, you don't need to tell require the exact location of the folder.

PRACTICE -- Later on we'll use a package called "morgan" to log requests...  For practice, install the 'morgan' package now and make sure it showed up in your package.json.  Start by googling `npm morgan` and you should find the instructions for installing (which should be pretty much the same as express)