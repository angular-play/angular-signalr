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
app.controller("MainController", function ($scope, $location) {

  $scope.$on("tab", function(event, tab) {
    $scope.currentTab = tab;
  });

  $scope.searchOptions = {};
  $scope.searchOptions.createDate = new Date();
  $scope.currentTab = "status";

  $scope.setTab = function(tab) {
    $scope.currentTab = tab;
    console.log(tab);
  }

  $scope.getTab = function() {
    return $scope.currentTab;
  };

  $scope.isTab = function(tab) {
    return $scope.currentTab == tab;
  }

});

