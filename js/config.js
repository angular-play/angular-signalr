app.config(function(ngQuickDateDefaultsProvider){
  var options = {
    closeButtonHtml: '<i class="ui use icon"></i>',
    buttonIconHtml : '<i class="ui use icon"></i>',
    nextLinkHtml: '<i class="ui use icon"></i>',
    prevLinkHtml: '<i class="ui use icon"></i>',
    parseDateFunction: function(str) {
      d = Date.create(str);
      return d.isValid() ? d: null;
    }
  };

  return ngQuickDateDefaultsProvider.set(options);
});

/*
* Angular config.
* Remove X-Requested-With from request headers???
* @config
* @inject {$httpProvider}
*/
app.config(function($httpProvider){
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


// app.config(function($stateProvider, $urlRouterProvider){
//   $urlRouterProvider.otherwise("/status");
//   var sp = $stateProvider;

//   sp.state("status", {
//     url: "/status",
//     templateUrl: "/views/status.html",
//     controller: "StatusController"
//   });

//   sp.state("pedding", {
//     url: "/pedding",
//     templateUrl: "/views/pedding.html",
//     controller: "PeddingController"
//   });

//   sp.state("nodb", {
//     url: "/nodb",
//     templateUrl: "/views/nodb.html",
//     controller: "NoDbController"
//   });

// });

/*
app.config(function($routeProvider) {
  var route = $routeProvider;
  route.when("/status", {
    templateUrl: "/views/status.html",
    controller: "StatusController"
  });

  route.when("/pedding", {
    templateUrl: "/views/pedding.html",
    controller: "PeddingController"
  });

  route.when("/nodb", {
    templateUrl: "/views/nodb.html",
    controller: "NoDbController"
  });

  route.otherwise({
    redirectTo: "/status"
  });
});
*/
