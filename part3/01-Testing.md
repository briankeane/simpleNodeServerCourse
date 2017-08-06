# Testing

You may have noticed while creating the SEARCH endpoint that building it with Postman is very time consuming.  Every time you make a change to the code, if you want to see whether or not it worked you have to:

1. Restart the server
2. Load 3-5 different contacts into memory.
3. Perform a search.
4. Perform a search on NAME
5. Perform a search on EMAIL
6. Perform a search with both NAME and EMAIL

Sometimes it can take up to a minute or two to figure out whether a small change worked or not.  Once an app gets to a certain level of complexity (signing in/out, etc) you start to spend more time manually testing your changes than it takes to make them.

With testing you can automate the whole setup of the environment so that you can run the code you've created in just a couple seconds.  To me this is by far the biggest advantage of having tests, but there are also two other big advantages.

1. These tests serve as an example for how to use the code you've written, so if you ever forget exactly what you called an endpoint or whether you used query or params, you can look at the test file and immediately refresh your memory.
2. When you make big changes to the internals (such as the way you store a contact), you can just run the tests and make sure they still pass instead of having to manually test all parts of your app.

There are a lot of things we have to do to get this app set up for testing.  Before you make a major change it is always a good idea to create a new github branch to hold your code.  Make sure your repo is up to date (type `git status` and if anything has changed and has not been pushed, go ahead and make a commit and push up the changes).  Then in the terminal type:

```
git checkout -b addTesting
```
