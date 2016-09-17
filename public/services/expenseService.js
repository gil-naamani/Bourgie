angular.module('bourgie')
.factory('expenseService', ['$http', '$localStorage', 'jwtHelper', '$q', function($http, $localStorage, jwtHelper, $q){

  return {
    create: function(data, success, error) {
        $http.post('/expense', data).success(success).error(error)
    },
    read: function(data, success, error) {
        $http.get('/expense', data).success(success).error(error)
    },
    update: function(id, data, success, error) {
        $http.put('/expense/'+id, data).success(success).error(error)
    },
    delete: function(id, success, error){
        $http.delete('/expense/'+id, data).success(success).error(error)
    }
  };
}]);
