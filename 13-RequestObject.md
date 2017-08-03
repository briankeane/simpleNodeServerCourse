## The Request Object

Now it's time to get the app to actually do something dynamic with data that gets passed to it.  In server.js, look at the section:
```
app.get('/', function (req, res) {
  res.send('Hello World!')
});
```

This assigns a function to whenever a user vists the home ('/') part of the website with a 'GET' verb.  It's saying (anytime someone visits '/', perform this function).  From the express documentation, we know that this callback is provided two arguments, `req` (for the request object), and `res` for the response object.

All information in a get request is passed as part of the address.  There are two ways to get that info.  The first is with the `params` object.  It's attached to the `req` object.

Underneath that app.get section, add a new app.get
```
app.get('/addViaParams/:numberOne/:numberTwo', function (req, res) {
  // here we can get the two numbers off the params object
  // Convert them to numbers because they come in as strings
  var numberOne = Number(req.params.numberOne);
  var numberTwo = Number(req.params.numberTwo);

  // then we can respond with the total
  res.send(`${numberOne + numberTwo}`);   // convert back to string
});

```

Go ahead and start (or restart) the server.  Then in chrome point the browser to: `localhost:3000/addViaParams/5/12` and see if it responds 17.

If it does and you don't get any errors, go ahead and commit and push the changes. Then redeploy.
```
git add --all
git commit -m "add addViaParams endpoint"
git push origin master
git push heroku master
```

Now visit it online and see if it works there too!