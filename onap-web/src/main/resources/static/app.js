(function() {
    'use strict';
    var releaseVersion = "0.10.9";
    var unrestrictedPages = ['/login', '/help', '/loanSearch', '/logout','/lenderRegistration','/caseRegistration'];

    angular

        .module('app', ['ngRoute', 'ngCookies', 'ui.router', 'datatables','encryptService','chieffancypants.loadingBar', 'elif', 'ActionsMenuModule', 'CaseDetailsModule', 'ngMessages', 'ngIdle', 'blockUI', 'ngTable', 'AdjustFundsReserved', 'UserModule'])

        .run(run);

    // protect run() from minification by explicit DI. 
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$injector', '$cacheFactory', '$window', '$anchorScroll', 'Constants', 'LoggingService', 'SharedDataService'];

    function run($rootScope, $location, $cookieStore, $http, $injector, $cacheFactory, $window, $anchorScroll, Constants, LoggingService, SharedDataService) {
        var httpCache = $cacheFactory.get('$http');
        $rootScope.version = releaseVersion;
        $rootScope.contextPath = Constants.contextPath;

        $rootScope.logout = function() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            httpCache.removeAll();

            $window.localStorage.removeItem('authenticatedUser');

            // relocate to the SAML logout page.
            $window.location.replace(Constants.SERVER_URL + "/FHA/saml/logout");
        };

		
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }


        $injector.get("$http").defaults.transformRequest = function(data, headersGetter) {
            var access_token = '';
            try {
                access_token = JSON.parse($window.localStorage.getItem('authenticatedUser')).accessToken;
            } catch (ex) {
                access_token = '';
            }
            headersGetter().Authorization = access_token; 
            if (data) {
                return angular.toJson(data);
            }
        };
    	
        $rootScope.$on('$locationChangeSuccess', function() {
        	$rootScope.currentPath = $location.path();
        	var user = JSON.parse($window.sessionStorage.getItem("activeUser"));
        	if (!LoggingService.validationLoggedUser(user)) {
        		$location.path('/');
        	}
        	if ($location.path() === '/' && LoggingService.validationLoggedUser(user)) {
        		var defaultRoute = '/lenderDashboard';
        		console.log($rootScope.role);
        		if($rootScope.role !== '' && ($rootScope.role == 'OLG Supervisor' || $rootScope.role == 'OLG Endorser' || $rootScope.role == 'Administrator')){
        			console.log("this is olg role redirecting to olgDashboard");
        			defaultRoute = '/olgDashboard';
        		}
        		if ($rootScope.role == 'Administrator') {
        			defaultRoute = '/olgCasesDashboard';
        		}
        		$location.path(defaultRoute);
        	}
        	
        	// Scroll to anchor if it exists

        });
        
        var caseReviewPaths = ['#/caseReview', '#/caseReview#afr-title'];
        var caseRegPaths = ['#/lender', '#/borrower', '#/property', '#/loan', '#/allTabContent'];
        $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
        	// Clear reserve funds
        	if (oldUrl === Constants.SERVER_URL + '#/reserveFunds') {
        		SharedDataService.clearReserveFunds();
        	}
        	
        	// Clear appraisal logging
        	if (oldUrl === Constants.SERVER_URL + '#/appraisalLogging') {
        		SharedDataService.clearAppraisalLogging();
        	}
        	
        	// Clear upload documents
        	if (oldUrl === Constants.SERVER_URL + '#/endorsement') {
        		SharedDataService.clearUploadDocuments();
        	}
        	
        	// Clear case review
        	var fromCaseReview = false;
        	caseReviewPaths.forEach(function(path) {
        		if (oldUrl === Constants.SERVER_URL + path) {
        			fromCaseReview = true;
        		}
        	});
        	var toCaseReview = false;
        	caseReviewPaths.forEach(function(path) {
        		if (newUrl === Constants.SERVER_URL + path) {
        			toCaseReview = true;
        		}
        	});
        	if (fromCaseReview && !toCaseReview) {
        		SharedDataService.clearCaseReview();
        	}
        	var fromCaseReg = false;
        	caseRegPaths.forEach(function(path) {
        		if (oldUrl === Constants.SERVER_URL + path) {
        			fromCaseReg = true;
        		}
        	});
        	var toCaseReg = false;
        	caseRegPaths.forEach(function(path) {
        		if (newUrl === Constants.SERVER_URL + path) {
        			toCaseReg = true;
        		}
        	});
        	if (fromCaseReg && !toCaseReg) {
        		// Currently only used for case registration
        		$window.localStorage.clear();
        	}
        });
    }

})();