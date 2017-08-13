# API Tests Final

Ok we are finally down to our last failing test!
```
  1) /contacts DELETE /contacts/:id deletes a contact:
     Uncaught AssertionError: expected [ Array(5) ] to not include '5990b7262c3514920bc58428'
```

The error is in our `contact.controller.js` file in the `delete` function.  Can you spot it?  If not, add a couple `console.logs` and see if you can track it down.

Here's one hint: you'll have to insert one character in order to make it work again.

Solution Below:
```
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

Contact.remove({ _id: req.params.id }, function (err) {
 // instead of 
 Contact.remove({ id: req.params.id }, function (err) {
```
Now delete `.only` and check it out!  All tests should pass!  Go ahead and delete `contact.js` now -- we don't need it anymore.

If you found that exhausting, that's ok -- it was.  The takeaways are:

1. We made a MAJOR change to the internals of our app.  This is not the type of thing you do often -- maybe once or twice a year -- and because we had good tests we knew exactly what code was broken.  Imagine doing that same thing with hundreds of Postman requests!
2. Even though we didn't consciously run through our code line-by-line, because of our tests we can be confident that the pieces of the code that we DIDN'T touch are also fully working.

This is why it's really reassuring to have great tests -- especially great integration tests.  Now it's definitely time for a break.
