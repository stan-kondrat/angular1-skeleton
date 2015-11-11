
var app = angular.module('app', [
  'ui.router'
]);

app.run(
  function ($rootScope,   $state,   $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
);