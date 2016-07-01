var dependencies = [
  'ngRoute',
  'ui.bootstrap'
]

var bourgie = angular.module('bourgie', dependencies);

bourgie.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/', {
    controller : 'homeController',
    templateUrl : '/views/home.html',
    title : 'Bourgie Home'
  }).when('/login', {
    controller : 'loginController',
    templateUrl : '/views/login.html',
    title: 'Login'
  }).otherwise({
    redirectTo : '/'
  });
}])

bourgie.controller('loginController', ['$scope', function($scope){

  $scope.username = null;
  $scope.password = null;

  $scope.tabNames = ['Sign In', 'Sign Up'];
}]);

bourgie.controller('homeController', ['$scope', function($scope){

  $scope.session = null;
}]);
