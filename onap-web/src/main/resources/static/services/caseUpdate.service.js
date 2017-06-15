(function () {
    'use strict';

    angular
        .module('app')
        .factory('CaseUpdateService', ['$http', '$q', '$timeout', 'Constants', CaseUpdateService]);

    function CaseUpdateService($http, $q, $timeout, Constants) {
        var service = {};
        
        service.getCaseReviewBorrowerFundsData = getCaseReviewBorrowerFundsData;
        service.getLoanForCase = getLoanForCase;
        service.getPropertyForCase = getPropertyForCase;
        service.getMaxMortgageLimitAmt = getMaxMortgageLimitAmt;
        service.getBorrowersForCase = getBorrowersForCase;
        service.getPersonForCase = getPersonForCase;
        service.saveLoanInfo = saveLoanInfo;
        service.getLoanCalculations = getLoanCalculations;
        service.saveBorrowerFundToCloseData = saveBorrowerFundToCloseData;
        service.reserveFunds = reserveFunds;
        service.generateNoticePdf = generateNoticePdf;
        service.getUnderWriters = getUnderWriters;
        service.getLoanOfficers = getLoanOfficers;
        service.getSponsorBrokers = getSponsorBrokers;
        service.getCountiesForState = getCountiesForState;
        service.eSign = eSign;
        service.getDocumentList = getDocumentList;
        service.retrievePDF = retrievePDF;
        service.verifyUnderwriter = verifyUnderwriter;
        service.updateCase = updateCase;
        service.getFullName = getFullName;
        service.getROFModificationList = getROFModificationList;
        service.invokeReviewCase = invokeReviewCase;
        service.submitROFModification = submitROFModification;
        service.getLoanEndorsementReview = getLoanEndorsementReview;
        service.saveLoanEndorsementReview = saveLoanEndorsementReview;
        
        //**activeTab
        service.activeTab = activeTab;
        
        function getCaseReviewBorrowerFundsData(caseNumber) {
        	return $http.get(Constants.API_ENDPOINTS.GET_BORROWER_FUND_TO_CLOSE.replace(":caseNumber", caseNumber))
            .then(searchSuccess, searchFailure);
        }
        
        function getLoanForCase(caseId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_LOAN_FOR_CASE.replace(":caseId", caseId), {
        		cache: true
        	})
            .then(searchSuccess, searchFailure);
        }
        
        function getPropertyForCase(caseId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_PROPERTY_FOR_CASE.replace(":caseId", caseId), {
        		cache: true
        	})
            .then(searchSuccess, searchFailure);
        }
        
        function getPersonForCase(caseId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_PERSON_FOR_CASE.replace(":caseId", caseId), {
        		cache: true
        	})
            .then(searchSuccess, searchFailure);
        }
        
        function getMaxMortgageLimitAmt(stateCd, countyNm, nbrUnits) {
        	return $http.get(Constants.API_ENDPOINTS.GET_MAX_MORTGAGE_LIMIT
        						.replace(":stateCd", stateCd)
        						.replace(":countyNm", countyNm)
        						.replace(":nbrUnits", nbrUnits), 
        				{
        					cache: true
        				}
        	).then(searchSuccess, searchFailure);
        }
        
        function getBorrowersForCase(caseId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_BORROWERS_FOR_CASE.replace(":caseId", caseId), {
        		cache: true
        	})
            .then(searchSuccess, searchFailure);
        }
        
        function getLoanCalculations(loanId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_LOAN_CALCULATIONS.replace(":loanId", loanId))
            .then(searchSuccess, searchFailure);
        }
        
        function saveLoanInfo(loanId, data) {
        	return $http.post(Constants.API_ENDPOINTS.SAVE_LOAN_CALCULATIONS.replace(":loanId", loanId), data)
            	.then(searchSuccess, searchFailure);
        }
        
        function reserveFunds(loanId, data) {
        	return $http.post(Constants.API_ENDPOINTS.RESERVE_FUNDS.replace(":loanId", loanId), data)
            	.then(searchSuccess, searchFailure);
        }
        
        function generateNoticePdf(data) {
        	return $http.post(Constants.API_ENDPOINTS.GENERATE_PDF_NOTICE, data)
        		.then(searchSuccess, searchFailure);
        }
        
        function saveBorrowerFundToCloseData(data) {
        	return $http.post(Constants.API_ENDPOINTS.SAVE_BORROWER_FUND_TO_CLOSE, data)
    			.then(searchSuccess, searchFailure);
        }
        
        function getUnderWriters() {
        	return $http.get(Constants.API_ENDPOINTS.GET_UNDERWRITERS, {
        		cache: true
        	})
        	.then(searchSuccess, searchFailure);
        }
        
        function getSponsorBrokers(lenderId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_SPONSOR_BROKERS.replace(":lenderId", lenderId), {
        		cache: true
        	})
        	.then(searchSuccess, searchFailure);
        }
        
        function getLoanOfficers() {
        	return $http.get(Constants.API_ENDPOINTS.GET_LOAN_OFFICERS, {
        		cache: true
        	})
        	.then(searchSuccess, searchFailure);
        }
        
        function getCountiesForState(stateCd) {
        	return $http.get(Constants.API_ENDPOINTS.GET_COUNTIES_FOR_STATE.replace(":stateCd", stateCd), {
        		cache: true
        	})
        	.then(searchSuccess, searchFailure);
        }
        
        function eSign(data) {
        	return $http.post(Constants.API_ENDPOINTS.RESERVE_FUND_ESIGN, data)
    			.then(searchSuccess, searchFailure);
        }
        
        function getDocumentList(loanId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_DOCUMENT_LIST.replace(":loanId", loanId))
            .then(searchSuccess, searchFailure);
        }
        
        function retrievePDF(data) {
        	return $http.post(Constants.API_ENDPOINTS.RETRIEVE_PDF, data)
            	.then(searchSuccess, searchFailure);
        }
        
        function verifyUnderwriter(data) {
        	return $http.post(Constants.API_ENDPOINTS.VERIFY_UNDERWRITER, data)
				.then(searchSuccess, searchFailure);
        }
        
        function updateCase(data) {
        	return $http.post(Constants.API_ENDPOINTS.UPDATE_CASE, data)
				.then(searchSuccess, searchFailure);
        }
        
        function getFullName(username) {
        	return $http.get(Constants.API_ENDPOINTS.RETRIEVE_FULL_NAME.replace(":username", username))
            	.then(searchSuccess, searchFailure);
        }
        
        function getROFModificationList(loanId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_ROF_MODIFICATIONS.replace(":loanId", loanId))
        		.then(searchSuccess, searchFailure);
        }
        
        
        function submitROFModification(loanId, amount) {
        	return $http.post(Constants.API_ENDPOINTS.SUBMIT_ROF_MODIFICATION, {
        		loanId: loanId,
        		newAdjustedAmount: amount
        	})
        }
        function invokeReviewCase(data) {
        	return $http.post(Constants.API_ENDPOINTS.INVOKE_REVIEW_METHOD, data)
				.then(searchSuccess, searchFailure);
        }
        
        function getLoanEndorsementReview(loanId) {
        	return $http.get(Constants.API_ENDPOINTS.ENDORSEMENT_REVIEW_DOCS.replace(":loanId", loanId));
        }
        
        function saveLoanEndorsementReview(loanId, data) {
        	return $http.post(Constants.API_ENDPOINTS.ENDORSEMENT_REVIEW_SAVE.replace(":loanId", loanId), data);
        }
        
        function searchSuccess(response) {
        	// got a 200, return the data.
        	return {
        		success: true, 
        		data: response.data
        	};
        }

        function searchFailure(response) {
        	// XHR failed, send the error object back.
        	return {
        			success: false, 
    				error: response.data
        	};
        }
		
		function activeTab(tab){
			$timeout(function(){
			    $('.nav-tabs a[data-target="#' + tab + '"]').tab('show');
			});
		};

        return service;
       
    }

})();