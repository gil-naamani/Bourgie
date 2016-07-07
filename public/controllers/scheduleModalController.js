bourgie.controller('scheduleModalController', ['$scope', '$uibModalInstance', 'items', function($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.eventName;
  $scope.eventAmount;
  $scope.eventDate;
  $scope.eventInterval;
  $scope.intervals = ['weekly', 'biweekly', 'monthly', 'annually'];


  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
