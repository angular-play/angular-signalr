
console.log('Start connect at localhost:8080');
var connect = require('connect');
connect.createServer( connect.static(__dirname)).listen(8888);
