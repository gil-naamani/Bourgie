bourgie.controller('globalController', ['$scope', '$location', '$localStorage','authService',
    function($scope, $location, $localStorage, authService){

  $scope.token = $localStorage.token || null;
  $scope.user = authService.getCurrentUser();

  $scope.setToken = function(username, token){
    $scope.token = token;
    $scope.user = username;
  };

  $scope.signOut = function() {
    authService.signout(function() {
        $location.path("/");
    }, function() {
        alert("Failed to logout!");
    });
    $scope.setToken(null,null);
  };

}]);
