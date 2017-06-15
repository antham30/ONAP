/*
 * This is the exemplar controller (Loan Search).  Please follow this for proper coding guidance.
 */
(function() {
    'use strict';

    angular.module('app')
        .controller('LoanSearchController', LoanSearchController);

    // manually inject to avoid minification errors.
    LoanSearchController.$inject = ['$rootScope', 'LoanSearchService', 'FlashService', 'ExtApiService', '$http', '$location', '$scope', '$window', '$timeout', '$q', '$anchorScroll', 'Constants', 'LoggingService', 'commonService', 'SharedDataService'];

    function LoanSearchController($rootScope, LoanSearchService, FlashService, ExtApiService, $http, $location, $scope, $window, $timeout, $q, $anchorScroll, Constants, LoggingService, commonService, SharedDataService) {
    	
        var vm = this;
        vm.searchComplete = false;
        vm.leapSearchComplete = false;
        vm.user = null;
        vm.showAppraisalBtn = ($location.path() === '/loanSearch/appraisalLogging');
        vm.showUploadDocsBtn = ($location.path() === '/loanSearch/endorsement');
        vm.showAdjustFundsReservedBtn = ($location.path() === '/loanSearch/adjustFundsReserved');

        // hoisted functions in the view model ($scope)
        vm.searchLoans = searchLoans;
        vm.searchLenders = searchLenders;
        vm.refreshCache = refreshCache;
        vm.validateCaseId = validateCaseId;
        vm.resetLoan = resetLoan;
        vm.resetCaseId = resetCaseId;
        vm.requiresAppraisalLogging = requiresAppraisalLogging;
        vm.openCaseReview = openCaseReview;
        vm.openAppraisalLogging = openAppraisalLogging;
        vm.openUploadDocuments = openUploadDocuments;
        
        $timeout(function(){
        	var caseIdInput = angular.element("#caseId");
        	caseIdInput.focus();
        	caseIdInput.attr("autofocus", true);
        });
        
        function requiresAppraisalLogging(loan) {
        	var loanType = loan.loanType,
        		loanPurpose = loan.loanPurpose;
        	
        	if (loanPurpose === 'STREAMLINE WITHOUT APPRAISAL' && loanType === 'REFINANCE') {
        		return false;
        	}
        	else {
        		if (loanPurpose !== 'STREAMLINE WITHOUT APPRAISAL') {
        			return true;
        		}
        		else {
        			return false;
        		}
        	}
        }

        // use mask to format caseId
        $('#caseId').mask('000-000000');
        var caseIdRegex = /^[0-9]{3}\-[0-9]{6}$/;

        function resetLoan() {
        	vm.loan = null;
        }
        
        function resetCaseId() {
        	$scope.searchloanId = '';
        }
        
        function getLenderId() {
        	var abc = JSON.parse($window.sessionStorage.getItem("abc"));
        	return abc !== null ? abc.split('##')[0] : null;
        }

        function searchLoans() {
            if (!validateCaseId($scope.searchloanId)) {
            	FlashService.error(Constants.ERROR_MESSAGES.CASE_NUMBER_INVALID);
            	resetLoan();
            	return;
            }
            var caseId = $scope.searchloanId; // bind to the searchbox's value.
            var lenderId = getLenderId();
	        vm.leapSearchComplete = false;
	
	       // The search service will return a promise, so use the .then() function to invoke searchLoanComplete.	
	       LoanSearchService.searchById(caseId, lenderId)
	           .then(function(response) {
	                if (response.success) {
	
	                    // update the search complete flag to be true. if is true, the view shows the results table.
	                    vm.searchComplete = true;
	
	                    // clears the status message
	                    FlashService.removeFlashMessage();
	
	                    // check to see if there were any loans that matched the ID passed in.
	                    if (response.data.status === 'ERROR') {
	                    	var errorMessage;
	                    	if (response.data.errorCode === 'ONAP.CaseLenderAssociationMismatch') {
	                    		errorMessage = Constants.ERROR_MESSAGES.CASE_INSTITUTION_ERROR;
	                    	}
	                    	else {
	                    		errorMessage = Constants.ERROR_MESSAGES.CASE_NOT_FOUND;
	                    	}
	                        FlashService.error(errorMessage);
	                        resetLoan();
	                        resetCaseId();
	                    } else {
	    	                    // Update the view model with the response.   
	    	                    vm.loan = response.data;
	    	                    
	    	                    if(vm.showAppraisalBtn && !requiresAppraisalLogging(vm.loan)){
	    	                    	FlashService.info(Constants.INFO_MESSAGES.APPRAISAL_LOGGING_WARNING);
	    	                    }
	    	                    else{
	    	                    	FlashService.success(Constants.SUCCESS_MESSAGES.ONE_RECORD_FOUND);
	    	                    }
	                    }
	                } else {
	                    // an error occurred, pass the error object to the handler.
	                    searchLoanErrorHandler(response.error);
	                }
	            });
        }
        
        function validateCaseId(caseId) {
        	return caseIdRegex.test(caseId);
        }
        
        function searchLoanErrorHandler(error) {

            // An unhandled API exception is handled in the presentation layer.  This is an example of 
            // how to handle that or any raised exception from the API.
            if (error.exception == "org.springframework.beans.TypeMismatchException") {
                // The search was of the wrong type, display an error showing that.
                FlashService.error(Constants.ERROR_MESSAGES.TYPE_ERROR);
            } else {
                // An unknown exception occured, display it.
                FlashService.error(Constants.ERROR_MESSAGES.SEARCH_ERROR);
            }
        }

        function refreshCache() {
            // clear the cache and recall search.
            FlashService.info(Constants.INFO_MESSAGES.CACHE_CLEAR_SEARCH_REDO);
            vm.loan = [{
                "loanId": "",
                "adpCd": "",
                "borrowerType": "",
                "borrowerName": "",
                "originatorName": "",
                "loanStatus": ""
            }];

            LoanSearchService.clearCacheLoanId($scope.searchloanId);
            searchLoans();
            FlashService.info("Cache cleared.");
        }

        // This controller function is not exemplar.  Follow Loan Search's patterns.
        function searchLenders() {
            ExtApiService.getLeapLenderData($scope.searchLenderId)
                .success(function(response) {
                    $scope.leap = response.lenderSearchResults;
                    // clears the status message
                    FlashService.removeFlashMessage();
                })
                .error(function(error) {
                    FlashService.error(Constants.ERROR_MESSAGES.SEARCH_ERROR);
                });

            vm.searchComplete = false;
            vm.leapSearchComplete = true;
        }
        
        function openCaseReview(caseId, caseNumber, hash) {
        	SharedDataService.setCaseReview({
        		caseId: caseId,
        		caseNumber: caseNumber,
        		tab: 'loan'
        	});
        	var path = '/caseReview';
        	$location.path(path);
        	// $anchorScroll(hash);
        }
        
        function openAppraisalLogging(caseId, caseNumber) {
        	SharedDataService.setAppraisalLogging({
        		caseId: caseId,
        		caseNumber: caseNumber
        	});
        		
        	$location.path('/appraisalLogging');
        }
        
        function openUploadDocuments(caseId, caseNumber) {
        	SharedDataService.setUploadDocuments({
        		caseId: caseId,
        		caseNumber: caseNumber
        	});
        		
        	$location.path('/endorsement');
        }
    }

})();