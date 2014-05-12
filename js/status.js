app.controller("StatusController", function($scope, um, $timeout, update){

  function registerService($scope) {

    function newMessage(status, data) {
      update.applyChange($scope, data, 100);
    }

    var service = new um.Service();
    var uploadService = service.getUploadService();
    uploadService.client.newMessage = newMessage;
  }

  function initVar() {
    $scope.records = [];
    $scope.message = "Hello message";
    registerService($scope);
  }

  initVar();
});
