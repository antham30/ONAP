
angular.module('app')
.controller("dailyController", function ($scope, $http, $window, $rootScope, LoggingService, CasesService,Excel,$timeout,Constants,FlashService) {

	 /** export to excel**/
	  $scope.exportData = function () {
	       // var blob = new Blob([document.getElementById('exportable').innerHTML], {
	        var blob = new Blob([$("#exportable").html()], {
	            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
	        });
			
		   saveAs(blob, "daily_arc_reports.xls");
		 
			
	        
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
$scope.errorStrtDateReqText = Constants.ERROR_MESSAGES.START_DATE_REQUIRED;
$scope.errorStrtLtEndText = Constants.ERROR_MESSAGES.START_LT_END_REQUIRED;
$scope.errorEndGtStrtText = Constants.ERROR_MESSAGES.MINIMUM_END_DATE_REQUIRED;
$scope.errorEndDateReqText = Constants.ERROR_MESSAGES.END_DATE_REQUIRED;



var date= new Date();

$('#strtDattwo').datepicker({
	  maxPicks: 1,
		changeMonth : true,
  changeYear : true,
  yearRange: '-100y:c+nn',
   maxDate: date,
  dateFormat: "mm/dd/yy"

});

var today = new Date();

var yesterDay = new Date();
yesterDay.setDate(yesterDay.getDate()-1);


function dateConvert(d){
  
  var day;
  var month;
  if(d.getDate()<=9){
    day="0"+d.getDate();
  }else{
    day = d.getDate();
  }
  if(d.getMonth()<=9){
    month="0"+(d.getMonth()+1);
  }else{
    month=(d.getMonth()+1);
  }
  return month+"/"+day+"/"+d.getFullYear();
}


$scope.cohort={
	sdob: dateConvert(yesterDay),
	edob: dateConvert(today)
}

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
  
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var firstDate = new Date(myDate);
  var secondDate = new Date(myDate1);
  var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
  
    if ($scope.cohort.sdob != undefined && $scope.cohort.sdob!= null && $scope.cohort.sdob!= '') {
    	
    }else {
        statusCohort = true;
        $scope.errorendDate=true;
    }
    if ( diffDays <=5 ) {
    	
    }else {
        statusCohort = true;
        $scope.enddateError=true;
		$(".displayContent").hide();
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
	$scope.copySd= $scope.cohort.sdob;
	$scope.copyEd = $scope.cohort.edob;
	var edate = new Date($scope.cohort.edob);
	var sdate = new Date($scope.cohort.sdob);

	$scope.cohort.edob = edate.getTime();
	$scope.cohort.sdob = sdate.getTime();
	

	$http({
        method: 'GET',
         url: 'getArcReport/'+$scope.cohort.sdob+'/'+$scope.cohort.edob,
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }).success(function (response) {
   $scope.cohort.sdob =$scope.copySd ;
        $scope.cohort.edob = 	$scope.copyEd ;
    	if(response.status == "SUCCESS"){
		
        $scope.cohortdata=response.arcReport;
       
		
		var status = 0;
		for(var i=0; i<response.arcReport.length; i++){
			status++;
		 if($scope.cohortdata[i].lGFeeDate !== null ){
			  $scope.cohortdata[i].lGFeeDate = new Date($scope.cohortdata[i].lGFeeDate);
			  var dd = $scope.cohortdata[i].lGFeeDate.getDate();
			  var mm = $scope.cohortdata[i].lGFeeDate.getMonth()+1; //January is 0! 

			  var yyyy = $scope.cohortdata[i].lGFeeDate.getFullYear();
			  $scope.cohortdata[i].lGFeeDate = mm+'/'+dd+'/'+yyyy;
		  }
		 
		  $scope.cohortdata[i].issuedAmount = Number($scope.cohortdata[i].issuedAmount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		  $scope.cohortdata[i].mortgageAmount = Number($scope.cohortdata[i].mortgageAmount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		 
		  $scope.cohortdata[i].firmAmount = Number($scope.cohortdata[i].firmAmount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
 	 
		 if($scope.cohortdata[i].transactionTime !='' && $scope.cohortdata[i].transactionTime != null){
		  $scope.cohortdata[i].transactionTime = $scope.cohortdata[i].transactionTime.split('-').join(':');
		  }
		   /*if($scope.cohortdata[i].cohortNumber !='' && $scope.cohortdata[i].cohortNumber != null){
				$scope.cohortdata[i].cohortNumber ='';
		  }
		    if($scope.cohortdata[i].cohortYear !='' && $scope.cohortdata[i].cohortYear != null){
				$scope.cohortdata[i].cohortYear ='';
		  }*/
		  
			  $scope.cohortdata[i].lGFeeAmount = Number($scope.cohortdata[i].lGFeeAmount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		  $scope.cohortdata[i].lGCertAmount = Number($scope.cohortdata[i].lGCertAmount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		 
		  
          if(status == response.arcReport.length){
				$scope.seconde =$scope.cohortdata;
			}
		}
        $(".displayContent").show();
    	}else{
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