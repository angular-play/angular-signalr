
var port = 8888;
var connect = require('connect');
connect.createServer( connect.static(__dirname)).listen(port);

var magick = "magick happen on :: " + port;
console.log(magick);
