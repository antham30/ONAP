(function () {
    'use strict';

    angular
        .module('app')
        .factory('LoanSearchService', LoanSearchService);
    
    // LoanSearchService.$inject('$http', 'Constants', '$cacheFactory');
    function LoanSearchService($http, Constants, $cacheFactory) {
        
    	// return hoisted functions.
    	return {
    		searchById : searchById,
    		clearCacheLoanId : clearCacheLoanId
    	};
    	
        function searchById(caseId, lenderId) {
            return $http.get(Constants.API_ENDPOINTS.GET_CASE.replace(":caseId", caseId).replace(":lenderId", lenderId), {
                cache: true
            })
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
        
        function clearCacheLoanId(caseId) {
        	var httpCache = $cacheFactory.get('$http');
            httpCache.remove(Constants.API_ENDPOINTS.GET_CASE.replace(":caseId", caseId));
        }

    }
})();
