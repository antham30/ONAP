(function () {
    'use strict';

    angular
        .module('app')
        .factory('LoanDetailsService', LoanDetailsService);

    LoanDetailsService.$inject = ['$http', 'Constants'];
    function LoanDetailsService($http, Constants) {
        
        function getLoanDetailsById(caseId) {
            return $http.get(Constants.API_ENDPOINTS.GET_CASE_DETAILS.replace(":caseId", caseId));
        }

        function getBorrowerDetailsByLoanId(caseId) {
            return $http.get(Constants.API_ENDPOINTS.GET_CASE_BORROWER_DETAILS.replace(":caseId", caseId));
        }

        function getWorksheetByLoanId(caseId) {
            return $http.get(Constants.API_ENDPOINTS.GET_WORKSHEET.replace(":caseId", caseId));
        }

        function getFundsToCloseByLoanId(caseId) {
            return $http.get(Constants.API_ENDPOINTS.GET_FUNDS_TO_CLOSE.replace(":caseId", caseId));
        }
        
        function getRealPropertyDetailsByLoanId(caseId) {
            return $http.get(Constants.API_ENDPOINTS.GET_REAL_PROPERTY_DETAILS.replace(":caseId", caseId));
        }
		
        function getLoanRating(ratingData) {
            return $http.post(Constants.API_ENDPOINTS.GET_LOAN_RATING, ratingData);
        }

        function sendRatingEmail(ratingData) {
            return $http.post(Constants.API_ENDPOINTS.SEND_EMAIL, ratingData);
        }

        var service = {};
        
        service.getLoanDetailsById = getLoanDetailsById;
        service.getBorrowerDetailsByLoanId = getBorrowerDetailsByLoanId;
        service.getRealPropertyDetailsByLoanId = getRealPropertyDetailsByLoanId;
        service.getLoanRating = getLoanRating;
        service.sendRatingEmail = sendRatingEmail;
        service.getWorksheetByLoanId = getWorksheetByLoanId;
        service.getFundsToCloseByLoanId = getFundsToCloseByLoanId;

        return service;
    }

})();