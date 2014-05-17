app.controller("CompleteController", function($scope, um, update, $timeout){

  $scope.$on("clear", function(event, data) {
    $scope.records =[];
//     $scope.$apply();
  });

  function apply() {
    $timeout(function() {
      $scope.$apply();
    }, 200);
  }

  function start() {
    var service = new um.Service();
    var tnt = service.getTntService();
    var connection = service.getConnection();

    //tnt.client.receiveCompleteInfo
    tnt.client.receiveCompleteInfo = function(data) {

      data.forEach(function(record) {
        record.JwCreateDate = new Date(record.CreateDate);
        record.JwUploadDate = new Date(record.UploadDate);
        update.applyChange($scope, record, 1000);
      });
      apply();
    }
  }

  $scope.records = [];
  start();

});
