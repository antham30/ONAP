(function() {
	'use strict';
	angular
		.module('app')
	    .directive('neighborhoodForm', function() {
	        return {
	        	link: function (scope, element, attrs) {},
	            templateUrl: 'directives/appraisal-logging-forms/neighborhood/neighborhood-form.html',
	            restrict: 'E',
	            controller: 'NeighborhoodFormController',
	            controllerAs: 'vm',
	            scope: {
	            	data: '=',
	            	caseNumber: '@'
	            }
	        };
	    });
})();
