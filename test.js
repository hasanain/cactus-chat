var tfchat = require('./tucson_fact_chat');

tfhistory = {};
var response = tfchat.respondTo('Hello', tfhistory);

console.log(response);
console.log(tfhistory);
