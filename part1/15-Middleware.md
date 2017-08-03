## Middleware

Express provides a pretty cool and easy way to plug things into our app to get executed any time a request is called.  In express these other libraries that get executed are called 'middleware.'

The way you add middleware to an express app is to assign it with the 'use' function.  That middleware will be called on any route that is defined AFTER the middleware is plugged in.  For example if this was in server.js:
```
app.get('/something', callback);
app.get('/somethingElse', callback);

app.use(function (req, res, next) {
  console.log('this will only log when /finally is visited.');
  next();  
});

app.get('/finally', callback);
```

The best way to see this is to add logging to the app.  Open up server.js and add this code just under `app = express();`.  (It must be before any of your routes are declared with .get)
```
app.use(function (req, res, next) {
  console.log(`request made to ${req.method} ${req.originalUrl}`);
  next();
});
```

The next() above is a callback that just tells express "ok im finished... you can continue now."  Either the next middleware will be called or, if there are no more middlewares left, the response function will be called.

Save the file and run node server.js.  Then visit localhost:3000 and refresh a few times to see it logging.

Now lets use that 'morgan' library you installed earlier. It is just a heftier version of the same logging function. At the top of the file, add the line:
```
const morgan = require('morgan');
```

Now replace our primitive logger function with the line:

```
app.use(morgan('dev'));
```

Now restart your server and see if it's prettier.  If it works, push the changes to github and heroku.  Then type:
```
heroku logs --tail
```

This will let you see the heroku logs as they are being made.  Visit the online version of the app with your browser and you should see your visits logged.
