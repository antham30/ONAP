(function () {
    'use strict';

    angular
        .module('app')
        .factory('AppraisalLoggingService', ['$http', '$q', 'Constants', AppraisalLoggingService]);

    function AppraisalLoggingService($http, $q, Constants) {
        var service = {};
        
        service.getPropertyData = getPropertyData;
        service.savePropertyData = savePropertyData;
        service.getNeighborhoodData = getNeighborhoodData;
        service.saveNeighborhoodData = saveNeighborhoodData;
        service.getSiteData = getSiteData;
        service.saveSiteData = saveSiteData;
        service.getPhysicalCharData = getPhysicalCharData;
        service.savePhysicalCharData = savePhysicalCharData;
        service.getPriorSaleData = getPriorSaleData;
        service.savePriorSaleData = savePriorSaleData;
        service.getReconciliationData = getReconciliationData;
        service.saveReconciliationData = saveReconciliationData;
        service.getLoanForCase = getLoanForCase;
        
        function getPropertyData(caseNumber, loanId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_CASE_PROPERTY
        			.replace(":caseNumber", caseNumber)
        			.replace(":loanId", loanId))
        	.then(searchSuccess, searchFailure);
        }
        
        function savePropertyData(caseNumber, data) {
        	return $http.post(Constants.API_ENDPOINTS.SAVE_PROPERTY.replace(":caseNumber", caseNumber), data)
        		.then(searchSuccess, searchFailure);
        }
        
        function getNeighborhoodData(caseNumber) {
        	return $http.get(Constants.API_ENDPOINTS.GET_CASE_NEIGHBORHOOD.replace(":caseNumber", caseNumber))
        	.then(searchSuccess, searchFailure);
        }
        
        function saveNeighborhoodData(data) {
        	return $http.post(Constants.API_ENDPOINTS.SAVE_NEIGHBORHOOD, data)
        	.then(searchSuccess, searchFailure);
        }
        
        function getSiteData(caseNumber) {
        	return $http.get(Constants.API_ENDPOINTS.GET_SITE_AREA.replace(":caseNumber", caseNumber))
    			.then(searchSuccess, searchFailure);
        }
        
        function saveSiteData(data) {
        	return $http.post(Constants.API_ENDPOINTS.SAVE_SITE_AREA, data)
        		.then(searchSuccess, searchFailure);
        }
        
        function getPhysicalCharData(loanId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_PHYSICAL_CHAR.replace(":loanId", loanId))
			.then(searchSuccess, searchFailure);
        }
        
        function savePhysicalCharData(loanId, data) {
        	return $http.post(Constants.API_ENDPOINTS.SAVE_PHYSICAL_CHAR.replace(":loanId", loanId), data)
    		.then(searchSuccess, searchFailure);
        }
        
        function getPriorSaleData(caseNumber) {
        	return $http.get(Constants.API_ENDPOINTS.GET_PRIOR_SALE.replace(":caseNumber", caseNumber))
			.then(searchSuccess, searchFailure);
        }
        
        function savePriorSaleData(data) {
        	return $http.post(Constants.API_ENDPOINTS.SAVE_PRIOR_SALE, data)
        	.then(searchSuccess, searchFailure);
        }
        
        function getReconciliationData(loanId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_RECONCILIATION.replace(":loanId", loanId))
				.then(searchSuccess, searchFailure);
        }
        
        
        function saveReconciliationData(loanId, data) {
        	return $http.post(Constants.API_ENDPOINTS.SAVE_RECONCILIATION.replace(":loanId", loanId), data)
    			.then(searchSuccess, searchFailure);
        }
        
        function getLoanForCase(caseId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_LOAN_FOR_CASE.replace(":caseId", caseId))
        			.then(searchSuccess, searchFailure);
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

        return service;
       
    }

})();