bourgie.controller('globalController', ['$scope', function($scope){

  $scope.secret = null;
  $scope.user = null;

  $scope.setSecret = function(newSecret, username){
    $scope.secret = newSecret;
    $scope.user = username;
  };

}]);
