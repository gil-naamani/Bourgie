var dependencies = [
  'ngStorage',
  'ngRoute',
  'ui.bootstrap'
]

var bourgie = angular.module('bourgie', dependencies);

bourgie.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){

  // contorl the routing of partial pages
  $routeProvider.when('/', {
    controller : 'homeController',
    templateUrl : '/views/home.html',
    title : 'Bourgie Home'
  }).when('/login', {
    controller : 'loginController',
    templateUrl : '/views/login.html',
    title: 'Login'
  }).when('/schedule', {
    controller : 'scheduleController',
    templateUrl : '/views/schedule.html',
    title: 'Login',
    resolve: {loggedIn:isLoggedIn}
  }).otherwise({
    redirectTo : '/'
  });

  // place token inside Authorization header of every request
  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
    return {
        'request': function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            return config;
        },
        'responseError': function(response) {
            if(response.status === 401 || response.status === 403) {
                $location.path('/login');
            }
            return $q.reject(response);
        }
    };
    }]);
}]);

// verify that the username exists in the token
// TODO: also verify that the token is valid
var isLoggedIn = function ($location, $q, authService) {
    var deferred = $q.defer();
    authService.isAuthenticated()
      .success(function(res){
        console.log(res);
        if (res.type == true){
          console.log('continue to secure page');
          deferred.resolve();
        } else {
          console.log('user must login first');
          deferred.reject();
          $location.url('/login');
        };
    }).error(function(err){
      console.log('cannot continue to secure page: '+err);
      deferred.reject();
      $location.url('/login');
    });
    return deferred.promise;
};
