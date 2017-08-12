# Mongoose Setup

Now we're going to install `mongoose` and get it running.  Mongoose is an "object-relational-mapper" -- which really just means that it reads the database directly and then translates whatever is stored in the database to a javascript "model."  That will probably make more sense after this lesson.

In the terminal, type:
```
npm install --save mongoose
```

Now we need to connect to the database right at the beginning of our app.  Open up `server/server.js` and require mongoose at the top, with all the other require statements.

```
const mongoose = require('mongoose');
```

Now add this section just under `const app = express()`:
```
// Database Setup
mongoose.connect('mongodb://localhost:27017/contactMgr-dev', { useMongoClient: true });
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});
```

The first line connects to a database named `contactMgr-dev`. If that database does not exist, yet, then mongoose will automatically create it.  Port `27017` is mongodb's default port.  `useMongoClient` is a config property we are passing to mongoose, which just tells mongoose that we're using a 'connection string' to describe where the database is located.

The next couple lines pass a callback to mongoose to call in case of an error.  Since our app can't operate without the db connection, we are logging the error and then shutting down the app `process.exit(-1);`

Go ahead and start the app with `npm start` and make sure you don't get any errors.