 
angular.module('app')
.controller("cohortController", function ($scope, $http, $window, $rootScope, LoggingService, CasesService,Excel,$timeout,Constants,FlashService) {
	 /** export to excel**/
	  $scope.exportData = function () {
	       // var blob = new Blob([document.getElementById('exportable').innerHTML], {
	        var blob = new Blob([$("#exportable").html()], {
	            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
	        });
			
		   saveAs(blob, "cohort_reports.xls");
		 
			
	        
	    };
	 /** export to excel**/

$(".displayContent").hide();
$('#strtDateOne').datepicker({
	  maxPicks: 1,
		changeMonth : true,
    changeYear : true,
    yearRange: '-100y:c+nn',
     
    dateFormat: "mm/dd/yy"
 
});



var date= new Date();

$('#strtDattwo').datepicker({
	  maxPicks: 1,
		changeMonth : true,
  changeYear : true,
  yearRange: '-100y:c+nn',
   maxDate: date,
  dateFormat: "mm/dd/yy"

});



$scope.errorStrtDateReqText = Constants.ERROR_MESSAGES.START_DATE_REQUIRED;
$scope.errorStrtLtEndText = Constants.ERROR_MESSAGES.START_LT_END_REQUIRED;
$scope.errorEndGtStrtText = Constants.ERROR_MESSAGES.END_GT_START_REQUIRED;
$scope.errorEndDateReqText = Constants.ERROR_MESSAGES.END_DATE_REQUIRED;

$scope.validation = function () {
  
     var statusCohort = false;
    $scope.errorStrtDate =false;
    $scope.errorendDate =false;
    $scope.enddateError =false;
    $scope.strtdateError =false;
  var myDate = new Date($scope.cohort.sdob);
  var strtDate = myDate.getTime();
   var myDate1 = new Date($scope.cohort.edob);
  var endDate = myDate1.getTime();
    if ($scope.cohort.sdob != undefined && $scope.cohort.sdob != null && $scope.cohort.sdob != '') {
    
    }else {
        statusCohort = true;
        $scope.errorendDate=true;
    }
 if ( endDate >= strtDate ) {
    
    }else {
        statusCohort = true;
		
		$(".displayContent").hide();
        $scope.enddateError=true;
    }
	if (strtDate <= endDate ) {
    
    }else {
        statusCohort = true;
        $scope.strtdateError=true;
    }

    if ($scope.cohort.edob != undefined && $scope.cohort.edob != '' && $scope.cohort.edob != null) {
    
    }else {
   
        statusCohort = true;
        $scope.errorStrtDate=true;
    }
	
	
	
    if(statusCohort){
    	return false;
    }else{
    	return true;
    }
   
  } 

  
$scope.saveCohort = function(){
	
	 var checkSaveButton = $scope.validation();
	
	
  
  if (checkSaveButton) {
	 
	$scope.copySd = $scope.cohort.sdob;
	$scope.copyEd = $scope.cohort.edob;
		
	var edate = new Date($scope.cohort.edob);
	var sdate = new Date($scope.cohort.sdob);

	$scope.cohort.edob = edate.getTime();
	$scope.cohort.sdob = sdate.getTime();
	
	
	$http({
        method: 'GET',
         url: 'getCohortReport/'+$scope.cohort.sdob+'/'+$scope.cohort.edob,
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }).success(function (response) {
		$scope.cohort.sdob =$scope.copySd ;
		$scope.cohort.edob = $scope.copyEd ;
    
    if(response.status == "SUCCESS"){
        $scope.cohortdata=response.cohortReport;
		
		
		var status=0;
		for(var i=0; i<response.cohortReport.length; i++){
			status++;
			
		 if($scope.cohortdata[i].lgFeeDate !== null ){
			  $scope.cohortdata[i].lgFeeDate = new Date($scope.cohortdata[i].lgFeeDate);
			  var dd = $scope.cohortdata[i].lgFeeDate.getDate();
			  var mm = $scope.cohortdata[i].lgFeeDate.getMonth()+1; //January is 0! 

			  var yyyy = $scope.cohortdata[i].lgFeeDate.getFullYear();
			  $scope.cohortdata[i].lgFeeDate = mm+'/'+dd+'/'+yyyy;
		  }
		 $scope.cohortdata[i].issuedAmount = Number($scope.cohortdata[i].issuedAmount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		 
		 $scope.cohortdata[i].lgCertFunds = Number($scope.cohortdata[i].lgCertFunds).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		
				 $scope.cohortdata[i].lgFeePaid = Number($scope.cohortdata[i].lgFeePaid).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				
			
				$scope.cohortdata[i].firmFunds = Number($scope.cohortdata[i].firmFunds).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				$scope.cohortdata[i].cancelFunds = Number($scope.cohortdata[i].cancelFunds).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				if($scope.cohortdata[i].cohortModYear != null){
					
					$scope.cohortdata[i].subMod  = $scope.cohortdata[i].cohortModYear ;
				}
			
			if(status == response.cohortReport.length){
				$scope.seconde =$scope.cohortdata;
				
			}

		}
 
$(".displayContent").show();
	    //
	    	} else{
	    		FlashService.error(response.errorMessage);
				$(".displayContent").hide();
	    	}
    }).error(function () {
      
    });
	 }else{$(".displayContent").hide();}
	 
}

    });
	angular.module('app').factory('Excel',function($window){
        var uri='data:application/vnd.ms-excel;base64,',
            template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
            format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
        return {
            tableToExcel:function(tableId,worksheetName){
                var table=$(tableId),
                    ctx={worksheet:worksheetName,table:table.html()},
                    href=uri+base64(format(template,ctx));
                return href;
            }
        };
    })