angular.module('bourgie')
    .factory('authService', ['$http', '$localStorage', function($http, $localStorage){
        // var baseUrl = "your_service_url";
        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = undefined;
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = urlBase64Decode(encoded);
                console.log(user);
            }
            return user;
        }

        var currentUser = getUserFromToken();

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
            // TODO: also make sure the token has not expired
            isAuthenticated: function(){
              var user = getUserFromToken() || currentUser;
              return $http.get('/users/'+user);
              // $http.get('/users/'+user).success(success).error(error);
            }
        };
    }
]);
