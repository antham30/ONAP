(function() {
    'use strict';

    angular
    	.module('app')
        .controller('ReconciliationFormController', ['$scope', 'CommonFormService', 'AppraisalLoggingService', 'FlashService', 'Constants', ReconciliationFormController]);

    function ReconciliationFormController($scope, CommonFormService, AppraisalLoggingService, FlashService, Constants) {
    	var vm = this;
    	vm.resetFormData = function() {
    		CommonFormService.resetFormDataObj($scope.data);
    		formatFields();
        };
        
        function formatFields() {
    		if ($scope.data && $scope.data.editable) {
    			if ($scope.data.editable.aprsdVal) {
    				var originalValue = $scope.data.editable.aprsdVal;
    				$scope.data.editable.aprsdVal = $('#appraisalValue').masked(originalValue);
    			}
				// Change null values to empty strings    				
				if ($scope.data.editable.aprslTypeCd === null) {
					$scope.data.editable.aprslTypeCd = "";
				}    				
				if ($scope.data.editable.aprsrLicTypeCd === null) {
					$scope.data.editable.aprsrLicTypeCd = "";
				}
				if ($scope.data.editable.stCd === null) {
					$scope.data.editable.stCd = "";
				}
    		}
        }
        
    	vm.invalidAppraisalDate = function() {
    		if ($scope.data && $scope.data.editable) {
    			if ($scope.data.editable.aprslDt) {
	    			var d = new Date($scope.data.editable.aprslDt);
	    			if (d > new Date()) {
	    				return true;
	    			}
	    			return false;
    			}
    		}
    	}
    	
    	vm.stateIncomplete = function() {
    		if ($scope.data.editable) {
    			if ($scope.data.editable.stCd) {
    				return false;
    			}
    		}
    		return true;
    	}
    	
    	vm.licenseTypeIncomplete = function() {
    		if ($scope.data.editable) {
    			if ($scope.data.editable.aprsrLicTypeCd) {
    				return false;
    			}
    		}
    		return true;
    	}
    	
    	vm.firstNameIncomplete = function() {
    		if ($scope.data.editable) {
    			if ($scope.data.editable.frstNm) {
    				return false;
    			}
    		}
    		return true;
    	}
    	
    	vm.lastNameIncomplete = function() {
    		if ($scope.data.editable) {
    			if ($scope.data.editable.lastNm) {
    				return false;
    			}
    		}
    		return true;
    	}
    	
    	vm.licenseNumberIncomplete = function() {
    		if ($scope.data.editable) {
    			if ($scope.data.editable.aprsrStLcncNbr) {
    				return false;
    			}
    		}
    		return true;
    	}
        
        
		$scope.$watch('data', function(data) {
			formatFields();
		});
        
        vm.saveReconciliationData = saveReconciliationData;
        
        vm.hasAllEmptyFields = function() {
        	if ($scope.data && $scope.data.editable) {
	        	var formFields = [
		        	$scope.data.editable.aprsdVal,
		        	$scope.data.editable.aprslTypeCd,
		        	$scope.data.editable.aprsrStLcncNbr,
		        	$scope.data.editable.aprslDt,
		        	$scope.data.editable.frstNm,
		        	$scope.data.editable.mdlNm,
		        	$scope.data.editable.lastNm,
		        	$scope.data.editable.aprsrLicTypeCd,
		        	$scope.data.editable.stCd
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
        	CommonFormService.getReferenceCodes(Constants.REFERENCE_CODES.APPRAISAL_TYPE)
	    	.then(function(response){
	    		vm.appraisalMethodOptions = response.data;
	    	}, function(error) {
        		FlashService.error(Constants.ERROR_MESSAGES.APPRAISAL_TYPE_RETRIEVAL_ERROR);
        	});
        	CommonFormService.getReferenceCodes(Constants.REFERENCE_CODES.STATE_PREFIX)
	    	.then(function(response){
	    		vm.statesList = response.data;
	    	}, function(error) {
        		FlashService.error(Constants.ERROR_MESSAGES.STATES_RETRIEVAL_ERROR);
        	});
        	CommonFormService.getReferenceCodes(Constants.REFERENCE_CODES.APPRAISER_LICENSE_TYPE)
	    	.then(function(response){
	    		vm.appraiserLicenseTypes = response.data;
	    	}, function(error) {
        		FlashService.error(Constants.ERROR_MESSAGES.APPRAISAL_LICENSE_TYPE_RETRIEVAL_ERROR);
        	});        	
        }
        
    	// Datepicker funtionality
        $('#dateOfAppraisal').datepicker({
      	  maxPicks: 1,
      	  changeMonth : true,
          changeYear : true,
          yearRange: '-100y:c+nn',
          dateFormat: "mm/dd/yy"
        });
        
        $('#appraisalValue').mask('0,000,000', {reverse: true});
        $('#middleInitial').mask('A', {'translation': { A: {pattern: /[A-Za-z]/} } });
        
        function validateFormData() {
        	var validated = true;
        	
        	vm.showAppraisalDateError = false;
        	vm.showStateError = false;
        	vm.showLicenseTypeError = false;
        	vm.showLicenseNumberError = false;
        	vm.showFirstNameError = false;
        	vm.showLastNameError = false;
        	
        	if (vm.invalidAppraisalDate()) {
        		validated = false;
        		vm.showAppraisalDateError = true;
        		vm.appraisalDateError = Constants.ERROR_MESSAGES.APPRAISAL_DATE_INVALID;
        	}
        	if (vm.stateIncomplete()) {
        		validated = false;
        		vm.showStateError = true;
        		vm.stateError = Constants.ERROR_MESSAGES.STATE_REQUIRED_ERROR;
        	}
        	if (vm.licenseTypeIncomplete()) {
        		validated = false;
        		vm.showLicenseTypeError = true;
        		vm.licenseTypeError = Constants.ERROR_MESSAGES.APPRAISAL_LICENSE_TYPE_REQUIRED_ERROR;
        	}
        	if (vm.licenseNumberIncomplete()) {
        		validated = false;
        		vm.showLicenseNumberError = true;
        		vm.licenseNumberError = Constants.ERROR_MESSAGES.LICENSE_NUMBER_REQUIRED;
        	}
        	if (vm.firstNameIncomplete()) {
        		validated = false;
        		vm.showFirstNameError = true;
        		vm.firstNameError = Constants.ERROR_MESSAGES.FIRST_NAME_REQUIRED;
        	}
        	if (vm.lastNameIncomplete()) {
        		validated = false;
        		vm.showLastNameError = true;
        		vm.lastNameError = Constants.ERROR_MESSAGES.LAST_NAME_REQUIRED;
        	}
        	return validated;
        }
        
        function getPostValue(field) {
        	if (!field) {
        		if (field === 0) {
        			return 0;
        		}
        		else {
        			return null;
        		}
        	}
        	return field;
        }

        
        function mapFields(data) {
    		var postData = {
    		        aprsdVal: getPostValue(data.aprsdVal),
    		        aprslTypeCd: data.aprslTypeCd || null,
    		        aprsrStLcncNbr: data.aprsrStLcncNbr || null,
    		        aprslDt: data.aprslDt || null,
    		        frstNm: data.frstNm || null,
    		        mdlNm: data.mdlNm || null,
    		        lastNm: data.lastNm || null,
    		        stCd: data.stCd || null,
    		        aprsrLicTypeCd: data.aprsrLicTypeCd || null
        		};
    		
        	// Remove commas from price
        	if (angular.isString(postData.aprsdVal)) {
        		postData.aprsdVal = postData.aprsdVal.replace(/,/g, '');
        	}
   
        		return postData;
        }
        
        function saveReconciliationData() {
    		var validated = validateFormData();
    		if (!validated) {
    			return;
    		}
    		var data = mapFields($scope.data.editable);
    		return AppraisalLoggingService.saveReconciliationData($scope.loanId, data)
    			.then(function(response) {
    				if (response.success) {
        				FlashService.success(Constants.SUCCESS_MESSAGES.RECONCILIATION_DATA_SAVED);
        				// Update data
        				var data = mapFields(response.data);
        				$scope.data = CommonFormService.createFormDataObj(data);
    				}
    				else {
    					FlashService.error(Constants.ERROR_MESSAGES.RECONCILIATION_RETRIEVAL_ERROR);
    				}
    			});	
    	}
        
        initController();
    }
    
})();