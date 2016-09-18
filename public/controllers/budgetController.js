bourgie.controller('budgetController', ['$scope', '$uibModal', '$log', '$http', 'categoryService', 'userService',
  function($scope, $uibModal, $log, $http, categoryService, userService){

    $scope.modalTitle = "";
    $scope.animationsEnabled = true;

    $scope.open = function (eventObj) {

      (eventObj) ? $scope.modalTitle = "Edit Category" : $scope.modalTitle = "Create Category";
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'categoryModal.html',
        controller: 'categoryModalController',
        resolve: {
          //set defaults - none if creating new, but prepoulate modal if editing
          defaults: function () {

            return {
              title : $scope.modalTitle,
              amt : $scope.amt
            };
          }
        }
      });

      modalInstance.result.then(function (modalObj) {

        var action = modalObj.action;
        if (action === "create"){

          var data = {
            title : modalObj.Title,
            amt : modalObj.amt
          }
          categoryService.create(data, function(res) {
              console.log(res.data)
              userService.addCategory($scope.user.id,res.data._id,function(res){
                console.log(res.data);
                $scope.user.categories = res.data.categories;
              }, function(err){
                console.log(err);
              });
           }, function(err) {
               console.log(err);
           });
          // createCategory(eventObj);
        } else if (action === "update"){
          // updateCategory(eventObj);
        } else if (action === "delete"){
          // deleteCategory(eventObj);
        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }
]);
