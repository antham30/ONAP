(function() {
	angular
		.module('CaseDetailsModule')
	    .directive('caseDetails', function() {
		    'use strict';
	        return {
	            link: function (scope, element, attrs) {},
	            templateUrl: 'directives/case-details/case-details.html',
	            restrict: 'E',
	            controller: 'CaseDetailsController',
	            controllerAs: 'vm',
	            scope: {
	            	caseNumber: '='
	            }
	        };
	    });
})();
