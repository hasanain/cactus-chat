var http = require('http');

function someOtherName(str, history) {
  history.log = history.log || [];
  history.log.push(str);

  var response;

  http.get("http://api.openweathermap.org/data/2.5/weather?q=Tucson", function(res) {
    console.log("Got response: " + res.statusCode);
    response = res;
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });

  while(!response) {
    require('deasync').runLoopOnce();
  }

  var data;
  response.on('data', function(chunk) {
    data = chunk.toString();
  });

  while(!data) {
    require('deasync').runLoopOnce();
  }

  data = JSON.parse(data);

  temp = ktof(data.main.temp);
  return 'Its a balmy ' + temp.toFixed(1) + ' out';

}

function ktof(k) {
  return ctof(ktoc(k));
}

function ktoc(k) {
  return k - 273.15;
}

function ctof(c) {
  return 9 / 5 * c + 32;
}

module.exports.respondTo = someOtherName;
