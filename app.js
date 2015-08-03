var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  // logging at the top
  console.log('Request at ' + new Date().toISOString());
  next();
});

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get(/hello/, function (req, res) {
  res.send('Hello!');
});

app.get('/world', function (req, res) {
  res.render('templates/world',
    { title: 'Awesomesite.com', welcome: 'Thanks for coming!' }
  );
});

app.get('/test', function (req, res, next) {
  res.write('Test1!');
  next();
});

app.get('/test', function (req, res) {
  res.end('Test2!');
});

app.get('/json', function (req, res) {
  res.send({an: 'object'});
});

app.get('/thisshoulderror', function (req, res) {
  res.send(badVariable);
});

app.use(function (req, res) {
  res.status(403).send('Unauthorized!');
});

app.use(function (err, req, res, next) {
  // pass 4 arguments to create an error handling middleware
  console.log('ERRRRRRRRRR', err.stack);
  res.status(500).send('My Bad');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%d', host, port);
});
