/**
 * 
 */

angular.module('app').controller('logoutController', ['$scope', 'LoggingService', '$window', '$rootScope', 
                                                     function($scope, ls, $window, $rootScope) {
    'use strict';
    
    $scope.logoutApp = function(){
    	ls.logoutUser(JSON.parse($window.sessionStorage.getItem("activeUser")));
		//$window.sessionStorage.removeItem('activeUser');
    	$window.sessionStorage.clear();
    	$window.localStorage.clear();
    	$rootScope.abc = undefined;
    }
    
}]);