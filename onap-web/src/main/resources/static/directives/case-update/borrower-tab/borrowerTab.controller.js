(function() {
	angular.module('app')
		.controller('BorrowerTabController', ['$scope', '$http', '$window', '$rootScope', '$location', 'CaseUpdateService', 'FlashService',
			                                         'LoggingService', 'Calculator', 'Constants', 'SharedDataService', 'CommonFormService', BorrowerTabController]);


	function BorrowerTabController($scope, $http, $window, $rootScope, $location, CaseUpdateService, FlashService, LoggingService, Calculator, Constants, SharedDataService, CommonFormService) {
	
		SharedDataService.requireCaseReview();
		
		var currentCase = SharedDataService.getCaseReview();
		$scope.caseId = currentCase.caseId;
		$scope.caseNumber = currentCase.caseNumber;
	
		$scope.goToRoute = function(route) {
			$location.path('/' + route);
		}
		
		function init(){
	
			$scope.showSave = true;
			$scope.showOrg = true;
			$scope.testCoborrower = true;
	
			CaseUpdateService.getBorrowersForCase($scope.caseId)
			.then(function(response) {
				if (response.success && response.data.status == "SUCCESS") {
					$scope.original = response.data;
					$scope.priborrower = response.data;
					$scope.showOrg = true;
					$scope.originalData = angular.copy($scope.original);
	
					$scope.showDupicalte = true;
					$scope.hi();
					$scope.showPrimaryBorrowerServer($scope.priborrower.borrowerType);
					$scope.getTribalBasedBtype($scope.priborrower.borrowerType);
	
					
					if ($scope.priborrower.borrowerId==null){
						$scope.showSave = false;
					}
					if ($scope.priborrower.persns!='') {
						if ($scope.priborrower.persns[0].social.length > 9) {
							$scope.priborrower.persns[0].social = Calculator.squareDec($scope.priborrower.persns[0].social);
						}
						var month = $scope.priborrower.persns[0].social.substring(0,3);
						var day = $scope.priborrower.persns[0].social.substring(3,5);
						var year = $scope.priborrower.persns[0].social.substring(5,9);
	
						$scope.priborrower.persns[0].social = month + '-' + day + '-' + year;
						$scope.ssnMasking = '***' + '-' + '**' + '-' + year;
	
						$scope.priborrower.persns[0].dob = new Date($scope.priborrower.persns[0].dob);
						var dd1 = $scope.priborrower.persns[0].dob.getDate();
						var mm1 = $scope.priborrower.persns[0].dob.getMonth()+1; //January is 0!
	
						var yyyy1 = $scope.priborrower.persns[0].dob.getFullYear();
						$scope.priborrower.persns[0].dob = mm1+'/'+dd1+'/'+yyyy1;
					}
					if ($scope.priborrower.persns.length > 1) {
						//console.log("$scope.showCoBorrower = false;"+$scope.showCoBorrower);
						$scope.getTribal();
						$scope.showCoBorrower = true;
						checkingAddCoBorrower = true;
						
						var j= 0;
						for(var i =1; i < $scope.priborrower.persns.length;i++) {
	
							$scope.priborrower.persns[i].dob = new Date($scope.priborrower.persns[i].dob);
							var dd1 = $scope.priborrower.persns[i].dob.getDate();
							var mm1 = $scope.priborrower.persns[i].dob.getMonth()+1; //January is 0!
							var yyyy1 = $scope.priborrower.persns[i].dob.getFullYear();
							$scope.priborrower.persns[i].dob = mm1+'/'+dd1+'/'+yyyy1;
							$scope.CoBorrowerList[j]=$scope.priborrower.persns[i];
							$scope.CoBorrowerList[j].tribal=$scope.priborrower.persns[i].tribal;
							if ($scope.priborrower.persns[i].orgnsn!= null){
								$scope.priborrower.persns[i].orgnsn = $scope.priborrower.persns[i].orgnsn.trim();
							}
							if ($scope.priborrower.persns[i].orgnsn == 'NOCC'){
								$scope.CoBorrowerList[j].occupant= 'N';
							}
							else if ($scope.priborrower.persns[i].orgnsn == 'OCC'){
								$scope.CoBorrowerList[j].occupant= 'Y';
							}
							$scope.CoBorrowerList[j].showDupicalteCoBorrower = true;
	
							if ($scope.CoBorrowerList[j].social.length > 9) {
								$scope.CoBorrowerList[j].social  = Calculator.squareDec($scope.priborrower.persns[i].social);
							}
	
							var year = $scope.CoBorrowerList[j].social.substring(5,9);
	
							$scope.CoBorrowerList[j].CoBorrowerMask ="***-**-"+year;
	
							j++;
						}
					}else{$scope.showCoBorrower = false;}
				}
				else if (response.error || (response.data && response.data.status == "ERROR")) {
					if (response.data.errorMessage) {
						FlashService.error(response.data.errorMessage);
					}
					else {
						FlashService.error(Constants.ERROR_MESSAGES.BORROWERS_FOR_CASE_RETRIEVAL_ERROR);
					}
				}
			}, function(response) {
				FlashService.error(Constants.ERROR_MESSAGES.BORROWERS_FOR_CASE_RETRIEVAL_ERROR);
			})
	
		}
		
		$scope.initfun = init();
		
		$scope.hideSsn = function() {
			$scope.showDupicalte = false;
			$("#ssn").focus();
		}
	
		$scope.maskingPriborrowerSsn = function() {
			var year = $scope.priborrower.persns[0].social.substring(7,11);
			$scope.ssnMasking ="***-**-"+year;
			$scope.showDupicalte = true;
			var ssnPattern = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/;
			var statusPriBorrower = false;
			$scope.errorPriBorrowerSsn = false;
			$scope.errorPriBorrowerSsnNumber1=false;
			if ($scope.priborrower.persns[0].social != '' && 
					$scope.priborrower.persns[0].social != null && 
					$scope.priborrower.persns[0].social != undefined) {         
				if (ssnPattern.test($scope.priborrower.persns[0].social)) {
	
				}
				else {
					$scope.errorPriBorrowerSsnNumber1=true;
					statusPriBorrower = true; 
				}
			} 
			else {
				statusPriBorrower = true;
				$scope.errorPriBorrowerSsn=true;
			}
			if (statusPriBorrower == true) {
				return false;
			}
			else {
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
			if($scope.CoBorrowerList[index].social.length == 9){
				var year1 = $scope.CoBorrowerList[index].social.substring(5,9);
			}else{
				var year1 = $scope.CoBorrowerList[index].social.substring(7,11);
			}
	
			$scope.CoBorrowerList[index].CoBorrowerMask ="***-**-"+year1;
	
			$scope.CoBorrowerList[index].showDupicalteCoBorrower = true;
			var ssnPattern = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/;
			var id=index;
			var ids="#"+id+"ssh";
			var idsdob="#"+id+"dob";
			var idsfirstname="#"+id+"firstname";
			var idslastname="#"+id+"lastname";
			var idstribal="#"+id+"tribal";
			var idsdate=id+"datepick";
			var idssnnum="#"+id+"sshNumber";
			var statusCoBorrower = false;
	
			$(ids).hide();
			$(idssnnum).hide();
	
			if ($scope.CoBorrowerList[id].social != '' && $scope.CoBorrowerList[id].social != null && $scope.CoBorrowerList[id].social != undefined) {
				if (ssnPattern.test($scope.CoBorrowerList[id].social)) {
					$scope.testCoborrower = true;
				}
				else {
					$(idssnnum).show();
					statusCoBorrower = true;
				}
			}
			else {
				$(ids).show();
				statusCoBorrower = true;
			}
	
			if (statusCoBorrower == true){
				return false;
			}
			else {
				return true;
			}
		}
	
		/** ssn masking format ends**/
		$rootScope.userInfo  = JSON.parse($window.sessionStorage.getItem("activeUser"));
		if( $rootScope.userInfo ){
	
			$rootScope.userName =  $rootScope.userInfo .loggedUser;
			$rootScope.showloginhead = true;
		}else{
			$rootScope.showloginhead = false;
		}
		$scope.getBorrowerType=function(){
			CommonFormService.getReferenceCodes(Constants.REFERENCE_CODES.BORROWER_TYPE)
			.then(function(response) {
				if (response.data) {
					$scope.bType = response.data;
				}
				else {
					FlashService.error(Constants.ERROR_MESSAGES.BORROWER_TYPE_RETRIEVAL_ERROR);
				}
			}, function(error) {
				FlashService.error(Constants.ERROR_MESSAGES.BORROWER_TYPE_RETRIEVAL_ERROR);
			})
		}
	
		$scope.getBorrowerType();
		$scope.getTribal=function() {
			CommonFormService.getReferenceCodes(Constants.REFERENCE_CODES.TRIBE)
			.then(function(response) {
				if (response.data) {
					$scope.tribal1 = response.data;
				}
				else {
					FlashService.error(Constants.ERROR_MESSAGES.TRIBE_RETRIEVAL_ERROR);
				}
			}, function(error) {
				FlashService.error(Constants.ERROR_MESSAGES.TRIBE_RETRIEVAL_ERROR);
			})
		}
		
		// Initialize TRIBES menu
		$scope.getTribal();
	
			$scope.getTribalBasedBtype=function(datavalue){
				if (datavalue == 'IND' || datavalue == 'TRE'){
					CommonFormService.getReferenceCodes(Constants.REFERENCE_CODES.TRIBE)
					.then(function(response) {
						if (response.data) {
							$scope.tribalBasedBtype = response.data;
						}
						else {
							FlashService.error(Constants.ERROR_MESSAGES.TRIBE_RETRIEVAL_ERROR);
						}
					}, function(error) {
						FlashService.error(Constants.ERROR_MESSAGES.TRIBE_RETRIEVAL_ERROR);
					})
				}
				else if (datavalue == 'IHA' || datavalue == 'TDHE'){
					CommonFormService.getReferenceCodes(Constants.REFERENCE_CODES.IHA_TDHE)
					.then(function(response) {
						if (response.data) {
							$scope.tribalBasedBtype = response.data;
						}
						else {
							FlashService.error(Constants.ERROR_MESSAGES.IHA_TDHE_RETRIEVAL_ERROR);
						}
					}, function(error) {
						FlashService.error(Constants.ERROR_MESSAGES.IHA_TDHE_RETRIEVAL_ERROR);
					})
				}
			}
			$scope.getTribalNameForPrinting = function(tribal){
	
				$scope.getTribalBasedBtype($scope.priborrower.borrowerType);
				var i;
				for(i=0;i<$scope.tribalBasedBtype.length;i++){
	
					if($scope.tribalBasedBtype[i].referenceCodeValue === tribal){
	
						$rootScope.tribalName= $scope.tribalBasedBtype[i].referenceCodeName;
						if($scope.priborrower.borrowerType === 'IND' && 
								$rootScope.tribalName === 'NO TRIBAL AFFILIATION'){
							FlashService.error(Constants.ERROR_MESSAGES.PRIBORROWER_NO_TRIBAL);
							$scope.priborrower.tribal ='';
						}
						if(!$scope.priborrower.persns[0])
							$scope.priborrower.persns[0].tribal = $scope.tribalBasedBtype[i].referenceCodeName;
						break;
					}
				}
			}
			$scope.getTribal();
			$scope.individualFirst = function(btype){
				return btype.referenceCodeName !== 'INDIVIDUAL';
			}
	
			$scope.noTribalFirst = function(tribalBasedBtype){
				if($scope.priborrower.borrowerType == 'IND' || $scope.priborrower.borrowerType == 'TRE'){
					return tribalBasedBtype.referenceCodeName !== 'NO TRIBAL AFFILIATION';
				} else{
					return tribalBasedBtype.referenceCodeName;
				}
			}
			$scope.noTribalFirstCoborr = function(tribal){
				if($scope.priborrower.borrowerType == 'IND'){
					return tribal.referenceCodeName!== 'NO TRIBAL AFFILIATION';
				} else{
					return tribal.referenceCodeName;
				}
	
			}
			$('.social').mask('000-00-0000');
			var date = new Date();
			var d = new Date();
			var year = d.getFullYear() - 18 ;
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
	
			$scope.ssnValue =function(index){
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
	
	
			$("#DatePickerOne").on("click", function () {
				var priBorrowerDateOne = $('#DatePickerOne').val();
			});
	
	
			$scope.getOrgan1 =function(){
				$scope.getTribalBasedBtype($scope.priborrower.borrowerType);
				var i =0;
				for(i=0;i<$scope.tribalBasedBtype.length;i++){
					if($scope.tribalBasedBtype[i].referenceCodeValue== $scope.priborrower.tribal && $scope.priborrower.borrowerType == 'TRE') {
						$scope.priborrower.orgnsn= $scope.tribalBasedBtype[i].referenceCodeName;
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
	
				if ($scope.priborrower.borrowerType == 'IND' || $scope.priborrower.borrowerType == '') {
					$scope.showOrg = false;
					$scope.forAllValues =true;
					$scope.forTre = false;
					$('#organisation')
					.attr("disabled", true);
	
				}
				else if ($scope.priborrower.borrowerType == 'TRE') {
					$scope.forAllValues =false;
					$scope.forTre = true;
					$scope.showOrg = true;
				}
				else {
					$scope.forAllValues =true;
					$scope.forTre = false;
					$scope.showOrg = true;
	
				}
			}
	
			statusOrgansiation = true;
	
			$scope.showPrimaryBorrower = function(btype){
				$scope.borrowerType = $scope.priborrower.borrowerType;
	
				if ($scope.borrowerType == 'IND') {
	
					var priBorrowerPushing = 
					{
							"social": "",
							"firstname": "",
							"orgnsn":"",
							"dob": "",
							"lastname": "",
							"mi": "",
	
					};
	
					if ($scope.priborrower.persns.length == 0) {
						$scope.priborrower.persns.push(priBorrowerPushing);
						//console.log("empty value pushing"+$scope.priborrower);
					}
	
					$scope.forAllValues = true;
					$scope.forTre = false;
					$scope.errorPriBorrowerOrg=false;
					$scope.showPriBorrower=true;
					checkingPriBorrower = true;
					$scope.showCoBorrowerBtn = true;
					$scope.showOrg = false;
	
					$('#organisation')
					.attr("disabled", true);
					$scope.priborrower.orgnsn='';
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
					$scope.priborrower.orgnsn='';  
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
					$scope.priborrower.orgnsn='';
					$scope.forTre = false;
	
					console.log($scope.showOrg)
					$('#organisation')
					.attr("disabled", false);
					$scope.showOrg = true;
					statusOrgansiation = false;
				}
	
				if(checkingAddCoBorrower == true && checkingAddCoBorrower!= undefined && $scope.showCoBorrowerBtn == true){
					$scope.showCoBorrower = true;
				}else{
					$scope.showCoBorrower = false; 
				}
	
			}
	
			/** server side **/
			$scope.showPrimaryBorrowerServer = function(btype){
				$scope.borrowerType = $scope.priborrower.borrowerType;
	
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
	
					statusOrgansiation = false;
				}
				else {
					$scope.showPriBorrower=false;
					checkingPriBorrower = false;
					$scope.showCoBorrowerBtn = false;
					$scope.showOrg = true;
					$scope.forAllValues = true;
	
					$scope.forTre = false;
	
					$('#organisation')
					.attr("disabled", false);
					$scope.showOrg = true;
					statusOrgansiation = false;
				}
	
				if(checkingAddCoBorrower == true && checkingAddCoBorrower!= undefined && $scope.showCoBorrowerBtn == true){
					$scope.showCoBorrower = true;
				}else{
					$scope.showCoBorrower = false; 
				}
	
			}
	
	
			/** server side **/
	
			/* validation of borrower */
	
			$scope.errorPriBorrowerSsnText = Constants.ERROR_MESSAGES.SSN_REQUIRED;
			$scope.errorPriBorrowerSsnNumber1Text = Constants.ERROR_MESSAGES.SSN_INVALID;
			$scope.errorPriBorrowerFnameText = Constants.ERROR_MESSAGES.FIRST_NAME_REQUIRED;
			$scope.errorPriBorrowerMiText = Constants.ERROR_MESSAGES.MI_NAME_REQUIRED;
			$scope.errorPriBorrowerTribalText = Constants.ERROR_MESSAGES.TRIBAL_AFFILIATION_REQUIRED;
			$scope.errorPriBorrowerDobText = Constants.ERROR_MESSAGES.DOB_REQUIRED;
			$scope.errorPriBorrowerLnameText = Constants.ERROR_MESSAGES.LAST_NAME_REQUIRED;
			$scope.errorPriBorrowerOrgText = Constants.ERROR_MESSAGES.ORGANIZATION_REQUIRED;
	
			$scope.borrowerValidation = function () {
				var ssnPattern = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/;
				var namepatt = /^[a-z\s]{1,40}$/i;
				var statusPriBorrower = false;
				$scope.errorPriBorrowerSsn=false;
				$scope.errorPriBorrowerSsnNumber1=false;
				$scope.errorPriBorrowerFname=false;
				$scope.errorPriBorrowerTribal=false;
				$scope.errorPriBorrowerDob=false;
				$scope.errorPriBorrowerLname=false;
				$scope.errorPriBorrowerType=false;
				$scope.errorPriBorrowerOrg=false;
				$scope.errorPriBorrowerMii=false;
	
	
				var priBorrowerDateOne = document.getElementById("DatePickerOne").value;
	
				if($scope.priborrower.borrowerType == 'IND' && checkingPriBorrower == true){
	
					if ($scope.priborrower.borrowerType != undefined && $scope.priborrower.borrowerType != null && $scope.priborrower.borrowerType != '') {
	
					} else{
						statusPriBorrower = true;
						$scope.errorPriBorrowerType=true;
					}
	
					if ($scope.priborrower.persns[0].social != undefined && $scope.priborrower.persns[0].social != null && $scope.priborrower.persns[0].social != '') {
						console.log("ssn"+$scope.priborrower.persns[0].social)          
						if (ssnPattern.test($scope.priborrower.persns[0].social)){
	
						}
						else {
							$scope.errorPriBorrowerSsnNumber1=true;
							statusPriBorrower = true; 
						}
	
					}else {
						statusPriBorrower = true;
						$scope.errorPriBorrowerSsn=true;
					}
	
					if ($scope.priborrower.persns[0].firstname != undefined && $scope.priborrower.persns[0].firstname != null && $scope.priborrower.persns[0].firstname !='' ) {
	
					}else {
						statusPriBorrower = true;
						$scope.errorPriBorrowerFname=true;
	
					}
					if ($scope.priborrower.persns[0].mi != undefined && $scope.priborrower.persns[0].mi != null && $scope.priborrower.persns[0].mi !='' ) {
						if (namepatt.test($scope.priborrower.persns[0].mi)) {
	
						}else {
							statusPriBorrower = true;
							$scope.errorPriBorrowerMii=true;
	
						}
					}
	
	
					if ($scope.priborrower.tribal != undefined && $scope.priborrower.tribal != null && $scope.priborrower.tribal != '' && $scope.priborrower.tribal != "NO TRIBAL AFFILIATION") {
	
					}else {
						statusPriBorrower = true;
						$scope.errorPriBorrowerTribal=true;
	
					}
	
	
	
					if (priBorrowerDateOne != undefined && priBorrowerDateOne != null && priBorrowerDateOne != '') {
	
					}else {
						statusPriBorrower = true;
						$scope.errorPriBorrowerDob=true;
	
					}
					if ($scope.priborrower.persns[0].lastname != undefined && $scope.priborrower.persns[0].lastname != null && $scope.priborrower.persns[0].lastname != '') {
	
					}else {
						statusPriBorrower = true;
						$scope.errorPriBorrowerLname=true;
	
					}
	
	
	
				}else{
					if ($scope.priborrower.borrowerType != undefined && $scope.priborrower.borrowerType != null && $scope.priborrower.borrowerType != '') {
						if($scope.priborrower.borrowerType != 'TRE'){
							if ($scope.priborrower.orgnsn != undefined && $scope.priborrower.orgnsn != null && $scope.priborrower.orgnsn != '') {
	
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
	
					}else {
						statusPriBorrower = true;
						$scope.errorPriBorrowerTribal=true;
	
					}
				}
				if(statusPriBorrower == true){
					return false;
				}else{
					return true;
				}
	
			}
	
			/* completed validation */
			/* validation start for coborrower to add*/
			$scope.validationOrg = function(org){
	
				if($scope.priborrower.borrowerType != 'TRE' && $scope.priborrower.borrowerType != 'IND'){
					if ($scope.priborrower.orgnsn != undefined && $scope.priborrower.orgnsn != null && $scope.priborrower.orgnsn != '') {
						$scope.errorPriBorrowerOrg=false;
					} else{
	
						$scope.errorPriBorrowerOrg=true;
	
					}
				}
	
			}
			$scope.showCoBorrower1 = function(){
	
				if($scope.CoBorrowerList.length>0 && $scope.showCoBorrowerBtn == true ){
	
					$scope.showCoBorrower=true;
					checkingAddCoBorrower=true;
				} else{
	
					$scope.showCoBorrower=false; 
					checkingAddCoBorrower=false;
				}
			}
			$scope.showCoBorrower1();
	
	
			$scope.addNew = function (ias) {
				checkingAddCoBorrower =true;
				if($scope.showCoBorrowerBtn == true){
					$scope.showCoBorrower=true;
				}
	
				var CoBorrowerListPushing = 
				{
						"social":"",
						"firstname": "",
						"tribal": "",
						"dob": "",
						"lastname": "",
						"mi": "",
						"occupant":"",
						"orgnsn":"",
						"showDupicalteCoBorrower":true,
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
						var idsocc="#"+id+"occupant";
	
						if(id >= 0){
							var coBorrowerDateTwo = document.getElementById(idsdate).value;
						}else{
	
							coBorrowerDateTwo = $scope.CoBorrowerList[0].dob;
						}
						var id=$scope.CoBorrowerList.length - 1;
	
						var idssh="#"+id+"co-social";
	
						var idmi="#"+id+"mii";
						$(idmi).hide();
						$(idsocc).hide();
						var namepatt = /^[a-z\s]{1,40}$/i;
	
	
	
						$scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].dob = coBorrowerDateTwo;
						if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].firstname != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].firstname != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].firstname != undefined) {
							if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].lastname != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].lastname != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].lastname != undefined) {
	
								if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social != undefined) {
	
									if (coBorrowerDateTwo != '' && coBorrowerDateTwo != null && coBorrowerDateTwo != undefined) {
										if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].tribal != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].tribal != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].tribal != undefined) {
											if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].occupant != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].occupant != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].occupant != undefined) {
											if ($scope.CoBorrowerList[id].mi != '' && $scope.CoBorrowerList[id].mi != null && $scope.CoBorrowerList[id].mi != undefined) {
	
												if (namepatt.test($scope.CoBorrowerList[id].mi)) {
	
												}else {
													$(idmi).show();
	
												}
											}
	
											$(ids).hide();
											$(idsdob).hide();
											$(idsfirstname).hide();
											$(idslastname).hide();
											$(idstribal).hide();
											$(idsocc).hide();
	
											$scope.CoBorrowerList.push(CoBorrowerListPushing);
											} else {
												
												$(ids).hide();
												$(idsdob).hide();
												$(idsfirstname).hide();
												$(idslastname).hide();
												$(idstribal).hide();
												$(idmi).hide();
												$(idsocc).show();
											}
											} else {
	
											$(ids).hide();
											$(idsdob).hide();
											$(idsfirstname).hide();
											$(idslastname).hide();
											$(idstribal).show();
											$(idmi).hide();
											$(idsocc).hide();
										}
									} else {
	
										$(ids).hide();
										$(idsdob).show();
										$(idsfirstname).hide();
										$(idslastname).hide();
										$(idstribal).hide();
										$(idmi).hide();
										$(idsocc).hide();
									}
								} else {
	
									$(ids).show();
									$(idsdob).hide();
									$(idsfirstname).hide();
									$(idslastname).hide();
									$(idstribal).hide();
									$(idmi).hide();
									$(idsocc).hide();
								}
							} else {
	
								$(ids).hide();
								$(idsdob).hide();
								$(idsfirstname).hide();
								$(idslastname).show();
								$(idstribal).hide();
								$(idmi).hide();
								$(idsocc).hide();
	
							}
						} else {
	
							$(ids).hide();
							$(idsdob).hide();
							$(idsfirstname).show();
							$(idslastname).hide();
							$(idstribal).hide();
							$(idmi).hide();
							$(idsocc).hide();
	
						}
					} else {
						FlashService.error(Constants.ERROR_MESSAGES.COBORROWER_MORETHAN_FIVE_ERROR);
					}
			};
	
			$scope.remove = function (index) {
				//console.log("remove"+index);
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
				var idsoccupant="#"+id+"occupant";

				var statusCoBorrower = false;
	
				$(ids).hide();
				$(idsdob).hide();
				$(idsfirstname).hide();
				$(idslastname).hide();
				$(idstribal).hide();
				$(idssnnum).hide();
				$(idsoccupant).hide();
	
				var coBorrowerDateTwo;
				if(id >= 0){
					coBorrowerDateTwo = document.getElementById(idsdate).value;
				}else{
	
					coBorrowerDateTwo = $scope.CoBorrowerList[0].dob;
	
				}
	
				$scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].dob = coBorrowerDateTwo;
	
				if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social != undefined) {
					if (ssnPattern.test($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].social)) {
	
					}else {
						$(idssnnum).show();
						statusCoBorrower = true;
					}
				}else {
	
					$(ids).show();
					statusCoBorrower = true;
				}
	
	
				if (coBorrowerDateTwo != '' && coBorrowerDateTwo != null && coBorrowerDateTwo != undefined) {
	
				}else {
					statusCoBorrower = true;
					$(idsdob).show();
				}
				
				if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].occupant != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].occupant != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].occupant != undefined) {
					
				}else {
					statusCoBorrower = true;
					$(idsoccupant).show();
				}
				if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].firstname != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].firstname != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].firstname != undefined) {
	
				}else {
					statusCoBorrower = true;
					$(idsfirstname).show();
				}
				if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].lastname != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].lastname != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].lastname != undefined) {
	
				}else {
					statusCoBorrower = true;
					$(idslastname).show();
				}
	
				if ($scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].tribal != '' && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].tribal != null && $scope.CoBorrowerList[$scope.CoBorrowerList.length - 1].tribal != undefined) {
	
				}else {
					statusCoBorrower = true;
					$(idstribal).show();
				}
	
				if(statusCoBorrower == true){
	
					return false;
				}else{
					return true;
				}
			}
	
	
			$scope.copyToOritinal = function(){
				var originalPrsns = $scope.original.persns;
				var modifiedprsns = $scope.priborrower.persns;
				if(modifiedprsns.length == 0){
					$scope.original.persns.splice(0, originalPrsns.length);
				}
				var ignoreFist = false;
				modifiedprsns.forEach(function(prsn){
					if(ignoreFist === false)
						ignoreFist = true;
	
					var modPrsnId = prsn.personId;
					var thisPrsnExists = false;
					originalPrsns.forEach(function(orignalPrsn){
	
						if(orignalPrsn.personId  === prsn.personId){
							thisPrsnExists = true;
							orignalPrsn.social = prsn.social;
							orignalPrsn.dob = prsn.dob;
							orignalPrsn.firstname = prsn.firstname;
							orignalPrsn.lastname = prsn.lastname;
							orignalPrsn.mi = prsn.mi;
							orignalPrsn.tribal = prsn.tribal;
							orignalPrsn.orgnsn = prsn.orgnsn;
						}
					});
					if(thisPrsnExists === false){
	
						var person = {};
	
						person.social = prsn.social;
						person.dob = prsn.dob;
						person.firstname = prsn.firstname;
						person.lastname = prsn.lastname;
						person.mi = prsn.mi;
						person.tribal = prsn.tribal;
						person.orgnsn = prsn.orgnsn;
	
						$scope.original.persns.push(prsn);
					}
				});
			}
	
			$scope.formData = function () {
				if($scope.priborrower.borrowerType!= 'IND'){
					console.log(' post Response original 5:' + JSON.stringify($scope.original));
					$scope.priborrower.persns = [];
					$scope.original.persns =  [];
	
	
				}
				if($scope.priborrower.borrowerType == 'IND'){
	
					var myDate = new Date($scope.priborrower.persns[0].dob);
					//console.log("mydate"+myDate.getTime());
					$scope.priborrower.persns[0].dob = myDate.getTime();
					//console.log('ind pri priborr Response :' + JSON.stringify($scope.priborrower.persns[0].dob));			 
					$scope.priborrower.persns[0].social =  $scope.priborrower.persns[0].social.split('-').join('');		 
					$scope.priborrower.persns[0].social =  $scope.priborrower.persns[0].social.split('-').join('');
	
					$scope.priborrower.persns[0].social = Calculator.squareEnc($scope.priborrower.persns[0].social);	
	
					$scope.priborrower.persns[0].personId = ($scope.priborrower.persns[0])?$scope.priborrower.persns[0].personId:null;
					$scope.priborrower.persns[0].borrwrId= ($scope.priborrower.persns[0])?$scope.priborrower.persns[0].borrwrId:$scope.priborrower.borrowerId;
					if($scope.priborrower.persns[0].personId == undefined){
						$scope.priborrower.persns[0].personId= null;
					}
					if($scope.priborrower.persns[0].borrwrId == undefined){
						$scope.priborrower.persns[0].borrwrId = $scope.priborrower.borrowerId;
					}
					if($scope.priborrower.persns[0].tribal == null){
						$scope.priborrower.persns[0].tribal = $scope.priborrower.tribal;
					}
	
					
				}
	
				var sendingBorrower ={}
				$scope.borrowerArray =[];
				$scope.borrowerArray =[];
				if($scope.priborrower.persns[0]!= undefined && $scope.priborrower.persns[0]!=null && $scope.priborrower.persns[0] !=''){
					$scope.borrowerArray.push($scope.priborrower.persns[0]);
				}
				if(checkingAddCoBorrower  == true && checkingAddCoBorrower!=undefined && $scope.showCoBorrowerBtn == true){
			 
					var i;		 
	
					$scope.CoBorrowerList = angular.toJson($scope.CoBorrowerList);
	
					$scope.CoBorrowerList = JSON.parse($scope.CoBorrowerList);
	
					
					for(i = 0 ;i< $scope.CoBorrowerList.length; i++){
						if( $scope.CoBorrowerList[i].occupant== 'Y'){
							$scope.CoBorrowerList[i].occupant = 'OCC'; 
						} else  if( $scope.CoBorrowerList[i].occupant== 'N'){
							$scope.CoBorrowerList[i].occupant = 'NOCC'; 
						}
						if($scope.CoBorrowerList[i].dob!= null){
							var myDate1 = new Date($scope.CoBorrowerList[i].dob);
							$scope.CoBorrowerList[i].dob = myDate1.getTime();
							console.log('i'+i+'dob :' + $scope.CoBorrowerList[i].dob);
							$scope.CoBorrowerList[i].social =  $scope.CoBorrowerList[i].social.split('-').join('');
							$scope.CoBorrowerList[i].social = Calculator.squareEnc($scope.CoBorrowerList[i].social);			 
							$scope.borrowerArray.push(
									{
										"social":$scope.CoBorrowerList[i].social,
										"firstname":$scope.CoBorrowerList[i].firstname,
										"lastname":$scope.CoBorrowerList[i].lastname,
										"tribal":$scope.CoBorrowerList[i].tribal,
										"dob":$scope.CoBorrowerList[i].dob,
										"mi":$scope.CoBorrowerList[i].mi,
										"orgnsn":$scope.CoBorrowerList[i].occupant,
										"personId":($scope.priborrower.persns[i+1])?$scope.priborrower.persns[i+1].personId:null,
												"borrwrId":($scope.priborrower.persns[i + 1])?$scope.priborrower.persns[i + 1].borrwrId:null,
									});
						}
					}
				}
				$scope.priborrower.persns = $scope.borrowerArray;
				$scope.priborrower.persns = angular.toJson($scope.priborrower.persns);
	
				$scope.priborrower.persns = JSON.parse($scope.priborrower.persns);
				if($scope.original.persns.length >1 ){
					$scope.original = angular.toJson($scope.original);
	
					$scope.original = JSON.parse($scope.original);
				}
	
				$http({
					"method": "POST",
					url: 'case/review/borrower',
					"headers": {"Content-Type": "application/json", "Accept": "application/json"},
					"data": $scope.original
				}).success(function (response, data) {
					if(response.status == "SUCCESS"){
					if($scope.priborrower.persns!=''){
						$scope.priborrower.persns[0].social = Calculator.squareDec($scope.priborrower.persns[0].social);
						var month = $scope.priborrower.persns[0].social.substring(0,3);
						var day = $scope.priborrower.persns[0].social.substring(3,5);
						var year = $scope.priborrower.persns[0].social.substring(5,9);
						$scope.priborrower.persns[0].social = month + '-' + day + '-' + year;
	
						$scope.priborrower.persns[0].dob = new Date($scope.priborrower.persns[0].dob);
						var dd1 = $scope.priborrower.persns[0].dob.getDate();
						var mm1 = $scope.priborrower.persns[0].dob.getMonth()+1; //January is 0!
	
						var yyyy1 = $scope.priborrower.persns[0].dob.getFullYear();
						$scope.priborrower.persns[0].dob = mm1+'/'+dd1+'/'+yyyy1;
						if($scope.priborrower.persns.length > 1 ){
	
							var j= 0;
	
							for(var i =1; i < $scope.priborrower.persns.length;i++){
	
								$scope.priborrower.persns[i].dob = new Date($scope.priborrower.persns[i].dob);
								var dd1 = $scope.priborrower.persns[i].dob.getDate();
								var mm1 = $scope.priborrower.persns[i].dob.getMonth()+1; //January is 0!
	
								var yyyy1 = $scope.priborrower.persns[i].dob.getFullYear();
								$scope.priborrower.persns[i].dob = mm1+'/'+dd1+'/'+yyyy1;
								$scope.CoBorrowerList[j].dob=$scope.priborrower.persns[i].dob;
								$scope.CoBorrowerList[j].social  = Calculator.squareDec($scope.priborrower.persns[i].social);
								var month1 = $scope.CoBorrowerList[j].social.substring(0,3);
								var day1 = $scope.CoBorrowerList[j].social.substring(3,5);
								var year1 = $scope.CoBorrowerList[j].social.substring(5,9);
								$scope.CoBorrowerList[j].social = month1 + '-' + day1 + '-' + year1;
	
								if( $scope.priborrower.persns[i].orgnsn== 'OCC'){
									$scope.CoBorrowerList[j].occupant = 'Y'; 
								} else  if( $scope.priborrower.persns[i].orgnsn== 'NOCC'){
									$scope.CoBorrowerList[j].occupant = 'N'; 
								}
	
								j++;
	
							}
						}
	
					}
	
					CommonFormService.clearCache(Constants.API_ENDPOINTS.GET_BORROWERS_FOR_CASE.replace(':caseId', $scope.caseId));
					} else{
						FlashService.error(response.errorMessage);
					}
				}).error(function (response, data) {
					
					FlashService.error(Constants.ERROR_MESSAGES.B_CASE_REVIEW_SAVE_ERROR);
				})
			}
			$(function () {
				$('#mi').keydown(function (e) {
					if (e.shiftKey || e.ctrlKey || e.altKey) {
						e.preventDefault();
					} else {
						var key = e.keyCode;
						if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
							e.preventDefault();
						}
					}
				});
			});
			$scope.miFunction = function (index) {
				var id=index;
	
				var idmi="#"+id+"mii";
				$(idmi).hide();
				var namepatt = /^[a-z\s]{1,40}$/i;
				if ($scope.CoBorrowerList[id].mi != '' && $scope.CoBorrowerList[id].mi != null && $scope.CoBorrowerList[id].mi != undefined) {
	
					if (namepatt.test($scope.CoBorrowerList[id].mi)) {
	
					}else {
						$(idmi).show();
	
					}
				}
	
	
			}
	
			$scope.CoborrowerSsnValidation =function(){
	
				var ssnPattern = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/;
				for(var i=0; i<$scope.CoBorrowerList.length;i++){
	
					var id=i;
					var ids="#"+id+"ssh";
					var idsdob="#"+id+"dob";
					var idsfirstname="#"+id+"firstname";
					var idslastname="#"+id+"lastname";
					var idstribal="#"+id+"tribal";
					var idsdate=id+"datepick";
					var idssnnum="#"+id+"sshNumber";
					var statusCoBorrowerssn = false;
					var idmi="#"+id+"mii";
					$(idmi).hide();
					var namepatt = /^[a-z\s]{1,40}$/i;
	
	
					
					$(idssnnum).hide();
	
					if ($scope.CoBorrowerList[id].social != '' && $scope.CoBorrowerList[id].social != null && $scope.CoBorrowerList[id].social != undefined) {
						if (ssnPattern.test($scope.CoBorrowerList[id].social)) {
	
						}
						else {
							$(idssnnum).show();
							statusCoBorrowerssn = true;
							break;
						}
					}
					else {
						$(ids).show();
						statusCoBorrowerssn = true;
						break;
					}
					if ($scope.CoBorrowerList[id].mi != '' && $scope.CoBorrowerList[id].mi != null && $scope.CoBorrowerList[id].mi != undefined) {
	
						if (namepatt.test($scope.CoBorrowerList[id].mi)) {
	
						}
						else {
							$(idmi).show();
							statusCoBorrowerssn = true;
							break;
	
						}
					}
	
				}
	
				if(statusCoBorrowerssn == true) {
					return false;
				}
				else {
					return true;
				}
			}
	
	
			$scope.saveBorrowerDetails = function () {
				var checkSaveButtonBorrower = $scope.borrowerValidation();
				var checkSaveButtonCoBorrower;
				var checkSaveButtonCoBorrowerssn;
				if(checkSaveButtonBorrower ) {
	
					if(checkingAddCoBorrower  == true && $scope.priborrower.borrowerType == 'IND'){
						
	
						if($scope.testCoborrower == true ){
							checkSaveButtonCoBorrower = $scope.CoBorrowerValidation();
							checkSaveButtonCoBorrowerssn = $scope.CoborrowerSsnValidation();
						}
						else {
							checkSaveButtonCoBorrower = false;
						}
						if (checkSaveButtonCoBorrower == true && checkSaveButtonCoBorrowerssn == true) {
							$scope.formData();
							
						}
						
					}
					else {
						$scope.formData();
						FlashService.success(Constants.SUCCESS_MESSAGES.SAVED_SUCCESSFULLY);
					}
				}	
				
			}
			$scope.clearAllFields = function () {
				init();
				
				$('#clearData').modal('hide');
			}
	
	}
})();
