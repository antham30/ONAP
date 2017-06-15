(function() {
	'use strict';
	angular
		.module('app')
	    .directive('endorsementTab', function() {
	        return {
	        	link: function (scope, element, attrs) {},
	            templateUrl: 'directives/case-update/endorsement-tab/endorsementTab.view.html',
	            restrict: 'E',
	            controller: 'caseReviewEndoresementReviewController',
	            controllerAs: 'vm',
	            scope: {}
	        };
	    });
})();