-------------------------------------------------------------------------------------

## Require

You'll notice that node has loaded up "require('./nameCaller.js');" with the exact contents of whatever we assigned to module.exports within the nameCaller.js file.  To see what I mean, open up "nameCaller.js" and change the module.exports line to:
```
module.exports = 'this is a string';
```

Then open up example.js, delete everything, and replace it with the line:

```
console.log(require('./nameCaller.js'));
```

Now running `node example.js` should print the line 'this is a string.'  Since we stored 'this is a string' in 'module.exports,' we exposed it to the rest of the node app.

----------------------------------------------------------------------------------------

## Require with Lots of Functions and Vars

Usually when you create a module, you want to expose a bunch of related functions and variables instead of just one.  One way to do this is by constructing an object that includes all those functions and then exporting that object.  Go back into nameCaller.js and change the code to this:

```
function NameCaller() {
  var self = this;      // I'll explain this later. for now just know that it makes it so
                        // we can use the variable 'self' to refer to the new object.

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

--------------------------------------------------------------------------------------------

## A Web Server

A server is a loop that loops over and over again, constantly listening for new incoming connections & handling one if it's come in.  Create a new empty file called server.js.  Here is what we want:

```
var server = function () {
  while(true) {
    // IF a request was made
      // Send back a response
    // ENDIF
  }
}

```

There are all kinds of relatively low leve things that a real server needs to do, so instead of writing all that code ourselves we are going to use a library that creates a server for us.  The library is called Node Express.

-------------------------------------------------------------------------------------------

# Using an Outside Library

Using an outside library of someone else's code in Node is very easy with npm (Node Package Manager).  In the terminal, in the main directory of the project, type:
```
npm init
```

Just press enter through all the questions - or answer them (doesn't matter -- this info won't get used).  You'll only need to run init once per project.  A new file will be generated in your root folder called 'package.json'.  npm uses your package.json to keep track of all the outside libraries you are using.  To install express, just type:

```
npm install --save express
```

"express" is the name of the package.  The '--save' flag tells npm to add "express" to your package.json file so it can keep track of it in the future.  If you forget --save, express will still be installed but it won't add it to your package.json file.

Open up your package.json file and notice that there's a new section called "dependencies" with an entry called "express" and the version number that's installed.  If you want to remove express from your project later, you just go in and delete this line.  Also if you want to update to a newer version, you open up the package and change the version number.

Now in the terminal type `open .` to open a finder window of the current directory.  You'll see that npm made a new folder called 'node_modules'.  NPM stores all outside libraries in this folder.  If you open up that folder you'll see that there are a zillion libraries in there -- not just express.  This is because it has to install all of express's dependencies, too.  NPM keeps track of all of these folders and makes sure there aren't any conflicts between the different versions of each library.  If there are, it tells you so you can tweak the version numbers until they work together.  This usually isn't necessary, though.

After you've installed a library, it is available in any module via the 'require' keyword.  So now you can go back into server.js and replace the contents with the line

```
var express = require('express');
```

If the library is from your node_modules, you don't need to tell require the exact location of the folder... it will automatically find it.

## PRACTICE -- install the 'morgan' package and make sure it showed up in your 

--------------------------------------------------------------------------------------------

# Figuring Out How To Use an Outside Libary

Something to get used to with outside libraries is googling the 'documentation' in order to figure out how to use it.  Google 'node express documentation' and click on the first link (Express 4.x API Reference)  Click on "Getting Started" in the top menu (may have to click the square thing on the top left to get it)

'Installation' will give you instructions for `npm install --save express` just like we just did.  Click on the `Hello Word` example.  We'll talk about how it's working in the next section but for now, cut and paste the entire example into our `server.js` file.  Save it and in the terminal type: `node server.js`

It should print 'Example app listening on port 3000!' and then (behind the scenes) start it's infinite event loop.  Now we can check to see if it's working.

Open your chrome browser and point it to `localhost:3000`  You should get the message 'Hello World!' 

-------------------------------------------------------------------------------------------

# Callbacks

One of the most confusing concepts for me was the callback.  The app.get function in server.js line 4 takes two arguments, a string and a callback function.  That's really difficult to see from your first look at it.  

The easiest way for me to think about a callback is that you're calling "app.get" and telling it -- "hey -- keep hold of this function and perform it when you're finished doing whatever it is you're doing."

I think the best way to see this is to go backwards and write a function that takes a callback.  Make a new file called takesACallback.js and put this in it:

```
function addNumbers (numberOne, numberTwo, callback) {
  var total = numberOne + numberTwo;
  callback(total);
}

addNumbers(1,2, function (caluclatedTotal) {
  console.log('the caluclatedTotal is: ' + caluclatedTotal);
});
```

addNumbers takes three arguments, two numbers and a callback.  By looking at the code, we can tell that after this function has finished doing it's work, it calls the callback with 1 argument (total).

The confusing thing for me was: when you call 'addNumbers' at the bottom, how do you know that it will have one argument that's the total?  The answer is that -- you don't.  You can ONLY tell by looking at the original code or reading the 'documentation' for the addNumbers function.  So the best way to make it clearer would be to add comments before the function like this:


```
//  function addNumbers
//       -- takes three arguments
//          -- numberOne (a number)
//          -- numberTwo (a number)
//          -- callback (a function that will be provided one argument -- the total)
//
//  example usage:
//  addNumbers(1,2, function (total) {
//    console.log(total);  
// })
//                 
function addNumbers (numberOne, numberTwo, callback) {
  var total = numberOne + numberTwo;
  callback(total);
}
```

There are common patterns for callbacks and you start to get used to them and after a while you can usually guess what arguments the callback will need.  But at first you need to just look at the example usage.  The code that you are calling (addNumbers) should have some kind of documentation to tell you how to make the callback that it's asking for.

Totally confusing.

------------------------------------------------------------------------------------------

# One more callback example

The most common javascript pattern is (err, result).  If no error occured during computation then err will be null or undefined.  To refactor takesACallback.js to the normal callback pattern:
```
//  function addNumbers
//       -- takes three arguments
//          -- numberOne (a number)
//          -- numberTwo (a number)
//          -- callback (a function that will be provided two arguments -- an errror if one occured, and the total);
//
//  example usage:
//  addNumbers(1,2, function (total) {
//    console.log(total);  
// })
//                 
function addNumbers (numberOne, numberTwo, callback) {
  // if the numbers are not numbers
  if ((typeof numberOne !== 'number') || (typeof numberTwo !== 'number')) {
    callback(new Error('both numbers must be numbers'));
  } else {
    var total = numberOne + numberTwo;
    callback(null, total);
  }
};

// now you can call it
addNumbers("one", 2, function (err, result) {
  if (err) {
    console.log('there was an error!');
    console.log(err);
  } else {
    console.log('the total was: ' + result);
  }
});

addNumbers(1, 2, function (err, result) {
  if (err) {
    console.log('there was an error!');
    console.log(err);
  } else {
    console.log('the total was: ' + result);
  }
});
```

The main thing to take away is that the only way to know how to structure your callback is to look at an example.  This is definitely the toughest concept so far!  Let me know if you have questions about it.

---------------------------------------------------------------------------------------------

# Add Git and Deploy the Server

It's a good idea to get the server online as quick as possible.  If you keep deploying the server to a computer online then you can catch problems as you go instead of dealing with them all at once at the end.

First lets add git to the project.  Go to http://github.com, find the create a new repository option and make one called sampleServer. 

There's one more thing we want to do before we push up your repo.  We don't want all the 'node_modules' to go to git.  The node_modules folder you have is specific to mac OS, so if someone with a PC or a different version of linux downloads your repo, the node_modules folder won't work for them anyway.  It's better for them to just copy your repo and then run `npm install` themselves -- the package.json already has all the info that npm needs to get the right node_modules to run on their computer.

Git will automatically look for a file called .gitignore, and if it exists it will ignore anything listed in that file.  In the terminal, create the .gitignore file by typing:

```
touch .gitignore
```

Open .gitignore in sublime text and put this in it:
```
node_modules
```

That's it!  Now type this to make your first commit and push it up
```
git init
git add --all
git commit -m "Initial Commit"
git push -u origin master
```

The -u means upstream and you only need to use it the first time you do a git push.

Now the repo should be online!

--------------------------------------------------------------------------------------------

# Deploy with Heroku

Now that your repo is up on git, we'll actually deploy it to the web!  The first step is to go to www.heroku.com.  Make an account, and after you've made an account go to "create new app."  Under App Name type something unique (try 'bpkeanesampleserver' or something like that).

I'm not sure if you have heroku installed on your computer.  Type `which heroku` and if you get an answer (something like `/usr/local/heroku/bin/heroku/`, you're all good.  If it says heroku not found, type:

```
brew update
brew install heroku
heroku login   # then enter the email and password you just made
```

Now heroku needs a copy of your git repository.  the way you do that is to add a git "remote" on heroku.com. Whenever you 'push' to this repository, heroku will build your app and run it.

To create the heroku repo, type:
```
heroku git:remote -a bpkeanesampleserver
```

Now push it up, but instead of your usual remote that exists on github, use your new one that exists on heroku:
```
git push heroku master
```

That's it -- the hello world is now on the web!  There's still a couple things we have to do to get it to actually work, though....

--------------------------------------------------------------------------------------------

# Configuring for heroku

There are two things that heroku needs us to do in order to make the app work online.  The first is that it needs to know how to start the app.  Looking at the heroku instructions (https://devcenter.heroku.com/articles/deploying-nodejs#specifying-a-start-script) you can see that heroku looks in your package.json file for a "script" called "start" -- and then it usese whatever we put there to start the app.  Open up the package.json.

Make the "scripts" section look like this:
```
  "scripts": {
    "start": "node server.js"
  }
```

The other thing we need to do is tell the app to let heroku use whichever port it wants.  Right now we have port 9000 hard-wired.  So how does heroku talk to our app and tell it what port to listen to?

The answer is with an "environment" variable.  Environment variables are accessible in node via the "process.env" object.

Add this to the top of server.js:
```
console.log(process.env.IM_AN_ENV_VAR);
```

Then go back to the terminal and run this:
```
IM_AN_ENV_VAR="hi im a variable" node server.js
```

Heroku provides an env var called "PORT" that tells us which port to run the app on.  What we want to do is set PORT to that if it exists... if not, we want a default port of 3000.  (or whatever you want. 3000 is kind of "standard" but it doesn't actually mean anything).

At the top of server.js, remove the console.log test and put this just under the require statements:

```
var port = process.env.PORT;
if (!port) {
  port = 3000;
}
```

This sets the port to whatever PORT is.  Then it checks to see if that worked.  If not, it sets it to our default.

Go to the terminal and type:

```
node server.js
```

It should run on our default port.  Now ctrl-c to stop the server and try:

```
PORT=8000 node server.js
```

It should start on 8000 now.

### Cleanup:
One more thing -- there's a slightly cleaner way to check and set for a default.  Replace this:
```
var port = process.env.PORT;
if (!port) {
  port = 3000;
}
```

with this:

```
var port = process.env.PORT || 3000;
```

In javascript, you can use an || in an assignment statement to provide a default.  Javascript will look for the first "truthy" value and that's the one it will use.

Examples:
```
var empty1, empty2, empty3;
var hasValue1 = 500;
var testVar = empty1 || empty2 || hasValue1 || empty3 || 3000;
console.log(testVar);  // 500
```

Now go to the app.listen statement at the bottom, and replace 3000 with our new variable.
```
app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});
```

In the terminal, type:
```
git add --all
git commit -m "fixed port and script for heroku"
git push origin master
```

Now push it up to heroku:
```
git push heroku master
```

Wait for heroku to do it's thing... at the end open your chrome browser and point it to: `https://bpkeanesampleserver.herokuapp.com` and see if you get 'Hello World!' 

If not -- it's pretty normal to have to troubleshoot a little bit, so call me up and we'll take a look.  If so, awesome!