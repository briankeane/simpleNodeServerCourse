## A Web Server

A server is a loop that loops over and over again, constantly listening for new incoming connections & handling one if it's come in.  Create a new empty file called server.js.  Here is what we want:

```
var server = function () {
  while(true) {
    // IF a request was made
      // Send back a response
    // ENDIF
  }
}

```

There are all kinds of relatively low leve things that a real server needs to do, so instead of writing all that code ourselves we are going to use a library that creates a server for us.  The library is called Node Express.