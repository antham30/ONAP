(function() {
	'use strict';
	angular
		.module('app')
	    .directive('lenderTab', function() {
	        return {
	        	link: function (scope, element, attrs) {},
	            templateUrl: 'directives/case-update/lender-tab/lenderTab.view.html',
	            restrict: 'E',
	            controller: 'LenderTabController',
	            scope: {}
	        };
	    });
})();
