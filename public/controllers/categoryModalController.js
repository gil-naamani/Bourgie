bourgie.controller('categoryModalController', ['$scope', '$uibModalInstance', 'defaults', function($scope, $uibModalInstance, defaults) {

  $scope.title = defaults.title;

  $scope.category = {
    title : defaults.title || null,
    amt : defaults.amt || null
  }
  $scope.intervals = ['Spend', 'Savings'];

  $scope.ok = function (action) {
    $scope.event["action"] = action;
    $uibModalInstance.close($scope.event);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
