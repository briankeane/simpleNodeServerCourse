const express = require('express');
const http = require('http');
const router = express.Router();

const app = new express();
const server = http.createServer(app);

router.get('/hello', function (req, res, next) {
  res.send({ message: 'got it' });
});

router.get('/whatsUp/:name', function (req, res, next) {
  res.send({ message: `What's up, ${req.params.name}?`})
});


app.use(router);

app.server = server.listen(process.env.PORT || 9000, function () {
  console.log('listening on port 9000');
});