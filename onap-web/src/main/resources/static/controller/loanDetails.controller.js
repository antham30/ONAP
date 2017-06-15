(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoanDetailsController', LoanDetailsController);

    // manually inject to avoid minification errors.
	LoanDetailsController.$inject = ['LoanDetailsService', '$scope', '$routeParams' ];
	
	function LoanDetailsController(LoanDetailsService, $scope, $routeParams) {
		var vm = this;
		vm.user = null;
		vm.loanId = "";
		vm.showBorrowers = false;
		vm.showCaseDetail = true;
		
		// tab loaded flags
		var loanDetailsLoaded = false;
		var borrowerInformationLoaded = false;
		var propertyDetailsLoaded = false;
		var worksheetLoaded = false;
		var fundsToCloseLoaded = false;
		
		// hoisted functions in the view model ($scope)
		vm.detailsById = detailsById;
		vm.borrowerDetailsByLoanId = borrowerDetailsByLoanId;
		vm.propertyDetailsByLoanId = propertyDetailsByLoanId;
		vm.worksheetByLoanId = worksheetByLoanId;
		vm.fundsToCloseByLoanId = fundsToCloseByLoanId;
		
		activate();
		
		function activate() {
			loadCurrentUser();
			vm.loanId = $routeParams.loanId;
			detailsById(vm.loanId);
		}

		function detailsById(id) {
			if (!loanDetailsLoaded) { // only load once per page view (cached in the presentation layer)
				vm.caseDetailsLoading = true;
				LoanDetailsService.getLoanDetailsById(id).success(
					function(response) {
						vm.loanDetails = response;
						vm.caseDetailsLoading = false;
						loanDetailsLoaded = true;
						
					}).error(function() {
						vm.loanDetails = {};
						vm.caseDetailsLoading = false; 
				});
			}
			
		}

		function borrowerDetailsByLoanId(id) {
			if (!borrowerInformationLoaded) { // only load once per page view.
				LoanDetailsService.getBorrowerDetailsByLoanId(id).success(
						function(response) {
							vm.borrowDetails = response;
							borrowerInformationLoaded = true;
							
						}).error(function() {
					vm.loanDetails = {};
	
				});
			}
		}

		function propertyDetailsByLoanId(id) {
			if (!propertyDetailsLoaded) { // only load once per page view.
				$scope.borrowerDetailsLoading = true;
	
				LoanDetailsService.getRealPropertyDetailsByLoanId(id).success(
					function(response) {
						vm.propertyDetails = response;
						propertyDetailsLoaded = true;
					})
					.error(function() {
						vm.propertyDetails = {};
					});
				$scope.borrowerDetailsLoading = false;
			}
		}

		function worksheetByLoanId(id) {
			if (!worksheetLoaded) { // only load once per page view.
				LoanDetailsService.getWorksheetByLoanId(id).success(
					function(response) {
						vm.worksheetDetails = response;
						worksheetLoaded = true;
					})
					.error(function() {
						vm.worksheetDetails = {};
				});
			}
		}
		
		function fundsToCloseByLoanId(id) {
			if (!fundsToCloseLoaded) { // only load once per page view.
				LoanDetailsService.getFundsToCloseByLoanId(id).success(
					function(response) {
						vm.fundsToCloseDetails = response;
						fundsToCloseLoaded = true;
					})
					.error(function() {
						vm.worksheetDetails = {};
				});
			}
		}

		function documentsByLoadId(id) { //TODO: Check if this is used anywhere.
			console.log(id);
		}


		function loadCurrentUser() {
			vm.user = $scope.globals.currentUser;
		}

		return this;

	}

})();
