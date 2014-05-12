app.controller("NoDbController", function($scope, um, $timeout, $location, $rootScope){

  var status = "MatchMainDBFailed";

  function apply() {
    $timeout(function() {
      $scope.$apply();
    }, 200);
  }

  function start() {
    var service = new um.Service();
    var tnt = service.getTntService();
    var connection = service.getConnection();

    tnt.client.receiveInfoByStatus = function(data) {
      data.forEach(function(record) {
        if(record.Status == status) {
          record.JwCreateDate = new Date(record.CreateDate);
          record.JwUploadDate = new Date(record.UploadDate);
          $scope.records.push(record);
        }
      });
      apply();
    }

//     connection.hub.start().done(function() {
//       tnt.server.getInfoByStatus(status);
//     });
  }

  start();

  $scope.records = [];

});
