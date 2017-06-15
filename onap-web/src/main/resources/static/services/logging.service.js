(function () {
    'use strict';

    angular
        .module('app')
        .factory('LoggingService', LoggingService);

    function LoggingService($http, $location, Constants) {
        var service = {};

        function logMessage(type, message) {
            var logMsg = {
                logLevel: type,
                logMessage: message
            };
            return $http.post(Constants.API_ENDPOINTS.LOG, logMsg);
        }

        function logError(message) {
            return logMessage("ERROR", message);
        }

        function logInfo(message) {
            return logMessage("INFO", message);
        }

        function logDebug(message) {
            return logMessage("DEBUG", message);
        }
        
        function loginUser(username, sessionId){
        	
        	var user = {};
        	if(!(!username || !sessionId)){
        		user.loggedUser = username;
        		user.sessionId = sessionId;
        	}else{
        		user.loggedUser = undefined;
        		user.sessionId = undefined;
        	}
        	return user;
        }
        
        function logoutUser(user){
        	if(user && user !== null && user !== {}){
        		user.loggedUser = undefined;
        		user.sessionId = undefined;
				$location.path( '/' );
        	}
        }
		
		function home(){
			$location.path( '/' );
		}
        
        function validationLoggedUser(user){
        	return (user !== null && user.loggedUser !== undefined && user.sessionId !== undefined) ? true : false;
        }
        

        service.logError = logError;
        service.logInfo = logInfo;
        service.logDebug = logDebug;
        service.loginUser = loginUser;
        service.logoutUser = logoutUser;
        service.validationLoggedUser = validationLoggedUser;
		service.toRoot = home;

        return service;

    }

})();