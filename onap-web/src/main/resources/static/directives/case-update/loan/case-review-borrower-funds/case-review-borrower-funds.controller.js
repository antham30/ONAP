(function() {
	'use strict';

	angular.module('app').controller(
			'caseReviewBorrowerFundsController',
			[ '$scope', '$http', '$window', '$rootScope', '$routeParams',
					'LoggingService', 'CommonFormService', 'CaseUpdateService',
					'FlashService', 'Constants', caseReviewBorrowerFundsController ]);

	function caseReviewBorrowerFundsController($scope, $http, $window,
			$rootScope, $routeParams, LoggingService, CommonFormService,
			CaseUpdateService, FlashService, Constants) {

		var vm = this;

		$scope.caseId = $routeParams.caseId;
		$scope.caseNumber = $routeParams.caseNumber;
		$scope.clearAllFields = function() {
			window.location.reload();
			$('#clearData').modal('hide');
		};

		vm.secondaryFinancingSourceCodeValidation = secondaryFinancingSourceCodeValidation;
		vm.secondaryFinancingAmountValidation = secondaryFinancingAmountValidation;
		vm.maskFieldsForGifts = maskFieldsForGifts;
		vm.calculateSellerContributionPercent = calculateSellerContributionPercent;
		vm.calculateTotalFixedDebtToIncomeRatio = calculateTotalFixedDebtToIncomeRatio;
		vm.resetBorrowerFundData = resetBorrowerFundData;
		vm.saveBorrowerFundToCloseData = saveBorrowerFundToCloseData;
		vm.validateForm = validateForm;
		vm.borrFundsvalidation = borrFundsvalidation;

		//Masking (ALL of the currencies are using caseReviewLoanController js's currency masks
		$('#monthsInReserve').inputmask('numeric', {
			integerDigits : 2,
			rightAlign : false,
			allowMinus : false,
			allowPlus : false,
			digits : 0
		});

		$('.currencyFund').inputmask('currency', {
			rightAlign : false,
			'autoUnmask' : true,
			allowMinus : false,
			allowPlus : false,
			integerDigits : 14,
			digits : 2
		});

		$('#sellerContributionPerc').inputmask('percentage', {
			integerDigits : 12,
			decimalProtect : false,
			rightAlign : false,
			'autoUnmask' : true,
			clearMaskOnLostFocus : false
		});

		$('#debtToIncomeRatio').inputmask('percentage', {
			integerDigits : 12,
			decimalProtect : false,
			rightAlign : false,
			'autoUnmask' : true,
			clearMaskOnLostFocus : false
		});

		//Dropdown Population
		CommonFormService.getReferenceCodes('GIFT SOURCE').then(
				function(response) {
					vm.giftOptions = response.data;
				});
		CommonFormService.getReferenceCodes('SECONDARY FINANCING SOURCE').then(
				function(response) {
					vm.secondaryFinancingOptions = response.data;
				});

		//Gift Ticket Methods
		$scope.removeGiftTicket = function(item) {
			var index = $scope.data.editable.giftTickets.indexOf(item);
			$scope.data.editable.giftTickets.splice(index, 1);
		};

		$scope.addGiftTicket = function() {
			if ($scope.data && $scope.data.editable) {
				if ($scope.data.editable.giftTickets
						&& $scope.data.editable.giftTickets.length < 5) {
					var emptyGiftTicket = new Object();
					emptyGiftTicket.amount = null;
					emptyGiftTicket.sourceCode = null;
					emptyGiftTicket.comment = null;
					$scope.data.editable.giftTickets.push(emptyGiftTicket);
				}
			}
		}

		function maskFieldsForGifts() {
			$('.giftCurrencyFund').inputmask('currency', {
				rightAlign : false,
				'autoUnmask' : true,
				allowMinus : false,
				allowPlus : false,
				digits : 2
			});
		}

		function resetBorrowerFundData() {
			CommonFormService.resetFormDataObj($scope.data);
			$('#clearBorrowerFundData').modal('hide');
		}

		function mapBorrowerDataOnRetrieve(data) {
			data.giftTickets = data.giftTickets || [];
			return data;
		}

		function mapBorrowerDataOnSave(data) {
			if (data.giftTickets) {
				data.giftTickets.forEach(function(ticket) {
					ticket.amount = ticket.amount || 0;
				});
			}
			return data;
		}

		function calculateSellerContributionPercent() {
			if ($scope.data && $scope.loanData && $scope.data.editable
					&& $scope.data.editable.sellerContributionAmount
					&& $scope.loanData.mortgWthtFnclLfFeeAmt) {
				var contributionAmount = Number($scope.data.editable.sellerContributionAmount);
				var baseLoanAmount = Number($scope.loanData.mortgWthtFnclLfFeeAmt);
				$scope.data.editable.sellerContributionPercent = Math
						.round(contributionAmount / baseLoanAmount * 100);
				return $scope.data.editable.sellerContributionPercent;
			}
		}

		function calculateTotalFixedDebtToIncomeRatio() {
			vm.debtToIncomeAmountError = false;
			if ($scope.data && $scope.loanData && $scope.data.editable
					&& angular.isDefined($scope.data.editable.grossIncome)) {
				var mortgagePayment = Number($scope.loanData.mortgPymntPiAmt);
				var taxes = Number($scope.loanData.realEstTxsAmt);
				var hazardFlood = Number($scope.loanData.hzrdFldAmt);
				var totalLiabilities = Number($scope.data.editable.totalLiabilities);
				var grossIncome = Number($scope.data.editable.grossIncome);

				$scope.data.editable.fixedDebtIncomeRatio = ((mortgagePayment
						+ taxes + hazardFlood + totalLiabilities) / grossIncome * 100).toFixed(2);
				
				if (grossIncome === 0) $scope.data.editable.fixedDebtIncomeRatio = 0;
				
				if ($scope.data.editable.fixedDebtIncomeRatio >= 100.00) {
					vm.debtToIncomeAmountError = true;
				}
				return $scope.data.editable.fixedDebtIncomeRatio;
			}
			else {
				if ($scope.data && $scope.data.editable) {
					$scope.data.editable.fixedDebtIncomeRatio = 0;
					return $scope.data.editable.fixedDebtIncomeRatio;
				}
			}
		}
		function secondaryFinancingAmountValidation() {

			$scope.secondaryFinancingSourceCode = false;
			$scope.secondaryFinancingAmount = false;
			if ($scope.data.editable.secondaryFinancingAmount != undefined
					&& $scope.data.editable.secondaryFinancingAmount != null
					&& $scope.data.editable.secondaryFinancingAmount != '') {
				if ($scope.data.editable.secondaryFinancingSourceCode != undefined
						&& $scope.data.editable.secondaryFinancingSourceCode != null
						&& $scope.data.editable.secondaryFinancingSourceCode != '') {

				} else {

					$scope.secondaryFinancingSourceCode = true;
				}
			} else {

			}
		}
		function secondaryFinancingSourceCodeValidation() {

			$scope.secondaryFinancingSourceCode = false;
			$scope.secondaryFinancingAmount = false;
			if ($scope.data.editable.secondaryFinancingSourceCode != undefined
					&& $scope.data.editable.secondaryFinancingSourceCode != null
					&& $scope.data.editable.secondaryFinancingSourceCode != '') {

				if ($scope.data.editable.secondaryFinancingAmount != undefined
						&& $scope.data.editable.secondaryFinancingAmount != null
						&& $scope.data.editable.secondaryFinancingAmount != ''
						&& $scope.data.editable.secondaryFinancingAmount !== 0) {

				} else {

					$scope.secondaryFinancingAmount = true;
				}
			} else {

			}
		}
		function borrFundsvalidation() {

			$scope.secondaryFinancingSourceCode = false;
			$scope.secondaryFinancingAmount = false;
			var statusCheckBFunds = false;

			if ($scope.data && $scope.data.editable.secondaryFinancingAmount != undefined
					&& $scope.data.editable.secondaryFinancingAmount != null
					&& $scope.data.editable.secondaryFinancingAmount != '') {
				if ($scope.data.editable.secondaryFinancingSourceCode != undefined
						&& $scope.data.editable.secondaryFinancingSourceCode != null
						&& $scope.data.editable.secondaryFinancingSourceCode != '') {

				} else {

					statusCheckBFunds = true;
					$scope.secondaryFinancingSourceCode = true;
				}
			} else {

			}

			if ($scope.data && $scope.data.editable.secondaryFinancingSourceCode != undefined
					&& $scope.data.editable.secondaryFinancingSourceCode != null
					&& $scope.data.editable.secondaryFinancingSourceCode != '') {
				if ($scope.data.editable.secondaryFinancingAmount != undefined
						&& $scope.data.editable.secondaryFinancingAmount != null
						&& $scope.data.editable.secondaryFinancingAmount != '') {

				} else {

					statusCheckBFunds = true;
					$scope.secondaryFinancingAmount = true;
				}
			} else {

			}

			if (statusCheckBFunds == false) {
				return true;
			} else {
				return false
			}

		}

		function saveBorrowerFundToCloseData() {
			var stats = borrFundsvalidation();

			if (stats == true) {

				var caseNumber = caseNumber || $scope.caseNumber;
				var data = mapBorrowerDataOnSave($scope.data.editable);

				if (validateForm()) {
					return CaseUpdateService
							.saveBorrowerFundToCloseData(data)
							.then(
									function(response) {
										FlashService
												.success("Fund to Close data was saved successfully.");
										// Update data
										var formattedData = mapBorrowerDataOnRetrieve(response.data)
										$scope.data = CommonFormService
												.createFormDataObj(formattedData);
									})
				} else {
					return false;
				}
			}
		}

		function validateSellerContributionPercent() {
			if ($scope.data && $scope.data.editable) {
				return Number($scope.data.editable.sellerContributionPercent) < 6;
			}
		}

		function validateGiftTickets() {
			if ($scope.data && $scope.data.editable) {
				var returnValue = true;
				if ($scope.data.editable.giftTickets.length > 0) {
					$scope.data.editable.giftTickets.forEach(function(ticket,
							index) {
						//amount cannot be null or 0
						var amountCondition = ticket.amount
								&& ticket.amount > 0;
						vm["giftAmountError" + index] = !amountCondition;
						if (!amountCondition) {
							returnValue = amountCondition;
						}
						//sourceCode cannot be null or empty
						var sourceCondition = ticket.sourceCode
								&& ticket.sourceCode != "";
						vm["giftSourceError" + index] = !sourceCondition;
						if (!sourceCondition) {
							returnValue = sourceCondition;
						}
						//comment cannot be null or empty
						var commentCondition = ticket.comment
								&& ticket.comment != "";
						vm["giftCommentError" + index] = !commentCondition;
						if (!commentCondition) {
							returnValue = commentCondition;
						}
					});
				}
				return returnValue;
			}
		}
		
		function validateFixedDebtIncomeRatio() {
			return $scope.data.editable.fixedDebtIncomeRatio < 100;
		}
		
		function validateForm() {
			if ($scope.data && $scope.data.editable) {
				if (validateSellerContributionPercent()
						&& validateGiftTickets()) {
					return true;
				}
			}
			return false;
		}
	}

})();
