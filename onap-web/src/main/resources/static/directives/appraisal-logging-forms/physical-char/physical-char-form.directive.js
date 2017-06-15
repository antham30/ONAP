(function() {
	'use strict';
	angular
		.module('app')
	    .directive('physicalCharForm', function() {
	        return {
	            link: function (scope, element, attrs) {},
	            templateUrl: 'directives/appraisal-logging-forms/physical-char/physical-char-form.html',
	            restrict: 'E',
	            controller: 'PhysicalCharFormController',
	            controllerAs: 'vm',
	            scope: {
	            	data: '=',
	            	loanId: '@'
	            }
	        };
	    });
})();
