bourgie.controller('loginController', ['$rootScope', '$scope', '$location', '$localStorage', 'authService',
    function($rootScope, $scope, $location, $localStorage, authService){

  $scope.usrObj = {
    username : null,
    password : null,
    newUsername : null,
    newPassword : null,
    repeatPassword : null
  };

  $scope.signIn = function() {
    var formData = {
        username: $scope.usrObj.username,
        password: $scope.usrObj.password
    };

    authService.signin(formData, function(res) {
         if (res.type == false) {
             alert(res.data)
         } else {
             console.log(res.data.token);
             $localStorage.token = res.data.token;
             $scope.setToken(formData.username,$localStorage.token);
             $location.path("budget");
         }
     }, function() {
         $rootScope.error = 'Failed to signin';
     });
  };

  $scope.signUp = function() {
     var formData = {
         username: $scope.usrObj.newUsername,
         password: $scope.usrObj.newPassword
     };

     authService.signup(formData, function(res) {
         if (res.type == false) {
             alert(res.data)
         } else {
             $localStorage.token = res.data.token;
             $location.path("budget");
             $scope.setToken(formData.username,$localStorage.token);
         }
     }, function() {
         $rootScope.error = 'Failed to signup';
     });
  };

  $scope.verifyRepeat = function(){
    if ($scope.usrObj.newPassword == null || $scope.usrObj.newPassword == ""){
      return false;
    }
    if ($scope.usrObj.newPassword !== $scope.usrObj.repeatPassword){
      return false;
    }
    return true;
  };

}]);
