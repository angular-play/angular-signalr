
/*
* Angular "um" factory
* @factory
* @inject {$http}
* @return {Service}
*/
app.factory("um", function($http){

  var url = "http://10.0.0.229:8877/signalr/hubs";
  var options = { transport: "longPolling", xdomin: true };
  var connection = $.connection;
  connection.hub.url = url;
  connection.hub.start(options);

  var service = connection.uploadHub;
  var tnt = connection.tntHub;

  function Service() { }
  Service.prototype.getUploadService = function() { return service; };
  Service.prototype.getTntService = function() { return tnt; };
  Service.prototype.restart = function() {
    //var rs = connection.hub.stop();
    //console.log(stop);
    connection.hub.start(options);
  };

  Service.prototype.getConnection = function() {
    return connection;
  };

  return { Service: Service };

});

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};
