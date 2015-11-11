'use strict';

app.config(function ($stateProvider,   $urlRouterProvider) {
  $stateProvider
    .state('Module2', {
      url: '/Module2',
      templateUrl: 'Module2/Module2.html',
      controller: "Module2Controller"
    });
  }
);
  