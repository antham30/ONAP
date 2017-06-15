(function() {
    'use strict';

    angular
    	.module('app')
        .controller('PriorSaleInfoFormController', ['$scope', 'CommonFormService', 'AppraisalLoggingService', 'FlashService', 'Constants', PriorSaleInfoFormController]);

    function PriorSaleInfoFormController($scope, CommonFormService, AppraisalLoggingService, FlashService, Constants) {
    	var vm = this;
    	vm.resetFormData = function() {
    		CommonFormService.resetFormDataObj($scope.data);
        };
        vm.savePriorSalesFormData = savePriorSalesFormData;
        vm.hasAllEmptyFields = function() {
        	if ($scope.data && $scope.data.editable) {
	        	var formFields = [
		        	$scope.data.editable.priorSaleCode
	        	];
	        	var emptyData = true;
	        	
	        	formFields.forEach(function(value) {
	        		if (value) {
	        			emptyData = false;
	        		}
	        	});
	        	return emptyData;
        	}
        }
        
        function initController(){
	    	CommonFormService.getReferenceCodes(Constants.REFERENCE_CODES.PRIOR_SALE_TYPE)
	    	.then(function(response){
	    		vm.priorSaleOptions = response.data;
	    	});
        }
        function savePriorSalesFormData(caseNumber) {
        	var caseNumber = caseNumber || $scope.caseNumber;
    		var data = $scope.data.editable;
    		
    		return AppraisalLoggingService.savePriorSaleData(data)
    			.then(function(response) {
    				FlashService.success(Constants.SUCCESS_MESSAGES.PRIOR_SALE_DATA_SAVED);
    				// Update data
    				$scope.data = CommonFormService.createFormDataObj(response.data);
    			})
    	}
        
        // initiate        
        initController();
    }
})();