# One more callback example

There are a lot of times where you can probably guess what the callback will look like -- especially if the result of the call is obvious, like 'addNumbers' or 'subractNumbers.'

The most common javascript callback pattern is (err, result).  If no error occured during computation then err will be null or undefined.  To refactor takesACallback.js to the normal callback pattern:
```
//  function addNumbers
//       -- takes three arguments
//          -- numberOne (a number)
//          -- numberTwo (a number)
//          -- callback (a function that will be provided two arguments -- an errror if one occured, and the total);
//
//  example usage:
//  addNumbers(1,2, function (err, total) {
//    console.log(total);  
// })
//                 
function addNumbers (numberOne, numberTwo, callback) {
  // if the numbers are not numbers
  if ((typeof numberOne !== 'number') || (typeof numberTwo !== 'number')) {
    callback(new Error('both numbers must be numbers'));
  } else {
    var total = numberOne + numberTwo;
    callback(null, total);
  }
};

// examples of calling it
addNumbers("one", 2, function (err, result) {
  if (err) {
    console.log('there was an error!');
    console.log(err);
  } else {
    console.log('the total was: ' + result);
  }
});

addNumbers(1, 2, function (err, result) {
  if (err) {
    console.log('there was an error!');
    console.log(err);
  } else {
    console.log('the total was: ' + result);
  }
});
```

Now run this file and check out the output!

The main thing to take away is that the only way to know how to structure your callback is to look at an example.  This is definitely the toughest concept so far!  Let me know if you have questions about it.
