angular.module('app').controller(
		"olgDashboardController",
		function($scope, $http, $window, $rootScope, $controller, $q, DTOptionsBuilder,
				DTColumnDefBuilder, LoggingService, CasesService, Excel,
				$timeout, Calculator, $location, commonService,
				SharedDataService, FlashService, CaseUpdateService) {
			
			var vm = this;
			vm.showModal = showModal;
			vm.assignStaff = assignStaff;
			vm.openCaseReview = openCaseReview;
			vm.startAndOpenCaseReview = startAndOpenCaseReview;
			populateOLGStaffNames();
			
			if($rootScope.role == 'OLG Supervisor'){
				CasesService.getOLGDashboardCasesForSupervisor()
		        	.then(function(response) {
		        		vm.getAllCaseDetails = response.data.caseAssignmentList;
		        	}, function(error) {
		        		FlashService.error("ERROR");
		        	});
			}
			else if($rootScope.role == 'OLG Endorser'){
				CasesService.getOLGDashboardCasesForEndorser()
	        	.then(function(response) {
	        		vm.getAllCaseDetails = response.data.caseAssignmentList;
	        	}, function(error) {
	        		FlashService.error("ERROR");
	        	});
			}
			
			function startAndOpenCaseReview(caseDetail){
				CasesService.reviewCase(caseDetail).then(function(response) {
					SharedDataService.setCaseReview({
						caseId : caseDetail.loanId,
						caseNumber : caseDetail.caseNumber,
						tab: 'endorsementReview'
					});
					$location.path('/caseReview');
				}, function(error) {
	        		FlashService.error("Error starting review process");
	        	});
			}
			
			function openCaseReview(caseDetail){
				SharedDataService.setCaseReview({
					caseId : caseDetail.loanId,
					caseNumber : caseDetail.caseNumber,
					tab: 'endorsementReview'
				});
				$location.path('/caseReview');
			}
			
			function showModal(caseDetails){
				vm.selectedCase = caseDetails;
				vm.selectedStaff = '';
			}
			
			function assignStaff(){
				CasesService.assignCaseForOLGReviewer(vm.selectedCase, vm.selectedStaff).then(function(response) {
	        		var index = vm.getAllCaseDetails.indexOf(vm.selectedCase);
					vm.getAllCaseDetails.splice(index, 1);
					FlashService.success("Successfully Assigned");
	        	}, function(error) {
	        		FlashService.error("ERROR");
	        	});
			}
			
			function populateOLGStaffNames(){
				//need to integrate with backend.
				vm.olgStaffUsers =	[
				                  	 {userName:'onapendorser1@hud.gov', firstName:'Endorser', lastName:'One'}, 
				                  	 {userName:'onapendorser2@hud.gov', firstName:'Endorser', lastName:'Two'},
				                  	 {userName:'onapendorser3@hud.gov', firstName:'Endorser', lastName:'Three'}, 
				                  	 {userName:'onapendorser4@hud.gov', firstName:'Endorser', lastName:'Four'},
				                  	 {userName:'onapendorser5@hud.gov', firstName:'Endorser', lastName:'Five'}
				                  	 ];
//				vm.olgStaffUserNameList = array;
//				var fullNames = [];
//				vm.olgStaffUserNameList.forEach(function(userName){
//					var promise = CaseUpdateService.getFullName(userName);
//					fullNames.push(promise);
//				});
//				$q.all(fullNames).then(function(data){
//					vm.olgStaffUsers = data;
//				});
			}
		}
);
