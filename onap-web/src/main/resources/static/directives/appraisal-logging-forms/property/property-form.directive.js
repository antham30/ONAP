(function() {
	'use strict';
	angular
		.module('app')
	    .directive('propertyForm', function() {
	        return {
	            link: function (scope, element, attrs) {},
	            templateUrl: 'directives/appraisal-logging-forms/property/property-form.html',
	            restrict: 'E',
	            controller: 'PropertyFormController',
	            controllerAs: 'vm',
	            scope: {
	            	data: '=',
	            	caseNumber: '@',
	            	caseId: '@'
	            }
	        };
	    });
})();
