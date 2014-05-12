app.controller("StatusController", function($scope, um, $timeout){
  console.log("[StatusController]");

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

    var limit = 100;
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

  function registerService($scope) {

    function callback(status, data) {

      //console.log(data);

      if(status == "new") {
        //newRecord(data);
        updateRecord(data);
      }else if(status == "update") {
        updateRecord(data);
      }
    }

    function newMessage(status, data) {
      callback(status, data);
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
