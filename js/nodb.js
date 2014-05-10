app.controller("NoDbController", function($scope, um, $timeout, $location, $rootScope){

  $rootScope.$emit("tab", "nodb");

  function apply() {
    $timeout(function() {
      $scope.$apply();
    }, 200);
  }

  function getNoDbRecords(service) {
    service.server.getInfoByStatus("UploadSuccess");
  }

  function start() {
    var service = new um.Service();
    var tnt = service.getTntService();
    var connection = service.getConnection();

    tnt.client.receiveInfoByStatus = function(data) {
      data.forEach(function(record) {
        record.JwCreateDate = new Date(record.CreateDate);
        record.JwUploadDate = new Date(record.UploadDate);
        $scope.records.push(record);
      });

      apply();
    }

    connection.hub.start().done(function() {
      tnt.server.getInfoByStatus("UploadSuccess");
    });
  }

  start();

  $scope.records = [];

});
