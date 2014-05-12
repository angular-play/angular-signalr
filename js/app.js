/*
* Angular UMApplication module.
* This module apply to display upload status sent from UploadManager.exe.
* @module {UMAApplication} no dependency inject.
*/
// var app = angular.module("UMApplication", ["ngQuickDate", "ngRoute"]);
// var app = angular.module("UMApplication", ["ngQuickDate", "ui.router"]);
var app = angular.module("UMApplication", ["ngQuickDate"]);

/*
* Angular controller.
* MainController apply in index.html, response all upload status and render new view.
* @controller {MainController}
* @inject {$scope}
* @inject {um}
*/
app.controller("MainController", function ($scope, $location, um) {

  $scope.searchOptions = {};
  $scope.searchOptions.createDate = new Date();
  $scope.currentTab = "status";

  $scope.setTab = function(tab) {
    $scope.currentTab = tab;
    reload(tab);
  }

  $scope.getTab = function() {
    return $scope.currentTab;
  };

  $scope.isTab = function(tab) {
    return $scope.currentTab == tab;
  }

  function reload(info) {
    console.log("reload::" + info);
    $scope.$broadcast("clear", true);

    var server = $scope.server;
    if(info == "nodb") server.getNoDBInfo();
    else if(info == "pending") server.getPendingInfo();
    else if(info == "complete") server.getCompleteInfo();
  }

  function start() {

    var service = new um.Service();
    var tnt = service.getTntService();
    var connection = service.getConnection();
    var server = tnt.server;
    var start = connection.hub.start();

    start.done(function() {
      console.log("start done...");
      tnt.server.getPendingInfo();
      tnt.server.getCompleteInfo();
      tnt.server.getNoDBInfo();
    });

    start.fail(function(){
      console.error("start failed...");
    });

    $scope.server = server;
  }

  start();
});
