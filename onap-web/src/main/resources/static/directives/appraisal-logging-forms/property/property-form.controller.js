(function() {
    'use strict';

    angular
    	.module('app')
        .controller('PropertyFormController', ['$scope', 'CasesService', 'CommonFormService', 'AppraisalLoggingService', 'FlashService', 'Constants', PropertyFormController]);

    function PropertyFormController($scope, CasesService, CommonFormService, AppraisalLoggingService, FlashService, Constants) {
    	var vm = this;
    	
    	vm.savePropertyData = savePropertyData;
    	vm.resetFormData = function() {
    		CommonFormService.resetFormDataObj($scope.data);
    		formatFields();
    	}
    	
		// Format currency field
		$scope.$watch('data', function(data) {
			if (data && data.editable) {
				formatFields();
			}
		});
		
		// Get address
		var getAddress = $scope.$watch('data', function(data) {
			if (data && data.original) {
				$scope.address = angular.copy(data.original.address);
				getAddress();
			}
		});
		
		function formatFields() {
			var originalValue = $scope.data.editable.contractPrice;
			$scope.data.editable.contractPrice = $('.money').masked(originalValue);
			
			// Change null values to empty strings    				
			if ($scope.data.editable.prprtMonth === null) {
				$scope.data.editable.prprtMonth = "";
			}
			if ($scope.data.editable.landType === null) {
				$scope.data.editable.landType = "";
			}
			
			if ($scope.data.editable.aprslMethod === null) {
				$scope.data.editable.aprslMethod = "";
			}
		}
    	
    	function initController() {
    		
            CommonFormService.getReferenceCodes(Constants.REFERENCE_CODES.LAND_STATUS)
	        	.then(function(response) {
	        		vm.landTypes = response.data;
	        	}, function(error) {
	        		FlashService.error(Constants.ERROR_MESSAGES.LAND_TYPE_RETRIEVAL_ERROR);
	        	});
            CommonFormService.getReferenceCodes(Constants.REFERENCE_CODES.APPRAISAL_METHOD)
	        	.then(function(response) {
	        		vm.appraisalMethods = response.data;
	        	}, function(error) {
	        		FlashService.error(Constants.ERROR_MESSAGES.APPRAISAL_METHOD_RETRIEVAL_ERROR);
	        	});
            CasesService.getConstructionCode($scope.caseNumber)
           		.then(function(response) {
            		$scope.constrnCd = response.data;
           		}, function(error) {
	        		FlashService.error(Constants.ERROR_MESSAGES.CONSTRUCTION_CODE_RETRIEVAL_ERROR);
	        	});
	        	AppraisalLoggingService.getLoanForCase($scope.caseId)
		    	.then(function(response){
		    		if (response && response.data) {
		    			var yrs = (Number(response.data.loanTermNbr) / 12);
		    			$scope.remainingEconomicLifeMin = Math.floor(yrs);
		    		}
		    	}, function(error) {
	        		FlashService.error(Constants.ERROR_MESSAGES.LOAN_LOAD_ERROR);
	        	});

            vm.months = [{ value: '1', display: '01'}, { value: '2', display: '02' }, { value: '3', display: '03' }, 
                         { value: '4', display: '04' }, { value: '5', display: '05' }, { value: '6', display: '06' },
                         { value: '7', display: '07' }, { value: '8', display: '08' }, { value: '9', display: '09' },
    		             { value: '10',display: '10' }, { value: '11', display: '11' }, { value: '12', display: '12' }];
           
    	}
    	
    	vm.invalidPropertyDate = function() {
    		if ($scope.data && $scope.data.editable) {
    			if ($scope.data.editable.prprtMonth && $scope.data.editable.prprtYear) {
	    			var d = new Date($scope.data.editable.prprtYear, parseInt($scope.data.editable.prprtMonth)-1);
	    			if (d > new Date()) {
	    				return true;
	    			}
	    			return false;
    			}
    			else if (($scope.data.editable.prprtMonth && !$scope.data.editable.prprtYear) 
    					|| ($scope.data.editable.prprtYear  && !$scope.data.editable.prprtMonth)) {
    				return true;
    			}
    		}
    	}

    	vm.invalidAppReceivedDate = function() {
    		if ($scope.data && $scope.data.editable) {
    			if ($scope.data.editable.aprslRecvDt) {
	    			var d = new Date($scope.data.editable.aprslRecvDt);
	    			if (d > new Date()) {
	    				return true;
	    			}
	    			return false;
    			}
    		}
    	}
    	
    	vm.invalidRemainingEconomicLife = function() {
    		if ($scope.data && $scope.data.editable) {
    			if ($scope.data.editable.remnEcnmcLife) {
    				if (Number($scope.data.editable.remnEcnmcLife) < Number($scope.remainingEconomicLifeMin)) {
    					return true;
    				}
    			}
    		}
    		return false;
    	}
    	
    	vm.invalidContractDate = function() {
    		if ($scope.data && $scope.data.editable) {
    			if ($scope.data.editable.contractDt) {
	    			var d = new Date($scope.data.editable.contractDt);
	    			if (d > new Date()) {
	    				return true;
	    			}
	    			return false;
    			}
    		}
    	}
    	
        vm.hasAllEmptyFields = function() {
        	if ($scope.data && $scope.data.editable) {
	        	var formFields = [
		        	$scope.data.editable.prprtMonth,
		        	$scope.data.editable.prprtYear,
		        	$scope.data.editable.remnEcnmcLife,
		        	$scope.data.editable.effcAge,
		        	$scope.data.editable.landType,
		        	$scope.data.editable.aprslMethod,
		        	$scope.data.editable.aprslRecvDt,
		        	$scope.data.editable.contractDt,
		        	$scope.data.editable.contractPrice
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
        
        function mapFields(data) {
        	var postData = {
        		prprtMonth: data.prprtMonth || null,
        		prprtYear: data.prprtYear || null,
        		remnEcnmcLife: data.remnEcnmcLife,
        		effcAge: data.effcAge,
        		landType: data.landType || null,
        		aprslMethod: data.aprslMethod || null,
        		aprslRecvDt: data.aprslRecvDt || null,
        		contractDt: data.contractDt || null,
        		contractPrice: data.contractPrice || null
        	};
        	
        	// Remove commas from price
        	if (angular.isString(postData.contractPrice) && postData.contractPrice.length > 0) {
        		postData.contractPrice = postData.contractPrice.replace(/,/g, '');	
        		postData.contractPrice = parseInt(postData.contractPrice);
        	}
        	return postData;
        }
        
        function validateFormData() {
        	var errors = [];
        	if ($scope.propertyFields.$invalid) {
        		errors.push(Constants.ERROR_MESSAGES.GENERIC_FORM_ERROR);
        	}
        	if (vm.invalidPropertyDate()) {
        		errors.push(Constants.ERROR_MESSAGES.MONTH_YEAR_INVALID);
        	}
        	if (vm.invalidAppReceivedDate()) {
        		errors.push(Constants.ERROR_MESSAGES.APPRAISAL_RECEIVED_DATE_ERROR);
        	}
        	if (vm.invalidContractDate()) {
        		errors.push(Constants.ERROR_MESSAGES.CONTRACT_DATE_ERROR);
        	}
        	if (vm.invalidRemainingEconomicLife()) {
        		errors.push(Constants.ERROR_MESSAGES.REMAINING_ECONOMIC_LIFE_ERROR.replace(':num', $scope.remainingEconomicLifeMin));
        	}
        	return errors;
        };
        
    	function savePropertyData() {
    		var validationMessages = validateFormData();
    		if (validationMessages.length > 0) {
    			FlashService.error(validationMessages.join(' '));
    			return;
    		}
    		var data = mapFields($scope.data.editable);
    		return AppraisalLoggingService.savePropertyData($scope.caseNumber, data)
    			.then(function(response) {
    				if (response.success) {
    					if (response.data && response.data.status === 'SUCCESS') {
            				FlashService.success(Constants.SUCCESS_MESSAGES.PROPERTY_DATA_SAVED);
            				// Update data
            				var data = mapFields(response.data);
            				$scope.data = CommonFormService.createFormDataObj(data);
    					}
    					else {
    						FlashService.error(Constants.ERROR_MESSAGES.SAVE_ERROR_PROPERTY_DATA);
    					}
    				}
    				else {
    					FlashService.error(Constants.ERROR_MESSAGES.SAVE_ERROR_PROPERTY_DATA);
    				}
    			});
    	}
        
        // initialize
        initController();
        
    	// Datepicker funtionality
        $('#appraisalReceivedDate, #dateOfContract').datepicker({
      	  maxPicks: 1,
      	  changeMonth : true,
          changeYear : true,
          yearRange: '-100y:c+nn',
          maxDate: new Date(),
          dateFormat: "mm/dd/yy"
        });
        
        // Masking functionality
        $('.money').mask('0,000,000', {reverse: true});
        $('#yearCompleted').mask('0000');
        $('#remainingEconomicLife').mask('000');
        $('#effectiveAge').mask('00');
        $('#appraisalReceivedDate').mask('00/00/0000');
        $('#dateOfContract').mask('00/00/0000');
    }
})();