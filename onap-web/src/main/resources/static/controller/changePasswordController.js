var encryptService = angular.module('encryptService', []).service('Calculator',
		function() {
			var iv = "00000000000000000000000000000000";
			var salt = "00000000000000000000000000000000";
			var keySize = 128;
			var iterationCount = 10000;
			var pPhrase = "aesalgoisbestbes";
			var aesUtil = new AesUtil(keySize, iterationCount);
			this.squareDec = function(a) {

				var ab = aesUtil.decrypt(salt, iv, pPhrase, a);

				return ab;
			};
			this.squareEnc = function(ab) {

				var abc = aesUtil.encrypt(salt, iv, pPhrase, ab);

				return abc;
			}

		});
angular
		.module('app')
		.controller(
				"changePasswordController",
				function($scope, $http, $window, $rootScope, $routeParams,
						LoggingService, Calculator, Constants, FlashService) {
					$scope.showErrorMsg = function() {
						var nInfo = document.getElementById("info1").value;
						$scope.newPassErrShow = false;
						if (nInfo != undefined  && nInfo != '') {

							if (nInfo
									.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
								$scope.newPassErrShow = false;
							} else {

								$scope.newPassErrMsg = Constants.ERROR_MESSAGES.INFO_INVALID;

								$scope.newPassErrShow = true;
							}

						} else {

							$scope.newPassErrMsg = Constants.INFO_MESSAGES.ENTER_NINFO;
							$scope.newPassErrShow = true;

						}

					}
					$scope.showConfrmErrorMsg = function() {
						var cInfo = document.getElementById("info2").value;
						var nInfo = document.getElementById("info1").value;
						$scope.cPassErrShow = false;
						
						if (cInfo != undefined  && cInfo != '') {

							if (nInfo === cInfo) {

								$scope.cPassErrShow = false;

							} else {
								$scope.confrmPassErrMsg = Constants.ERROR_MESSAGES.CONFIRM_INFO_ERROR;
								$scope.cPassErrShow = true;
								
							}

						} else {
							$scope.confrmPassErrMsg = Constants.INFO_MESSAGES.ENTER_INFO_CINFO;
							$scope.cPassErrShow = true;
							
						}

					}
					$scope.changePwdValidation = function() {

						var currentInfo = document.getElementById("infoClient").value;
						var nInfo = document.getElementById("info1").value;
						var cInfo = document.getElementById("info2").value;
						$scope.currentPassErrShow = false;
						$scope.newPassErrShow = false;
						$scope.conformPassErrShow = false;
						$scope.changePassErrShow = false;

						var statusCheck = false;
						$scope.cPassErrShow = false;
						$rootScope.userInfo = JSON.parse($window.sessionStorage
								.getItem("activeUser"));

						if (currentInfo != undefined 
								&& currentInfo != '') {

							statusCheck = false;
						} else {
							$scope.currentPassErrMsg = Constants.INFO_MESSAGES.ENTER_INFO_OINFO;
							$scope.currentPassErrShow = true;
							statusCheck = true;
						}

						if (nInfo != undefined &&  nInfo != '') {

							if (nInfo
									.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
								statusCheck = false;
							} else {

								$scope.newPassErrMsg = Constants.ERROR_MESSAGES.INFO_INVALID;
								statusCheck = true;
								$scope.newPassErrShow = true;
							}

						} else {

							$scope.newPassErrMsg = Constants.INFO_MESSAGES.ENTER_NINFO;
							$scope.newPassErrShow = true;
							statusCheck = true;

						}

						if (cInfo != undefined && cInfo != '') {

							if (nInfo === cInfo) {

								statusCheck = false;

							} else {
								$scope.confrmPassErrMsg = Constants.ERROR_MESSAGES.CONFIRM_INFO_ERROR;
								$scope.cPassErrShow = true;
								statusCheck = true;
							}

						} else {
							$scope.confrmPassErrMsg = Constants.INFO_MESSAGES.ENTER_INFO_CINFO;
							$scope.cPassErrShow = true;
							statusCheck = true;
						}
						if (statusCheck) {
							return false;
						} else {
							return true;
						}
					}

					$scope.changeinfoClient = function() {

						var checkPass = $scope.changePwdValidation();

						if (checkPass) {

							$scope.changePass.oldInfo = Calculator
									.squareEnc($scope.changePass.oldInfo);
							$scope.changePass.newInfo = Calculator
									.squareEnc($scope.changePass.newInfo);
							$scope.changePass.confrmInfo = Calculator
									.squareEnc($scope.changePass.confrmInfo);

							$scope.changeInfos = {
								"userName" : $rootScope.userInfo.loggedUser,
								"oldInfo" : $scope.changePass.oldInfo,
								"newInfo" : $scope.changePass.newInfo
							}
							$http({
								method : "POST",
								url : 'resetInfo',
								headers : {
									"Content-Type" : "application/json",
									"Accept" : "application/json"
								},
								data : $scope.changeInfos
							})
									.success(
											function(response) {
												$scope.response = response;
												if (response.status == "SUCCESS") {
													FlashService
															.success(Constants.SUCCESS_MESSAGES.INFO_UPDATED);

													$window.sessionStorage
															.clear();
													window.location.reload();
												} else if (response.status == "ERROR") {
													FlashService
															.error(response.errorMessage);
													$scope.changePass.oldInfo = '';
													$scope.changePass.newInfo = '';
													$scope.changePass.confrmInfo = '';

												} else {
													FlashService
															.error(Constants.ERROR_MESSAGES.CHANGE_INFO_ERROR);
												}

											})
									.error(
											function() {
												FlashService
														.error(Constants.ERROR_MESSAGES.CHANGE_INFO_RESPONSE_ERROR);

											});
						}
					}

				});
