# Configuring for heroku

There are two things that heroku needs us to do in order to make the app work online.  The first is that it needs to know how to start the app.  Looking at the heroku instructions (https://devcenter.heroku.com/articles/deploying-nodejs#specifying-a-start-script) you can see that heroku looks in your package.json file for a "script" called "start" -- and then it uses whatever we put there to start the app.  Open up the package.json.

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