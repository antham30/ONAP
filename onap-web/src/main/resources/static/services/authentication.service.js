(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    function AuthenticationService($http, $cookieStore, $rootScope, $location, $timeout, Constants, $window) {
        var service = {};
        
        service.Login = login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.IsLoggedIn = isLoggedIn;
        service.logout = logout;

        service.SetAuthen = SetAuthen;
        var error_message = Constants.ERROR_MESSAGES.INVALID_LOGIN;

        function login(username, callback) {
            var user = {};
            var response = {};

            user.userName = username;


            $http.post(Constants.API_ENDPOINTS.LOGIN, user)
                .success(function (data) {
                    if (typeof data == "object") {
                        response = {
                            success: true
                        };

                        SetAuthen(data);
                        redirectWhenLoginSuccess();

                    } else {
                        console.log({
                            "failure": data
                        });
                        response = {
                            success: false,
                            message: error_message
                        };

                    }
                    callback(response);

                })
                .error(function () {
                    response = {
                        success: false,
                        message: Constants.ERROR_MESSAGES.API_NOT_AVAILABLE
                    };
                    callback(response);
                });

        }

        function logout() {
            $http.get(Constants.API_ENDPOINTS.LOGOUT);
        }

        function SetAuthen(data) {
            SetCredentials(data.userName, data.userName, data.userName, data.role, data.accessToken);
            $window.localStorage.setItem('authenticatedUser', JSON.stringify(data));
        }

        function SetCredentials(username, email, name, role, accessToken) {

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    email: email,
                    name: name,
                    role: role.split("_")[1],
                    accessToken: accessToken

                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + accessToken; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }

        function isLoggedIn() {
            var globals = $cookieStore.get('globals');
            if (globals) {
                return globals.currentUser;
            }
            return false;
        }

        function redirectWhenLoginSuccess() {

            switch ($rootScope.globals.currentUser.role) {
                case "Lender":
                    $location.path('/loanSearch');
                    break;
                case "National Coordinator":
                    $location.path('/dashboard/nationalCoordinator');
                    break;
                default:
                    $location.path('/');
                    break;
            }
        }
        return service;
    }


})();