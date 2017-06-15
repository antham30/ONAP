angular
		.module('app')
		.controller(
				"olgCasesDashboardController",
				function($scope, $http, $window, $rootScope, $controller, $q,
						DTOptionsBuilder, DTColumnDefBuilder, LoggingService,
						CasesService, Excel, $timeout, Calculator, $location,
						commonService, SharedDataService, FlashService,
						CaseUpdateService) {

					var vm = this;
					vm.openCaseReview = openCaseReview;
					vm.startAndOpenCaseReview = startAndOpenCaseReview;

					CasesService
							.getOLGCasesDashboardCases()
							.then(
									function(response) {
										vm.getAllCaseDetails = response.data.caseList;
									}, function(error) {
										FlashService.error("ERROR");
									});
					
					
					function startAndOpenCaseReview(caseDetail) {
						CasesService
								.reviewCase(caseDetail)
								.then(
										function(response) {
											SharedDataService
													.setCaseReview({
														caseId : caseDetail.loanId,
														caseNumber : caseDetail.caseNumber,
														tab : 'endorsementReview'
													});
											$location.path('/caseReview');
										},
										function(error) {
											FlashService
													.error("Error starting review process");
										});
					}

					function openCaseReview(caseDetail) {
						SharedDataService.setCaseReview({
							caseId : caseDetail.loanId,
							caseNumber : caseDetail.caseNumber,
							tab : 'endorsementReview'
						});
						$location.path('/caseReview');
					}

				});
