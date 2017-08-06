# Cleanup

It's probably not super obvious because our app is still small, but it's beginning to become a bit of a mess.  With this "flat" structure (no subfolders), somebody new to our app would have a difficult time figuring out what `contact.js` does or which file to open up to see what code handles our requests.  It's time to break it up into a more organized structure.

There are lots of common file structures that people use, but the one I like the most is to have all related stuff in the same folder.  That way if we are testing 'contacts' functions we have all the tests, models, a  Say we added user.js and calendarEntry.js to this app.  Then we could structure it like this:
```
--root
  package.json
  -- node_modules
  -- server
    server.js
    --user  (folder)
        user.js
        user.spec.js
        user.api.spec.js
    --contact  (folder)
        contact.js
        contact.spec.js
        contact.api.spec.js
    --calendarEntry  (folder)
        calendarEntry.js
        calendarEntry.spec.js
        calendarEntry.api.spec.js

```
We also can isolate all of the configuration files that have to be in the root directory (package.json, .gitignore, etc), and move all of our actual code cleanly into 'server.'

Lets go ahead and get that started!  Create a folder by going into terminal and typing:
```
mkdir server
cd server
mkdir contact
cd ../..
cd ..
open .
```

Then drag contact, contact.spec.js, and contact.api.spec.js into the new `contact` folder.

Drag `server.js` into our new `server` folder.

We'll have to modify our require statements so everything can find each other.  In contact.api.spec.js, change the line:
```
const app = require('./server.js');
```
to
```
const app = require('../server.js');    // '../' means "up a folder"
```

Then in `server.js` change:
```
const Contact = require('./contact.js');
```
to
```
const Contact = require('./contact/contact.js');
```

Now is a good time to point out that you can leave off the `.js` in a require statment if you want.  So: `const Contact = require('./contact/contact');` would also work.  I like to be explicit, though.

Now try running your tests.  You'll notice that mocha no longer finds our tests.  Easy fix -- open up your `package.json` and change our "test" script to: "mocha server --recursive" ('server' refers to the 'server' folder -- we're saying "find any test files inside of 'server'")  `--recursive` means to search subfolders for test files, too.

While you're in package.json we also need to make one more change -- "start" needs the path to server.js, so change it to: "node server/server.js"

This is much cleaner.  In the next and last lesson of this section we'll take it even one step further...