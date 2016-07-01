bourgie.controller('loginController', ['$scope', '$location', function($scope, $location){
  $scope.usrObj = {
    username : null,
    password : null,
    newUsername : null,
    newPassword : null,
    repeatPassword : null
  };

  $scope.signUp = function(){
    $scope.setSecret($scope.usrObj.newUsername,$scope.usrObj.newUsername);
    $location.path("budget");
  }

  $scope.signIn = function(){
    $scope.setSecret($scope.usrObj.username,$scope.usrObj.username);
    $location.path("budget");
  }

  $scope.verifyRepeat = function(){
    if ($scope.usrObj.newPassword == null || $scope.usrObj.newPassword == ""){
      return false;
    }
    if ($scope.usrObj.newPassword !== $scope.usrObj.repeatPassword){
      return false;
    }
    return true;
  }

}]);
