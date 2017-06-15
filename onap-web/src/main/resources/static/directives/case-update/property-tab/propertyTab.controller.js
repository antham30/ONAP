angular.module('app').controller('PropertyTabController', function ($scope, $http, $window, $rootScope, $location, LoggingService, CasesService, Constants, SharedDataService, CaseUpdateService, CommonFormService,FlashService) {

	SharedDataService.requireCaseReview();
	var currentCase = SharedDataService.getCaseReview();
	
	$scope.caseId = currentCase.caseId;
	$scope.caseNumber = currentCase.caseNumber;
	
	$scope.goToRoute = function(route) {
		$location.path('/' + route);
	}

	$scope.showStarAddress = true;
	
	$scope.initfun =function(){
		
		if ($scope.property && $scope.property.newConstr && $scope.property.newConstr && $scope.property.newConstr !== undefined && $scope.property.newConstr !== null){
		$scope.showStarLot = true;
		$scope.showStarAddress = false;
		$scope.property.newConstr = 1;

		}else{
			$scope.showStarLot = false;
		$scope.showStarAddress = true;
		if ($scope.property) {
			$scope.property.newConstr = 0;
		}
		
		}
		if ($scope.landTypeCd == 'TRIB' || $scope.landTypeCd == 'ALLT') {
			$scope.showStarBias = true;
			
		  }else{
			$scope.showStarBias = false;
		
		  }
	}
	
	
	$scope.getcaseNumber=function(){
		
		CaseUpdateService.getPropertyForCase($scope.caseId)
			.then(function(response) {
				if (response.success && response.data.status == "SUCCESS") {
			        $scope.property = response.data;
					$scope.getLandStatus();
					$scope.getStatePrefix();
					
					$scope.getTribal();
					$scope.getCountiesForState($scope.property.prprtyAddr.stCd);
					$scope.landTypeCd =  $scope.property.landTypeCd.trim();
					$scope.property.tribeLandJurisDctn =  $scope.property.tribeLandJurisDctn.trim();
					$scope.some();
					$scope.initfun();
					$scope.property.newConstr = $scope.property.newConstr === 1 ? true:false;
				}
				else if (response.error || (response.data && response.data.status == "ERROR")) {
					
					FlashService.error(response.data.errorMessage);
				}
			}, function() {
				FlashService.error(Constants.ERROR_MESSAGES.PROPERTY_FOR_CASE_RETRIEVAL_ERROR);
			});
	}
	$scope.getcaseNumber();
	
	 $scope.getCaseSummary = function(caseNumber) {
		 return CasesService.getCaseSummary(caseNumber);
	 }
	
	// Get case summary
	$scope.getCaseSummary($scope.caseNumber)
		.then(function(response) {
			$scope.caseSummary = response.data;
		});

	$scope.getStatePrefix=function(){
		CommonFormService.getReferenceCodes(Constants.REFERENCE_CODES.STATE_PREFIX)
		.then(function(response) {
			if (response.data) {
				$scope.statePrefix = response.data;
			}
			else if (response.error) {
				FlashService.error(Constants.ERROR_MESSAGES.STATES_RETRIEVAL_ERROR);
			}
		}, function() {
			FlashService.error(Constants.ERROR_MESSAGES.STATES_RETRIEVAL_ERROR);
		});
	}
	
	
	$scope.checkValidSession = function(){
		var user = JSON.parse($window.sessionStorage.getItem("activeUser"));
		if(LoggingService.validationLoggedUser(user) === false)
			LoggingService.toRoot();
	}
	
	$scope.checkValidSession();
	$scope.getStatePrefix();

	$scope.getLandStatus=function(){
		CommonFormService.getReferenceCodes(Constants.REFERENCE_CODES.LAND_STATUS)
		.then(function(response) {
			if (response.data) {
				$scope.landStatus = response.data;
			}
			else if (response.error) {
				FlashService.error(Constants.ERROR_MESSAGES.LAND_STATUS);
			}
		}, function() {
			FlashService.error(Constants.ERROR_MESSAGES.LAND_STATUS);
		});
	}

	$scope.getLandStatus();
	
	$scope.getTribal=function(){   
		CommonFormService.getReferenceCodes(Constants.REFERENCE_CODES.TRIBE)
		.then(function(response) {
			if (response.data) {
				$scope.tribal = response.data;
			}
			else {
				FlashService.error(Constants.ERROR_MESSAGES.TRIBE_RETRIEVAL_ERROR);
			}
		}, function() {
			FlashService.error(Constants.ERROR_MESSAGES.TRIBE_RETRIEVAL_ERROR);
		});
    }
	
	  $scope.getCountiesForState = function(state){
	    CaseUpdateService.getCountiesForState(state)
	    	.then(function(response) {
	    		if (response.success && response.data.status == "SUCCESS") {
					
	    			$scope.loanMACounties = response.data.countiesForState;
				}
	    		
	    		else if (response.error || response.data.status == "ERROR") {
	    			
	    			FlashService.error(response.data.errorMessage);
	    		}
	    	}, function() {
	    		FlashService.error(Constants.ERROR_MESSAGES.TRIBE_RETRIEVAL_ERROR);
	    	});
		  }
	$scope.changeCounty = function(){
		$scope.property.prprtyAddr.cntyNm = '';
	}
	
var checkingPropertyBia;
 
    $scope.getTribal();
	 $scope.some= function(){
	
		  if ($scope.landTypeCd == 'FSIM') {
	    		 $scope.showPropertyBiaDiv=false;
	    		 checkingPropertyBia = false;
	       
	         }
	         else {
	        	 $scope.showPropertyBiaDiv=true;
	        	 checkingPropertyBia = true;
				 $scope.showStarTribal = true;

	         }
			
			if ($scope.landTypeCd == 'TRIB' || $scope.landTypeCd == 'ALLT') {
				$scope.showStarBias = true;
				  
			  }else{
				$scope.showStarBias = false;
				  
			  }
	 }
	
		
			$scope.errorPropertyLandStatusText = Constants.ERROR_MESSAGES.LAND_STATUS_REQUIRED;
			$scope.errorPropertyStateText = Constants.ERROR_MESSAGES.STATE_REQUIRED;
			$scope.errorPropertyZipText = Constants.ERROR_MESSAGES.ZIP_CODE_INVALID;
			$scope.errorPropertyZipCODEMessageText = Constants.ERROR_MESSAGES.ZIP_CODE_LENGTH_ERROR;
			$scope.errorBiaReservNoText = Constants.ERROR_MESSAGES.BIA_RESERVATION_CODE_REQUIRED;
			$scope.errorBiaContractText = Constants.ERROR_MESSAGES.CONTRACT_NUM_REQUIRED;
			$scope.errorPropertyLotText = Constants.ERROR_MESSAGES.PROPERTY_LOT_REQUIRED;
			$scope.errorBiaTrackNoText = Constants.ERROR_MESSAGES.BIA_TRACKING_NUM_REQUIRED;
			$scope.errorBiaTribalText = Constants.ERROR_MESSAGES.NAME_TRIBE_LAND_JURISDICTION_ERROR;
			$scope.errorPropertyCityText = Constants.ERROR_MESSAGES.CITY_REQUIRED;
			$scope.errorPropertyAddressOneText = Constants.ERROR_MESSAGES.ADDRESS_REQUIRED;
			$scope.errorPropertyCountryText = Constants.ERROR_MESSAGES.COUNTY_REQUIRED;
			$scope.errorPropertyNoUnitsText = Constants.ERROR_MESSAGES.NUM_UNITS_REQUIRED;
			
		    $scope.propertyValidation = function () {
		        var pincodePattern = /^\d{5}$/;
		        var statusProperty =false;
		        $scope.errorPropertyLandStatus=false;
		        $scope.errorPropertyState=false;
		        $scope.errorPropertyZip=false;
		        $scope.errorPropertyZipCODEMessage=true;
				$scope.errorBiaReservNo = false;
				$scope.errorBiaContract = false;
				 $scope.errorPropertyLot=false;
				$scope.errorBiaTrackNo = false;
				$scope.errorBiaTribal = false;
		        $scope.errorPropertyCity=false;
		        $scope.errorPropertyAddressOne=false;
		        $scope.errorPropertyCountry=false;
		        $scope.errorPropertyNoUnits=false;
                 $scope.pincodecheck=false;
                 $scope.pinrequired=false;
		        if ($scope.property.prprtyAddr.addrStrNm != '' && $scope.property.prprtyAddr.addrStrNm != null && $scope.property.prprtyAddr.addrStrNm != undefined) {
		        	statusProperty = false;
		        }else {
					if ($scope.property.newConstr){
						$scope.showStarLot = true;
						$scope.showStarAddress = false;
						document.getElementById("lot").readOnly = false;
						 if ($scope.property.prprtyLot != '' && $scope.property.prprtyLot != null && $scope.property.prprtyLot != undefined) {
							 statusProperty = false;
						 }else{
						 $scope.errorPropertyLot=true;
						
						  $scope.errorPropertyAddressOne=false;
						  statusProperty = true;
						 }
					}else{
		            statusProperty = true;
		            $scope.errorPropertyAddressOne=true;
					$scope.showStarLot = false;
					$scope.showStarAddress = true;
			
					}
		        }
		        if ($scope.landTypeCd != '' && $scope.landTypeCd != null && $scope.landTypeCd != undefined) {
		        	statusProperty = false;
		        }else {
		            statusProperty = true;
		            $scope.errorPropertyLandStatus=true;
		        }

		        if ($scope.property.prprtyAddr.cityNm != '' && $scope.property.prprtyAddr.cityNm != null && $scope.property.prprtyAddr.cityNm != undefined) {
		        	statusProperty = false;
		        }else {
		            statusProperty = true;
		            $scope.errorPropertyCity=true;
		        }

		        if ($scope.property.prprtyAddr.stCd != '' && $scope.property.prprtyAddr.stCd != null && $scope.property.prprtyAddr.stCd != undefined) {
		        	statusProperty = false;		          
		        }else {
		            statusProperty = true;
		            $scope.errorPropertyState=true;
		        }

		        if ($scope.property.prprtyAddr.cntyNm != '' && $scope.property.prprtyAddr.cntyNm != null && $scope.property.prprtyAddr.cntyNm != undefined) {
		        	statusProperty = false;	          
		        }else {
		            statusProperty = true;
		            $scope.errorPropertyCountry=true;
		        }
		        if ($scope.property.prprtyAddr.zip5Cd != '' && $scope.property.prprtyAddr.zip5Cd != null && $scope.property.prprtyAddr.zip5Cd != undefined) {
		        	$scope.pinrequired=true;
		        	if (pincodePattern.test($scope.property.prprtyAddr.zip5Cd)) {
		        		if($scope.property.prprtyAddr.zip5Cd != '00000'){
                  
                    $scope.pincodecheck=true;
		              
		        		}else{
		        			 statusProperty = true;
		        			  $scope.errorPropertyZip=true;	
							   $scope.errorPropertyZipCODEMessage=false;
		        		}
		            }else{
		            
		                statusProperty = true;
		             
		            }
		        }else {
		        	
		            statusProperty = true;
		            $scope.errorPropertyZipCODEMessage=true;
		        }

		        if ($scope.property.nbrOfUnits != '' && $scope.property.nbrOfUnits != null && $scope.property.nbrOfUnits != undefined) {
		        	statusProperty = false;
		        }else {
		            statusProperty = true;
		            $scope.errorPropertyNoUnits=true;
		        }
		       
				 if ($scope.landTypeCd == 'TRIB' || $scope.landTypeCd == 'ALLT') {
					 if ($scope.property.tribeLandJurisDctn != undefined && $scope.property.tribeLandJurisDctn != null && $scope.property.tribeLandJurisDctn != '') {
						 statusProperty = false;
					  }else{
						   statusProperty = true;
						  $scope.errorBiaTribal = true;
					  }
					 if ($scope.property.biaRsrvtnNbr != undefined && $scope.property.biaRsrvtnNbr != null && $scope.property.biaRsrvtnNbr != '') {
						 statusProperty = false;
				  }else{
					   statusProperty = true;
					  $scope.errorBiaReservNo = true;
				  }
				   if ($scope.property.biaTrckNbr != undefined && $scope.property.biaTrckNbr != null && $scope.property.biaTrckNbr != '') {
					   statusProperty = false;
				  }else{
					   statusProperty = true;
					  $scope.errorBiaTrackNo = true;
				  }
				   if ($scope.property.biaContractNumber != undefined && $scope.property.biaContractNumber != null && $scope.property.biaContractNumber != '') {
					   statusProperty = false;
				  }else{
					   statusProperty = true;
					  $scope.errorBiaContract = true;
				  }
				 }
		        if(statusProperty){
		        	if($scope.pincodecheck){
		        		$scope.errorPropertyZipCODEMessage=false;
		        	}
		        	return false;
		        }else{
		        	if($scope.pincodecheck){
		        		$scope.errorPropertyZipCODEMessage=false;
		        	}
		        	
		        	return true;
		        }
		       
		    }
			
	   $scope.formDataProperty = function () {
		    if($scope.property.landTypeCd == "FSIM"){
	        	$scope.showPropertyBiaDiv= false;
	        	checkingPropertyBia=false;
	        	 	$scope.property.biaRsrvtnNbr ='';
	        	 	$scope.property.biaTrckNbr ='';
	        	 	$scope.property.biaContractNumber ='';
	        	 	$scope.property.tribeLandJurisDctn ='';
	        }else{
	        	checkingPropertyBia=true;
	        	$scope.showPropertyBiaDiv= true;
	        	
	        }
		$http({
                "method": "POST",
                url: 'updatePropertyForCase',
                "headers": {"Content-Type": "application/json", "Accept": "application/json"},
                "data": $scope.property
              }).success(function () {
               
				$scope.property.newConstr = $scope.property.newConstr === 1 ? true:false;
				CommonFormService.clearCache(Constants.API_ENDPOINTS.GET_PROPERTY_FOR_CASE.replace(':caseId', $scope.caseId));
              }).error(function () {
               
              })

	   }
	   $scope.savePropertyDetails = function () {
			
		        var checkNextButtonProperty = $scope.propertyValidation();
					$scope.property.landTypeCd = $scope.landTypeCd ;
					
 	
	
		       
		        if (checkNextButtonProperty) {
					$scope.property.constrnCd = '';	
			$scope.property.prmrAddrId = $scope.property.prprtyAddr.addrId;
					$scope.property.newConstr = $scope.property.newConstr === true ? 1:0;
		        	 $scope.formDataProperty();
		        	 FlashService.success("Successfully saved");
		          
		        }
		    }
			 $scope.clearAllFields = function () {
		 
				 $scope.getcaseNumber();
		 $('#clearData').modal('hide');
		
       
    }
			 
			 $scope.showAppraisalLogging = function() {
				 if ($scope.caseSummary) {
					 if ($scope.caseSummary.loanPrps && $scope.caseSummary.loanPrps != 'STREAMLINE WITHOUT APPRAISAL') {
						 return true;
					 }
				 }
				 return false;
			 }
			 
			 $scope.openAppraisalLogging = function(caseId, caseNumber) {
				 SharedDataService.setAppraisalLogging({
					 caseId: caseId,
					 caseNumber: caseNumber
				 });
				 $location.path('/appraisalLogging');
			 }
	
});