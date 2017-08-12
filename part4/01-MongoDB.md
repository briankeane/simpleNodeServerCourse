# MongoDB and Mongoose

Now that we've got everything up and running, we need to figure out a better way to store our contacts than in memory on the server.  The normal method is to connect our server app to an outside database.

We'll use mongoDB since it's the easiest to set up and configure.  Even so -- this is a huge change to our app so this section will probably be the most confusing so far.  That's ok -- don't feel like you have to understand everything completely... It's better to let the process sink in.  It is VERY rare that you have to make this type of huge change to an app.

In order to use mongo we need to get a mongoDB server up and running on your computer for our app to talk to.  If you go to https://docs.mongodb.com/tutorials/install-mongodb-on-os-x/ and scroll down to the "Install MongoDB Community Edition with Homebrew" section, that's what we'll be following.

to install mongo, type this in the terminal:
```
brew update
brew install mongodb
```

By default, mongo stores the deatabase data in the `/data/db` folder.  If the folder doesn't exist already then it throws an error. So let's make the folder and then start the MongoDB.

```
mkdir -p /data/db   ## if this line throws a permissions error, try sudo mkdir -p /data/db
brew services start mongodb
```

If you get an error about permission to access /data/db, try `sudo chown -R $USER /data/db`.  This makes sure your unix user has permission to modify that particular folder.

That should do it -- but usually when you're doing any big installation like this you'll hit some errors, so if you do try googling them and then give me a call if it's not obvious what to do.

You may have to re-run `sudo services start mongodb` every time you restart your computer.