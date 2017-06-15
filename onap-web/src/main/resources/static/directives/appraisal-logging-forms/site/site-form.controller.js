
(function() {
    'use strict';

    angular
    	.module('app')
        .controller('SiteFormController', ['$scope', 'CommonFormService', 'FlashService', 'AppraisalLoggingService', 'Constants', SiteFormController]);

    function SiteFormController($scope, CommonFormService, FlashService, AppraisalLoggingService, Constants) {
    	var vm = this;
    	
    	vm.resetFormData = function() {
    		CommonFormService.resetFormDataObj($scope.data);
    		formatFields();
    	}
    	
    	function formatFields() {
    		if ($scope.data && $scope.data.editable) {
    			if ($scope.data.editable.squareFeet) {
    				var originalValue = $scope.data.editable.squareFeet;
    				$scope.data.editable.squareFeet = $('#sqFt').masked(originalValue);
    			}
				// Change null values to empty strings    				
				if ($scope.data.editable.buildingTypeCode === null) {
					$scope.data.editable.buildingTypeCode = "";
				}
    		}
    	}
    	
    	vm.saveSiteData = saveSiteData;

		$scope.$watch('data', function(data) {
			formatFields();
		});
    	
        vm.hasAllEmptyFields = function() {
        	if ($scope.data && $scope.data.editable) {
	        	var formFields = [
		        	$scope.data.editable.squareFeet,
		        	$scope.data.editable.acres,
		        	$scope.data.editable.buildingTypeCode || null,
		        	$scope.data.editable.manufacturedHousing
	        	];

	        	var hasData = true;
	        	
	        	formFields.forEach(function(value) {
	        		if (value) {
	        			hasData = false;
	        		}
	        	});
	        	return hasData;
        	}
        	else {
        		return true;	
        	}
        }

    	function initController() {
    		$('#sqFt').mask('0,000,000,000', {reverse: true});
    		$('#acres').mask('ZZZDPP', {
				translation: {
  			      'Z': {
  			        pattern: /[0-9]/, optional: true
  			      },
  			      'D': {
  			    	  pattern: /\./
  			      },
  			      'P': {
  			    	  pattern: /[0-9]/, optional: true
  			      }
  			    }
			  });
    		CommonFormService.getReferenceCodes('BUILDING STRUCTURE')
    			.then(function(result) {
    				vm.buildingTypes = result.data;
    			})
    	}
    	
    	function validateFormData() {
    		var errors = [];
    		return errors;
    	}
    	
    	function mapFields(data) {
    		var postData = {
    			caseNumber: $scope.caseNumber,
    			squareFeet: data.squareFeet,
		        acres: data.acres,
		        buildingTypeCode: data.buildingTypeCode || null,
		        manufacturedHousing: data.manufacturedHousing
    		};
    		
        	// Remove commas from price
        	if (postData.squareFeet && angular.isString(postData.squareFeet)) {
        		postData.squareFeet = postData.squareFeet.replace(/,/g, '');
        	}
    		
    		return postData;
    	}
    	
    	
    	function saveSiteData() {
    		var validationMessages = validateFormData();
    		if (validationMessages.length > 0) {
    			FlashService.error(validationMessages.join(' '));
    			return;
    		}
    		var data = mapFields($scope.data.editable);
    		return AppraisalLoggingService.saveSiteData(data)
    			.then(function(response) {
    				if (response.success) {
        				if (response.data && response.data.status === 'SUCCESS') {
        					FlashService.success(Constants.SUCCESS_MESSAGES.SITE_DATA_SAVED);
            				// Update data
            				var data = response.data;
            				$scope.data = CommonFormService.createFormDataObj(data);
        				}
        				else {
        					FlashService.error(Constants.ERROR_MESSAGES.SAVE_ERROR_SITE_DATA);
        				}
    				}
    				else {
    					FlashService.error(Constants.ERROR_MESSAGES.SAVE_ERROR_SITE_DATA);
    				}
    			});
    	}
    	
    	initController();
    	
    }
})();