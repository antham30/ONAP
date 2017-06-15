(function() {
	'use strict';

	angular.module('app')
		.controller('appraisalLoggingTabsController', ['$location', 'AppraisalLoggingService', 'FlashService', 'CommonFormService', 'Constants', 'commonService', 'SharedDataService', appraisalLoggingTabsController]);
	
	function appraisalLoggingTabsController($location, AppraisalLoggingService, FlashService, CommonFormService, Constants, commonService, SharedDataService) {
		var vm = this;
		
		SharedDataService.requireAppraisalLogging();
		var currentCase = SharedDataService.getAppraisalLogging();

		vm.caseId = currentCase.caseId;
		vm.caseNumber = currentCase.caseNumber;
		
		/** Async getters
		 * 
		 * These will retrieve each tab's data and set a property
		 * with both the editable and non-editable versions of the data 
		 * using CommonFormService.createFormDataObj
		 * 
		 * Example:
		 * { original: {}, editable: {} }
		 */
        vm.getPropertyData = getPropertyData;
        vm.getNeighborhoodData = getNeighborhoodData;
        vm.getSiteData = getSiteData;
        vm.getPhysicalCharData = getPhysicalCharData;
        vm.getPriorSaleData = getPriorSaleData;
        vm.getReconciliationData = getReconciliationData;

        vm.removeFlash = removeFlash;
        vm.openPropertyTab = openPropertyTab;
        
        function initController() {
        	// Load default tab's data
        	getPropertyData(vm.caseNumber, vm.caseId)
		    	.then(function(response) {
		    		if (response.success) {
		    			vm.propertyData = CommonFormService.createFormDataObj(response.data);
		    		}
		    		else {
		    			FlashService.error(Constants.ERROR_MESSAGES.CASE_RETRIEVAL_ERROR);
		    		}
		    	});
        }
        
        function removeFlash() {
        	FlashService.removeFlashMessage();
        }
        
        function getPropertyData(caseNumber, caseId) {
        	if (angular.isObject(vm.propertyData)) return;
        	var caseId = caseId || vm.caseId;
        	var caseNumber = caseNumber || vm.caseNumber;
	        return AppraisalLoggingService.getPropertyData(caseNumber, caseId);
        }
        
        function getNeighborhoodData(caseNumber) {
        	if (angular.isObject(vm.neighborhoodData)) return;
        	var caseNumber = caseNumber || vm.caseNumber;
	        return AppraisalLoggingService.getNeighborhoodData(caseNumber)
		    	.then(function(response) {
		    		if (response.success) {
		    			vm.neighborhoodData = CommonFormService.createFormDataObj(response.data);
		    		}
		    		else {
		    			FlashService.error(Constants.ERROR_MESSAGES.CASE_RETRIEVAL_ERROR);
		    		}
		    	});
        }
        
        function getSiteData(caseNumber) {
        	if (angular.isObject(vm.siteData)) return;
        	var caseNumber = caseNumber || vm.caseNumber;
        	return AppraisalLoggingService.getSiteData(caseNumber)
        		.then(function(response) {
        			vm.siteData = CommonFormService.createFormDataObj(response.data);
        		}, function() {
	    			FlashService.error(Constants.ERROR_MESSAGES.CASE_RETRIEVAL_ERROR);
	    		});
        }
        
        function getPhysicalCharData(caseId) {
        	if (angular.isObject(vm.physicalCharData)) return;
        	var caseId = caseId || vm.caseId;
        	return AppraisalLoggingService.getPhysicalCharData(caseId)
        		.then(function(response) {
        			vm.physicalCharData = CommonFormService.createFormDataObj(response.data);
        		}, function() {
	    			FlashService.error(Constants.ERROR_MESSAGES.CASE_RETRIEVAL_ERROR);
	    		})
        }
        
        function getPriorSaleData(caseNumber) {
        	if (angular.isObject(vm.priorSaleData)) return;
        	var caseNumber= caseNumber || vm.caseNumber;
        	return AppraisalLoggingService.getPriorSaleData(caseNumber)
        		.then(function(response) {
        			vm.priorSaleInfoData = CommonFormService.createFormDataObj(response.data);
        		}, function() {
	    			FlashService.error(Constants.ERROR_MESSAGES.CASE_RETRIEVAL_ERROR);
	    		})
        }
        
        function getReconciliationData(caseId) {
        	if (angular.isObject(vm.reconciliationData)) return;
        	var caseId = caseId || vm.caseId;
        	return AppraisalLoggingService.getReconciliationData(caseId)
        		.then(function(response) {
        			vm.reconciliationData = CommonFormService.createFormDataObj(response.data);
        		}, function() {
	    			FlashService.error(Constants.ERROR_MESSAGES.CASE_RETRIEVAL_ERROR);
	    		})
        }
        
        // initiate        
        initController();
        
		function openPropertyTab(caseId, caseNumber) {
			 SharedDataService.setCaseReview({
				 caseId: caseId,
				 caseNumber: caseNumber
			 });
			 $location.path('/caseReviewProperty');
		 }
		
	}
	
	
})();