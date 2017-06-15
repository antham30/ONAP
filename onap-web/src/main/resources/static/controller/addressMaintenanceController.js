 
		
	angular.module('app').controller('addressMaintenanceController', function ($scope, $http, $window, $rootScope, $filter, LoggingService, Calculator,CommonFormService, Constants, FlashService,$timeout) {		

	    var vm = this;
            vm.saveBtn=saveBtn;
            vm.validation=validation;
			vm.editAllData =editAllData;
			vm.searchBtn=searchBtn;
			vm.reset =reset;
vm.editIndividual = editIndividual;

document.getElementById("addBtn").disabled = true; 
vm.originalData ={}
vm.getLenderDetails={}
//vm.originalData = angular.copy(vm.getAllMortageDetails);
        // hoisted functions in the view model ($scope)
        vm.validateCaseId = validateCaseId;
        //vm.propertyValidation = propertyValidation;
        
        $timeout(function(){
        	var caseIdInput = angular.element("#tin");
        	caseIdInput.focus();
        	caseIdInput.attr("autofocus", true);
        });

        // use mask to format caseId
        $('#tin').mask('00-0000000'); 
 
        var caseIdRegex = /^[0-9]{2}\-[0-9]{7}$/;
	$scope.taxFormatter = function(taxNbr){
		taxNbr = taxNbr + '';
		var formatted = taxNbr;
		if(taxNbr.length > 2)
			formatted = taxNbr.slice(0,2) + '-' + taxNbr.slice(2);
		return formatted;
	}
       
        function searchLoans() {
            if (!validateCaseId($scope.searchloanId)) {
            	FlashService.error('Please enter a Case number in the following format: [##-#######].');
            	
            	return;
            }
            var caseId = $scope.searchloanId; // bind to the searchbox's value.
           
	       // The search service will return a promise, so use the .then() function to invoke searchLoanComplete.	
		   
		  
    	vm.isOLG = knownUsers.olg.indexOf($rootScope.userName) !== -1;

		
}
        
        function validateCaseId(caseId) {
        	return caseIdRegex.test(caseId);
        }
        function editAllData(id) {
		 // 
		  id.enableInputFiled =true;
		//  id.state="ME";
		$scope.getStatePrefix();

	  } 
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
	$scope.getStatePrefix();
	vm.errorStateText = Constants.ERROR_MESSAGES.STATE_REQUIRED;
		vm.errorZipText = Constants.ERROR_MESSAGES.ZIP_CODE_INVALID;
		vm.errorZipCODEMessageText = Constants.ERROR_MESSAGES.ZIP_CODE_LENGTH_ERROR;
		vm.errorCityText = Constants.ERROR_MESSAGES.CITY_REQUIRED;
		vm.errorCityValidText = Constants.ERROR_MESSAGES.CITY_VALIDATION;
		vm.errorAddressOneText = Constants.ERROR_MESSAGES.ADDRESS_REQUIRED;
	
       function validation(){
		   
		        var pincodePattern = /^\d{5}$/;
		                    var namepatt = /^[a-z\s]{1,40}$/i;
							var statusProperty =false;
		        vm.errorState=false;
		        vm.errorZip=false;
		        vm.errorZipCODEMessage=false;
		        vm.errorCity=false;
		        vm.errorCityValid=false;
		        vm.errorAddressOne=false;
		        if (vm.getLenderDetails.streetName != undefined && vm.getLenderDetails.streetName != null && vm.getLenderDetails.streetName != '') {
				
		        }else {
					vm.errorAddressOne = true;
					statusProperty =true;
				 }
		        
				

		        if (vm.getLenderDetails.cityName != undefined && vm.getLenderDetails.cityName != null && vm.getLenderDetails.cityName != '') {
					
		        	if(namepatt.test(vm.getLenderDetails.cityName)){
						
					}else{
						statusProperty = true;
		            vm.errorCityValid=true;
					}
		        }else {
		            statusProperty = true;
		            vm.errorCity=true;
		        }

		        if (vm.getLenderDetails.state != undefined && vm.getLenderDetails.state != null && vm.getLenderDetails.state != '') {
		        	vm.errorState=false;
		        }else {
		            statusProperty = true;
		            vm.errorState=true;
		        }

		     
		        if (vm.getLenderDetails.zip != undefined && vm.getLenderDetails.zip != null && vm.getLenderDetails.zip != '') {
		        	vm.pinrequired=true;
		        	if (pincodePattern.test(vm.getLenderDetails.zip)) {
		        		if(vm.getLenderDetails.zip != '00000'){
                  
                    vm.pincodecheck=true;
		              
		        		}else{
		        			 statusProperty = true;
		        			  vm.errorZip=true;	
							   //vm.errorZipCODEMessage=false;
		        		}
		            }else{
		            
		                statusProperty = true;
		              vm.errorZipCODEMessage=true;
		            }
		        }else {
		        	
		            statusProperty = true;
		            vm.errorZipCODEMessage=true;
		        }
						 
if(statusProperty){
	return false;
 
}else{
	return true;
	
				 }
		       
				}
 $scope.reverse = function(array) {
            var copy = [].concat(array);
            return copy.reverse();
        }
//vm.propertyValidation();
        // This controller function is not exemplar.  Follow Loan Search's patterns.
     function reset(mortgageId) {
	var originial = getMortagageLimitById(vm.originalData, mortgageId);
	//var originial = {};
	// originial = vm.originalData;
	console.log("orginal"+JSON.stringify(originial));
	mortgageId.streetName = originial.streetName;
	mortgageId.cityName = originial.cityName;
	mortgageId.state = originial.state;
	mortgageId.zip = originial.zip;
	mortgageId.enableInputFiled = false;
	
}  
function getMortagageLimitById(recs, mortId){
	 var localSubsidyRec = null;
 	for(var i = 0; i < recs.length; i++){
         if(recs[i].id === mortId.id) {
         	localSubsidyRec = recs[i];
             break;
         }
     }
 	return localSubsidyRec;
 }

	function saveBtn(){ 
   
  var checkSaveButton = validation();
  if(checkSaveButton){

	  //console.log("vm.getLenderDetails"+JSON.stringify(vm.getLenderDetails));
 $http({
			"method": "POST",
					    url: 'admin/lenderAddress/update',
					    "headers": {"Content-Type": "application/json", "Accept": "application/json"},
					    "data": vm.getLenderDetails
									}).success(function (response) {
						
						//console.log("sucess"+JSON.stringify(response));
						if(response.status == "SUCCESS"){
FlashService.success(Constants.SUCCESS_MESSAGES.SAVED_SUCCESSFULLY);

searchBtn(vm.getLenderDetails.taxIdNumber);
vm.getLenderDetails.streetName='';
vm.getLenderDetails.cityName='';
vm.getLenderDetails.state='';
vm.getLenderDetails.zip='';
						}else{
							FlashService.error(response.errorMessage);
							
						}
						}).error(function () {
							
						FlashService.error('Error while retreiving');
		});
	 // vm.add={}
  }
 
  
	}
	
	function searchBtn(tin){ 
		
		   if(tin!= undefined && tin!=null && tin!=''){
		   tin = tin.split('-').join('');
		   //   console.log("tin::"+tin);
		  $http({
 				method: 'GET',
 				url: 'admin/lenderAddress/tin/'+tin,
 				headers: {"Content-Type": "application/json", "Accept": "application/json"}
 			}).success(function (response) {
 			//	console.log("response::"+JSON.stringify(response));
 				
 				if(response.status == "SUCCESS"){
		
if(response.lenderAddresses!=null){

vm.tableLenderDetails = response.lenderAddresses;


vm.originalData = angular.copy(vm.tableLenderDetails);
for(var i=0; i<response.lenderAddresses.length;i++){
vm.tableLenderDetails[i].taxIdNumber = $scope.taxFormatter(vm.tableLenderDetails[i].taxIdNumber);
}
 vm.getLenderDetails.taxIdNumber= response.lenderAddresses[0].taxIdNumber;
 vm.getLenderDetails.lenderName= response.lenderAddresses[0].lenderName;
 vm.getLenderDetails.addrId= null;
 vm.getLenderDetails.lndrId= response.lenderAddresses[0].lndrId;
document.getElementById("addBtn").disabled = false; 


}else{
   					FlashService.error('TIN # not found.');
   					
   				}
 				}else{
   					FlashService.error(response.errorMessage);
   					
   				}
   				}).error(function () {
   					
   				FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
   			});
		   }else{
FlashService.error('Please enter a Tin Number in the following format: [##-#######].');
}
			}

function editIndividual(addressId) {

var datadd = addressId.taxIdNumber.toString();
 var namepatt = /^[a-z\s]{1,40}$/i;
   var pincodePattern = /^\d{5}$/;


  if(addressId.streetName != undefined &&  addressId.streetName!='' && addressId.streetName!=="null"){
  if(addressId.cityName != undefined &&  addressId.cityName!='' && addressId.cityName!=="null"){
	  if(namepatt.test(addressId.cityName)){
						
  if(addressId.state != undefined &&  addressId.state!='' && addressId.state!=="null"){
  if(addressId.zip != undefined &&  addressId.zip!='' && addressId.zip!=="null"){
    if (pincodePattern.test(addressId.zip)){
  delete addressId.enableInputFiled;
  addressId = angular.toJson(addressId);
	
				addressId = JSON.parse(addressId);
if(datadd.indexOf("-")!= -1)
	addressId.taxIdNumber =  addressId.taxIdNumber.split('-').join('');


	  $http({
	"method": "POST",
			    url: 'admin/lenderAddress/update',
			    "headers": {"Content-Type": "application/json", "Accept": "application/json"},
			    "data": addressId
							}).success(function (response) {
				
				
				if(response.status == "SUCCESS"){
					
				FlashService.success(Constants.SUCCESS_MESSAGES.UPDATED_SUCCESSFULLY);
			addressId.taxIdNumber = datadd;
			//alert("ghg"+datadd);
				
								
				}else{
					FlashService.error(response.errorMessage);
					
				}
				}).error(function () {
					
				FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
});
 }else{
	  FlashService.error('Enter Valid Zipcode (Max. 5 Numbers Only)');
	  
  }
  }else{
	  FlashService.error('ZIP is required');
	  
  }
  }else{
	  
	   FlashService.error('State is required');
  }
  }else{
	 
	  FlashService.error('City must contain only Alphabets');
  }
  }else{
	 
	  FlashService.error('City is required');
  }
  }else{
	  
FlashService.error('Street Address is required');
	  
  }
  
			

	  }
   });
	  
		
		
		