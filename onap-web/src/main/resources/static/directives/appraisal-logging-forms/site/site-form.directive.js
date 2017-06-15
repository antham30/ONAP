(function() {
	'use strict';
	angular
		.module('app')
	    .directive('siteForm', function() {
	        return {
	            link: function (scope, element, attrs) {},
	            templateUrl: 'directives/appraisal-logging-forms/site/site-form.html',
	            restrict: 'E',
	            controller: 'SiteFormController',
	            controllerAs: 'vm',
	            scope: {
	            	data: '=',
	            	caseNumber: '@'
	            }
	        };
	    });
})();
