angular.module('bourgie')
    .factory('authService', ['$http', '$localStorage', 'jwtHelper', '$q', function($http, $localStorage, jwtHelper, $q){

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = undefined;
            if (token) {
              user = jwtHelper.decodeToken(token).user;
            }
            return user;
        }

        var currentUser = getUserFromToken();

        function isUserValid(user){
            return $http.get('/users/'+user);
        };

        return {
            signup: function(data, success, error) {
                $http.post('/users/signup', data).success(success).error(error)
            },
            signin: function(data, success, error) {
                $http.put('/users/signin', data).success(success).error(error)
            },
            // TODO: make api call to invalidate the token
            signout: function(success) {
              currentUser = undefined;
              delete $localStorage.token;
              success();
            },
            getCurrentUser: function(){
              return getUserFromToken();
            },
            isAuthenticated: function(){
              var token = $localStorage.token;
              // check that the token is present, and not expired
              if (!token) return false;
              if (jwtHelper.isTokenExpired(token)) return false;
              // make sure that the proclaimed user is a real user
              var user = getUserFromToken();
              var promise = $http.get('/users/'+user);
              return promise;


              // var user = getUserFromToken() || currentUser;
              // if (user) {
              //   var token = $localStorage.token;
              //   if (!jwtHelper.isTokenExpired(token)) {
              //     // $http.get('/users/'+user)
              //     // .success(function(res){
              //     //   console.log('here');
              //     //   return res.type;
              //     // }).error(function(err){
              //     //   return false;
              //     // });
              //     isUserValid(user, function(res){
              //       console.log('here');
              //       return res.type;
              //     }, function(){
              //       return false;
              //     });
              //   } else {
              //     console.log('token expired, log in again');
              //     return false;
              //   };
              // } else {
              //   console.log('user does not have a token');
              //   return false;
              // };
              // return "hello";
              // $http.get('/users/'+user).success(success).error(error);
            }
        };
    }]);
