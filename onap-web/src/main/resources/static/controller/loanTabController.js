angular.module('app').controller('loanController', function ($scope, $http, $window, $rootScope, $filter, LoggingService, Calculator, Constants, FlashService) {
	 
	// Prevent navigation from back button
	history.pushState(null, document.title, location.href);
	window.addEventListener('popstate', function (event)
	{
	 history.pushState(null, document.title, location.href);
	});

	 $http({
         method: 'GET',
          url: 'case/referenceCodes/CONSTRUCTION CODE',
         headers: {"Content-Type": "application/json", "Accept": "application/json"}
     }).success(function (response) {
        $scope.construction=response;
		}).error(function () {
         
     });
		
 
	$http({
         method: 'GET',
          url: 'getUndrWrtrs',
         headers: {"Content-Type": "application/json", "Accept": "application/json"}
     }).success(function (response) {
		  
		 
    	 if(response.status == "SUCCESS"){
         $scope.underWriter=response.personsList;
		    	} else{
		    		FlashService.error(response.errorMessage);
		    	}
		
     }).error(function () {
    	 FlashService.error(Constants.ERROR_MESSAGES.UNDERWRITER_RETRIEVAL_ERROR);
     });
 
	
	  $rootScope.userInfo  = JSON.parse($window.sessionStorage.getItem("activeUser"));
	 if( $rootScope.userInfo ){
		$rootScope.userName =  $rootScope.userInfo .loggedUser;
		$rootScope.showloginhead = true;
    }else{
        $rootScope.showloginhead = false;
    }
  $scope.getLoanType=function(){

    $http({
      method: 'GET',
      url : 'case/referenceCodes/LOAN TYPE',
     
      headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }).success(function (response) {
     $scope.loanType=response;
    }).error(function () {
      
    });
  }
  
  $scope.checkValidSession = function(){
		var user = JSON.parse($window.sessionStorage.getItem("activeUser"));
		if(LoggingService.validationLoggedUser(user) === false)
			LoggingService.toRoot();
	}
	
	$scope.checkValidSession();

  $scope.getLoanType();
////////////////////DECIMAL NUMBER VALIDATION//////
  $('.number').keypress(function(event) {
	    var $this = $(this);
	    if ((event.which != 46 || $this.val().indexOf('.') != -1) &&
	       ((event.which < 48 || event.which > 57) &&
	       (event.which != 0 && event.which != 8))) {
	           event.preventDefault();
	    }

	    var text = $(this).val();
	    if ((event.which == 46) && (text.indexOf('.') == -1)) {
	        setTimeout(function() {
	            if ($this.val().substring($this.val().indexOf('.')).length > 3) {
	                $this.val($this.val().substring(0, $this.val().indexOf('.') + 3));
	            }
	        }, 1);
	    }

	    if ((text.indexOf('.') != -1) &&
	        (text.substring(text.indexOf('.')).length > 2) &&
	        (event.which != 0 && event.which != 8) &&
	        ($(this)[0].selectionStart >= text.length - 2)) {
	            event.preventDefault();
	    }      
	});
  $scope.getLoanPurpose=function(type){
$scope.loan.construction = '';
    $http({
      method: 'GET',
      url : 'case/referenceCodes/group/'+type,
      headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }).success(function (response) {
      $scope.loanPurpose=response;
    }).error(function () {
      
    });
  }
 
  $rootScope.baseMortgageMaxAmount="";
  $rootScope.loanGaurenteeFeeValue="";

		$rootScope.officer= {};
	


  $scope.loan = {
    "loanType": "",
    "loanPurpose": "",
    "priorCaseNumber": "",
    "priorCaseStatus": "",
    "underWriter": "",
    "baseMortgageAmount": "",
    "loanTerm": "",
    "construction":"",
    "loanGuaranteeFee": "",
    "loanAmountWithFee": ""
  }
  
  $scope.showPriorCase = false;
 $('#priorCaseStatus')
        .attr("disabled", true);
$scope.setConstructionCode = function(loanpurpose){

	if(loanpurpose == 'RS' || loanpurpose == 'RSW' ||loanpurpose == 'RSA' || loanpurpose == 'RWC' || loanpurpose == 'RWOC'|| loanpurpose == 'AE'){
		$scope.loan.construction = 'EX';
		
	} else if(loanpurpose == 'NCON'||loanpurpose == 'AL'){
		$scope.loan.construction ='NEW';
	}
	else if(loanpurpose == 'PCON'){
		$scope.loan.construction ='PRO';
	} else if(loanpurpose == 'RN' || loanpurpose == 'AN'){
		$scope.loan.construction ='NEW';
	} else if(loanpurpose == 'ARE'){
		$scope.loan.construction ='REH';
	}else{
		$scope.loan.construction ='';
	}
}
$scope.showStatusPrior = function(purposevalue){
	
var loanPurpose = $scope.loan.loanPurpose.indexOf("RS", 0) === 0;

if(loanPurpose){
 $('#priorCaseStatus')
        .attr("disabled", false);
}else{
 $('#priorCaseStatus')
        .attr("disabled", true);
}

$scope.loan.priorCaseStatus='';

}

  function roundToTwo(num) {    
	    return +(Math.round(num + "e+2")  + "e-2");
	}
  
  ///////allow only less than 360////
  var t = false

  $('#numberbox').focus(function () {
      var $this = $(this)
      
      t = setInterval(

      function () {
          if (($this.val() < 1 || $this.val() > 361) && $this.val().length != 0) {
              if ($this.val() < 1) {
                 
            	  $scope.errorLoanMonthExceed=true;
              }

              if ($this.val() > 361) {
                  $scope.errorLoanMonthExceed=true;
              }
              $('p').fadeIn(1000, function () {
                  $(this).fadeOut(500)
              })
          }
      }, 50)
  })

  $('#numberbox').blur(function () {
      if (t != false) {
          window.clearInterval(t)
          t = false;
      }
  })
  

  $scope.errorLoanTermText = Constants.ERROR_MESSAGES.LOAN_TERM_REQUIRED;
  $scope.errorLoanTypeText = Constants.ERROR_MESSAGES.LOAN_MONTHS_EXCEED_ERROR;
  $scope.errorLoanTypeRequiredText = Constants.ERROR_MESSAGES.LOAN_TYPE_REQUIRED;
  $scope.errorLoanPurposeText = Constants.ERROR_MESSAGES.LOAN_PURPOSE_REQUIRED;
  $scope.errorLoanPriorCaseText = Constants.ERROR_MESSAGES.PRIOR_CASE_REQUIRED;
  $scope.errorLoanBaseAmountText = Constants.ERROR_MESSAGES.BASE_LOAN_AMOUNT_INVALID;
 
  $scope.errorLoanGarenteeFeeText = Constants.ERROR_MESSAGES.LG_FEE_INVALID;
  
  $scope.getLoanGauranteeFee=function(){

	    $http({
	      method: 'GET',
	      url : 'getUpfrontFee/' + new Date().getTime(),
	       headers: {"Content-Type": "application/json", "Accept": "application/json"}
	    }).success(function (response) {
	    	
	     if(response.status == "SUCCESS"){
	      $rootScope.loanGaurentee=response.upFrontFee;
		  $window.localStorage.setItem("loanmaxvalue", JSON.stringify($rootScope.loanGaurentee));
		  $rootScope.loanGaurenteeFeeValue = JSON.parse($window.localStorage.getItem("loanmaxvalue"));;
	      if($scope.loan.baseMortgageAmount<=  parseFloat( $rootScope.baseMortgageMaxAmount)){
	    	  var loanGuaranteeFee = Number($scope.loan.baseMortgageAmount) * Number($rootScope.loanGaurenteeFeeValue);
	    	  $scope.loan.loanGuaranteeFee=roundToTwo(loanGuaranteeFee);
	    	
	      $scope.errorMaxLoanBaseAmount =false;
	      }else{
			  
	           $scope.errorLoanTerm =false;
	           $scope.errorLoanType =false;
	           $scope.errorLoanPurpose =false;
	           $scope.errorLoanPriorCase =false;
	           $scope.errorLoanBaseAmount =false;
	           $scope.errorMaxLoanBaseAmount =true;
	           $scope.errorLoanGarenteeFee =false;
	           $scope.errorLoanMonthExceed =false;
	           $scope.loan.loanGuaranteeFee='';
	           $scope.loan.totalAmountFee='';
		   }
	     }else if (response.status == "ERROR") {
				
				FlashService.error(response.errorMessage);
			}
	    }).error(function () {
	      
	    });
	  }
// Jquery Dependency

$(".dollarsign").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});


function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
	
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;
    
    // final formatting
    if (blur === "blur") {
      input_val += ".00";
	  $scope.loan.baseMortgageAmount = input_val;
    }
  }
  
  // send updated string to input
  input.val(input_val);
 $scope.loan.baseMortgageAmount = input_val;
  var updated_len = input_val.length;
 
}



  $scope.totalAmount =function(){
	 $scope.baseAmountValues = $scope.loan.baseMortgageAmount;
		   $scope.baseAmountValues =  $scope.baseAmountValues.split('$').join('');
		    $scope.baseAmountValues =  $scope.baseAmountValues.split(',').join('');
			if($scope.baseAmountValues==''){
				$scope.errorLoanBaseAmount = true;
			}else if($scope.baseAmountValues<=  parseFloat( $rootScope.baseMortgageMaxAmount)){
	       
			
			$http({
	      method: 'GET',
	      url : 'getUpfrontFee/' + new Date().getTime(),
	      headers: {"Content-Type": "application/json", "Accept": "application/json"}
	    }).success(function (response) {
	     if(response.status == "SUCCESS"){
	      
	      $rootScope.loanGaurenteeFeeValue=response.upFrontFee;
		
		  $scope.baseAmountValue = $scope.loan.baseMortgageAmount;
		   $scope.baseAmountValue =  $scope.baseAmountValue.split('$').join('');
		     $scope.baseAmountValue =  $scope.baseAmountValue.split(',').join('');
	      if($scope.baseAmountValue<=  parseFloat( $rootScope.baseMortgageMaxAmount)){
	    	  var loanGuaranteeFee = Number($scope.baseAmountValue) * Number($rootScope.loanGaurenteeFeeValue);
	    	  $scope.loan.loanGuaranteeFee=roundToTwo(loanGuaranteeFee);
	    	   $scope.loan.totalAmountFee = parseFloat($scope.baseAmountValue) + parseFloat($scope.loan.loanGuaranteeFee);
    $scope.loan.totalAmountFee = parseFloat($scope.loan.totalAmountFee).toFixed(2);
  $scope.loan.loanAmountWithFee = $scope.loan.totalAmountFee ;
   
				
   
			
    $scope.errorMaxLoanBaseAmount =false;
    $scope.errorLoanBaseAmount =false;
	      
	      $scope.errorMaxLoanBaseAmount =false;
	      }else{
			
	           $scope.errorLoanTerm =false;
	           $scope.errorLoanType =false;
	           $scope.errorLoanPurpose =false;
	           $scope.errorLoanPriorCase =false;
	           $scope.errorLoanBaseAmount =false;
	           $scope.errorMaxLoanBaseAmount =true;
	           $scope.errorLoanGarenteeFee =false;
	           $scope.errorLoanMonthExceed =false;
			   
	           $scope.loan.loanGuaranteeFee='';
	           $scope.loan.loanAmountWithFee='';
	           $scope.loan.totalAmountFee='';
		   }
		}else{
			FlashService.error(response.errorMessage);
		}
	    }).error(function () {
	      
	    });
				
					
	   }else{
		  
           $scope.errorLoanTerm =false;
           $scope.errorLoanType =false;
           $scope.errorLoanPurpose =false;
           $scope.errorLoanPriorCase =false;
           $scope.errorLoanBaseAmount =false;
           $scope.errorMaxLoanBaseAmount =true;
           $scope.errorLoanGarenteeFee =false;
           $scope.errorLoanMonthExceed =false;
           $scope.loan.loanGuaranteeFee='';
		   $scope.loan.loanAmountWithFee='';
           $scope.loan.totalAmountFee='';
	   }
	   
   
  }
 
  $scope.totalContentProperty1 = JSON.parse($window.localStorage.getItem("totalDataForm"));
  $scope.officerName = JSON.parse($window.localStorage.getItem("officerName"));
 
  if($scope.totalContentProperty1!=undefined && $scope.totalContentProperty1!=null && $scope.totalContentProperty1!=''){
    
	  if($scope.totalContentProperty1.formData.borrowerType == 'IND' ){
		 
		  $('#hideprior').show();
		  $scope.showPriorCase =true;
	  }else{
		  $('#hideprior').hide();
		  $scope.showPriorCase =true;
	  }
	  
	  $scope.getLoanMortage=function(){

		    $http({
		      method: 'GET',
		      url : 'getMaxMortgageLmtAmt/stcd/' + $scope.totalContentProperty1.formData.state + '/cntynm/' + 
									$scope.totalContentProperty1.formData.county + '/unit/' + $scope.totalContentProperty1.formData.numberOfUnits,
		    
		      headers: {"Content-Type": "application/json", "Accept": "application/json"}
		    }).success(function (response) {
				
		    	if(response.status == "SUCCESS"){
		      $rootScope.baseMortgageMaxAmount=response.unitAmount;
		    	} else{
		    		
		    		FlashService.error(response.errorMessage);
		    	}
		     
		    }).error(function () {
		     
		    });
		  }

	  $scope.getLoanMortage();
	$scope.loan.loanType =$scope.totalContentProperty1.formData.loanType;
    if($scope.loan.loanType){
    	   $http({
    		      method: 'GET',
    		      url : 'case/referenceCodes/group/'+$scope.loan.loanType,
    		     
    		      headers: {"Content-Type": "application/json", "Accept": "application/json"}
    		    }).success(function (response) {
    		     
    		      $scope.loanPurpose=response;
    		      
    		    }).error(function () {
    		    
    		    });
    		  }
  
    $scope.loan.loanPurpose =$scope.totalContentProperty1.formData.loanPurpose;
    $scope.loan.construction =$scope.totalContentProperty1.formData.construction;

    $scope.loan.priorCaseNumber =$scope.totalContentProperty1.formData.priorCaseNumber;
    $scope.loan.priorCaseStatus =$scope.totalContentProperty1.formData.priorCaseStatus;
   
    $scope.loan.underWriter =$scope.totalContentProperty1.formData.underWriterId;
    $scope.loan.baseMortgageAmount =$scope.totalContentProperty1.formData.baseMortgageAmount;
    $scope.loan.loanTerm =$scope.totalContentProperty1.formData.loanTerm;
    $scope.loan.loanGuaranteeFee =$scope.totalContentProperty1.formData.loanGuaranteeFee;
    $scope.loan.loanGuaranteeFee = Number($scope.loan.loanGuaranteeFee).toFixed(2);

    $scope.loan.loanAmountWithFee =$scope.totalContentProperty1.formData.loanAmountWithFee;
    $scope.loan.loanAmountWithFee = Number($scope.totalContentProperty1.formData.loanAmountWithFee).toFixed(2);
   }
  else{
   
	  $scope.loan.loanGuaranteeFee = 0;
	  $scope.loan.loanAmountWithFee =0;
		$scope.officerName='';
  }
  $("#numberbox").keypress(function (e) {

            //if the letter is not digit then display error and don't type anything
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                //display error message
                $("#errmsg").html("Digits Only").show().fadeOut("slow");
                return false;
            }
        });
    $("#numberbox").keypress();
$scope.validateMonth=function(test)
{
	if(Number(test)<361 && Number(test)>0) {
		$scope.errorLoanMonthExceed=false;
    }else{
    	$scope.errorLoanMonthExceed=true;
        

    }
}
  $scope.LoanValidation = function () {
    
     var statusLoan = false;
    $scope.errorLoanTerm =false;
    $scope.errorLoanType =false;
    $scope.errorLoanPurpose =false;
    $scope.errorLoanPriorCase =false;
    $scope.errorLoanBaseAmount =false;
    $scope.errorLoanGarenteeFee =false;
    $scope.errorLoanMonthExceed =false;
    $scope.errorMaxLoanBaseAmount =false;
    if ($scope.loan.loanType != '' && $scope.loan.loanType != null && $scope.loan.loanType != undefined) {
    	statusLoan = false;
    }else {
        statusLoan = true;
        $scope.errorLoanType=true;
    }

    if ($scope.loan.loanPurpose != undefined && $scope.loan.loanPurpose != '' && $scope.loan.loanPurpose != null) {
    	statusLoan = false;
    }else {
   
        statusLoan = true;
        $scope.errorLoanPurpose=true;
    }
	
	if ($scope.loan.baseMortgageAmount != '' && $scope.loan.baseMortgageAmount != null && $scope.loan.baseMortgageAmount != undefined) {
        $scope.baseAmountValues = $scope.loan.baseMortgageAmount;
		   $scope.baseAmountValues =  $scope.baseAmountValues.split('$').join('');
		    $scope.baseAmountValues =  $scope.baseAmountValues.split(',').join('');
	      if($scope.baseAmountValues<=  parseFloat( $rootScope.baseMortgageMaxAmount)){
	    	  statusLoan = false;
        }else{
            statusLoan = true;
            $scope.errorMaxLoanBaseAmount=true;
        }

    }else {
        statusLoan = true;
        $scope.errorLoanBaseAmount=true;
    }
    if ($scope.loan.loanTerm != '' && $scope.loan.loanTerm != null && $scope.loan.loanTerm != undefined) {
        if($scope.loan.loanTerm<361) {
        	statusLoan = false;
        }else{
            statusLoan = true;
            $scope.errorLoanMonthExceed=true;

        }
    }else {
        statusLoan = true;
        $scope.errorLoanTerm=true;
    }
	
	if(Number($scope.loan.loanTerm)<361 && Number($scope.loan.loanTerm)>0) {
		$scope.errorLoanMonthExceed=false;
		
    }else{
    	$scope.errorLoanMonthExceed=true;
    	statusLoan = true;

    }
	
    if(statusLoan){
    	return false;
    }else{
    	return true;
    }
   
  } 
$scope.formDataLoan = function () {
if( $rootScope.formData1!=undefined){
  
  $rootScope.formData1.formData.loanType=$scope.loan.loanType;
  $rootScope.formData1.formData.loanPurpose=$scope.loan.loanPurpose;
  var loanPurpose1 = $scope.loan.loanPurpose;
 
	 if($scope.loan.loanPurpose){
	  var i;
	
	  for(i=0;i<$scope.loanPurpose.length;i++){
		  if($scope.loanPurpose[i].referenceCodeValue==loanPurpose1){
			  $rootScope.loanPurposeName= $scope.loanPurpose[i].referenceCodeName;
			  $window.localStorage.setItem("loanPurposeName", JSON.stringify($rootScope.loanPurposeName));
			  break;
		  }
	  }
	 }
     
  $rootScope.formData1.formData.priorCaseNumber=$scope.loan.priorCaseNumber;
  $rootScope.formData1.formData.priorCaseStatus=$scope.loan.priorCaseStatus;
  $rootScope.formData1.formData.underWriterId=$scope.loan.underWriter;
  $rootScope.formData1.formData.baseMortgageAmount=$scope.loan.baseMortgageAmount;
  $rootScope.formData1.formData.loanTerm=$scope.loan.loanTerm;
  $rootScope.formData1.formData.construction=$scope.loan.construction;
  $rootScope.formData1.formData.loanGuaranteeFee=$scope.loan.loanGuaranteeFee.toString();
  $rootScope.formData1.formData.loanAmountWithFee=$scope.loan.loanAmountWithFee.toString();
  $rootScope.abc = JSON.parse($window.sessionStorage.getItem("abc"));
  $rootScope.formData1.formData.lenderId=$rootScope.abc.split('##')[0];
  $window.localStorage.setItem("totalDataForm", JSON.stringify($rootScope.formData1));
  $window.localStorage.setItem("officerName", JSON.stringify($rootScope.officer));
 
}
}
$scope.saveLoanDetails = function () {
  var checkSaveButtonLoan = $scope.LoanValidation();
  if (checkSaveButtonLoan) {
    $scope.formDataLoan();
    FlashService.success(Constants.SUCCESS_MESSAGES.SAVED_SUCCESSFULLY);
   
  }
}

$scope.copyFormData1ToCase = function(){
	$scope.formDataLoan();
if( $rootScope.formData1!=undefined){
	if('IND' ===  $rootScope.formData1.formData.borrowerType){
		 $rootScope.formData1.formData.social =  $rootScope.formData1.formData.social.split('-').join('');
		 $rootScope.formData1.formData.social = Calculator.squareEnc($rootScope.formData1.formData.social);
	}
	$rootScope.formData1.formData.numberOfUnits =  parseInt($rootScope.formData1.formData.numberOfUnits);
	$rootScope.formData1.formData.loanTerm =  parseInt($rootScope.formData1.formData.loanTerm);
	
	$rootScope.formData1.formData.loanGuaranteeFee =  Number($rootScope.formData1.formData.loanGuaranteeFee);
	$rootScope.formData1.formData.loanAmountWithFee =  Number($rootScope.formData1.formData.loanAmountWithFee);
	$rootScope.formData1.formData.underWriterId =  Number($rootScope.formData1.formData.underWriterId);
	
	 $rootScope.formData1.formData.tinName =  $rootScope.formData1.formData.tinName.split('-').join('');
 $rootScope.formData1.formData.baseMortgageAmount =  $rootScope.formData1.formData.baseMortgageAmount.split('$').join('');
		    $rootScope.formData1.formData.baseMortgageAmount =  $rootScope.formData1.formData.baseMortgageAmount.split(',').join('');
			$rootScope.formData1.formData.baseMortgageAmount =  Number($rootScope.formData1.formData.baseMortgageAmount);
	 var i;
	 var n=  $rootScope.formData1.formData.coBorrowers.length;
	
	 for(i=0; i < n; i++){
		 $rootScope.formData1.formData.coBorrowers[i].social=$rootScope.formData1.formData.coBorrowers[i].social.split('-').join('');
		 delete $rootScope.formData1.formData.coBorrowers[i].showDupicalteCoBorrower;
	 delete $rootScope.formData1.formData.coBorrowers[i].CoBorrowerMask;

	 $rootScope.formData1.formData.coBorrowers[i].social = Calculator.squareEnc($rootScope.formData1.formData.coBorrowers[i].social);
	 }
	 
	var EnterpriseCaseIntakeRequestPojo = {};
	var loanCase = {};
	EnterpriseCaseIntakeRequestPojo.loanCase = loanCase;;
	var array = new Uint32Array(10);
	
	var cryptoObject = null;
	if(window.crypto){
		cryptoObject = window.crypto;
	}
	else{
		cryptoObject = window.msCrypto;
	}
	cryptoObject.getRandomValues(array);
	
	var intakeid = Math.floor((array[0] * 1000000) + 1);
	loanCase.intakeId =intakeid.toString();
	loanCase.timeStamp = new Date();
	
	loanCase.targetApplication = $rootScope.formData1.targetApplication;
	loanCase.expectedNumBinaryDocuments = $rootScope.formData1.expectedNumBinaryDocuments;
	loanCase.formData = $rootScope.formData1.formData;
	return EnterpriseCaseIntakeRequestPojo;
	}
}
$(".lender-btn-next").click(function(event){
	
    event.preventDefault();
});
$scope.submitLoanDetails = function () {

$scope.caseNumbers ={}
  var checkSaveButtonLoan = $scope.LoanValidation();
  if (checkSaveButtonLoan) {
			$http({
				method: 'POST',
				data: $scope.copyFormData1ToCase(), /*$rootScope.formData1,*/
				url: 'case/EnterpriseIntake/' + $rootScope.userId//'http://esb-t-lnx-srv1.hud.dev:8089/hud-esb/ecis/api/v1.0/cases//',
				
			}).success(function(data){
				$rootScope.priorCaseNumber=data.caseNumber;

                var dateSplit = data.caseIssuedDate.split('-');
                var da = dateSplit[2].split('T')
				$rootScope.issueddate = dateSplit[1].replace('0','')+"/"+da[0]+"/"+dateSplit[0];
				var day = parseInt(da[0]) + 60;
				var expDate = new Date();
				expDate.setDate(day);
				$rootScope.expireDate = (expDate.getMonth() + 1) + '/' + expDate.getDate() + '/' +  expDate.getFullYear();	
				$scope.caseNumbers.priorCaseNumber = data.caseNumber;
				$scope.caseNumbers.issueddate = $rootScope.issueddate;
				$scope.caseNumbers.expireDate = $rootScope.expireDate;
				$window.localStorage.setItem("caseNumberDetails", JSON.stringify($scope.caseNumbers));	
			
					window.location.href = '#/allTabContent';

					}).error(function(){
						$rootScope.priorCaseNumber = null;
						window.location.href = '#/allTabContent';
						
					});
			
		}
}
$scope.previousButtonLoan = function () {
  $scope.formDataLoan();
  window.location.href = '#/property';

}
}).directive('allowPattern', [allowPatternDirective]);
                                   
function allowPatternDirective() {
    return {
        restrict: "A",
        compile: function(tElement, tAttrs) {
            return function(scope, element, attrs) {
        // I handle key events
                element.bind("keypress", function(event) {
                    var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
                    var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.
          
          // If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
                    if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
            event.preventDefault();
                        return false;
                    }
          
                });
            };
        }
    };
};

angular.module('app').directive('currency1', ['$filter', function ($filter) {
    return {
        require: 'ngModel',
        link: function (elem, $scope, attrs, ngModel) {
            ngModel.$formatters.push(function (val) {
                return $filter('currency')(val)
            });
            ngModel.$parsers.push(function (val) {
                return val.replace(/[\$,]/, '')
            });
        }
    }
}]);

angular.module('app').directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });

            elem.bind('blur', function(event) {
                var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
            });
        }
    };
}]);
