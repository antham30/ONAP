angular.module('app').controller('borrowerController',function ($scope, $http, $window, $rootScope, FlashService,LoggingService,Constants) {

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
$scope.getBorrowerType=function(){
		
		

        $http({
            method: 'GET',
             url: 'case/referenceCodes/BORROWER TYPE',
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }).success(function (response) {
            $scope.bType=response;
        }).error(function () {
            
        });
    }
	
	$scope.validateLoginSession = function(){
		var user = JSON.parse($window.sessionStorage.getItem("activeUser"));
		if(LoggingService.validationLoggedUser(user) === false)
			LoggingService.toRoot();
	}

	$scope.validateLoginSession();
    $scope.getBorrowerType();
    $scope.getTribal=function(){

        $http({
            method: 'GET',
           url: 'case/referenceCodes/TRIBE',
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }).success(function (response) {
            $scope.tribal=response;
			
        }).error(function () {
          
        });
    }
	//if($scope.tribal)
	$scope.getTribalBasedBtype=function(datavalue){

if(datavalue == 'IND' || datavalue == 'TRE'){
        $http({
            method: 'GET',
           url: 'case/referenceCodes/TRIBE',
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }).success(function (response) {
            $scope.tribalBasedBtype=response;
			    }).error(function () {
          
        });
}else if (datavalue == 'IHA' || datavalue == 'TDHE'){
	 $http({
            method: 'GET',
           url: 'case/referenceCodes/IHA-TDHE',
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }).success(function (response) {
            $scope.tribalBasedBtype=response;
			
        }).error(function () {
            
        });
}
    }
$scope.getTribalNameForPrinting = function(tribal){
$scope.getTribalBasedBtype($scope.priborrower.btype);
	   	 if(tribal){
	   	  var i;
		  for(i=0;i<$scope.tribalBasedBtype.length;i++){
			
			  if($scope.tribalBasedBtype[i].referenceCodeValue==tribal){
				  
 				  $rootScope.tribalName= $scope.tribalBasedBtype[i].referenceCodeName;
				  if($scope.priborrower.btype == 'IND' && $rootScope.tribalName == 'NO TRIBAL AFFILIATION'){
	
	FlashService.error(Constants.ERROR_MESSAGES.PRIBORROWER_NO_TRIBAL);
	$scope.priborrower.tribal ='';
}
				  
				  


				  $window.localStorage.setItem("tribalName", JSON.stringify($rootScope.tribalName));
				  break;
			  }
		  }
	 
	   	 }      
}
$scope.errorBtypeText = Constants.ERROR_MESSAGES.BORROWER_TYPE_REQUIRED;
$scope.errorOrgText = Constants.ERROR_MESSAGES.ORGANIZATION_REQUIRED;
$scope.errorPriBorrowerTribalText = Constants.ERROR_MESSAGES.TRIBAL_AFFILIATION_REQUIRED;
$scope.errorDobText = Constants.ERROR_MESSAGES.DOB_REQUIRED;
$scope.errorMiText = Constants.ERROR_MESSAGES.MI_NAME_REQUIRED;
$scope.errorSsnInvalidText = Constants.ERROR_MESSAGES.SSN_INVALID;
$scope.errorSsnReqText = Constants.ERROR_MESSAGES.SSN_REQUIRED;
$scope.errorLnameText = Constants.ERROR_MESSAGES.LAST_NAME_REQUIRED;
$scope.errorFnameText = Constants.ERROR_MESSAGES.FIRST_NAME_REQUIRED;
/** coborrower **/
$scope.errorCoBorrowerDobText = Constants.ERROR_MESSAGES.DOB_REQUIRED;
$scope.errorCoBorrowerMiText = Constants.ERROR_MESSAGES.MI_NAME_REQUIRED;
$scope.errorCoBorrowerSsnInvalidText = Constants.ERROR_MESSAGES.SSN_INVALID;
$scope.errorCoBorrowerSsnReqText = Constants.ERROR_MESSAGES.SSN_REQUIRED;
$scope.errorCoBorrowerLnameText = Constants.ERROR_MESSAGES.LAST_NAME_REQUIRED;
$scope.errorCoBorrowerFnameText = Constants.ERROR_MESSAGES.FIRST_NAME_REQUIRED;
$scope.errorCoBorrowerTribalText = Constants.ERROR_MESSAGES.TRIBAL_AFFILIATION_REQUIRED;

    $scope.getTribal();
	$scope.individualFirst = function(btype){
        return btype.referenceCodeName !== 'INDIVIDUAL';
    }
	
	$scope.noTribalFirst = function(tribalBasedBtype){
	if($scope.priborrower.btype == 'IND' || $scope.priborrower.btype == 'TRE'){
		return tribalBasedBtype.referenceCodeName !== 'NO TRIBAL AFFILIATION';
		} else{
		return tribalBasedBtype.referenceCodeName;
		}
	}
	$scope.noTribalFirstCoborr = function(tribal){
	if($scope.priborrower.btype == 'IND'){
		return tribal.referenceCodeName!== 'NO TRIBAL AFFILIATION';
		} else{
		return tribal.referenceCodeName;
		}
	
	}
    $('.social').mask('000-00-0000');
    var date = new Date();
	

    date.setDate( date.getDate()-1 );
    date.setFullYear( date.getFullYear() - 18 );
 	
    $scope.DatePick =function(index){
              var idsdate="#"+index+"datepick";
    
        $(idsdate).datepicker({
        	  maxPicks: 1,
  			changeMonth : true,
              changeYear : true,
              yearRange: '-100y:c+nn',
               maxDate:date,
              dateFormat: "mm/dd/yy"
                   });
        $(idsdate).datepicker('show');
    }
  
 
    $('#DatePickerOne').datepicker({
    	  maxPicks: 1,
			changeMonth : true,
          changeYear : true,
          yearRange: '-100y:c+nn',
           maxDate:date,
          dateFormat: "mm/dd/yy"
       
    });


    



    $scope.priborrower = {
	        "btype": "",
	        "organisation": "",
	        "social": "",
	        "firstname": "",
	        "tribal": "",
	        "dob": "",
	        "lastname": "",
	        "mi": "",
	        "CoBorrower": [{
	            "social": "",
	            "firstname": "",
	            "tribal": "",
	            "dob": "",
	            "lastname": "",
	            "mi": ""
	        }]

	    }
		
		
		$scope.getOrgan1 =function(){
			
			$scope.getTribalBasedBtype($scope.priborrower.btype);
			var i;
			 for(i=0;i<$scope.tribalBasedBtype.length;i++){
			 
			  if($scope.tribalBasedBtype[i].referenceCodeValue== $scope.priborrower.tribal && $scope.priborrower.btype == 'TRE'){
				
				  $scope.priborrower.organisation= $scope.tribal[i].referenceCodeName;
				
				
				  break;
			  }
		  }
			
		}
    
    var checkingPriBorrower = true;
  
    var checkingAddCoBorrower;
    $scope.CoBorrowerList = [];
	
	$scope.forAllValues =false;
    $scope.showCoBorrower=false;
	$scope.hi =function(){
		$scope.showOrg = false;

		if($scope.priborrower.btype == 'IND' || $scope.priborrower.btype == ''){
		$scope.showOrg = false;
		$scope.forAllValues =true;
		$scope.forTre = false;
		  $('#organisation')
	        .attr("disabled", true);
			
		}else if($scope.priborrower.btype == 'TRE'){
		$scope.forAllValues =false;
		$scope.forTre = true;
		$scope.showOrg = true;
	}else{
		$scope.forAllValues =true;
		$scope.forTre = false;
		$scope.showOrg = true;
		
	}
		
	}
   
	statusOrgansiation = true;
	
    $scope.showPrimaryBorrower = function(){
     $scope.borrowerType = $scope.priborrower.btype;
    	
    	 if ($scope.borrowerType == 'IND') {
			  $scope.forAllValues = true;
		      $scope.forTre = false;
			  $scope.errorPriBorrowerOrg=false;
			 $scope.showPriBorrower=true;
    		 checkingPriBorrower = true;
    		 $scope.showCoBorrowerBtn = true;
    	 $scope.showOrg = false;
		
		  $('#organisation')
        .attr("disabled", true);
		$scope.priborrower.organisation='';
		$scope.priborrower.tribal=''; 
    
		 
	statusOrgansiation = true;
         } else  if ($scope.borrowerType == 'TRE') {
		 $scope.errorPriBorrowerOrg=false;
		 $scope.forAllValues = false;
		 $scope.forTre = true;
		 $scope.showPriBorrower=false;
        	 checkingPriBorrower = false;
        	 $scope.showCoBorrowerBtn = false;
			   $scope.showOrg = true;
			 
			  $scope.showOrg = false;
			 	$scope.priborrower.organisation='';  
			 $scope.priborrower.tribal=''; 
			
	statusOrgansiation = false;
		 }
         else {
        	 $scope.showPriBorrower=false;
        	 checkingPriBorrower = false;
        	 $scope.showCoBorrowerBtn = false;
			   $scope.showOrg = true;
			   $scope.forAllValues = true;
			   $scope.priborrower.tribal='';  
$scope.priborrower.organisation='';
		 $scope.forTre = false;
		
			  
		  $('#organisation')
        .attr("disabled", false);
			  $scope.showOrg = true;
	statusOrgansiation = false;
	
        
         }
    	 
    	 if(checkingAddCoBorrower && checkingAddCoBorrower!= undefined && $scope.showCoBorrowerBtn){
    		 $scope.showCoBorrower = true;
    	 }else{
    		 $scope.showCoBorrower = false; 
    	 }
    	
    }
    $scope.showPrimaryBorrower();
    
     $rootScope.totalContent = JSON.parse($window.localStorage.getItem("totalDataForm"));
    if($rootScope.totalContent!=undefined && $rootScope.totalContent!=null && $rootScope.totalContent!=''){
    	
    	
    	$scope.priborrower.btype =$rootScope.totalContent.formData.borrowerType;
		 $scope.getTribalBasedBtype($scope.priborrower.btype);
		 $scope.priborrower.tribal =$rootScope.totalContent.formData.tribal;
		 $scope.priborrower.organisation =$rootScope.totalContent.formData.organization;
    	if( $scope.priborrower.btype == 'IND'){
			$scope.forAllValues =true;
			$scope.forTre=false;
    $scope.showPriBorrower=true;
	 checkingPriBorrower = true;
	  $scope.showOrg = false;
	 $scope.showCoBorrowerBtn = true;
 
	$scope.priborrower.btype =$rootScope.totalContent.formData.borrowerType;
	 $scope.priborrower.organisation =$rootScope.totalContent.formData.organization;
    $scope.priborrower.social =$rootScope.totalContent.formData.social;
    $scope.priborrower.firstname =$rootScope.totalContent.formData.firstName;
    $scope.priborrower.dob =$rootScope.totalContent.formData.dob;
    $scope.priborrower.lastname =$rootScope.totalContent.formData.lastName;
    $scope.priborrower.mi =$rootScope.totalContent.formData.middleInitial;
    $scope.CoBorrowerList=$rootScope.totalContent.formData['coBorrowers'];

    var year = $scope.priborrower.social.substring(7,11);
       $scope.ssnMasking ="***-**-"+year;
    	}else if( $scope.priborrower.btype == 'TRE'){
			 $scope.showPriBorrower=false;
        	 checkingPriBorrower = false;
			 $scope.forAllValues =false;
			 $scope.forTre=true;
        	 $scope.showCoBorrowerBtn = false;
		
		} else{
    		 $scope.showPriBorrower=false;
        	 checkingPriBorrower = false;
			 $scope.forAllValues =true;
			 $scope.forTre=false;
        	 $scope.showCoBorrowerBtn = false;
    	}
           }
   
    
    /* validation of borrower */
    /* ssn masking validation of borrower */
$scope.showDupicalte = true;

$scope.hideSsn =function(){
		 $scope.showDupicalte = false;
		 $("#ssn").focus();
	
      
    }
	$scope.maskingPriborrowerSsn =function(){
		  var year = $scope.priborrower.social.substring(7,11);
       $scope.ssnMasking ="***-**-"+year;

		$scope.showDupicalte = true;
		
		  var ssnPattern = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/;
	        var statusPriBorrower = false;
	        $scope.errorPriBorrowerSsn=false;
	        $scope.errorPriBorrowerSsnNumber1=false;
	       if ($scope.priborrower.social != '' && $scope.priborrower.social != null && $scope.priborrower.social != undefined) {
      
			  if (ssnPattern.test($scope.priborrower.social)){
				  statusPriBorrower = false; 
			  }
	            else {
	                $scope.errorPriBorrowerSsnNumber1=true;
	                statusPriBorrower = true; 
	            }

	        }else {
	            statusPriBorrower = true;
	            $scope.errorPriBorrowerSsn=true;
	        }
	       if(statusPriBorrower){
	       	return false;
	       }else{
	       	return true;
	       }
	      

	       
		
    }
	
	$scope.hideSsnCoBorrower =function(index){
		
		 var idSsn="#"+index+"co-social";
  $scope.CoBorrowerList[index].showDupicalteCoBorrower = false;
		 $(idSsn).focus();
      
    }
	$scope.maskingCoborrowerSsn =function(index){
	 $scope.testCoborrower = false;
	 var year1;
		if($scope.CoBorrowerList[index].social.length == 9){
		   year1 = $scope.CoBorrowerList[index].social.substring(5,9);
		}else{
			 year1 = $scope.CoBorrowerList[index].social.substring(7,11);
		}
       $scope.CoBorrowerList[index].CoBorrowerMask ="***-**-"+year1;
	   $scope.CoBorrowerList[index].showDupicalteCoBorrower = true;
	    var ssnPattern = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/;
    		 var id=index;
             var ids="#"+id+"ssh";
           
            var idssnnum="#"+id+"sshNumber";
           var statusCoBorrower = false;

            $(ids).hide();
           
            $(idssnnum).hide();

            
            if ($scope.CoBorrowerList[id].social != '' && $scope.CoBorrowerList[id].social != null && $scope.CoBorrowerList[id].social != undefined) {
                if (ssnPattern.test($scope.CoBorrowerList[id].social)) {
                 $scope.testCoborrower = true;
                }else {
                    $(idssnnum).show();
                    statusCoBorrower = true;
                }
            }else {
                
                $(ids).show();
				statusCoBorrower = true;
            }


              

                if(statusCoBorrower){
               
                	return false;
                }else{
                	return true;
                }
             
		
		
    }

	/** ssn masking format ends**/
    
   
    $scope.borrowerValidation = function () {
        var ssnPattern = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/;
		var namepatt = /^[a-z\s]{1,40}$/i;
        var statusPriBorrower = false;
        $scope.errorPriBorrowerSsn=false;
        $scope.errorPriBorrowerFname=false;
        $scope.errorPriBorrowerTribal=false;
        $scope.errorPriBorrowerDob=false;
        $scope.errorPriBorrowerLname=false;
        $scope.errorPriBorrowerType=false;
		 $scope.errorPriBorrowerOrg=false;
		  $scope.errorPriBorrowerMii=false;
		
        $scope.errorPriBorrowerSsnNumber1=false;
        var priBorrowerDateOne = document.getElementById("DatePickerOne").value;
 
        $scope.priborrower.dob = priBorrowerDateOne;
       
       
     if($scope.priborrower.btype == 'IND' && checkingPriBorrower){
		  
        if ($scope.priborrower.btype != '' && $scope.priborrower.btype != null && $scope.priborrower.btype != undefined) {
        	statusPriBorrower = false;
        } else{
             statusPriBorrower = true;
            $scope.errorPriBorrowerType=true;
            }

        if ($scope.priborrower.social != '' && $scope.priborrower.social != null && $scope.priborrower.social != undefined) {
            if (ssnPattern.test($scope.priborrower.social)){
            	statusPriBorrower = false;
            }
            else {
                $scope.errorPriBorrowerSsnNumber1=true;
                statusPriBorrower = true; 
            }

        }else {
            statusPriBorrower = true;
            $scope.errorPriBorrowerSsn=true;
        }
if ($scope.priborrower.mi != undefined && $scope.priborrower.mi != null && $scope.priborrower.mi !='' ) {
           if (namepatt.test($scope.priborrower.mi)) {
        	   $scope.errorPriBorrowerMii=false;
                }else {
                    statusPriBorrower = true;
            $scope.errorPriBorrowerMii=true;
                 
                }
        }
        if ($scope.priborrower.firstname != '' && $scope.priborrower.firstname != null && $scope.priborrower.firstname != undefined) {
        	$scope.errorPriBorrowerFname=false;
        }else {
            statusPriBorrower = true;
            $scope.errorPriBorrowerFname=true;
           
        }


			  if ($scope.priborrower.tribal != '' && $scope.priborrower.tribal != null && $scope.priborrower.tribal != undefined && $scope.priborrower.tribal != "NO TRIBAL AFFILIATION") {
				  $scope.errorPriBorrowerTribal=false;
        }else {
            statusPriBorrower = true;
            $scope.errorPriBorrowerTribal=true;
          
        }

      

        if (priBorrowerDateOne != undefined && priBorrowerDateOne != null && priBorrowerDateOne != '') {
        	 $scope.errorPriBorrowerDob=false;
        }else {
            statusPriBorrower = true;
            $scope.errorPriBorrowerDob=true;
          
        }
        if ($scope.priborrower.lastname != undefined && $scope.priborrower.lastname != null && $scope.priborrower.lastname != '') {
        	$scope.errorPriBorrowerLname=false;
        }else {
            statusPriBorrower = true;
            $scope.errorPriBorrowerLname=true;
           
        }

       
    
     }else{
   	 if ($scope.priborrower.btype != undefined && $scope.priborrower.btype != null && $scope.priborrower.btype != '') {
		 if($scope.priborrower.btype != 'TRE'){
			 if ($scope.priborrower.organisation != undefined && $scope.priborrower.organisation != null && $scope.priborrower.organisation != '') {
				 $scope.errorPriBorrowerOrg=false;
        } else{
             statusPriBorrower = true;
            $scope.errorPriBorrowerOrg=true;
           
            }
	 }
           
        } else{
             statusPriBorrower = true;
            $scope.errorPriBorrowerType=true;
           
            }
		
		
			
			  if ($scope.priborrower.tribal != undefined && $scope.priborrower.tribal != null && $scope.priborrower.tribal != '' && $scope.priborrower.tribal != "NO TRIBAL AFFILIATION") {
				  $scope.errorPriBorrowerTribal=false;
        }else {
            statusPriBorrower = true;
            $scope.errorPriBorrowerTribal=true;
           
        }


     }
    if(statusPriBorrower){
    	return false;
    }else{
    	return true;
    }
   
    }

/* completed validation */
    /* validation start for coborrower to add*/
    $scope.validationOrg = function(){
	
if($scope.priborrower.btype != 'TRE' && $scope.priborrower.btype != 'IND'){
    if ($scope.priborrower.organisation != undefined && $scope.priborrower.organisation != null && $scope.priborrower.organisation != '') {
     $scope.errorPriBorrowerOrg=false;
        } else{
             
            $scope.errorPriBorrowerOrg=true;
           
            }
   }
  
  }
    $scope.showCoBorrower1 = function(){
    	
   	 if($scope.CoBorrowerList.length>0 && $scope.showCoBorrowerBtn ){
   	
   		 $scope.showCoBorrower=true;
   		checkingAddCoBorrower=true;
   	 } else{
   	
   		 $scope.showCoBorrower=false; 
   		checkingAddCoBorrower=false;
   	 }
   	}
   	$scope.showCoBorrower1();
   
    
    $scope.addNew = function () {
    	checkingAddCoBorrower =true;
    	if($scope.showCoBorrowerBtn){
    	 $scope.showCoBorrower=true;
    	}
    	 var CoBorrowerListPushing = 
    	              	        {
    	              	            "social": "",
    	              	            "firstName": "",
    	              	            "tribal": "",
    	              	            "dob": "",
    	              	            "lastName": "",
    	              	            "middleInitial": "",
								"showDupicalteCoBorrower":true
    	              	        };
    	
    	 if ($scope.CoBorrowerList.length == 0) {
    		 $scope.CoBorrowerList.push(CoBorrowerListPushing);
    	 }else
    		 if ($scope.CoBorrowerList.length < 5) {
                    var id=$scope.CoBorrowerList.length -1;
             var ids="#"+id+"ssh";
            var idsdob="#"+id+"dob";
            var idsfirstname="#"+id+"firstname";
            var idslastname="#"+id+"lastname";
            var idstribal="#"+id+"tribal";
            var idsdate=id+"datepick";
            if(id >= 0){
    	        var coBorrowerDateTwo = document.getElementById(idsdate).value;
    	        }else{
    	        	
    	        	coBorrowerDateTwo = $scope.CoBorrowerList[0].dob;
    	        }

            $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].dob = coBorrowerDateTwo;

        if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].firstName != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].firstName != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].firstName != undefined) {
			  if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].lastName != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].lastName != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].lastName != undefined) {
                       
              if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social != undefined) {
                if (coBorrowerDateTwo != '' && coBorrowerDateTwo != null && coBorrowerDateTwo != undefined) {
                            if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].tribal != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].tribal != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].tribal != undefined) {

                                $(ids).hide();
                                $(idsdob).hide();
                                $(idsfirstname).hide();
                                $(idslastname).hide();
                                $(idstribal).hide();
                                
                                $scope.CoBorrowerList.push(CoBorrowerListPushing);
                               
                            } else {
                              
                                $(ids).hide();
                                $(idsdob).hide();
                                $(idsfirstname).hide();
                                $(idslastname).hide();
                                $(idstribal).show();

                            }
                        } else {
                           
                            $(ids).hide();
                            $(idsdob).show();
                            $(idsfirstname).hide();
                            $(idslastname).hide();
                            $(idstribal).hide();

                        }
                    } else {
                       
                        $(ids).show();
                        $(idsdob).hide();
                        $(idsfirstname).hide();
                        $(idslastname).hide();
                        $(idstribal).hide();
                                            }
                } else {
                   
                    $(ids).hide();
                    $(idsdob).hide();
                    $(idsfirstname).hide();
                    $(idslastname).show();
                    $(idstribal).hide();


                }
            } else {
               
                $(ids).hide();
                $(idsdob).hide();
                $(idsfirstname).show();
                $(idslastname).hide();
                $(idstribal).hide();


            }
        } else {
            
			FlashService.error(Constants.ERROR_MESSAGES.COBORROWER_MORETHAN_FIVE_ERROR);
        }
    };

    $scope.remove = function (index) {
    	
    	 $scope.CoBorrowerList.splice(index, 1);
    	 if($scope.CoBorrowerList.length==0){
    		   checkingAddCoBorrower = false;
    		    $scope.CoBorrowerList = [];
    		    $scope.showCoBorrower=false;
    	 }
    }
    
    /* ends*/
    /* coborrower validation starts*/
    $scope.CoBorrowerValidation = function () {
    	 var ssnPattern = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/;
    		 var id=$scope.CoBorrowerList.length -1;
             var ids="#"+id+"ssh";
            var idsdob="#"+id+"dob";
            var idsfirstname="#"+id+"firstname";
            var idslastname="#"+id+"lastname";
            var idstribal="#"+id+"tribal";
            var idsdate=id+"datepick";
            var idssnnum="#"+id+"sshNumber";
           var statusCoBorrower = false;

            $(ids).hide();
            $(idsdob).hide();
            $(idsfirstname).hide();
            $(idslastname).hide();
            $(idstribal).hide();
            $(idssnnum).hide();

            var coBorrowerDateTwo;
            if(id >= 0){
    	         coBorrowerDateTwo = document.getElementById(idsdate).value;
    	        }else{
    	        	
    	        	coBorrowerDateTwo = $scope.CoBorrowerList[0].dob;
    	        	
    	        }

            $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].dob = coBorrowerDateTwo;
            $scope.priborrower['CoBorrower'] = $scope.CoBorrowerList;
            
            if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social != undefined) {
                if (ssnPattern.test($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social)) {
                	$(idssnnum).hide();
                }else {
                    $(idssnnum).show();
                    statusCoBorrower = true;
                }
            }else {
                statusCoBorrower = true;
                $(ids).show();
            }


                if (coBorrowerDateTwo != undefined && coBorrowerDateTwo != null && coBorrowerDateTwo != '' ) {
                	 $(idsdob).hide();
                }else {
                    statusCoBorrower = true;
                    $(idsdob).show();
                }

                if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].firstName != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].firstName != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].firstName != undefined) {
                	 $(idsfirstname).hide();
                }else {
                    statusCoBorrower = true;
                    $(idsfirstname).show();
                }
                if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].lastName != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].lastName != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].lastName != undefined) {
                	 $(idslastname).hide();
                }else {
                    statusCoBorrower = true;
                    $(idslastname).show();
                }

                if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].tribal != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].tribal != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].tribal != undefined) {
                	 $(idstribal).hide();
                }else {
                    statusCoBorrower = true;
                    $(idstribal).show();
                }

                if(statusCoBorrower){
               
                	return false;
                }else{
                	return true;
                }
               	}
    
    
    

    $scope.formData = function () {
if($rootScope.formData1!=undefined){
        $rootScope.formData1.formData.borrowerType=$scope.priborrower.btype;
        $rootScope.formData1.formData.organization=$scope.priborrower.organisation;
		  $rootScope.formData1.formData.tribal=$scope.priborrower.tribal;
            if( $scope.priborrower.btype == 'IND'){
        	checkingPriBorrower = true;
        	 
        $rootScope.formData1.formData.social= $scope.priborrower.social;
        $rootScope.formData1.formData.firstName=$scope.priborrower.firstname;
      
        $rootScope.formData1.formData.dob=$scope.priborrower.dob;
        $rootScope.formData1.formData.lastName=$scope.priborrower.lastname;
        $rootScope.formData1.formData.middleInitial=$scope.priborrower.mi;
           $window.localStorage.setItem("totalDataForm", JSON.stringify($rootScope.formData1));
       

        }else{
        	checkingPriBorrower = false;
        	 $rootScope.formData1.formData.social='';
             $rootScope.formData1.formData.firstName='';
             $rootScope.formData1.formData.dob='';
             $rootScope.formData1.formData.lastName='';
             $rootScope.formData1.formData.middleInitial='';
           
        	 $window.localStorage.setItem("totalDataForm", JSON.stringify($rootScope.formData1));
            
        }
     
        if(checkingAddCoBorrower  && checkingAddCoBorrower!=undefined && $scope.showCoBorrowerBtn ){
        	        	
		$scope.CoBorrowerList = angular.toJson($scope.CoBorrowerList);
			 
        $rootScope.formData1.formData['coBorrowers'] = JSON.parse($scope.CoBorrowerList);
      
        $window.localStorage.setItem("totalDataForm", JSON.stringify($rootScope.formData1));
      
        }else{
        	$rootScope.formData1.formData['coBorrowers'] = [];
			        
		$window.localStorage.setItem("totalDataForm", JSON.stringify($rootScope.formData1));
        }
          }
}
    $scope.saveBorrowerDetails = function () {
        var checkSaveButtonBorrower = $scope.borrowerValidation();
       
     
        if(checkSaveButtonBorrower ){
          if(checkingAddCoBorrower && $scope.priborrower.btype == 'IND'){
     	        var checkSaveButtonCoBorrower = $scope.CoBorrowerValidation();
     	        if (checkSaveButtonCoBorrower) {
     	            $scope.formData();
     	            window.location.href = '#/property';

     	        }
     	        }else{
     	        	$scope.formData();
     	            window.location.href = '#/property';
     	        }
     }	
  
       
       
    }
  $scope.CoborrowerSsnValidation =function(){
	
	
	    var ssnPattern = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/;
		for(var i=0; i<$scope.CoBorrowerList.length;i++){
			
		
    		 var id=i;
             var ids="#"+id+"ssh";
           
            var idssnnum="#"+id+"sshNumber";
           var statusCoBorrowerssn = false;
           var idmi="#"+id+"mii";
  $(idmi).hide();
var namepatt = /^[a-z\s]{1,40}$/i;


            $(ids).hide();
           
            $(idssnnum).hide();
            
            if ($scope.CoBorrowerList[id].social != '' && $scope.CoBorrowerList[id].social != null && $scope.CoBorrowerList[id].social != undefined) {
                if (ssnPattern.test($scope.CoBorrowerList[id].social)) {
                	$(idssnnum).hide();
                }else {
                    $(idssnnum).show();
                    statusCoBorrowerssn = true;
					break;
                }
            }else {
                
                $(ids).show();
				statusCoBorrowerssn = true;
				break;
            }
 if ($scope.CoBorrowerList[id].middleInitial != '' && $scope.CoBorrowerList[id].middleInitial != null && $scope.CoBorrowerList[id].middleInitial != undefined) {

                if (namepatt.test($scope.CoBorrowerList[id].middleInitial)) {
                	$(idmi).hide();
                }else {
                    $(idmi).show();
 statusCoBorrowerssn = true;
					break;
                 
                }
            }

		}
              

                if(statusCoBorrowerssn){
               
                	return false;
                }else{
                	return true;
                }
             
		
		
    }
  $(".lender-btn-next").click(function(event){
		
	    event.preventDefault();
	});
	
    $scope.nextButtonBorrower = function () {

        var checknextButtonBorrower = $scope.borrowerValidation();
       
        if(checknextButtonBorrower ){

      	   if(checkingAddCoBorrower  && $scope.priborrower.btype == 'IND'){
      	        var checkSaveButtonCoBorrower = $scope.CoBorrowerValidation();
 var checkSaveButtonCoBorrowerssn = $scope.CoborrowerSsnValidation();
			       
			 
        	  	        if (checkSaveButtonCoBorrower  && checkSaveButtonCoBorrowerssn) {
        	            $scope.formData();
        	            window.location.href = '#/property';

        	        }
        	        }else{
        	        	$scope.formData();
        	            window.location.href = '#/property';
        	        }
        }	
     
    }
    $scope.prevButtonBorrower = function () {
    	 
 	            $scope.formData();
 	            window.location.href = '#/lender';

 	   	       
    }

});
 angular.module('app').directive('focusOnShow', function($timeout) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            if ($attr.ngShow){
                $scope.$watch($attr.ngShow, function(newValue){
                    if(newValue){
                        $timeout(function(){
                            $element[0].focus();
                        }, 0);
                    }
                })      
            }
            if ($attr.ngHide){
                $scope.$watch($attr.ngHide, function(newValue){
                    if(!newValue){
                        $timeout(function(){
                            $element[0].focus();
                        }, 0);
                    }
                })      
            }

        }
    };
})