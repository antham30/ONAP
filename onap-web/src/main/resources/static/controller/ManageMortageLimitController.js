angular.module('app').controller('ManageMortageLimitsController', function ($scope, $http, $window, $rootScope, $filter, LoggingService, Calculator, Constants, FlashService) {
	 var vm = this;
	
	 vm.getAllStates = getAllStates;
	 vm.submit = submit;
	 vm.reset = reset;
	 vm.editAllData = editAllData;
	 vm.getOnlyStatesNames = getOnlyStatesNames;
	 vm.getAllStatesNamesOnly = getAllStatesNamesOnly;
	 vm.originalData = {};
	 /** export to excel**/
	  $scope.exportData = function () {
	       // 
	        var blob = new Blob([$("#exportable").html()], {
	            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
	        });
			if(vm.onlyStateNames == ''){
		   saveAs(blob, "All_county_limits.xls");
		 
			} else{
		var downladName = vm.onlyStateNames + "_county_limits.xls";
				saveAs(blob, downladName); 
			}
	        
	    };
	 /** export to excel**/
	  function editAllData(id) {
		 // 
		  id.enableInputFiled =true;
	  }
	  function getAllStates() {
vm.onlyStateNames='';
$http({
				method: 'GET',
				url: 'getAllMortagageLimit',
				headers: {"Content-Type": "application/json", "Accept": "application/json"}
			}).success(function (response) {
				
				
				if(response.status == "SUCCESS"){
					vm.getAllMortageDetails =response.maxMortgLmtsPojo;
					vm.enableInputFiled =false;
					vm.originalData = angular.copy(vm.getAllMortageDetails);
				}else{
					FlashService.error(response.errorMessage);
					
				}
				}).error(function () {
					
				FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
			});

	  }
	  
	  
	  
	  
	  
	  getAllStates(); 
	 
function reset(mortgageId) {
	var originial = getMortagageLimitById(vm.originalData, mortgageId.id);
	
	mortgageId.unit1 = originial.unit1;
	mortgageId.unit2 = originial.unit2;
	mortgageId.unit3 = originial.unit3;
	mortgageId.unit4 = originial.unit4;
	mortgageId.enableInputFiled = false;
	
}
function submit(mortgageId) {

var data = mortgageId.unit1.toString();
var data1 = mortgageId.unit2.toString();
var data2 = mortgageId.unit3.toString();
var data3 = mortgageId.unit4.toString();
var statusCheck= false;

if(data.indexOf(",")!= -1)
	mortgageId.unit1 =  mortgageId.unit1.split(',').join('');
if(data1.indexOf(",") != -1)
	mortgageId.unit2 =  mortgageId.unit2.split(',').join('');
if(data2.indexOf(",")!= -1)
	mortgageId.unit3 =  mortgageId.unit3.split(',').join('');
if(data3.indexOf(",")!= -1)
	mortgageId.unit4 =  mortgageId.unit4.split(',').join('');

  if(data != undefined &&  data!='' && data!=="0" && data!=='0.00'){
  if(data1 != undefined &&  data1!='' && data1!=="0" && data1!=='0.00'){
  if(data2 != undefined && data2!='' && data2!=="0" && data2!=='0.00'){
  if(data3 != undefined &&  data3!='' && data3!=="0" && data3!=='0.00'){
	  
  delete mortgageId.enableInputFiled;
  mortgageId = angular.toJson(mortgageId);
	
				mortgageId = JSON.parse(mortgageId);
	  $http({
	"method": "POST",
			    url: 'getAllMortagageLimit/updateMortagageLimit',
			    "headers": {"Content-Type": "application/json", "Accept": "application/json"},
			    "data": mortgageId
							}).success(function (response) {
				
				
				if(response.status == "SUCCESS"){
					
				FlashService.success(Constants.SUCCESS_MESSAGES.UPDATED_SUCCESSFULLY);
								
				}else{
					FlashService.error(response.errorMessage);
					
				}
				}).error(function () {
					
				FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
});
  }else{
	  FlashService.error(Constants.ERROR_MESSAGES.QUADPLEX_REQUIRED);
	  
  }
  }else{
	  FlashService.error(Constants.ERROR_MESSAGES.TRIPLEX_REQUIRED);
	  
  }
  }else{
	  FlashService.error(Constants.ERROR_MESSAGES.DUPLEX_REQUIRED);
	  
  }
  }else{
	  FlashService.error(Constants.ERROR_MESSAGES.SINGLE_REQUIRED);
	  
  }
  
			

	  }
 function getAllStatesNamesOnly() {

$http({
				method: 'GET',
				url: 'case/referenceCodes/STATE',
				headers: {"Content-Type": "application/json", "Accept": "application/json"}
			}).success(function (response) {
				
				
				if(response){
					vm.stateNames =response;
					
				}
				}).error(function () {
					
				FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
			});

	  }
 
 function getMortagageLimitById(recs, mortId){
	 var localSubsidyRec = null;
 	for(var i = 0; i < recs.length; i++){
         if(recs[i].id.stCd === mortId.stCd && recs[i].id.cntyNm === mortId.cntyNm) {
         	localSubsidyRec = recs[i];
             break;
         }
     }
 	return localSubsidyRec;
 }
	   $scope.myValueFunction = function(mortageLimit) {
        return mortageLimit.id.stCd;
    }
 getAllStatesNamesOnly(); 
	   function getOnlyStatesNames() {
		   
$http({
				method: 'GET',
				url: 'getAllMortagageLimit/'+vm.onlyStateNames,
				headers: {"Content-Type": "application/json", "Accept": "application/json"}
			}).success(function (response) {
				
				
				if(response.status == "SUCCESS"){
					vm.getAllMortageDetails =response.maxMortgLmtsPojo;
					
				}
				}).error(function () {
					
				FlashService.error(Constants.ERROR_MESSAGES.MORTAGE_RETRIEVAL_ERROR);
			});

	  }
	  	});
		
		
		
		