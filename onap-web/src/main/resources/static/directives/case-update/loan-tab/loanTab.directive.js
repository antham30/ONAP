(function() {
	'use strict';
	angular
		.module('app')
	    .directive('loanTab', function() {
	        return {
	        	link: function (scope, element, attrs) {},
	            templateUrl: 'directives/case-update/loan-tab/loanTab.view.html',
	            restrict: 'E',
	            controller: 'LoanTabController',
	            controllerAs: 'csdc',
	            scope: {}
	        };
	    });
})();
