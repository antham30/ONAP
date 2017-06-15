(function() {
	'use strict';
	angular.module('app')
	.controller("LenderTabController", ['$scope', '$http', '$window', '$rootScope', '$location', 'LoggingService',
	                                     'Constants', 'SharedDataService', 'CaseUpdateService','FlashService', 'CommonFormService', LenderTabController]);

		function LenderTabController($scope, $http, $window, $rootScope, $location, LoggingService, Constants, SharedDataService, CaseUpdateService, FlashService,CommonFormService) {
			SharedDataService.requireCaseReview();
		
			var currentCase = SharedDataService.getCaseReview();
			
			/***Determines tab location**/
			if (currentCase.tab) {
				CaseUpdateService.activeTab(currentCase.tab);
			}
		
			$scope.caseId = currentCase.caseId;
			$rootScope.caseEditId = $scope.caseId;
			$scope.caseNumber = currentCase.caseNumber;
		
			$scope.goToRoute = function(route) {
				$location.path('/' + route);
			}
			
			$scope.getcaseNumber=function() {
				CaseUpdateService.getPersonForCase($scope.caseId)
				.then(function (response) {
					
					if (response.success && response.data.status == "SUCCESS") {
						$rootScope.lender = $scope.lender = response.data;
						CaseUpdateService.getUnderWriters()
						.then(function(response) {
							
							if (response.success && response.data.status == "SUCCESS") {
								$scope.underWriter = response.data.personsList;
							}
							else if (response.error) {
							
								FlashService.error(response.data.errorMessage);
							}
						}, function() {
							FlashService.error(Constants.ERROR_MESSAGES.UNDERWITER_RETRIEVAL_ERROR);
						})
						var res = $scope.lender.lndrTin.charAt(2);
						if(res !='-'){
							$scope.lender.lndrTin =$scope.taxFormatter($scope.lender.lndrTin);
						}
		
						CaseUpdateService.getSponsorBrokers($scope.lender.lndrId)
						.then(function (response) {
						
						
							if (response.success && response.data.status == "SUCCESS") {
								$scope.brokerName1 = response.data.sponserBrokerPojos;
								$scope.getTin($scope.lender.loanBrokerId);
								$scope.originatorName = $scope.getSponsorName($scope.lender.loanBrokerId) || $scope.lender.lndrName;
							}
							else if (response.error || response.data.status == "ERROR") {
								
								FlashService.error(response.data.errorMessage);
							}
						}, function() {
							FlashService.error(Constants.ERROR_MESSAGES.SPONSOR_BROKERS_RETRIEVAL_ERROR);
						});
					}
					else if (response.error || response.data.status == "ERROR") {
						
						FlashService.error(response.data.errorMessage);
					}
				}, function() {
					FlashService.error(Constants.ERROR_MESSAGES.PERSON_FOR_CASE_RETRIEVAL_ERROR);
				});
			}
		
			if ($scope.caseId) {
				$scope.getcaseNumber();
			}
		
			$scope.BrokerLogic = function() {
				for(i=0;i<$scope.brokerName1.length;i++){
					if($scope.brokerName1[i].lenderName== $scope.lender.lndrName){
						FlashService.error("Select another name");
						$scope.lender.loanBrokerId = '';
					}
				}
			}
		
			
			$rootScope.userInfo  = JSON.parse($window.sessionStorage.getItem("activeUser"));
			if($rootScope.userInfo) {
				$rootScope.userName =  $rootScope.userInfo .loggedUser;
				$rootScope.showloginhead = true;
			}
			else {
				$rootScope.showloginhead = false;
			}
		
			$scope.telFormatter = function(tel){
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
		
			$scope.myCustomValidator = function(text){
				return true;
			};
			$scope.tinValidator = function(text){
				return true;
			};
		
			$('.tinmasking').mask('00-0000000');
			$('.phone_with_ddd').mask('(000) 000-0000');
		
		
			
		
			$scope.errorLenderNameText = Constants.ERROR_MESSAGES.LENDER_NAME_REQUIRED;
			$scope.errorlenderTinText = Constants.ERROR_MESSAGES.TIN_REQUIRED;
			$scope.errorlenderTinNumberText = Constants.ERROR_MESSAGES.INVALID_TIN_NUMBER;
			$scope.errorloanOfficerText = Constants.ERROR_MESSAGES.LOAN_OFFICER_REQUIRED;
			$scope.errorunderWriterText = Constants.ERROR_MESSAGES.UNDERWRITER_REQUIRED;
			$scope.errorlenderNameText = Constants.ERROR_MESSAGES.BROKER_NAME_REQUIRED;
		
			$scope.LenderValidation1 = function () {
				var statusLender = false;
				$scope.errorlenderName=false;
				$scope.errorlenderTin = false;
				$scope.errorloanOfficer = false;
				$scope.errorunderWriter = false;
				$scope.errorlenderTinNumber = false;
				
		
				if ($scope.lender.loanOfcrName != '' && 
						$scope.lender.loanOfcrName != null && 
						$scope.lender.loanOfcrName != undefined) { }
				else {
					$scope.errorloanOfficer = true;
					statusLender = true;
				}			 
				if ($scope.lender.undrWriterId != '' && 
						$scope.lender.undrWriterId != null && 
						$scope.lender.undrWriterId != undefined) { }
				else {
					$scope.errorunderWriter = true;
					statusLender = true;
				}			 
		
				if (statusLender) {
					return false;
				}
				else{
					return true;
				}
			}
		
			$scope.getTin = function(ln){
				var i;
				for(i=0;i<$scope.brokerName1.length;i++) {
					if($scope.brokerName1[i].lenderId == ln){
						if($scope.brokerName1[i].taxNumber!=null){
							
							$scope.lender.tinname = $scope.taxFormatter($scope.brokerName1[i].taxNumber);
						}
						else {
							$scope.lender.tinname ='';
						}
					}
				}
			}
			
			$scope.getSponsorName = function(ln) {
				var i;
				for(i=0;i<$scope.brokerName1.length;i++) {
					if ($scope.brokerName1[i].lenderId == ln){
						return $scope.brokerName1[i].lenderName;
					}
				}
				return false;
			}
		
			$scope.formData = function () {
				$http({
					"method": "POST",
					url: 'case/review/update',
					"headers": {"Content-Type": "application/json", "Accept": "application/json"},
					"data": $scope.lender
				}).success(function (response) {
					if(response.status == "SUCCESS"){
						
					CommonFormService.clearCache(Constants.API_ENDPOINTS.GET_PERSON_FOR_CASE.replace(':caseId', $scope.caseId));
					}else{
						FlashService.error(response.errorMessage);
					}
				}).error(function () {
					FlashService.error(Constants.ERROR_MESSAGES.LENDER_CASE_RETRIEVAL_ERROR);
				});
			}
			$scope.clearAllFields = function () {
				
				$scope.getcaseNumber();
				$('#clearData').modal('hide');
			}
		
			$scope.lenderSaveButton = function () {
				var checkNextButton =$scope.LenderValidation1();
				if (checkNextButton ) {
					$scope.formData();
					FlashService.success(Constants.SUCCESS_MESSAGES.SAVED_SUCCESSFULLY);
				}
			}
		};
}());