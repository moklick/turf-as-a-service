var express = require('express');
var Turf = require('turf');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

for (var funcName in Turf) {
  (function(fn){
    var funcParamNames = getFuncParamNames(Turf[fn]);
    
    app.post('/' + fn, function (request, response) {
      var data = funcParamNames.map(function(paramName){ return request.body[paramName]; })
      response.send(Turf[fn].apply(null, data)); 
    });
    
    app.get('/' + fn, function (request, response) {
      response.send('For the ' + fn  + ' function you need the following parameters: ' + funcParamNames); 
    });
  }(funcName))
}

app.get('/', function (request, response) {
  response.send('Turf as a service.\nUse GET requests with the function name for help, and POSTs for running the function.'); 
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function getFuncParamNames(fn) {
  return fn.toString()
    .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/mg,'')
    .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
    .split(/,/)
}