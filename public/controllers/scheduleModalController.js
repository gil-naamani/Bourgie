bourgie.controller('scheduleModalController', ['$scope', '$uibModalInstance', 'defaults', function($scope, $uibModalInstance, defaults) {

  $scope.title = defaults.title;

  $scope.event = {
    username : defaults.username,
    id : defaults.id || null,
    category : defaults.category || null,
    name : defaults.name || null,
    amount : defaults.amount || null,
    date : defaults.date || new Date(),
    interval : defaults.interval || null
  }
  $scope.intervals = ['weekly', 'biweekly', 'monthly', 'annually'];

  $scope.ok = function (action) {
    $scope.event["action"] = action;
    $uibModalInstance.close($scope.event);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
