module.exports.respondTo = function (catus_id, message, history) {
  var tucsonFactChatter = require('../tucson_fact_chat');
  
  return tucsonFactChatter.respondTo(message, history);
};