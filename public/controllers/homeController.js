bourgie.controller('homeController', ['$scope', '$http', function($scope, $http){

  $scope.speak = function(){
    responsiveVoice.speak("Boo-jee", "UK English Male");
  }
}]);
