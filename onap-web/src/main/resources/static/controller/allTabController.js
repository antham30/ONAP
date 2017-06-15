angular.module('app').controller('allTabController',function($scope, $http, $window, $timeout, $rootScope, LoggingService) {
	
	// Prevent navigation from back button
	history.pushState(null, document.title, location.href);
	window.addEventListener('popstate', function (event)
	{
	 history.pushState(null, document.title, location.href);
	});
	
	var user = JSON.parse($window.sessionStorage.getItem("activeUser"));
	
	$scope.validateLoginSession = function(){
		if(LoggingService.validationLoggedUser(user) === false)
			LoggingService.toRoot();
	}

	$scope.validateLoginSession();
	 if(user){
		
        $rootScope.userName =  user .loggedUser;
		$rootScope.showloginhead = true;
    }else{
        $rootScope.showloginhead = false;
    }
	
	 $scope.showCaseNum =false;
	 if($rootScope.priorCaseNumber!=undefined && $rootScope.priorCaseNumber !=null && $rootScope.priorCaseNumber!=''){
		$scope.showCaseNum =true;
	}else{
		$scope.showCaseNum =false;
	
	}
	
$rootScope.allDetails = JSON.parse($window.localStorage.getItem("totalDataForm"));

	   $scope.tribal =[];
 	 if( $rootScope.allDetails!= undefined){
		if($rootScope.allDetails.formData.firstName!=''){
    $(".disp-none").css("visibility", "visible");

	}

$rootScope.allDetails.formData.loanGuaranteeFee = Number($rootScope.allDetails.formData.loanGuaranteeFee).toFixed(2).
	replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
$rootScope.allDetails.formData.loanAmountWithFee = Number($rootScope.allDetails.formData.loanAmountWithFee).toFixed(2).
replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

if($rootScope.allDetails.formData.addressTwo!=undefined && $rootScope.allDetails.formData.addressTwo!='' ){
    $(".addressTwo").css("visibility", "visible");
	}else{
		 $(".addressTwo").css("display", "none");
	}

if($rootScope.allDetails.formData.streetAddress==''){
    $(".lotAdress").css("visibility", "visible");
    $(".streetAdress").css("display", "none");

}else{
 $(".lotAdress").css("display", "none");
 
}

		 $rootScope.allDetails.formData.landStatus = JSON.parse($window.localStorage.getItem("landStatusName"));
	 	 $rootScope.allDetails.formData.loanPurpose = JSON.parse($window.localStorage.getItem("loanPurposeName"));
	 	$rootScope.allDetails.formData.tribal = JSON.parse($window.localStorage.getItem("tribalName"));
	        $http({
            method: 'GET',
           url: 'case/referenceCodes/TRIBE',
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }).success(function (response) {
            $scope.tribal=response;
			var i,p;
        	var data=[];
			if($scope.tribal){
        	for(p=0; p < $rootScope.allDetails.formData.coBorrowers.length; p++){
	         data[p] =  $rootScope.allDetails.formData.coBorrowers[p].tribal;
		  for(i=0;i<$scope.tribal.length;i++){
			 
			  if($scope.tribal[i].referenceCodeValue== data[p]){
				  $rootScope.allDetails.formData.coBorrowers[p].tribal= $scope.tribal[i].referenceCodeName;
				  break;
			  }
		  }
	 
	   	 }
		}
          
        }).error(function () {
       
        });

		
	 }
	  $rootScope.caseNumberDetails = JSON.parse($window.localStorage.getItem("caseNumberDetails"));	
	  
	 	$rootScope.allLenderDetails = JSON.parse($window.localStorage.getItem("lenderData"));
	 	$rootScope.allDetails.formData.brokerId
	 	if($rootScope.allDetails.formData.brokerId){
	 		$scope.offSet = 1;
	 	}
	 	else{
	 		$scope.offSet = 0;
	 	}
	 	
	 	$timeout(function() {
	 		// Finally, clear localStorage
	 		$window.localStorage.clear();
	 	})

});
