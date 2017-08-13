# Fix Remove

The problem with our `remove` function is that mongoose stores ids differently than we did in our array.

In mongo, an "id" is not a type Number or String.  It is actually a special Object that mongoose manipulates.  Instead of storing that id object in the database as "id", it stores it as "_id".

So how come most of our comparisons still work? (`expect(newContact.id).to.equal(savedContacts[1].id)`)  These work because mongoose provides a `virtual property` called `id` which is the String version of the real `_id`.  That's VERY confusing.

Virtual properties are properties that are calculated instead of being stored in the database.  We can create our own (and we will later).  You can use them just like a real property for anything except querying the database (because they don't really exist there).

That's why in 'remove' we have to use '_id' instead of 'id'.

We have two choices here: we could "wrap" the "remove" function so that it converts "_id" to "id" before we use it, or we could adapt the entire rest of the app to use _id when querying.

We're going to just change our test and use `_id` for searches.  Partially because our app is so small right now and we only have to adapt a couple tests, but also because searching by _id is pretty standard practice so we might as well stick to it and have as little code between us and the pure implementation as possible.

Go ahead and open up `contact.spec.js` and change the 'id:' to '_id:'.  then run the tests and watch them all pass!

Now we'll check out `contact.api.spec.js` and see what needs to be changed in our controller.