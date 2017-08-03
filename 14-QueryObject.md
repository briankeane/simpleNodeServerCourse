## The Query Object

The other way to get the numbers is via the "query" object, which comes from everything after a question mark in the address.  For a good example, type anything into google and when the results page comes up, look at the address bar.  It'll be something like:

```
https://www.google.com/search?safe=off&q=google+something&oq=google+something&gs_l=psy-ab.3..0i67k1j0l3.14613.16109.0.16251.12.8.0.0.0.0.247.766.0j4j1.5.0....0...1.1.64.psy-ab..7.5.764...0i13k1j0i10k1.sXQArQ40FrM
```

You can see the different query parameters: `safe=off`, `q=google+something`, `gs_l=abunchofjunk`

Lets add a new endpoint that gets the results from the query string:  Add this code to server.js


```
app.get('/addViaQuery', function (req, res) {
  var numberOne = Number(req.query.numberOne);
  var numberTwo = Number(req.query.numberTwo);

  res.send(`${numberOne + numberTwo}`);   // convert back to string
});

```

Now point the browser to: `localhost:3000/addViaQuery?numberOne=15&numberTwo=5`