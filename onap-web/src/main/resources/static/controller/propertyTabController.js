angular.module('app').controller('propertyController', function ($scope, $http, $window, $rootScope, LoggingService, Constants,FlashService) {
	
	// Prevent navigation from back button
	history.pushState(null, document.title, location.href);
	window.addEventListener('popstate', function (event)
	{
	 history.pushState(null, document.title, location.href);
	});
	
	$rootScope.userInfo  = JSON.parse($window.sessionStorage.getItem("activeUser"));
	 if( $rootScope.userInfo ){
	
        $rootScope.userName =  $rootScope.userInfo .loggedUser;
		$rootScope.showloginhead = true;
    }else{
        $rootScope.showloginhead = false;
    }
	$scope.getStatePrefix=function(){

	    $http({
	        method: 'GET',
	        url: 'case/referenceCodes/STATE PREFIX',
	        headers: {"Content-Type": "application/json", "Accept": "application/json"}
	    }).success(function (response) {
	    
	        $scope.statePrefix=response;
	      
	    }).error(function () {
	     
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

	    $http({
	        method: 'GET',
	        url: 'case/referenceCodes/LAND STATUS',
	        headers: {"Content-Type": "application/json", "Accept": "application/json"}
	    }).success(function (response) {
	 
	        $scope.landStatus=response;
	     
	    }).error(function (response) {
	    
	    });
	}

	$scope.getLandStatus();
	
	$scope.getTribal=function(){

        $http({
            method: 'GET',
           url: 'case/referenceCodes/TRIBE',
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }).success(function (response) {
           
            $scope.tribal=response;
        
        }).error(function (response) {
            console.log('Error Response :' + JSON.stringify(response));
        });
    }
	
	  $scope.getCountiesForState=function(state){
				    $http({
		      method: 'GET',
		      url : 'getCountiesForState/'+state,
		     
		      headers: {"Content-Type": "application/json", "Accept": "application/json"}
		    }).success(function (response) {
				
		    	if(response.status == "SUCCESS"){
				$scope.property.county = '';
				$scope.loanMACounties=response.countiesForState;
		    	} else{
		    		
		    		FlashService.error(response.errorMessage);
		    	}
		    }).error(function () {
		    
		    });
		  }
	
	
var checkingPropertyBia;
 
    $scope.getTribal();
	 $scope.property = {
		        "sponseringbroker":"",
		        "streetAddress": "",
		        "addressTwo":"",
		        "city": "",
		        "state": "",
		        "zipCode": "",
		        "landStatus": "",
		        "lot": "",
		        "county": "",
		        "numberOfUnits": "",
		        "trackingNumber": "",
		        "reservation": "",
		        "contract": "",
		        "landJurisdiction": ""
		    }
	 $scope.some= function(){
	
		  if ($scope.property.landStatus == 'FSIM') {
	    		 $scope.showPropertyBiaDiv=false;
	    		 checkingPropertyBia = false;
	         
	         }
	         else {
	        	 $scope.showPropertyBiaDiv=true;
	        	 checkingPropertyBia = true;
	         }
			 if ($scope.property.landStatus == 'TRIB' || $scope.property.landStatus == 'ALLT') {
				$scope.showStarBias = true;
				  
			  }else{
				$scope.showStarBias = false;
				  
			  }
	 }
	
	 
	 $rootScope.totalContentProperty = JSON.parse($window.localStorage.getItem("totalDataForm"));
	var sponseringbroker = JSON.parse($window.localStorage.getItem("sponsoreBroker"));
	    
	    if($rootScope.totalContentProperty!=undefined && $rootScope.totalContentProperty!=null && $rootScope.totalContentProperty!=''){

  $scope.property.sponseringbroker= sponseringbroker;

	        $scope.property.streetAddress=$rootScope.totalContentProperty.formData.streetAddress;
 $scope.property.lot=$rootScope.totalContentProperty.formData.lot;

			if($scope.property.streetAddress!= '' && ($scope.property.sponseringbroker== null || $scope.property.sponseringbroker == false)){

				 document.getElementById("lot").readOnly = true;
			}else{
				document.getElementById("lot").readOnly = false;
					}
 if($scope.property.lot!= ''&& $scope.property.sponseringbroker){
	 document.getElementById("streetaddress").readOnly = true;
			}else{
			 document.getElementById("streetaddress").readOnly = false;
			}
if($scope.property.lot!= '' && $scope.property.streetAddress!= ''){

 document.getElementById("streetaddress").readOnly = false;
	document.getElementById("lot").readOnly = false;
}
	        $scope.property.addressTwo=$rootScope.totalContentProperty.formData.addressTwo;
	        $scope.property.city=$rootScope.totalContentProperty.formData.city;
	        $scope.property.state=$rootScope.totalContentProperty.formData.state;
	        $scope.property.zipCode=$rootScope.totalContentProperty.formData.zipCode;
	        $scope.property.city=$rootScope.totalContentProperty.formData.city;
	        $scope.property.numberOfUnits=$rootScope.totalContentProperty.formData.numberOfUnits;
	        $scope.property.landStatus=$rootScope.totalContentProperty.formData.landStatus;
	       

	       
	       if($scope.property.state){
	    	   
	    		   $http({
	 			      method: 'GET',
	 			      url : 'getCountiesForState/' + $scope.property.state,
	 			     
	 			      headers: {"Content-Type": "application/json", "Accept": "application/json"}
	 			    }).success(function (response) {
	 			     $scope.loanMACounties=response.countiesForState;
	 			    }).error(function () {
	 			      
	 			    }); 
	    	   }
	    	   
	       
	       $scope.property.county=$rootScope.totalContentProperty.formData.county;

	        if($scope.property.landStatus != "FSIM"){
	        	 $scope.showPropertyBiaDiv=true;
	        	 checkingPropertyBia = false;
	        $scope.property.trackingNumber=$rootScope.totalContentProperty.formData.trackingNumber;
	        $scope.property.reservation=$rootScope.totalContentProperty.formData.reservation;
	        $scope.property.contract=$rootScope.totalContentProperty.formData.contract;
	        $scope.property.landJurisdiction=$rootScope.totalContentProperty.formData.landJurisdiction;
	        }else{
	        	 $scope.showPropertyBiaDiv=false;
	    		 checkingPropertyBia = false;
	        }
	    }
	   
		$scope.initfun =function(){
			if ($scope.property.sponseringbroker && $scope.property.sponseringbroker!= undefined){
			$scope.showStarLot = true;
			$scope.showStarAddress = false;
			}else{
				$scope.showStarLot = false;
			$scope.showStarAddress = true;
			
			}
			if ($scope.property.landStatus == 'TRIB' || $scope.property.landStatus == 'ALLT') {
				$scope.showStarBias = true;
				
			  }else{
				$scope.showStarBias = false;
			
			  }
			
		}
		
		$scope.errorPropertyLandStatusText = Constants.ERROR_MESSAGES.LAND_STATUS_REQUIRED;
		$scope.errorPropertyStateText = Constants.ERROR_MESSAGES.STATE_REQUIRED;
		$scope.errorPropertyZipText = Constants.ERROR_MESSAGES.ZIP_CODE_INVALID;
		$scope.errorPropertyZipCODEMessageText = Constants.ERROR_MESSAGES.ZIP_CODE_LENGTH_ERROR;
		$scope.errorPropertyCityText = Constants.ERROR_MESSAGES.CITY_REQUIRED;
		$scope.errorPropertyAddressOneText = Constants.ERROR_MESSAGES.ADDRESS_REQUIRED;
		$scope.errorPropertyCountyText = Constants.ERROR_MESSAGES.COUNTY_REQUIRED;
		$scope.errorPropertyNoUnitsText = Constants.ERROR_MESSAGES.NUM_UNITS_REQUIRED;
		$scope.errorPropertyLotText = Constants.ERROR_MESSAGES.PROPERTY_LOT_REQUIRED; 
		$scope.errorBiaReservNoText = Constants.ERROR_MESSAGES.BIA_RESERVATION_CODE_REQUIRED;
			$scope.errorBiaContractText = Constants.ERROR_MESSAGES.CONTRACT_NUM_REQUIRED;
						$scope.errorBiaTrackNoText = Constants.ERROR_MESSAGES.BIA_TRACKING_NUM_REQUIRED;
			$scope.errorBiaTribalText = Constants.ERROR_MESSAGES.NAME_TRIBE_LAND_JURISDICTION_ERROR;
		    $scope.propertyValidation = function () {
		        var pincodePattern = /^\d{5}$/;
		        var statusProperty =false;
		        $scope.errorPropertyLandStatus=false;
		        $scope.errorPropertyState=false;
		        $scope.errorPropertyZip=false;
		        $scope.errorPropertyZipCODEMessage=true;
		        $scope.errorPropertyCity=false;
		        $scope.errorPropertyAddressOne=false;
		        $scope.errorPropertyCountry=false;
		        $scope.errorPropertyNoUnits=false;
                 $scope.pincodecheck=false;
                 $scope.pinrequired=false;
				 $scope.errorBiaReservNo = false;
				$scope.errorBiaContract = false;
				$scope.errorBiaTrackNo = false;
				$scope.errorBiaTribal = false;
		        if ($scope.property.streetAddress != '' && $scope.property.streetAddress != null && $scope.property.streetAddress != undefined) {
				
		        }else {
					if ($scope.property.sponseringbroker){
						$scope.showStarLot = true;
			$scope.showStarAddress = false;
			document.getElementById("lot").readOnly = false;
						 if ($scope.property.lot != '' && $scope.property.lot != null && $scope.property.lot != undefined) {
							 statusProperty = false;
						 }else{
						 $scope.errorPropertyLot=true;
						
						  $scope.errorPropertyAddressOne=false;
						  statusProperty = true;
						 }
					}else{
		            statusProperty = true;
					$scope.errorPropertyLot=false;
		            $scope.errorPropertyAddressOne=true;
					$scope.showStarLot = false;
			$scope.showStarAddress = true;
			
					}
		        }
		        if ($scope.property.landStatus != '' && $scope.property.landStatus != null && $scope.property.landStatus != undefined) {
		        	 $scope.errorPropertyLandStatus=false;
		        }else {
		            statusProperty = true;
		            $scope.errorPropertyLandStatus=true;
		        }

		        if ($scope.property.city != '' && $scope.property.city != null && $scope.property.city != undefined) {
		        	$scope.errorPropertyCity=false;
		        }else {
		            statusProperty = true;
		            $scope.errorPropertyCity=true;
		        }

		        if ($scope.property.state != '' && $scope.property.state != null && $scope.property.state != undefined) {
		        	$scope.errorPropertyState=false;
		        }else {
		            statusProperty = true;
		            $scope.errorPropertyState=true;
		        }

		        if ($scope.property.county != '' && $scope.property.county != null && $scope.property.county != undefined) {
		        	$scope.errorPropertyCountry=false;
		        }else {
		            statusProperty = true;
		            $scope.errorPropertyCountry=true;
		        }
		        if ($scope.property.zipCode != '' && $scope.property.zipCode != null && $scope.property.zipCode != undefined) {
		        	$scope.pinrequired=true;
		        	if (pincodePattern.test($scope.property.zipCode)) {
		        		if($scope.property.zipCode != '00000'){
                  
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
				 if ($scope.property.landStatus == 'TRIB' || $scope.property.landStatus == 'ALLT') {
					 if ($scope.property.landJurisdiction != undefined && $scope.property.landJurisdiction != null && $scope.property.landJurisdiction != '') {
						 $scope.errorBiaTribal = false;
					  }else{
						   statusProperty = true;
						  $scope.errorBiaTribal = true;
					  }
					 if ($scope.property.reservation != undefined && $scope.property.reservation != null && $scope.property.reservation != '') {
						 $scope.errorBiaReservNo = false;
				  }else{
					   statusProperty = true;
					  $scope.errorBiaReservNo = true;
				  }
				   if ($scope.property.trackingNumber != undefined && $scope.property.trackingNumber != null && $scope.property.trackingNumber != '') {
					   $scope.errorBiaTrackNo = false;
				  }else{
					   statusProperty = true;
					  $scope.errorBiaTrackNo = true;
				  }
				   if ($scope.property.contract != undefined && $scope.property.contract != null && $scope.property.contract != '') {
					   $scope.errorBiaContract = false;
				  }else{
					   statusProperty = true;
					  $scope.errorBiaContract = true;
				  }
				 }
		       
			   

		        if ($scope.property.numberOfUnits != '' && $scope.property.numberOfUnits != null && $scope.property.numberOfUnits != undefined) {
		        	$scope.errorPropertyNoUnits=false;
		        }else {
		            statusProperty = true;
		            $scope.errorPropertyNoUnits=true;
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
		    $(".lender-btn-next").click(function(event){
		    	
		        event.preventDefault();
		    });
	   $scope.formDataProperty = function () {
$rootScope.sponseringbroker ='';
if( $rootScope.formData1!=undefined){
		    $rootScope.formData1.formData.streetAddress=$scope.property.streetAddress;

	        $rootScope.sponseringbroker=$scope.property.sponseringbroker;
	        $rootScope.formData1.formData.city=$scope.property.city;
	        $rootScope.formData1.formData.addressTwo=$scope.property.addressTwo;
	        $rootScope.formData1.formData.state=$scope.property.state;
	        $rootScope.formData1.formData.zipCode=$scope.property.zipCode;
	        $rootScope.formData1.formData.landStatus=$scope.property.landStatus;
	        var landStatus = $scope.property.landStatus;
	   	 if($scope.property.landStatus){
	   	  var i;
		  for(i=0;i<$scope.landStatus.length;i++){
			 
			  if($scope.landStatus[i].referenceCodeValue==landStatus){
				  $rootScope.landStatusName= $scope.landStatus[i].referenceCodeName;
				  $window.localStorage.setItem("landStatusName", JSON.stringify($rootScope.landStatusName));
				  break;
			  }
		  }
	 
	   	 }
	        
	        $rootScope.formData1.formData.lot=$scope.property.lot;
	        $rootScope.formData1.formData.county=$scope.property.county;
	       
	        $rootScope.formData1.formData.numberOfUnits=$scope.property.numberOfUnits;
	        
	        if($scope.property.landStatus == "FSIM"){
	        	$scope.showPropertyBiaDiv= false;
	        	checkingPropertyBia=false;
	        	 	$rootScope.formData1.formData.trackingNumber='';
	 	        	$rootScope.formData1.formData.reservation='';
	 	        	$rootScope.formData1.formData.contract='';
	 	        	$rootScope.formData1.formData.landJurisdiction='';
	        }else{
	        	checkingPropertyBia=true;
	        	$scope.showPropertyBiaDiv= true;
	        	 $rootScope.formData1.formData.trackingNumber=$scope.property.trackingNumber;
	        	 $rootScope.formData1.formData.reservation=$scope.property.reservation;
	        	 $rootScope.formData1.formData.contract=$scope.property.contract;
	        	 $rootScope.formData1.formData.landJurisdiction=$scope.property.landJurisdiction;
	        }
	       
	        $window.localStorage.setItem("totalDataForm", JSON.stringify($rootScope.formData1));
 $window.localStorage.setItem("sponsoreBroker", JSON.stringify($rootScope.sponseringbroker));
	      
	   }
}
		    $scope.savePropertyDetails = function () {
		        var checkSaveButtonProperty = $scope.propertyValidation();
		        
		        if (checkSaveButtonProperty) {
		          
		            $scope.formDataProperty();
		           
		        }
		    }
		    $scope.nextButtonProperty = function () {
		        var checkNextButtonProperty = $scope.propertyValidation();
		        
		        if (checkNextButtonProperty) {
		        	 $scope.formDataProperty();
		            window.location.href = '#/loan';
		        }
		    }
		    $scope.previousButtonProperty = function () {
		        	 $scope.formDataProperty();
		            window.location.href = '#/borrower';
		        
		    }

});