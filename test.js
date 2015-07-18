var tfchat = require('./tucson_fact_chat');
var w = require('./weather_chat');

tfhistory = {};
var response = tfchat.respondTo('Hello', tfhistory);

console.log(response);
console.log(tfhistory);


whistory = {};
var response = w.respondTo('Hello', whistory);

console.log(response);
console.log(whistory);

