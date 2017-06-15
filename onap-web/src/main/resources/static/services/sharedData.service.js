(function() {
    'use strict';

    angular
        .module('app')
        .factory('SharedDataService', ['$rootScope', '$window', '$location', 'Constants', SharedDataService]);

    function SharedDataService($rootScope, $window, $location, Constants) {
        var service = {},
        	caseReview = {},
        	appraisalLogging = {},
        	reserveFunds = {},
        	uploadDocuments = {},
        	adjustFundsReserved = {},
        	loanTabData = {};
        
        service.getCaseReview = getCaseReview;
        service.setCaseReview = setCaseReview;
        service.clearCaseReview = clearCaseReview;
        service.requireCaseReview = requireCaseReview;
        service.getAppraisalLogging = getAppraisalLogging;
        service.setAppraisalLogging = setAppraisalLogging;
        service.clearAppraisalLogging = clearAppraisalLogging;
        service.requireAppraisalLogging = requireAppraisalLogging;
        service.getReserveFunds = getReserveFunds;
        service.setReserveFunds = setReserveFunds;
        service.clearReserveFunds = clearReserveFunds;
        service.setUploadDocuments = setUploadDocuments;
        service.getUploadDocuments = getUploadDocuments;
        service.clearUploadDocuments = clearUploadDocuments;
        service.requireUploadDocuments = requireUploadDocuments;
        service.setLoanTabData = setLoanTabData;
        service.getLoanTabData = getLoanTabData;
        service.requireLoanTabData = requireLoanTabData;
        
        function getCaseReview() {
        	return caseReview;
        }
        
        function setCaseReview(newCaseReview) {
        	caseReview = newCaseReview;
        }
        
        function clearCaseReview() {
        	caseReview = {};
        	clearLoanTabData();
        }
        
        function requireCaseReview() {
        	if (angular.equals({}, caseReview)) {
        		$window.location.href = Constants.SERVER_URL;
        	}
        }
        
        function getAppraisalLogging() {
        	return appraisalLogging;
        }
        
        function setAppraisalLogging(newAppraisalLogging) {
        	appraisalLogging = newAppraisalLogging;
        }
        
        function clearAppraisalLogging() {
        	appraisalLogging = {};
        }
        
        function requireAppraisalLogging() {
        	if (angular.equals({}, appraisalLogging)) {
        		$window.location.href = Constants.SERVER_URL;
        	}
        }
        
        function getReserveFunds() {
        	return reserveFunds;
        }
        
        function setReserveFunds(newReserveFunds) {
        	reserveFunds = newReserveFunds;
        }
        
        function clearReserveFunds() {
        	reserveFunds = {};
        }
        
        function setUploadDocuments(newUploadDocuments) {
        	uploadDocuments = newUploadDocuments;
        }
        
        function getUploadDocuments() {
        	return uploadDocuments;
        }
        
        function clearUploadDocuments() {
        	uploadDocuments = {};
        }
        
        function requireUploadDocuments() {
        	if (angular.equals({}, uploadDocuments)) {
        		$window.location.href = Constants.SERVER_URL;
        	}
        }
        
        function getLoanTabData() {
        	return loanTabData;
        }
        
        function setLoanTabData(newLoanTabData) {
        	loanTabData = newLoanTabData;
        }
        
        function requireLoanTabData() {
        	if(angular.equals({}, loanTabData)) {
        		$window.location.href = Constants.SERVER_URL;
        	}
        }
        
        function clearLoanTabData(){
        	loanTabData = {};
        }
		
        return service;
    }

    })();