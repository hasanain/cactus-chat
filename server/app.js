var express = require('express');
var app = express(); // express server
var morgan = require('morgan'); // used to see requests
var bodyParser = require('body-parser');
var apiRouter = express.Router();
var router = express.Router();
var path = require('path');
var port = process.env.PORT || 8080;
var chatClient = require('./chat_redirect');
var chatHistory = {};


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '../client'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/chat_index.html'));
});

app.use(morgan('dev'));

apiRouter.use(function (req, res, next) {
  console.log('api call');
  next();
});

apiRouter.post('/message', function (req, res) {
  var curr = {};
  curr.cactus_id = req.body.cactus_id;
  curr.user_id = req.body.user_id;
  curr.message = req.body.message;

  if (!chatHistory[curr.user_id]) {
    chatHistory[curr.user_id] = {};
  }
  res.json({
    message: chatClient.respondTo(curr.cactus_id, curr.message, chatHistory[curr.user_id])
  });
});

app.use('/api', apiRouter);
app.use('/', router);
app.listen(port);
console.log('Server started on port: ', port);

