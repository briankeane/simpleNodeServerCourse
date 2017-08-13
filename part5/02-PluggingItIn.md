# Pluggin In Our New Function

Ok now that we have a new function for clearing the database, open up `contact.spec.js`, require the new SpecHelper module, and change our first beforeEach block to use our SpecHelper instead of calling `find({}).remove()`.  

Make the same change to `contact.api.spec.js`.
Solutions below:


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
// top of contact.spec.js
const expect = require('chai').expect;
const Contact = require('./contact.model.js');
const SpecHelper = require('../utilities/specHelper.js');

describe('A Contact', function () {
  beforeEach(function (done) {
    SpecHelper.clearDatabase(function (err) {
      done();
    });
  });
```
top of `contact.api.spec.js`
```

```