(function() {
	'use strict';
	angular
		.module('app')
	    .directive('lgFeePaidForm', function() {
	        return {
	            link: function (scope, element, attrs) {},
	            templateUrl: 'directives/endorsement/lg-fee-paid/lg-fee-paid-form.html',
	            restrict: 'E',
	            controller: 'LGFeePaidFormController',
	            controllerAs: 'vm',
	            scope: {
	            	validateLgFee: '='
	            }
	        };
	    });
})();
