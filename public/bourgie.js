var dependencies = [
  'ngRoute'
]

var bourgie = angular.module('bourgie', dependencies);

bourgie.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/', {
    controller : 'homeController',
    templateUrl : '/views/home.html',
    title : 'Bourgie Home'
  }).otherwise({
    redirectTo : '/'
  });
}])
