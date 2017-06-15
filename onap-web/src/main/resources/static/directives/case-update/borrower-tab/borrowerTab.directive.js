(function() {
	'use strict';
	angular
		.module('app')
	    .directive('borrowerTab', function() {
	        return {
	        	link: function (scope, element, attrs) {},
	            templateUrl: 'directives/case-update/borrower-tab/borrowerTab.view.html',
	            restrict: 'E',
	            controller: 'BorrowerTabController',
	            scope: {}
	        };
	    });
})();
