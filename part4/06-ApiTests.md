# API tests

Now it's time to adapt our `contacts.api.spec.js` file.  First let's hook up our new `contact.model.js` file everywhere we need it.  The easiest way to do this is to delete our old `contact.js` file, since we don't need it anymore.  Then we can see what errors come up when we try to run our tests.  Go ahead and delete `server/contact/contact.js`

Now run `npm test` and you'll get a LONG error stack-trace.  When you get one of these, the thing to do is to find the first line in the stack that contains code that you've written yourself.  In this case, my output is:
```
module.js:474
    throw err;
    ^

Error: Cannot find module './contact.js'
    at Function.Module._resolveFilename (module.js:472:15)
    at Function.Module._load (module.js:420:25)
    at Module.require (module.js:500:17)
    at require (internal/module.js:20:19)
    at Object.<anonymous> (/Users/briankeane/code/learn/nodeCourse/server/contact/contact.controller.js:1:79)
    at Module._compile (module.js:573:32)
    at Object.Module._extensions..js (module.js:582:10)
    at Module.load (module.js:490:32)
```
so the line I'm looking for is : `at Object.<anonymous> (/Users/briankeane/code/learn/nodeCourse/server/contact/contact.controller.js:1:79)`.  That tells us relatively clearly that there is a problem in line 1, character 79 of our `server/contact/contact.controller.js file`.  Opening up that file, you'll see that it imports our old, newly non-existent `contact.js` file.  Go ahead and change that to `contact.model.js` and save the controller.

Now repeat the process until you get actual test failures instead of a loading error.  It should have you change 2 more files.

When that's done, take a look at our 10 failing tests.  What you'll probably notice immediately is that our `beforeEach` function no longer works for seeding our contacts because it's setting the non-existant `Contact.contacts` array instead of writing to the db.  Let's copy both beforeEach blocks from `contact.spec.js` into the top level of `contact.api.spec.js`, making the top of the file look like this:

```
describe('/contacts', function () {
  beforeEach(function (done) {
    Contact.find({}).remove(function (err) {
      done();
    });
  });

  var savedContacts;
  beforeEach(function (done) {
    Contact.create({
                     name: 'bob',
                     email: 'bob@bob.com'
                  }, function (err, savedContact0) {
      Contact.create({
                     name: 'sam',
                     email: 'sam@sam.com'
                  }, function (err, savedContact1) {
        Contact.create({
                     name: 'bill',
                     email: 'bill@bill.com'
                  }, function (err, savedContact2) {
          Contact.create({
                     name: 'bob',
                     email: 'bob@bob.com'
                  }, function (err, savedContact3) {
            Contact.create({
                     name: 'bill',
                     email: 'bill@bill.com'
                  }, function (err, savedContact4) {
              savedContacts = [
                                savedContact0,
                                savedContact1,
                                savedContact2,
                                savedContact3,
                                savedContact4
                              ];
              done();
            });
          });
        });
      });
    });
  });
```
Now run our tests again.  Still 10 failures!  Let's take them one at a time:

The first failure for me is:
```
  1) /contacts searches by email:
     Uncaught AssertionError: expected [ undefined, undefined ] to include 1
      at Test.<anonymous> (server/contact/contact.api.spec.js:285:28)
      at Test.assert (node_modules/supertest/lib/test.js:179:6)
      at Server.assert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1544:8)
      at _combinedTickCallback (internal/process/next_tick.js:71:11)
      at process._tickCallback (internal/process/next_tick.js:98:9)
```
With test faiulres, too, find the first line of code mentioned that you wrote yourself.  In this case it's the top one: `at Test.<anonymous> (server/contact/contact.api.spec.js:285:28)`.  Checking line 285 for me brings up: `expect(ids).to.contain(1);`

So first off we know that line is wrong -- the id is no longer 1.  Let's fix that by changing line 285 and 286 to be:
```
            expect(ids).to.contain(savedContacts[0].id);
            expect(ids).to.contain(savedContacts[3].id);
```

Run `npm test` again.  Failure!  There's a clue in the red part (`expected [ undefined, undefined ] to include`.  We were expecting 2 ids in that array, but instead we got undefined. Obviously, res.body.results looks different from what we expect.  Let's `console.log` it.  Add `.only` to focus on this test and add this line right after the `} else {` so we can get a good look at the response body:
```
console.log(res.body);
```

Now run `npm test`.  Do you see the problem?  We were expecting our contacts to look like:
```
{
  id: '598e24bf01c02458e5a554d4',
  etc...
}
```
but we got:
```
{
  _id: '598e24bf01c02458e5a554d4',
  etc...
}
```
Basically our api is exposing our internal Contact model just like it looks internally, but that's not really what we want.  We want to rename '_id' to 'id' and we don't need that '__v' field at all.

Fortunately, mongoose has a special method for "transforming" the contact just at the last step, as it's leaving the api. Open up `contacts.model.js` and add this to our ContactSchema:
```
var ContactSchema = new Schema({
  name:                 { type: String },
  email:                { type: String },
}, {
  toJSON: {
    transform: function (doc, ret, options) {
      return {
        id: ret._id.toHexString(),
        name: ret.name,
        email: ret.email
      };
    }
  }
});
```

`toJSON` is a special property you can pass to mongoose that will modify a model as it's being changed from a model to a JSON object.  This is a step that is performed inside of express's `res.send` function, so basically it's the last step before a model leaves our app to go to the front end.  Because of that, we can use it to make any last-second formatting changes we want.

Don't worry -- there's no way to know how to do this except to have someone show it to you.  And nobody knows it by heart.  But from here on out when we make a new model you can just copy/paste from `contact.model.js` for a nice template.

Run `npm test` again and you should get much better looking contact models with passing tests!
```
{ results:
   [ 
     { id: '598e25fdb487e2590e557aee',
       name: 'bob',
       email: 'bob@bob.com' },
     { id: '598e25fdb487e2590e557af1',
       name: 'bob',
       email: 'bob@bob.com' } 
    ] 
  }
```

Just to show you how transform is working, go into `contact.model.js` and change transform to just return an unrelated message:
```
var ContactSchema = new Schema({
  name:                 { type: String },
  email:                { type: String },
}, {
  toJSON: {
    transform: function (doc, ret, options) {
      return {
        message: 'this is a useless message'
      };
    }
  }
});
```
Now when you run `npm test`, no matter what information is stored in your Contact models you will receive:
```
{ results:
   [ { message: 'this is a useless message' },
     { message: 'this is a useless message' } ] }
``` 
Internally all that contact info is the same, but all we expose to the api users is the "useless message."  Now go ahead and change `transform` back to it's working form, remove the `console.log(res.body);` from the test, and run `npm test` to make sure it's still passing.  Now remove `.only` and we'll tackle the rest of them.

Ok change `transform` back how it was and we'll finish fixing the api tests.