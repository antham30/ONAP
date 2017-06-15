(function() {
	'use strict';
	angular.module('app')
		.factory('CommonFormService', ['$http', '$cacheFactory', 'Constants', CommonFormService]);
	
	function CommonFormService($http, $cacheFactory, Constants) {
		var service = {};
		
		service.getReferenceCodes = function(code) {
			return $http.get(Constants.API_ENDPOINTS.GET_REFERENCE_CODES.replace(":code", code), {
				cache: true
			});
		}

		service.getReferenceGroup = function(code) {
			return $http.get(Constants.API_ENDPOINTS.GET_REFERENCE_GROUP.replace(":code", code), {
				cache: true
			});
		}
		
		service.getReferenceCodeObject = function(type, code) {
			return $http.get(Constants.API_ENDPOINTS.GET_REFERENCE_CODE_OBJECT.replace(":code", code).replace(":type" ,type), {
				cache: true
			});
		}
		
		
		service.getReferenceCodeByType = function(type, code) {
			return $http.get(Constants.API_ENDPOINTS.GET_REFERENCE_CODE_BY_TYPE.replace(":type", type).replace(":code", code), {
				cache: true
			});
		}
		
		service.createFormDataObj = function(data) {
			return {
	        	original: angular.copy(data),
	        	editable: angular.copy(data)
	        }
		}
		
		service.resetFormDataObj = function(data) {
			if (!angular.equals(data.original, data.editable)) {
				data.editable = angular.copy(data.original);
			}
			return data;
		}
		
		service.monthsList = [
		             {
		            	 name: 'January',
		            	 value: '01',
		             },
		             {
		            	 name: 'February',
		            	 value: '02',
		             },
		             {
		            	 name: 'March',
		            	 value: '03',
		             },
		             {
		            	 name: 'April',
		            	 value: '04',
		             },
		             {
		            	 name: 'May',
		            	 value: '05',
		             },
		             {
		            	 name: 'June',
		            	 value: '06',
		             },
		             {
		            	 name: 'July',
		            	 value: '07',
		             },
		             {
		            	 name: 'August',
		            	 value: '08',
		             },
		             {
		            	 name: 'September',
		            	 value: '09',
		             },
		             {
		            	 name: 'October',
		            	 value: '10',
		             },
		             {
		            	 name: 'November',
		            	 value: '11',
		             },
		             {
		            	 name: 'December',
		            	 value: '12',
		             } 
		              ];
		
        service.clearCache = function(url) {
        	var httpCache = $cacheFactory.get('$http');
            httpCache.remove(url);
        }
        
        service.isSuccess = function(resp) {
        	return (resp.success && (resp.data && resp.data.status === 'SUCCESS'));
        }
        
        // For reference codes
        service.isOk = function(resp) {
        	return (resp.status === 200 && resp.statusText === 'OK');
        }
        
        service.isError = function(resp, catchAll) {
        	return (resp.error || (resp.data &&  resp.data.status === 'ERROR'));
        }
		
		return service;
	}
})();