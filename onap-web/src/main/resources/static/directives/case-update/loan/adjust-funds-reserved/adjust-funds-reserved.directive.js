(function() {
	'use strict';
	angular
		.module('AdjustFundsReserved')
	    .directive('adjustFundsReservedForm', function() {
	        return {
	        	link: function (scope, element, attrs) {},
	            templateUrl: 'directives/case-update/loan/adjust-funds-reserved/adjust-funds-reserved.template.html',
	            restrict: 'E',
	            controller: 'adjustFundsReservedCtrl',
	            scope: {
	            	caseId: '@',
	            	caseNumber: '@',
	            	cohortNumber: '@',
	            	rofAmount: '=',
	            	grnteeFeeFncdAmt: '=',
	            	mortgWthtFnclLfFeeAmt: '='
	            },
	            controllerAs: 'vm'
	        };
	    });
})();
