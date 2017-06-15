(function() {
	'use strict';
	angular
		.module('app')
	    .directive('caseReviewBorrowerFundsForm', function() {
	        return {
	        	link: function (scope, element, attrs) {},
	            templateUrl: 'directives/case-update/loan/case-review-borrower-funds/case-review-borrower-funds.html',
	            restrict: 'E',
	            controller: 'caseReviewBorrowerFundsController',
	            controllerAs: 'vm',
	            scope: {
	            	data: '=',
	            	loanData: '='
	            }
	        };
	    });
})();
