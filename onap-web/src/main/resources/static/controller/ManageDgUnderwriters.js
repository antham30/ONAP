 
		
		
		angular.module('app').controller('ManageDgUnderwritersController', function ($scope, $http, $window, $rootScope, $filter, LoggingService, Calculator, Constants, FlashService) {
	 var vm = this;
	 
	vm.emailValidation = emailValidation;
	vm.validation = validation;
	vm.saveBtn = saveBtn;
vm.getStatus= getStatus;
vm.editAllData= editAllData;
vm.editIndividual= editIndividual;
vm.submitCancelBtnOLGAdmin= submitCancelBtnOLGAdmin;
vm.submitCancelBtnOLGAdmin1= submitCancelBtnOLGAdmin1;
vm.reset= reset;

vm.originalData ={}
vm.getAllLendingInstitutionsNamesOnly= getAllLendingInstitutionsNamesOnly;
vm.editDg={};
  vm.getAllStates =  getAllStates;
  document.getElementById("status").disabled=true;
  
   var knownUsers = {
    			lender: ['summer'],
    			olg: 	{
	    			      	supervisor: ['onapsupervisor@hud.gov'],
							staff: ['mthorpe',
							        'rfloyd',
									'sanderson',
									'twright',
									'jennpost',
									'jjin@credence-llc.com',
									'ama@credence-llc.com',
									'onapendorser1@hud.gov',
									'onapendorser2@hud.gov',
									'onapendorser3@hud.gov',
									'onapendorser4@hud.gov',
									'onapendorser5@hud.gov'
							],
							administrator: ['onapadmin@hud.gov']
    					}
    	};
    	
    	vm.knownUsers = knownUsers;
    	
    	vm.isOLGMember = (knownUsers.olg.staff.indexOf($rootScope.userName) !== -1) || knownUsers.olg.supervisor.indexOf($rootScope.userName) !== -1 || knownUsers.olg.administrator.indexOf($rootScope.userName) !== -1;
    	vm.isOLGSupervisor = knownUsers.olg.supervisor.indexOf($rootScope.userName) !== -1;
    	vm.isOLGAdmin = knownUsers.olg.administrator.indexOf($rootScope.userName) !== -1;
    	vm.isOLG = (knownUsers.olg.staff.indexOf($rootScope.userName) !== -1);
    	vm.isLender = !vm.isOLGMember;
		
	var newdate = new Date();
		
		var years = newdate.getFullYear() + 60;
			
	
            
       
        $('#dgapproved').datepicker({
        	maxPicks: 1,
					changeMonth : true,
					changeYear : true,
					
					yearRange: '1917:'+years,
					
					dateFormat: "mm/dd/yy"
                   });
     
  
	
	
	 $('#targetdate').datepicker({
        	maxPicks: 1,
					changeMonth : true,
					changeYear : true,
					
					yearRange: '1917:'+years,
					
					dateFormat: "mm/dd/yy"
                   });
        
  
	    $('#tinmasking').mask('00-0000000');
    $('#phone_with_ddd').mask('(000) 000-0000');
	$scope.phnValid = function(index){

		  var idsdate="#"+index+"phone_with_ddd";
		$(idsdate).mask('(000) 000-0000');
	}
function emailValidation(emailAddress){

$scope.errorEmail = false;
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
  
    if( !pattern.test(emailAddress) ) {
               $scope.errorEmailsValid=false;
				$scope.errorEmail=true;
                }
}
getStatus();
  function editAllData(id) {
		 // 
		  id.enableInputFiled =true;
		
	

	  }
	  function getMortagageLimitById(recs, mortId){
	 var localSubsidyRec = null;
 	for(var i = 0; i < recs.length; i++){
         if(recs[i].lndrId === mortId.lndrId) {
         	localSubsidyRec = recs[i];
             break;
         }
     }
 	return localSubsidyRec;
 }

  function reset(mortgageId) {
	var originial = getMortagageLimitById(vm.originalData, mortgageId);
	
	mortgageId.streetName = originial.streetName;
	mortgageId.dgTrainerNumber = originial.dgTrainerNumber;
	mortgageId.workPhoneNumber = originial.workPhoneNumber;
	mortgageId.personEmail = originial.personEmail;
	mortgageId.enableInputFiled = false;
	
}  	  
function getStatus() {

	$http({
					method: 'GET',
					url: 'case/referenceCodes/DG UNDERWRITER STATUS',
					headers: {"Content-Type": "application/json", "Accept": "application/json"}
				}).success(function (response) {
					
					
					if(response){
						vm.getStatus =response;
						
					}
					}).error(function () {
						
					FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
				});

		  }
    $scope.errorFnameText = Constants.ERROR_MESSAGES.FIRST_NAME_REQUIRED;
			$scope.errorMiText = Constants.ERROR_MESSAGES.MI_NAME_REQUIRED;
			$scope.errorLnameText = Constants.ERROR_MESSAGES.LAST_NAME_REQUIRED;
			  $scope.errorlendingInstituteText=Constants.ERROR_MESSAGES.LENDING_INST_REQUIRED;
     $scope.errordgApprovedText=Constants.ERROR_MESSAGES.DG_APPROVED_REQUIRED;
     $scope.errordgNumberText=Constants.ERROR_MESSAGES.DG_NUMBER_REQUIRED;
     $scope.errordgTrainerText=Constants.ERROR_MESSAGES.DG_TRAINER_REQUIRED;
	  $scope.errorstatusText=Constants.ERROR_MESSAGES.STATUS_REQUIRED;
      $scope.errorEmailsText=Constants.ERROR_MESSAGES.EMAILS_REQUIRED;
      $scope.errorEmailsValidText=Constants.ERROR_MESSAGES.EMAILVALID_REQUIRED;
      $scope.errorunderwriterPhoneText=Constants.ERROR_MESSAGES.UNDERWRTR_PHNE_REQUIRED;
      
      $scope.errorunderwriterPhoneValidText=Constants.ERROR_MESSAGES.UNDERWRTR_PHNE_VALID;
      
      
      
function validation(){

	   var statusCheck = false;
    $scope.errorlendingInstitute=false;
     $scope.errordgApproved=false;
     $scope.errordgNumber=false;
     $scope.errordgTrainer=false;
     $scope.errorFName=false;
     $scope.errorLName=false;
      $scope.errorMii=false;
      $scope.errorstatus=false;
      $scope.errorunderwriterPhoneVald=false;
          $scope.errorEmailsValid=false;
      $scope.errorunderwriterPhone=false;
   var namepatt = /^[a-z\s]{1,40}$/i;
   var phoneno = /^[1-9]{1}[0-9]{9}$/;
    if (vm.editDg.lendingInstitute != undefined && vm.editDg.lendingInstitute != null && vm.editDg.lendingInstitute != '') {
    	
    	 
    }else {
        statusCheck = true;
        $scope.errorlendingInstitute=true;
		
    } 

	
	if (vm.editDg.fname != undefined && vm.editDg.fname != null && vm.editDg.fname != '') {
    
    }else {
        statusCheck = true;
        $scope.errorFName=true;
    }
 	if (vm.editDg.lname != undefined && vm.editDg.lname != null && vm.editDg.lname != '') {
    
    }else {
        statusCheck = true;
        $scope.errorLName=true;
    }
	if (vm.editDg.mi != undefined && vm.editDg.mi != null && vm.editDg.mi !='' ) {
           if (namepatt.test(vm.editDg.mi)) {
        	    $scope.errorMii=false;
                }else {
                    statusCheck = true;
                  $scope.errorMii=true;
                }
        }
 	if (vm.editDg.dgApproved != undefined && vm.editDg.dgApproved != null && vm.editDg.dgApproved != '') {
    
    }else {
        statusCheck = true;
        $scope.errordgApproved=true;
    }
	
	
	
	if (vm.editDg.underwriterPhone != undefined && vm.editDg.underwriterPhone != null && vm.editDg.underwriterPhone != '') {
		 var phn_no = vm.editDg.underwriterPhone.toString();
		 var phn_no1 = vm.editDg.underwriterPhone;
		 
   if(phn_no.indexOf("-")!= -1 ){
 phn_no1 = phn_no1.split('-').join('');
 
  }
  if(phn_no.indexOf("(")!= -1 ){
 phn_no1 = phn_no1.split('(').join('');
  }
  if(phn_no.indexOf(")")!= -1 ){
 phn_no1 = phn_no1.split(')').join('');
  }
  if(phn_no.indexOf(" ")!= -1 ){
 phn_no1 = phn_no1.toString();
 phn_no1 = phn_no1.replace(/\s/g, "") ;
  }
 
		 if (phn_no1.match(phoneno)) {
    	 }else{
    		 statusCheck = true;
    	        $scope.errorunderwriterPhoneVald=true; 
    	 }
    }else {
        statusCheck = true;
        $scope.errorunderwriterPhone=true;
    }
	  var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    
	if (vm.editDg.underwriterEmail != undefined && vm.editDg.underwriterEmail != null && vm.editDg.underwriterEmail != '') {
    if( !pattern.test(vm.editDg.underwriterEmail) ) {
		statusCheck = true;
            
                } 

	}else {
        statusCheck = true;
        $scope.errorEmailsValid=true;
    } 
    if(statusCheck ){
    	return false;
    }else{
    	return true;
    }
   
}
   function saveBtn(){ 
   
  var checkSaveButton = validation();
  
 
  if (checkSaveButton) {
	   var underwriterPhoneOld = vm.editDg.underwriterPhone;
  var underwriterPhoneNew = vm.editDg.underwriterPhone;
  
   var data1 = underwriterPhoneNew.toString();
   
  if(data1.indexOf("-")!= -1 ){
 vm.editDg.underwriterPhone = vm.editDg.underwriterPhone.split('-').join('');
 vm.editDg.tinMasking = vm.editDg.tinMasking.split('-').join('');
  }
  if(data1.indexOf("(")!= -1 ){
 vm.editDg.underwriterPhone = vm.editDg.underwriterPhone.split('(').join('');
  }
  if(data1.indexOf(")")!= -1 ){
 vm.editDg.underwriterPhone = vm.editDg.underwriterPhone.split(')').join('');
  }
  if(data1.indexOf(" ")!= -1 ){
 vm.editDg.underwriterPhone = vm.editDg.underwriterPhone.toString();
 vm.editDg.underwriterPhone = vm.editDg.underwriterPhone.replace(/\s/g, "") ;
  }
 
 vm.editDg.underwriterPhone = Number(vm.editDg.underwriterPhone);
vm.editDg.status = 'ACTV';

if(vm.editDg.mi == undefined){
	vm.editDg.mi ='';
}

if(vm.editDg.dgTrainer == undefined){
	vm.editDg.dgTrainer='N';
}
 var dgApprovedOld = vm.editDg.dgApproved;
 
 	var dgApproved = new Date(vm.editDg.dgApproved);

	vm.editDg.dgApproved = dgApproved.getTime();
   vm.JsonData = 
   {
		      "status": null,
		      "errorCode": null,
		      "errorMessage": null,
		      "userName": null,
		      "lndrId": 0,
		      "taxIndentificationNumber":vm.editDg.tinMasking,
		      "lenderName": vm.editDg.lendingInstitute,
		      "underWriterId": 0,
		      "dgApprovedDate": vm.editDg.dgApproved,
		      "dgUnderWriterFirstName": vm.editDg.fname,
		      "dgUnderWriterMiddleName": vm.editDg.mi,
		      "dgUnderWriterLastName": vm.editDg.lname,
		      "dgUnderWriterNUmber": vm.editDg.dgNumber,
		      "dgTrainerNumber": vm.editDg.dgTrainer,
		      "dgUnderWriterStatus": vm.editDg.status,
		      "personId": 0,
		      "workPhoneNumber": vm.editDg.underwriterPhone,
		      "personEmail": vm.editDg.underwriterEmail,
		       "prsnTypeCd": "U    "
		    }
	
	  $http({
			"method": "POST",
					    url: 'admin/getDGUnderWriters/update',
					    "headers": {"Content-Type": "application/json", "Accept": "application/json"},
					    "data": vm.JsonData
									}).success(function (response) {
						
						vm.editDg.dgApproved = dgApprovedOld;
						vm.editDg.underwriterPhone = underwriterPhoneOld;
						if(response.status == "SUCCESS"){
						
						
						vm.allLendingInstitute = vm.editDg.lendingInstitute;
	
						getAllLendingInstitutionsNamesOnly(vm.editDg.lendingInstitute);
						if(response.errorMessage.indexOf('Do you still want to proceed?')!== -1){
							vm.messages=response.errorMessage;
							vm.editBtn =false;
							$('#alertBox1').modal('show');
							
						
						}else if(response.errorMessage.indexOf('DG Underwriter already exists for this lending')!== -1){
							FlashService.error(response.errorMessage);	
							vm.editDg='';
							
						}else{
							FlashService.success(response.errorMessage);	
							vm.editDg='';
							
						}
						
						
										
						}else{
							FlashService.error(response.errorMessage);
							
						}
						}).error(function () {
							
						FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
		});
   }
   }
   vm.editDg.dgTrainer= "N";
  
   function getAllStates() {
	  vm.allLendingInstitute='';
	  
	   $http({
	   				method: 'GET',
	   				url: 'admin/getDGUnderWriters',
	   				headers: {"Content-Type": "application/json", "Accept": "application/json"}
	   			}).success(function (response) {
	   				
	   				
	   				if(response.status == "SUCCESS"){
	   					vm.getAllDgDetails =response.dgunderWriterPojos;
						   for(var i=0;i<vm.getAllDgDetails.length;i++){
					  
					  if(vm.getAllDgDetails[i].dgApprovedDate !== null ){
						  vm.getAllDgDetails[i].dgApprovedDate = new Date(vm.getAllDgDetails[i].dgApprovedDate);
						  var dd = vm.getAllDgDetails[i].dgApprovedDate.getDate();
						  var mm = vm.getAllDgDetails[i].dgApprovedDate.getMonth()+1; //January is 0! 
	
						  var yyyy = vm.getAllDgDetails[i].dgApprovedDate.getFullYear();
						  vm.getAllDgDetails[i].dgApprovedDate = mm+'/'+dd+'/'+yyyy;
					  }else{
						  vm.getAllDgDetails[i].dgApprovedDate = '';
					  }
					
					  if(vm.getAllDgDetails[i].createdDate !== null ){
						  
						  vm.getAllDgDetails[i].createdDate = new Date(vm.getAllDgDetails[i].createdDate);
						  var date1 = vm.getAllDgDetails[i].createdDate.getDate();
						  var month = vm.getAllDgDetails[i].createdDate.getMonth()+1; //January is 0! 
	
						  var year = vm.getAllDgDetails[i].createdDate.getFullYear();
						  vm.getAllDgDetails[i].createdDate = month+'/'+date1+'/'+year;
					  }else{
						  vm.getAllDgDetails[i].createdDate = '';
					  }

					  vm.getAllDgDetails[i].taxIndentificationNumber = $scope.taxFormatter(vm.getAllDgDetails[i].taxIndentificationNumber);
					  vm.getAllDgDetails[i].workPhoneNumber = $scope.telFormatter(vm.getAllDgDetails[i].workPhoneNumber);
					  
						  }
	   					vm.originalData = angular.copy(vm.getAllDgDetails);
	   				}else{
	   					FlashService.error(response.errorMessage);
	   					
	   				}
	   				}).error(function () {
	   					
	   				FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
	   			});

	   	  }
	   	   function getAllLendingInstitutionsNamesOnly(lendingInstitution) {
	  
	   $http({
	   				method: 'GET',
	   				url: 'admin/getDGUnderWriters/'+ lendingInstitution,
	   				headers: {"Content-Type": "application/json", "Accept": "application/json"}
	   			}).success(function (response) {
	   				
	   				
	   				if(response.status == "SUCCESS"){
						
	   					vm.getAllDgDetails =response.dgunderWriterPojos;
						  for(var i=0;i<vm.getAllDgDetails.length;i++){
					  
					  if(vm.getAllDgDetails[i].dgApprovedDate !== null ){
						  vm.getAllDgDetails[i].dgApprovedDate = new Date(vm.getAllDgDetails[i].dgApprovedDate);
						  var dd = vm.getAllDgDetails[i].dgApprovedDate.getDate();
						  var mm = vm.getAllDgDetails[i].dgApprovedDate.getMonth()+1; //January is 0! 
	
						  var yyyy = vm.getAllDgDetails[i].dgApprovedDate.getFullYear();
						  vm.getAllDgDetails[i].dgApprovedDate = mm+'/'+dd+'/'+yyyy;
					  }else{
						  vm.getAllDgDetails[i].dgApprovedDate = '';
					  }
					 
					  if(vm.getAllDgDetails[i].createdDate !== null ){
						  
						  vm.getAllDgDetails[i].createdDate = new Date(vm.getAllDgDetails[i].createdDate);
						  var dd1 = vm.getAllDgDetails[i].createdDate.getDate();
						  var mm1 = vm.getAllDgDetails[i].createdDate.getMonth()+1; //January is 0! 
	
						  var yyyy1 = vm.getAllDgDetails[i].createdDate.getFullYear();
						  vm.getAllDgDetails[i].createdDate = mm1+'/'+dd1+'/'+yyyy1;
					  }else{
						  vm.getAllDgDetails[i].createdDate = '';
					  }
					  vm.getAllDgDetails[i].taxIndentificationNumber = $scope.taxFormatter(vm.getAllDgDetails[i].taxIndentificationNumber);
					  vm.getAllDgDetails[i].workPhoneNumber = $scope.telFormatter(vm.getAllDgDetails[i].workPhoneNumber);
					  
						  }
	   					vm.originalData = angular.copy(vm.getAllDgDetails);
	   				}else{
	   					FlashService.error(response.errorMessage);
	   					
	   				}
	   				}).error(function () {
	   					
	   				FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
	   			});

	   	  }
	   	  
	   	  $scope.taxFormatter = function(taxNbr){
		taxNbr = taxNbr + '';
		var formatted = taxNbr;
		if(taxNbr.length > 2)
			formatted = taxNbr.slice(0,2) + '-' + taxNbr.slice(2);
		return formatted;
	}
	
	$scope.telFormatter = function(tel){
		if(!tel) return '';
		
		tel = tel.trim();
		var formatted = tel, city;
		if(tel.length > 3){
			city = tel.slice(0,3);
			var remain = tel.slice(3);
			if(remain.length > 3)
				remain = remain.slice(0,3) + '-' + remain.slice(3, 7);
			formatted = '(' + city + ') ' + remain;
		}
		return formatted;
	}
	
	
	  
	   /*** lending institute dropdown values**/	  
  
	   $http({
	   				method: 'GET',
	   				url: 'admin/getAllLendingInstitutions',
	   				headers: {"Content-Type": "application/json", "Accept": "application/json"}
	   			}).success(function (response) {
	   				
	   				
	   				if(response.status == "SUCCESS"){
	   					vm.getAllLendingInstitutions =response.lendingInstitutionsPojo;
	   					
	   				}else{
	   					FlashService.error(response.errorMessage);
	   					
	   				}
	   				}).error(function () {
	   					
	   				FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
	   			});

	   	  
	   	  
	   	   $scope.getTin = function(ln){
  
  var i;
  vm.editDg.tinMasking='';
  for(i=0;i<vm.getAllLendingInstitutions.length;i++){
  
  if(vm.getAllLendingInstitutions[i].lendingInstitution == ln){
     
   vm.editDg.tinMasking = $scope.taxFormatter(vm.getAllLendingInstitutions[i].taxIdentificationNumber);
   

    
  }
  }
   
 }
 var fullDetails;
function editIndividual(addressId) {


 
  var emailpattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);


 
  if(addressId.dgUnderWriterFirstName != undefined &&  addressId.dgUnderWriterFirstName!='' && addressId.dgUnderWriterFirstName!=="null"){
  if(addressId.dgUnderWriterLastName != undefined &&  addressId.dgUnderWriterLastName!='' && addressId.dgUnderWriterLastName!=="null"){
  if(addressId.workPhoneNumber != undefined &&  addressId.workPhoneNumber!='' && addressId.workPhoneNumber!=="null"){
  if(addressId.personEmail != undefined &&  addressId.personEmail!='' && addressId.personEmail!=="null"){
    if (emailpattern.test(addressId.personEmail)){
  delete addressId.enableInputFiled;
  addressId = angular.toJson(addressId);
	
				addressId = JSON.parse(addressId);
				
				addressId.createdDate = null ;
				addressId.dgUnderWriterNUmber = null ;
			addressId.dgUnderWriterStatus = 'ACTV';
  
  var underwriterPhoneNew1 = addressId.workPhoneNumber;
  
   var data11 = underwriterPhoneNew1.toString();
   
   addressId.taxIndentificationNumber = addressId.taxIndentificationNumber.split('-').join('');
  if(data11.indexOf("-")!= -1 ){
 addressId.workPhoneNumber = addressId.workPhoneNumber.split('-').join('');
 
  }
  if(addressId.dgTrainerNumber == undefined || addressId.dgTrainerNumber == null){
	addressId.dgTrainerNumber='N';
}
  if(data11.indexOf("(")!= -1 ){
 addressId.workPhoneNumber = addressId.workPhoneNumber.split('(').join('');
  }
  if(data11.indexOf(")")!= -1 ){
addressId.workPhoneNumber = addressId.workPhoneNumber.split(')').join('');
  }
  if(data11.indexOf(" ")!= -1 ){
 addressId.workPhoneNumber = addressId.workPhoneNumber.toString();
  addressId.workPhoneNumber = addressId.workPhoneNumber.replace(/\s/g, "") ;
  }
 
 addressId.workPhoneNumber = Number(addressId.workPhoneNumber);

 
 
 	var dgApprovedDate = new Date(addressId.dgApprovedDate);

	addressId.dgApprovedDate = dgApprovedDate.getTime();

	   $http({
	"method": "POST",
			    url: 'admin/getDGUnderWriters/update',
			    "headers": {"Content-Type": "application/json", "Accept": "application/json"},
			    "data": addressId
							}).success(function (response) {
				
				
				if(response.status == "SUCCESS"){
					if(response.errorMessage.indexOf('Do you still want to proceed?')!== -1){
							vm.messages=response.errorMessage;
							vm.editBtn=true;
							$('#alertBox1').modal('show');
							 fullDetails = addressId;
							 
							
						
						}else if(response.errorMessage.indexOf('DG Underwriter already exists for this lending')!== -1){
							FlashService.error(response.errorMessage);	
							vm.editDg='';
							
						}else{
							FlashService.success(response.errorMessage);	
							vm.editDg='';
							
						}
					
				getAllLendingInstitutionsNamesOnly(addressId.lenderName);
					
								
				}else{
					FlashService.error(response.errorMessage);
					
				}
				}).error(function () {
					
				FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
});
 }else{
	  FlashService.error('Enter Valid Underwriter Email');
	  
  }
  }else{
	  FlashService.error('Underwriter Email is required');
	  
  }
  }else{
	  
	   FlashService.error('Phone number is required');
  }
  }else{
	 
	  FlashService.error(' Last Name is required');
  }
   }else{
	 
	  FlashService.error('First Name is required.');
  }
  
  
			

	  }
	  
	   function submitCancelBtnOLGAdmin1() {
	
		 $http({
	"method": "POST",
			    url: 'admin/getDGUnderWriters/updateDuplicateAssociatedDGUnderWriters',
			    "headers": {"Content-Type": "application/json", "Accept": "application/json"},
			       "data": fullDetails
							}).success(function (response) {
			
					
				if(response.status == "SUCCESS"){
					$('#alertBox1').modal('hide');
					if(response.errorMessage.indexOf('already')!== -1){
						
							FlashService.error(response.errorMessage);
						
						}else{
							FlashService.success(response.errorMessage);	
							
						}
						getAllLendingInstitutionsNamesOnly(fullDetails.lenderName);
						
				
								
				}else{
					FlashService.error(response.errorMessage);
					
				}
				}).error(function () {
					
				FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
});					
      }

 function submitCancelBtnOLGAdmin() {
	
		 $http({
	"method": "POST",
			    url: 'admin/getDGUnderWriters/updateDuplicateAssociatedDGUnderWriters',
			    "headers": {"Content-Type": "application/json", "Accept": "application/json"},
			       "data": vm.JsonData
							}).success(function (response) {
			
					
				if(response.status == "SUCCESS"){
					$('#alertBox1').modal('hide');
					if(response.errorMessage.indexOf('already')!== -1){
						
							FlashService.error(response.errorMessage);
						
						}else{
							FlashService.success(response.errorMessage);	
							
						}
						getAllLendingInstitutionsNamesOnly(vm.editDg.lendingInstitute);
						 vm.editDg='';
				
								
				}else{
					FlashService.error(response.errorMessage);
					
				}
				}).error(function () {
					
				FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
});					
      }


 
 
    });
	
	  
		
		
		