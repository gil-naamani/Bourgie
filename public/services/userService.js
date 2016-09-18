angular.module('bourgie')
.factory('userService', ['$http', '$q', function($http, $q){

  return {
    read: function(id, data, success, error) {
        $http.get('/user/'+id, data).success(success).error(error)
    },
    addCategory: function(id, categoryId, success, error) {
        var data = {
          id : id,
          category : categoryId
        };
        console.log(data);
        $http.put('/user/categories', data).success(success).error(error)
    },
    updateAmt: function(id, amt, success, error) {
        $http.put('/user/'+id+'/'+amt, data).success(success).error(error)
    }
  };
}]);
