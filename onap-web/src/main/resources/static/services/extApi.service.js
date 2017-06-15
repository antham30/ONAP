(function () {
    'use strict';

    angular
        .module('app')
        .factory('ExtApiService', ExtApiService);

    function ExtApiService($http, Constants, $cacheFactory) {

        // Cache the reference codes for the states.
        this.getRefCodesStates = function () {
        	return $http.get(Constants.API_ENDPOINTS.GET_STATE_METADATA, {
                cache: true 
            });
        }; 
        
        // Address validation function.
        this.getValidatedAddress = function (address) {
            return $http.post(Constants.API_ENDPOINTS.GET_VALIDATED_ADDRESS, address);
        };

        // LEAP lender search function.  Pass the lender ID in the HTTP GET request.
        this.getLeapLenderData = function (lenderId) {
        	return $http.get(Constants.API_ENDPOINTS.GET_LEAP_DETAILS.replace(":lenderId", lenderId));
        };

        return this;
    }
})();	