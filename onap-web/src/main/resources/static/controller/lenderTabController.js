angular.module('app').controller('lenderController', 
	['$scope', '$http', '$window', '$rootScope', 'Constants','LoggingService', '$location','FlashService', 'actionsMenuService',	
	function ($scope, $http, $window, $rootScope, constants, ls, $location, FlashService, actionsMenuService) {

		// Prevent navigation from back button
		history.pushState(null, document.title, location.href);
		window.addEventListener('popstate', function (event)
		{
		 history.pushState(null, document.title, location.href);
		});
		
		
	var date=new Date();
	$rootScope.formData1={
            "intakeId": "1234567890123",
            "timeStamp": date,
            "targetApplication": "ONAP",
            "expectedNumBinaryDocuments": 0,
            "formData": {
                "intakeId":"1234567890123",
                "sponsor": "",
                "sponsorName": "",
                "brokerId":"",
                "tinName": "",
                "borrowerType": "",
                "organization": "",
                "social": "",
                "firstName": "",
                "tribal": "",
                "dob": "",
                "lastName": "",
                "middleInitial": "",
                "coBorrowers": {
                    "social": "",
                    "firstName": "",
                    "tribal": "",
                    "dob": "",
                    "lastName": "",
                    "middleInitial": "",
					"showDupicalteCoBorrower":"",
					"CoBorrowerMask":""
                },
           
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
                "landJurisdiction": "",
                "loanType": "",
                "loanPurpose": "",
                "priorCaseNumber": "",
                "priorCaseStatus": "",
                "loanOfficerId": "",
                "underWriterId": "",
                "baseMortgageAmount": "",
                "loanTerm": "",
                "construction":"",
                "loanGuaranteeFee": "",
                "loanAmountWithFee": ""
            }


    }

	  $rootScope.userInfo  = JSON.parse($window.sessionStorage.getItem("activeUser"));
	
	
	
	$scope.telFormatter = function(tel){
		if(!tel) return '';
		tel = tel.trim();
		var formatterd = tel, city;
		if(tel.length > 3){
			city = tel.slice(0,3);
			var remain = tel.slice(3);
			if(remain.length > 3)
				remain = remain.slice(0,3) + '-' + remain.slice(3, 7);
			formatted = '(' + city + ') ' + remain;
		}
		return formatted;
	}
	
	$scope.taxFormatter = function(taxNbr){
		taxNbr = taxNbr + '';
		var formatted = taxNbr;
		if(taxNbr.length > 2)
			formatted = taxNbr.slice(0,2) + '-' + taxNbr.slice(2);
		return formatted;
	}
	  $rootScope.abc = JSON.parse($window.sessionStorage.getItem("abc"));
	if($rootScope.abc !== undefined && $rootScope.abc !== null && $rootScope.abc !== ''){
		var lenderid = $rootScope.abc.split('##')[0];
		$rootScope.userId = $rootScope.abc.split('##')[1];
		
		if(lenderid!==undefined && lenderid !==null && lenderid !== ''){
			$http.get( constants.contextPath +'/lender/' + lenderid 
			).then(function(lenderResponse){
				//console.log("respon:::"+lenderResponse.status)
				if(lenderResponse.data.status == "SUCCESS"){
				$scope.ls = lenderResponse.data.lender;
				$scope.ls.lndrPhnNbr = $scope.telFormatter($scope.ls.lndrPhnNbr);
				$scope.ls.lndrFaxNbr = $scope.telFormatter($scope.ls.lndrFaxNbr);
				var res = null
				if($scope.ls.taxIdntfctnNbr && $scope.ls.taxIdntfctnNbr.charAt(2)){
					res = $scope.ls.taxIdntfctnNbr.charAt(2);
				}
				if(res !='-'){
				$scope.ls.taxIdntfctnNbr =$scope.taxFormatter($scope.ls.taxIdntfctnNbr);
				}
				//$scope.ls.taxIdntfctnNbr = $sc$scope.ls.taxIdntfctnNbr);
				if($scope.ls.prsn !== undefined && $scope.ls.prsn !== null)
					$scope.ls.prsn.frstNm = $scope.ls.prsn.frstNm + ' ' + $scope.ls.prsn.lastNm
				$window.localStorage.setItem("lenderData", JSON.stringify($scope.ls));
				}else{
					FlashService.error(lenderResponse.data.errorMessage);
				}
			});
		}
	}
	
    $scope.myCustomValidator = function(text){
        return true;
    };
    $scope.tinValidator = function(text){
        return true;
    };
    $scope.lender = {
        "sponsore": "N",
        "sponsorName": "",
        "brokerId": "",
        "tinname": ""
    }
    
    $('.tinmasking').mask('00-0000000');
    $('.phone_with_ddd').mask('(000) 000-0000');
	  $scope.totalContentLoan = JSON.parse($window.localStorage.getItem("totalDataForm"));
	  
	  if($scope.totalContentLoan!=undefined && $scope.totalContentLoan!=null && $scope.totalContentLoan!=''){
		  $scope.lender = {
		             "sponsore": $scope.totalContentLoan.formData.sponsor,
		             "sponsorName": $scope.totalContentLoan.formData.sponsorName,
		             "brokerId": $scope.totalContentLoan.formData.brokerId,
		             "tinname": $scope.totalContentLoan.formData.tinName
		         }
				 $rootScope.formData1 = $scope.totalContentLoan;
		 
	  }
    
   
    
    $scope.errorLenderNameText = constants.ERROR_MESSAGES.BROKER_NAME_REQUIRED;
    $scope.errorlenderTinText = constants.ERROR_MESSAGES.TIN_REQUIRED;
    $scope.errorlenderTinNumberText = constants.ERROR_MESSAGES.INVALID_TIN_NUMBER;
    $scope.LenderValidation = function () {
    	 var statusLender = false;
    	  $scope.errorlenderName=false;
          $scope.errorlenderTin = false;
          $scope.errorlenderTinNumber = false;
    	
        var sponsore = $scope.lender.sponsore;
         
        if(sponsore=='Y') {
        	
            if ($scope.lender.sponsorName != '' && $scope.lender.sponsorName != null && $scope.lender.sponsorName != undefined) {
            	statusLender = false;
            	
            } else {
               
                $scope.errorlenderName = true;
                 statusLender = true;
                
            }
            if ($scope.lender.tinname != '' && $scope.lender.tinname != null && $scope.lender.tinname != undefined) {
           	
           
           		 if($scope.lender.sponsorName != '' && $scope.lender.sponsorName != null && $scope.lender.sponsorName != undefined){
     			    statusLender = true;
                 
                    return statusLender;
     		   }
           	 }
           	 else{
           		     $scope.errorlenderTinNumber = true;
                     statusLender = true;
                   
           	 }         
        }
    }
	
	$scope.getTin = function(ln){
		
		var i;
		
		for(i=0;i<$scope.brokerName1.length;i++){
		
		if($scope.brokerName1[i].lenderName == ln){
			document.getElementById("tin").focus();
		
			$scope.lender.tinname = $scope.taxFormatter($scope.brokerName1[i].taxNumber);
			$scope.lender.brokerId = $scope.brokerName1[i].lenderId;

			 
		}
		}
			
	}
	$http({
            method: 'GET',
           url: 'sponserBrokers/'+lenderid,
           headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }).success(function (response) {
			
        	if(response.status == "SUCCESS"){
    		    //
    		    	
    		     
            $scope.brokerName1=response.sponserBrokerPojos;
        	} else{
	    		FlashService.error(response.errorMessage);
	    	}
	        }).error(function () {
	        	FlashService.error(Constants.ERROR_MESSAGES.SPONSERBROKER_RETRIEVAL_ERROR);
		});
	
 
    $scope.checkingSponser = function () {
        var sponsore = $scope.lender.sponsore;
       
        if (sponsore == 'Y') {
            document.getElementById("brokername").readOnly = false;
			  $('#brokername')
        .attr("disabled", false);
		
            document.getElementById("tin").readOnly = true;
			            return false;
        }
        else if(sponsore == 'N') {
            document.getElementById("brokername").readOnly = true;
			  $('#brokername')
        .attr("disabled", true);
		
            document.getElementById("tin").readOnly = true;
            $scope.lender.sponsorName ="";
            $scope.lender.tinname ="";
            $scope.lender.brokerId ="";
            return true;
        }
    }
    $scope.checkingSponser();
    $scope.formData = function () {
     
if( $rootScope.formData1!=undefined){
        $rootScope.formData1.formData.sponsor=$scope.lender.sponsore;
        $rootScope.formData1.formData.sponsorName=$scope.lender.sponsorName;
        $rootScope.formData1.formData.brokerId=$scope.lender.brokerId;
        $rootScope.formData1.formData.tinName=$scope.lender.tinname;
        $window.localStorage.setItem("totalDataFormLender", JSON.stringify($rootScope.formData1));
        $window.localStorage.setItem("totalDataForm", JSON.stringify($rootScope.formData1));
     
    }
}
    $(".lender-btn-next").click(function(event){
    	
        event.preventDefault();
    });
    $scope.getLenderInformation = function () {
        var checkLenderValidation = $scope.LenderValidation();
        var sponsore = $scope.lender.sponsore;
        if (sponsore == 'Y') {
            if(checkLenderValidation) {
                 FlashService.success(Constants.SUCCESS_MESSAGES.SAVED_SUCCESSFULLY);
                 $scope.formData();
               }

        } else {
        	$scope.lender.sponsorName="";
        	$scope.lender.tinname="";
        	$scope.lender.brokerId="";
            FlashService.success(Constants.SUCCESS_MESSAGES.SAVED_SUCCESSFULLY);
        }
    }
    $scope.lenderNextButton = function () {
        var sponsore = $scope.lender.sponsore;
        var checkNextButton =$scope.LenderValidation();
     
        if (checkNextButton || sponsore == 'N') {
        	$scope.formData();
            window.location.href = '#/borrower';
        }

    }

    }]);