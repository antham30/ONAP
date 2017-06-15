(function() {
	'use strict';
	angular
		.module('app')
	    .directive('propertyTab', function() {
	        return {
	        	link: function (scope, element, attrs) {},
	            templateUrl: 'directives/case-update/property-tab/propertyTab.view.html',
	            restrict: 'E',
	            controller: 'PropertyTabController',
	            scope: {}
	        };
	    });
})();
