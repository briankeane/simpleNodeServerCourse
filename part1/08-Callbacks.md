# Callbacks

One of the most confusing concepts for me was the callback.  

In node, whatever code you are running has complete control of the event loop and nothing else can run.  So for functions that have to wait on something external to happen (receive a request... get a network response from another computer... wait for a file to load... etc), you can't really "wait" for the answer.

In regular "syncronous" programming, you can just wait for the answer and the "return" it.
```
function syncAddNumbers(a,b) {
  return a+b;
}

var total = syncAddNumbers(1,5);
console.log(total);   // 6
```

But if you have to "wait" on something, returning would block anything else from executing while we wait for the response:
```
function syncAddNumbersViaApiRequest(1,5) {
  var total = askAnotherNetworkSomewhereToAddNumbersSyncronously(1,5);  // let's say this takes 5 secs
  return total;
}
```

Since it could take up to 5 secs to assign the value to 'total', we want to free up the cpu to do other stuff while we're waiting.  That's where an 'asyncronous' callback is useful.  You are essentially saying to the called function: "Do this other function when you're finished doing what you're supposed to do."

So an async version would look like this:
```
function asyncAddNumbers(a,b, callback) {
  askAnotherNetworkSomewhereToAddNumbersAsyncronously(a,b, function (total) {
    callback(total);
  });
}

asyncAddNumbers(5,2, function (total) {
  console.log(total);
});
```

So now the question is: how do you know to put (total) as the argument in the callback function? It seems like magic, but the answer is just that you have to find an example of asyncAddNumbers and copy it or read it's documentation.

I think the best way to see this is to go backwards and write a function that takes a callback.  Make a new file called takesACallback.js and put this in it:

```
// here's the 
addNumbers(1,2, function (calculatedTotal) {
  console.log('the calculatedTotal is: ' + calculatedTotal);
});

function addNumbers (numberOne, numberTwo, callback) {
  // (You fill this in)
}

```


```
//
//
//
//     Scroll down for the solution...
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
function addNumbers (numberOne, numberTwo, callback) {
  var total = numberOne + numberTwo;
  callback(total);
}
```
So in order to write a function that calls the callback correctly, you just look at the code that needs to call it and make sure when you invoke `callback` from within the function it's done in the right way.

If addNumbers was inside of someone else's library (which is usually what you'll be dealing with), then how do you know which arguments to put into the callback?  The answer is that you have to check the documentation or find an example of the function in use.  So... when working in Node you have to deal with a lot more googling and reading other people's documentation than you're probably used to.  A great example of documentation that has great example is the express docs at http://expressjs.com/en/api.html.  Notice how they always provide a function with an example callback, so that you can copy the arguments when you call their function yourself.

I like to document the callback right within the function, so in the code I'll put something like this:
```
//  function addNumbers
//       -- takes three arguments
//          -- numberOne (a number)
//          -- numberTwo (a number)
//          -- callback (a function that will be provided one argument -- the total)
//
//  example usage:
//  addNumbers(1,2, function (total) {
//    console.log(total);  
// })
//                 
function addNumbers (numberOne, numberTwo, callback) {
  var total = numberOne + numberTwo;
  callback(total);
}
```

There are common patterns for callbacks and you start to get used to them and after a while you can usually guess what arguments the callback will need.  But at first you need to just look at the example usage.  The code that you are calling (addNumbers) should have some kind of documentation to tell you how to make the callback that it's asking for.

Totally confusing.
