(function() {
	'use strict';
	angular
		.module('app')
	    .directive('priorSaleInfoForm', function() {
	        return {
	            link: function (scope, element, attrs) {},
	            templateUrl: 'directives/appraisal-logging-forms/prior-sale-info/prior-sale-info-form.html',
	            restrict: 'E',
	            controller: 'PriorSaleInfoFormController',
	            controllerAs: 'vm',
	            scope: {
	            	data: '=',
	            	caseNumber: '@'
	            }
	        };
	    });
})();
