var express = require('express');
var app = express(); // express server
var morgan = require('morgan'); // used to see requests
var bodyParser = require('body-parser');
var apiRouter = express.Router();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();

});

app.use(morgan('dev'));

apiRouter.use(function (req, res, next) {
  console.log('api call');
  next();
});

apiRouter.get('/', function (req, res) {
  res.json({message: 'Welcome to the API'});
});

app.use('/api', apiRouter);
app.listen(port);
console.log('Server started on port: ', port);

