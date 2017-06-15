(function() {
    'use strict';

    angular
    	.module('app')
    	.controller('NeighborhoodFormController', ['$scope', 'CommonFormService', 'AppraisalLoggingService', 'FlashService', 'Constants', NeighborhoodFormController]);

    function NeighborhoodFormController($scope, CommonFormService, AppraisalLoggingService, FlashService, Constants) {
    	var vm = this;
    	vm.resetFormData = function() {
    		CommonFormService.resetFormDataObj($scope.data);
    		formatAndMaskValues($scope);
        };
        vm.saveNeighborhoodData = saveNeighborhoodData;
        
        vm.hasAllEmptyFields = function() {
        	if ($scope.data && $scope.data.editable) {
	        	var formFields = [
		        	$scope.data.editable.locationCode,
		        	$scope.data.editable.predominantNeighborhoodPrice,
		        	$scope.data.editable.landUseOneUnit,
		        	$scope.data.editable.landUseTwoToFourUnits
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
        
        function initController() {
        	$scope.$watch('data', function(data) {
        		formatAndMaskValues($scope);
            });
        	
	    	CommonFormService.getReferenceCodes('LOCATION TYPE')
	    	.then(function(response){
	    		vm.locationOptions = response.data;
	    	});
	    	$('.money').mask('0,000,000', {reverse: true});
	    	$('.percent').mask('#00');
        }
    	
    	function saveNeighborhoodData(caseNumber) {
    		var caseNumber = caseNumber || $scope.caseNumber;
    		var data = $scope.data.editable;
    		
    		//trim commas from price generated by masking
    		if(data && data.predominantNeighborhoodPrice){
    			data.predominantNeighborhoodPrice = data.predominantNeighborhoodPrice.replace(/,/g, "");
    		}
    		
    		return AppraisalLoggingService.saveNeighborhoodData(data)
    			.then(function(response) {
    				FlashService.success(Constants.SUCCESS_MESSAGES.NEIGHBORHOOD_DATA_SAVED);
    				// Update data
    				$scope.data = CommonFormService.createFormDataObj(response.data);
    			})
    	}
    	
    	function formatAndMaskValues(scope){
    		if (scope.data && scope.data.editable) {
    			if (scope.data.editable.predominantNeighborhoodPrice) {
    				var origValue = scope.data.editable.predominantNeighborhoodPrice;
    				scope.data.editable.predominantNeighborhoodPrice = $('.money').masked(origValue);
    			}
            }
    	}
    	// initialize
        initController();
    }
})();