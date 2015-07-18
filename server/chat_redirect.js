module.exports.respondTo = function (catus_id, message, history) {
  var tucsonFactChatter = require('../tucson_fact_chat');
  var weather = require('../weather_chat');
  
  return weather.respondTo(message, history);
};
