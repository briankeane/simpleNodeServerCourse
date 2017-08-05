# Testing

You may have noticed while creating the SEARCH endpoint that building it with Postman is very time consuming.  Every time you make a change to the code, if you want to see whether or not it worked you have to:

1. Restart the server
2. Load 3-5 different contacts into memory.
3. Perform a search.
4. Perform a search on NAME
5. Perform a search on EMAIL
6. Perform a search with both NAME and EMAIL

You could come up with a system with many Postman tabs where you can get all this done with a few clicks, but a much better way to do this is to automate the setup and teardown so that you can run the code you've created in just a few seconds.  To me this is by far the biggest advantage of having tests, but there are also two other big advantages.

1. These tests serve as an example for how to use the code you've written, so if you ever forget exactly what you called an endpoint or whether you used query or params, you can look at the test file and immediately refresh your memory.
2. When you make big changes to the internals (such as the way you store a contact), you can just run the tests and make sure they still pass instead of having to manually test all parts of your app.

There are a lot of things we have to do to get this app set up for testing.  Before you make a major change it is always a good idea to create a new github branch to hold your code.  In the terminal type:

```
git checkout -b messyBranch
```

The -b flag tells it to create a new branch.  Now go into server.js and delete eveything and replace it with junk:
```
dfsakljhfdsahlfasdkhjlasdfkljhfas
fasdlkjasfdjklkjsadf

fadskjhasdfjkhlhjkfas
fdasklhjafslkjfas
```

This is to simulate what happens when you try and add a crappy library and discover it's wrong for your app.  You will have lots of little lines of code across dozens of files that need to be reverted, so you can imagine what a mess it usually is to dig yourself out of.

Save that junk into your file and type this into the terminal
```
git add --all
git commit -m "deleted everything"
git push origin messyBranch   # notice the switch.  We're no longer
                              # working on the master branch
```
Now try to start your server and watch it fail.
```
npm start
```
Now revert your changes with one line and try your server again:
```
git checkout master
npm start
```
So easy, right?  Now delete the crappy branch and start a new one for adding testing.
```
git push origin --delete messyBranch
git checkout -b addTesting
```
