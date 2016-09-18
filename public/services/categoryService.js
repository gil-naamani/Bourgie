angular.module('bourgie')
.factory('categoryService', ['$http', '$localStorage', 'jwtHelper', '$q', function($http, $localStorage, jwtHelper, $q){

  return {
    create: function(data, success, error) {
        console.log(data);
        $http.post('/category', data).success(success).error(error)
    },
    read: function(data, success, error) {
        $http.get('/category', data).success(success).error(error)
    },
    update: function(id, data, success, error) {
        $http.put('/category/'+id, data).success(success).error(error)
    },
    delete: function(id, success, error){
        $http.delete('/category/'+id, data).success(success).error(error)
    }
  };
}]);
