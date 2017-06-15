(function() {
	'use strict';
	// Module definition
	angular
		.module('AdjustFundsReserved', []);
	
	// Controller definition
	angular
		.module('AdjustFundsReserved')
		.controller('adjustFundsReservedCtrl', ['$scope', '$q', '$timeout', '$window', '$filter', 'FlashService', 'CaseUpdateService', 'DocumentService', 'CommonFormService', 'Constants', adjustFundsReservedCtrl]);
	
	function adjustFundsReservedCtrl($scope, $q, $timeout, $window, $filter, FlashService, CaseUpdateService, DocumentService, CommonFormService, Constants) {

		var vm = this;
		vm.confirmFundsChange = confirmFundsChange;
		vm.disableModificationForm = disableModificationForm;
		vm.calcRofMax = calcRofMax;
		vm.viewReservationOfFunds = viewReservationOfFunds;
		
		// Datatables setup
		
		function initController() {
			CaseUpdateService.getROFModificationList($scope.caseId)
				.then(function(response) {
					if (CommonFormService.isSuccess(response)) {
						vm.modsList = response.data.loanCohortModPojoList;
					}
					else {
						if (CommonFormService.isError(response)) {
							FlashService.error(Constants.ERROR_MESSAGES.ROF_MODIFICATIONS_RETRIEVAL_ERROR);
						}
					}
				})
		}
		
		function confirmFundsChange(reservedFundsAmount) {
			var fundsAmt = parseFloat(reservedFundsAmount || vm.adjustedReservationAmt);
			// Call service with fundsAmt
			CaseUpdateService.submitROFModification($scope.caseId, fundsAmt)
				.then(function(response) {
					if (CommonFormService.isOk(response)) {
						// Prepend to modifications list
						if (response.data && response.data.loanCohortModPojo) {
							// Add mod to list
							vm.modsList.splice(1, 0, response.data.loanCohortModPojo);
							
							// Reset ROF amount
							$scope.rofAmount = response.data.loanCohortModPojo.modFirmCommitmentAmount;
							FlashService.success("Modification successfully added.");
						}
						else {
							FlashService.error("An error occurred while adding adjustment.");
						}
					}
					else if (CommonFormService.isError(response)) {
							FlashService.error("An error occurred while adding adjustment.");
						}
					});
		}
		
		function viewReservationOfFunds(details) {

			var isIE = window.navigator && window.navigator.msSaveOrOpenBlob;
			var popup;
			if(!isIE) {
				popup = $window.open('','_blank');
			}

			return DocumentService.openDocument(details.documentId, details.documentName)
				.then(function(response) {
					if (response.success && response.data.status === 'SUCCESS') {
						var blob = DocumentService.b64toBlob(response.data.noticePDF, 'application/pdf', null);
						if (isIE) {
							window.navigator.msSaveOrOpenBlob(blob, response.data.documentName);
						}
						else {
							var blobUrl = URL.createObjectURL(blob);
							popup.location.href = blobUrl;
						}
					}
					else if (response.data.status === 'ERROR' || response.error) {
						if (popup) popup.close();
						FlashService.error(response.data.errorMessage);
					}
				}, function(response) {
					FlashService.error(Constants.ERROR_MESSAGES.DOCUMENT_RETRIEVAL_ERROR);
				})
		}
		
		// Currency mask formatting
		$('.currency').inputmask('currency', {
			rightAlign : false,
			autoUnmask : true,
			unmaskAsNumber: true,
			allowMinus: true,
			negationSymbol: {front: '-', back: ''},
			allowPlus: false,
			integerDigits: 8,
			digits: 2
		});
		
		function disableModificationForm() {
			return !$scope.cohortNumber;
		}
		
		function calcRofMax() {
			var lgFeeFinanced = parseFloat($scope.grnteeFeeFncdAmt);
			var baseLoanAmount = parseFloat($scope.mortgWthtFnclLfFeeAmt);
			if (vm.adjustedReservationAmt > roundCurrency(lgFeeFinanced) + roundCurrency(baseLoanAmount)) {
				vm.adjustedReservationAmt = roundCurrency(lgFeeFinanced) + roundCurrency(baseLoanAmount);
			}
		}
		
		function roundCurrency(num) {
			return Math.round(num * 100) / 100;
		}
		
		initController();
		
	}
}());