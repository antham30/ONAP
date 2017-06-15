(function() {
    'use strict';

    angular
    	.module('CaseDetailsModule')
        .controller('CaseDetailsController', ['$window', '$scope', 'CasesService', 'FlashService', 'Constants', CaseDetailsController]);

    function CaseDetailsController($window, $scope, CasesService, FlashService, Constants) {
    	var vm = this;
    	
    	function getCaseSummary(caseId, refresh) {
    		return CasesService.getCaseSummary(caseId, refresh);
    	}
    	
    	function initController(refresh) {
    		var caseNumber = $scope.caseNumber;
    		getCaseSummary(caseNumber, refresh)
    			.then(function(response) {
    				vm.details = response.data;
    			}, function(response) {
    				// FlashService.error(Constants.ERROR_MESSAGES.CASE_RETRIEVAL_ERROR);
    			});
    	}
    	
    	vm.getCaseSummary = getCaseSummary;

    	$scope.$on('refreshCaseSummary', function(e) {
    		initController(true);
    	});
    	
    	// initialization
    	initController();
    }
})();