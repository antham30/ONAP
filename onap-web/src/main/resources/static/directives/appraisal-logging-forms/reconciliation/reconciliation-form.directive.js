(function() {
	'use strict';
	angular
		.module('app')
	    .directive('reconciliationForm', function() {
	        return {
	            link: function (scope, element, attrs) {},
	            templateUrl: 'directives/appraisal-logging-forms/reconciliation/reconciliation-form.html',
	            restrict: 'E',
	            controller: 'ReconciliationFormController',
	            controllerAs: 'vm',
	            scope: {
	            	data: '=',
	            	loanId: '@'
	            }
	        };
	    });
})();
