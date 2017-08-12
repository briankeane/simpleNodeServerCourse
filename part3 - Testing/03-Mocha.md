# Mocha

There are a lot of testing suites to choose from, but the most popular (and my favorite) is called mocha.  Go ahead and install mocha.
```
npm install --save-dev mocha
```
The --save-dev flag tells npm that you only want this for your development environment.  (That way, heroku does not need to install it on the deployed server version).

Now open your package.json.  You'll see that there's a new section called devDependencies, with mocha in it.

Now we need to add a new script to run our tests.  Add this new entry to "scripts" (making sure you add a comma to separate the two entries).
```
  "test": "mocha ."
```

--The `.` means look for test files in this folder.  Go ahead and try to run your tests in the terminal with npm test.  It should start up, but say it can't find any tests.  

There's one more library we're going to use called "chai."

PRACTICE -- install "chai" (google "npm chai installation") into our devDependencies.

Now let's make our first test.