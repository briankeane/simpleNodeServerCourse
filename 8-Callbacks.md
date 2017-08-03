# Callbacks

One of the most confusing concepts for me was the callback.  The app.get function in server.js line 4 takes two arguments, a string and a callback function.  That's really difficult to see from your first look at it.  

The easiest way for me to think about a callback is that you're calling "app.get" and telling it -- "hey -- keep hold of this function and perform it when you're finished doing whatever it is you're doing."

I think the best way to see this is to go backwards and write a function that takes a callback.  Make a new file called takesACallback.js and put this in it:

```
function addNumbers (numberOne, numberTwo, callback) {
  var total = numberOne + numberTwo;
  callback(total);
}

addNumbers(1,2, function (caluclatedTotal) {
  console.log('the caluclatedTotal is: ' + caluclatedTotal);
});
```

addNumbers takes three arguments, two numbers and a callback.  By looking at the code, we can tell that after this function has finished doing it's work, it calls the callback with 1 argument (total).

The confusing thing for me was: when you call 'addNumbers' at the bottom, how do you know that it will have one argument that's the total?  The answer is that -- you don't.  You can ONLY tell by looking at the original code or reading the 'documentation' for the addNumbers function.  So the best way to make it clearer would be to add comments before the function like this:


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
