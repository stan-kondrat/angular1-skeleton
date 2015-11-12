'use strict';

app.config(function($stateProvider,   $urlRouterProvider) {
  $stateProvider
    .state('Module1', {
      url: '/Module1',
      templateUrl: 'Module1/Module1.html',
      controller: 'Module1Controller',
    });
});

app.controller('Module1Controller', function() {
  console.log(1);
});

