(function () {
    'use strict';

    angular
        .module('app')
        .controller('BaseController', ['$rootScope', '$scope', '$window', 'LoggingService', 'Idle', BaseController]);

    function BaseController($rootScope, $scope, $window, LoggingService, Idle) {
        var vm = this;
        
        
    	vm.userIsAuthenticated = function() {
    		var user = JSON.parse($window.sessionStorage.getItem("activeUser"));
    		if (LoggingService.validationLoggedUser(user)) {
	   	        $rootScope.userName = user.loggedUser;
	 	 		$rootScope.showloginhead = true;
    			return true;
    		}
    		else {
    			 $rootScope.showloginhead = false;
    			 return false;
    		}
       }
    	
        // Log out if user is idle
    	$rootScope.$on('IdleTimeout', function() {
        	var modal = angular.element('#idleWarning');
        	if (modal) modal.modal('hide');
        	LoggingService.logoutUser(JSON.parse($window.sessionStorage.getItem("activeUser")));
        	$window.sessionStorage.clear();
        	$rootScope.abc = undefined;
    	});
    	
        $rootScope.$on('IdleWarn', function(e, countdown) {
        	vm.countdown = countdown;
        	var modal = angular.element('#idleWarning');
        	if (modal) modal.modal('show');
        });
        
        $rootScope.$on('IdleWarn', function(e, countdown) {
        	vm.countdown = countdown;
        	var modal = angular.element('#idleWarning');
        	if (modal) modal.modal('show');
        });
        
        $rootScope.$on('IdleEnd', function(e, countdown) {
        	var modal = angular.element('#idleWarning');
        	angular.element('.modal-backdrop').hide();
        	if (modal) modal.modal('hide');
        });
    	
    	vm.resetIdleWatch = function() {
    		Idle.watch();
    	}
    }

})();