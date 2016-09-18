bourgie.controller('globalController', ['$scope', '$location', '$localStorage','authService',
    function($scope, $location, $localStorage, authService){

  $scope.token = $localStorage.token || null;
  $scope.user = setNullUser();

  $scope.setUserToken = function(user, token){
    $scope.token = token;
    $scope.user['username'] = user.username;
    $scope.user['id'] = user._id;
    $scope.user['categories'] = user.categories;
    $scope.user['amt'] = user.amt;
  };

  $scope.signOut = function() {
    authService.signout(function() {
        $location.path("/");
    }, function() {
        alert("Failed to logout!");
    });
    $scope.user = setNullUser();
    $scope.token = null;
  };

  function setNullUser() {
    return {
      username : authService.getCurrentUser(),
      id : undefined,
      categories : [],
      amt : 0
    };
  };
}]);
