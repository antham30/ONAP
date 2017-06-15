(function() {
  'use strict';
  
config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', 'cfpLoadingBarProvider', 'KeepaliveProvider', 'IdleProvider', 'Constants'];

function config($routeProvider, $locationProvider, $httpProvider, cfpLoadingBarProvider, KeepaliveProvider, IdleProvider, Constants) {
	
	// Idle user limits
	IdleProvider.idle(Constants.SETTINGS.IDLE_TIME);
	IdleProvider.timeout(Constants.SETTINGS.IDLE_TIMEOUT);
	
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	
	if(isIE){
		//initialize get if not there
	    if (!$httpProvider.defaults.headers.get) {
	        $httpProvider.defaults.headers.get = {};    
	    }    
	
	    // Answer edited to include suggestions from comments
	    // because previous version of code introduced browser-related errors
	
	    //disable IE ajax request caching
	    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
	    // extra
	    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
	    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
	}
    
    cfpLoadingBarProvider.includeSpinner = true;
    $httpProvider.defaults.useXDomain = true;
    
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    configureRoutes($routeProvider); // refactor to better handle dependency.

    var $http, interceptor = ['$q', '$injector', '$location', '$rootScope', 'Constants',
        function($q, $injector, $location, $rootScope, Constants) {

            $rootScope.authorizationFailure = false;

            function success(response) {
                $http = $http || $injector.get('$http');
                return response;
            }

            function error(response) {
                delete $rootScope.globalError;
                $http = $http || $injector.get('$http');
                if (response.status == 403) {
                    $rootScope.authorizationFailure = true;
                    $rootScope.routeTo = $rootScope.lastRoute;
                    return $q.reject(response);
                } else if (response.status != 400 && response.status != 401) {
                    $rootScope.globalError = Constants.ERROR_MESSAGES.API_NOT_AVAILABLE;
                    return $q.reject(response);
                } else if (response.status >= 500) {
                    $rootScope.globalError = Constants.SERVER_PROBLEM;
                    return $q.reject(response);
                } else {
                    delete $rootScope.globalError;
                    return $q.reject(response);
                }
            }

            return function(promise) {
                return promise.then(success, error);
            };
        }
    ];
    

    var headerInterceptor = ['$rootScope', '$window', 'SharedDataService', function($rootScope, $window, SharedDataService) {
        /** This function is temporary and will change as AC changes **/
        function getUID() {
        	return getSessionId();
        }
        
        function getSessionId() {
        	var user = $window.sessionStorage.getItem("activeUser");
        	if (user) {
        		var parsedUser = JSON.parse(user);
        		return parsedUser.sessionId;
        	}
        	return null;
        }
        
        function getLender() {
        	return $rootScope.userName === 'jennpost' ? 'Administrator' : 'Lender';
        }
    	return {
    		request: function(config) {
    			var caseNumber = null,
    				username = $rootScope.userName,
    				role = getLender(),
    				session = getSessionId(),
    				uniqueIdentifier = getUID();
    			var currentCase = SharedDataService.getCaseReview() || 
    							  SharedDataService.getAppraisalLogging() || 
    							  SharedDataService.getReserveFunds() || 
    							  SharedDataService.getUploadDocuments() || 
    							  SharedDataService.getLoanTabData() || null;
    			if (currentCase) {
    				caseNumber = currentCase.caseNumber;
    			}
    			angular.extend(config.headers, {
    				'Case-Number': caseNumber,
    				'Username': username,
    				'Role': role,
    				'Session': session,
    				'Unique-Identifier': uniqueIdentifier
    			});
    			return config;
    		},
    		response: function(resp) {
    			return resp;
    		}
    	};
    }];
    
    $httpProvider.responseInterceptors.push(interceptor);
    $httpProvider.interceptors.push(headerInterceptor);
}

angular
.module('app')
.config(config)
        .config(function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
        })
})();
