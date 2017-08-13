# Mongoose Model

Now that mongoose is plugged in -- let's go ahead and connect our `contact` to our database model.

Since it's so different from our contacts handler, let's make a new file called `contact.model.js` inside of our `server/contact` folder and open it up.

Paste this code into it:
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name:                 { type: String },
  email:                { type: String },
});

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;
```

This code is pretty confusing -- but you should know that I just copy/paste/edit every time I create a new DB model, so it's nothing you have to memorize.

The 'Schema' defines how the db document will map to our model object.  The 2nd to last line (`const Contact = mongoose.model('Contact', ContactSchema);`) is where most of the work gets done.

`mongoose.model` creates a class out of the schema.  It automatically attaches some methods to the class, like 'find, findById, create, and remove.'  These commands do pretty much exactly what our custom versions did, only instead of searching the in-memory array they search our new database.

What's really cool is that we can use our `contacts.spec.js` file to make sure our new mongoose models will function just like our old ones.

Save `contact.model.js` and open up `contacts.spec.js`.  Then change the first line `const Contact = require('./contact.js')` to use our new model file instead: `const Contact = require('./contact.model.js');`

Normally we could plug in our unit tests to let us know about any tweaking that needs to happen, but because these were our first tests we set them up in a much more 'brittle' way than we normally would.  Next, we need to revise our tests so that they look a little more like the tests that work in the real world.