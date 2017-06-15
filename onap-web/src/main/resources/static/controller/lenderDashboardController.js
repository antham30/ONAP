angular
		.module('app')

		.controller(
				"lenderDashboardCon",
				function($scope, $http, $window, $rootScope, DTOptionsBuilder,
						DTColumnDefBuilder, LoggingService, CasesService,
						Excel, $timeout, Calculator, $location, commonService,
						SharedDataService, FlashService) {

					$scope.dtOptions = DTOptionsBuilder.newOptions().withDOM(
							'C<"clear">lfrtip').withLanguage({
						sSearchPlaceholder : 'Search all cases'
					});

					$scope.exportToExcel = function(tableId) { // ex:
																// '#my-table'
						var exportHref = Excel.tableToExcel(tableId,
								'WireWorkbenchDataExport');
						$timeout(function() {
							location.href = exportHref;
						}, 100); // trigger download
					}
					
					$scope.isSuspendedCase = function(status) {
						return status.toUpperCase().indexOf('SUSPENDED') !== -1;
					}
					$scope.getCaseDetails = function() {

						var loggedUserInfo = JSON.parse($window.sessionStorage
								.getItem("abc"));

						if (loggedUserInfo !== undefined
								&& loggedUserInfo !== null
								&& loggedUserInfo !== '') {
							var lenderId = loggedUserInfo.split('##')[0];

							$http({
								method : 'POST',
								url : 'getDashBoardCases',
								headers : {
									"Content-Type" : "application/json",
									"Accept" : "application/json"
								},
								data : lenderId
							})
									.success(
											function(response) {
												if (response.status == "SUCCESS") {
													$scope.getAllCaseDetails = response.dashBoardCases;

													for (i = 0; i < $scope.getAllCaseDetails.length; i++) {

														if ($scope.getAllCaseDetails[i].caseAssignmentDate !== null) {
															$scope.getAllCaseDetails[i].caseAssignmentDate = new Date(
																	$scope.getAllCaseDetails[i].caseAssignmentDate);
															var dd = $scope.getAllCaseDetails[i].caseAssignmentDate
																	.getDate();
															var mm = $scope.getAllCaseDetails[i].caseAssignmentDate
																	.getMonth() + 1; // January
																						// is
																						// 0!

															var yyyy = $scope.getAllCaseDetails[i].caseAssignmentDate
																	.getFullYear();
															$scope.getAllCaseDetails[i].caseAssignmentDate = mm
																	+ '/'
																	+ dd
																	+ '/'
																	+ yyyy;
														} else {
															$scope.getAllCaseDetails[i].caseAssignmentDate = '';
														}
														if ($scope.getAllCaseDetails[i].fundRsrvdDate !== null) {
															$scope.getAllCaseDetails[i].fundRsrvdDate = new Date(
																	$scope.getAllCaseDetails[i].fundRsrvdDate);
															var dd1 = $scope.getAllCaseDetails[i].fundRsrvdDate
																	.getDate();
															var mm1 = $scope.getAllCaseDetails[i].fundRsrvdDate
																	.getMonth() + 1; // January
																						// is
																						// 0!

															var yyyy1 = $scope.getAllCaseDetails[i].fundRsrvdDate
																	.getFullYear();
															$scope.getAllCaseDetails[i].fundRsrvdDate = mm1
																	+ '/'
																	+ dd1
																	+ '/'
																	+ yyyy1;
														} else {
															$scope.getAllCaseDetails[i].fundRsrvdDate = '';
														}
														/** ** funds expiered* */
														if ($scope.getAllCaseDetails[i].fundExpirationDate !== null) {
															$scope.getAllCaseDetails[i].fundExpirationDate = new Date(
																	$scope.getAllCaseDetails[i].fundExpirationDate);
															var dd3 = $scope.getAllCaseDetails[i].fundExpirationDate
																	.getDate();
															var mm3 = $scope.getAllCaseDetails[i].fundExpirationDate
																	.getMonth() + 1; // January
																						// is
																						// 0!

															var yyyy3 = $scope.getAllCaseDetails[i].fundExpirationDate
																	.getFullYear();
															$scope.getAllCaseDetails[i].fundExpirationDate = mm3
																	+ '/'
																	+ dd3
																	+ '/'
																	+ yyyy3;
														} else {
															$scope.getAllCaseDetails[i].fundExpirationDate = '';
														}
														/** ** funds expiered* */
														if ($scope.getAllCaseDetails[i].caseExpirationDate !== null) {
															$scope.getAllCaseDetails[i].caseExpirationDate = new Date(
																	$scope.getAllCaseDetails[i].caseExpirationDate);
															var dd2 = $scope.getAllCaseDetails[i].caseExpirationDate
																	.getDate();
															var mm2 = $scope.getAllCaseDetails[i].caseExpirationDate
																	.getMonth() + 1; // January
																						// is
																						// 0!

															var yyyy2 = $scope.getAllCaseDetails[i].caseExpirationDate
																	.getFullYear();
															$scope.getAllCaseDetails[i].caseExpirationDate = mm2
																	+ '/'
																	+ dd2
																	+ '/'
																	+ yyyy2;
														} else {
															$scope.getAllCaseDetails[i].caseExpirationDate = '';
														}
														$scope.getAllCaseDetails[i].loanGuaranteeFee = (Number($scope.getAllCaseDetails[i].loanGuaranteeFee) + Number($scope.getAllCaseDetails[i].loanAmount))
																.toFixed(2)
																.replace(
																		/(\d)(?=(\d{3})+\.)/g,
																		'$1,');
														$scope.getAllCaseDetails[i].loanAmount = Number(
																$scope.getAllCaseDetails[i].loanAmount)
																.toFixed(2)
																.replace(
																		/(\d)(?=(\d{3})+\.)/g,
																		'$1,');

														var x = $scope.getAllCaseDetails[i].caseNumber
																.split('-');
														var y = x[1].charAt(0);

														if (y == 2) {

															$scope.getAllCaseDetails[i]['showHrefLink'] = true;

														} else {

															$scope.getAllCaseDetails[i]['showHrefLink'] = false;

														}

													}
												} else {
													FlashService
															.error(response.errorMessage);
												}
											})
									.error(
											function() {
												FlashService
														.error(Constants.ERROR_MESSAGES.LENDER_DASHBOARD_RETRIEVAL_ERROR);
											});
						}
					}
					$scope.getCaseDetails();

					$scope.openCaseReview = function(caseId, caseNumber) {
						SharedDataService.setCaseReview({
							caseId : caseId,
							caseNumber : caseNumber
						});
						$location.path('/caseReview');
					}

				});

angular
		.module('app')
		.factory(
				'Excel',
				function($window) {
					var uri = 'data:application/vnd.ms-excel;base64,', template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>', base64 = function(
							s) {
						return $window.btoa(unescape(encodeURIComponent(s)));
					}, format = function(s, c) {
						return s.replace(/{(\w+)}/g, function(m, p) {
							return c[p];
						})
					};
					return {
						tableToExcel : function(tableId, worksheetName) {
							var table = $(tableId), ctx = {
								worksheet : worksheetName,
								table : table.html()
							}, href = uri + base64(format(template, ctx));
							return href;
						}
					};
				})
