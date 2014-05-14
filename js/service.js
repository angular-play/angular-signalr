app.factory("update", function($timeout){

  function applyChange($scope, record, limit) {

    function apply() {
      $timeout(function(){
        $scope.$apply();
      }, 200);
    }

    function newRecord(info) {
      $scope.records.insert(0, info);
      appendDate(info);
      apply();
    }

    function updateRecord(info) {

      var length = $scope.records.length;

      if(length >= limit) {
        var diff = length - limit;
        diff++;
        $scope.records.splice(-diff, diff)
      }

      var record = _.find($scope.records, { UUID: info.UUID });
      if(record) {
        record.Status = info.Status;
        record.UpdateDate = info.UpdateDate;
        appendDate(info);
        apply();
      }else {
        newRecord(info);
      }
    }

    function appendDate(info) {
      info.JwCreateDate = new Date(info.CreateDate);
      info.JwUploadDate = new Date(info.UploadDate);
    }

    updateRecord(record);

  }

  return {
    applyChange: applyChange
  };

});
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
