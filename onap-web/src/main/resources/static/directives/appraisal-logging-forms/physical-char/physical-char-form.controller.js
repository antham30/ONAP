(function() {
	'use strict';

	angular.module('app').controller(
			'PhysicalCharFormController',
			[ '$scope', 'CommonFormService', 'AppraisalLoggingService',
					'FlashService', '$sce', 'Constants', PhysicalCharFormController ]);

	function PhysicalCharFormController($scope, CommonFormService,
			AppraisalLoggingService, FlashService, $sce, Constants) {
		var vm = this;
		vm.resetFormData = function() {
			CommonFormService.resetFormDataObj($scope.data);
			formatAndMaskValues($scope);
		};
		vm.savePhysicalCharFormData = savePhysicalCharFormData;
		vm.hasAllEmptyFields = function() {
			if ($scope.data && $scope.data.editable) {
				var formFields = [ $scope.data.editable.fndtnTypeCd,
						$scope.data.editable.nbrOfRoom,
						$scope.data.editable.nbrOfBdrm,
						$scope.data.editable.nbrOfBthrm,
						$scope.data.editable.lvingArea,
						$scope.data.editable.cntrlAirInd,
						$scope.data.editable.carStrgCd,
						$scope.data.editable.prrWithin3yrCd,
						$scope.data.editable.watrSrcCd,
						$scope.data.editable.sptcSrcCd ];
				var emptyData = true;

				formFields.forEach(function(value) {
					if (value) {
						emptyData = false;
					}
				});
				return emptyData;
			}
		}
		
		$scope.$watch('data', function(data) {
			formatAndMaskValues($scope);
		});
		
		function initController() {
			
			CommonFormService.getReferenceCodes('FOUNDATION TYPE').then(
					function(response) {
						vm.foundationOptions = response.data;
					});
			CommonFormService.getReferenceCodes('PRIOR SALE TYPE').then(
					function(response) {
						vm.priorSaleOptions = response.data;
					});
			CommonFormService.getReferenceCodes('CAR STORAGE').then(
					function(response) {
						vm.carStorageOptions = response.data;
					});
			CommonFormService.getReferenceCodes('WATER SOURCE').then(
					function(response) {
						vm.waterSourceOptions = response.data;
					});
			CommonFormService.getReferenceCodes('SEPTIC SOURCE').then(
					function(response) {
						vm.septicSourceOptions = response.data;
					});

			$('#rooms').mask('00');
			$('#bedrooms').mask('00');
			$('#bathrooms').mask('ZDP', {
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
			$('#livingArea').mask('00,000', {
				reverse : true
			});
		}

		function formatAndMaskValues(scope) {
			if (scope.data && scope.data.editable) {
				if (scope.data.editable.lvingArea) {
					var origValue = scope.data.editable.lvingArea;
					scope.data.editable.lvingArea = $('#livingArea').masked(
							origValue);
				}
				if(scope.data.editable.cntrlAirInd && scope.data.editable.cntrlAirInd == "n"){
					
				}else{
					scope.data.editable.cntrlAirInd = "y"
				}
			}
		}
		
		function mapFields(data) {
        	var postData = {
        		fndtnTypeCd: data.fndtnTypeCd,
        		nbrOfRoom: data.nbrOfRoom,
        		nbrOfBdrm: data.nbrOfBdrm,
        		nbrOfBthrm: data.nbrOfBthrm,
        		cntrlAirInd: data.cntrlAirInd,
        		carStrgCd: data.carStrgCd,
        		watrSrcCd: data.watrSrcCd,
        		sptcSrcCd: data.sptcSrcCd,
        		lvingArea: data.lvingArea
        	};
        	
        	// Remove commas from price
        	if (postData.lvingArea && angular.isString(postData.lvingArea)) {
        		postData.lvingArea = postData.lvingArea.replace(/,/g, '');	
        		postData.lvingArea = parseInt(postData.lvingArea);
        	}
        	return postData;
        }
		
		vm.invalidBathroom = function(){
			if ($scope.data && $scope.data.editable) {
    			if ($scope.data.editable.nbrOfRoom) {
    				if (Number($scope.data.editable.nbrOfRoom) < Number($scope.data.editable.nbrOfBthrm)) {
    					return true;
    				}
    			}
    		}
    		return false;
		}
		
		vm.invalidBedroom = function(){
			if ($scope.data && $scope.data.editable) {
    			if ($scope.data.editable.nbrOfRoom) {
    				if (Number($scope.data.editable.nbrOfRoom) < Number($scope.data.editable.nbrOfBdrm)) {
    					return true;
    				}
    			}
    		}
    		return false;
		}
		
		function validateFormData(){
			var errors = [];
        	if (vm.invalidBathroom()) {
        		//errors.push('Number of bathrooms cannot exceed number of rooms.');
        	}
        	if (vm.invalidBedroom()) {
        		//errors.push('Number of bedrooms cannot exceed number of rooms.');
        	}
        	return errors;
		}
		
		function savePhysicalCharFormData() {
			
			var validationMessages = validateFormData();
    		if (validationMessages.length > 0) {
    			var myValidationMessages = validationMessages.join(' ');
    			FlashService.error($sce.trustAsHtml(myValidationMessages));
    			return;
    		}
    		
			var loanId = $scope.loanId;
			var data = mapFields($scope.data.editable);
			
			return AppraisalLoggingService
					.savePhysicalCharData(loanId, data)
					.then(
							function(response) {
								if (response.success) {
									if (response.data
											&& response.data.status === 'SUCCESS') {
										FlashService
												.success(Constants.SUCCESS_MESSAGES.PHYSICAL_CHAR_DATA_SAVED);
										// Update data
										var data = mapFields(response.data);
										$scope.data = CommonFormService
												.createFormDataObj(data);
									} else {
										FlashService
												.error(Constants.ERROR_MESSAGES.SAVE_ERROR_PHYSICAL_CHAR_DATA);
									}
								} else {
									FlashService
											.error(Constants.ERROR_MESSAGES.SAVE_ERROR_PHYSICAL_CHAR_DATA);
								}
							});
		}
		// initiate
		initController();
	}
})();