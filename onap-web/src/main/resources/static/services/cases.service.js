(function () {
    'use strict';

    angular
        .module('app')
        .factory('CasesService', CasesService);

    CasesService.$inject = ['$http', '$q', 'Constants', 'CommonFormService'];
    
    function CasesService($http, $q, Constants, CommonFormService) {
        
        this.getCasesByUserId = function (userId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_MY_CASES.replace(":userId", userId));
        };
        
        this.getWorkByUserId = function (userId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_WORK.replace(":userId", userId));
        };
        
        this.getActivitesByLoanId = function (caseId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_CASE_ACTIVITIES.replace(":caseId", caseId));
        };
        
        this.getCaseDetails = function (caseId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_CASE_DETAILS.replace(":caseId", caseId));
        };
        
        this.getCaseSummary = function (caseNumber, clearCache) {
        	return $http.get(Constants.API_ENDPOINTS.GET_CASE_SUMMARY.replace(":caseNumber", caseNumber));
        };
        
        this.getConstructionCode = function (caseNumber) {
            return $http.get(Constants.API_ENDPOINTS.GET_CONSTRUCTION_CODE.replace(":caseNumber", caseNumber));
        }
        
        this.getOLGDashboardCasesForSupervisor = function (userId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_CASES_OLG_SUPERVISOR);
        }
        
        this.getOLGDashboardCasesForEndorser = function (userId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_CASES_OLG_ENDORSER);
        }
        
        this.getOLGCasesDashboardCases = function (userId){
        	return $http.get(Constants.API_ENDPOINTS.GET_CASES_OLG_CASES_DASHBOARD);
        }
        
        this.assignCaseForOLGReviewer = function(caseInfo, userName) {
        	var data = caseInfo;
        	data.assignee = userName;
        	return $http.post(Constants.API_ENDPOINTS.ASSIGN_CASE_OLG_REVIEWER, data)
				.then(searchSuccess, searchFailure);
        }
        
        function updateCase(data) {
        	return $http.post(Constants.API_ENDPOINTS.UPDATE_CASE, data)
				.then(searchSuccess, searchFailure);
        }
        
        this.reviewCase = function(data) {
        	return $http.post(Constants.API_ENDPOINTS.START_REVIEW, data)
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

        return this;

    }

})();