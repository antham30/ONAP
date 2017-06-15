(function() {
	'use strict';
	angular
		.module('app')
	    .directive('documentsTab', function() {
	        return {
	        	link: function (scope, element, attrs) {},
	            templateUrl: 'directives/case-update/documents-tab/documentsTab.view.html',
	            restrict: 'E',
	            controller: 'DocumentsTabController',
	            controllerAs: 'vm'
	        };
	    });
})();
