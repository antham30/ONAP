/**
 * 
 */

'use strict';
 
angular.module('app').factory('SubsidyMaintanService', ['$http', '$q', function($http, $q){
 
    var factory = {
        fetchAllSubsidies: fetchAllSubsidies,
        createSubsidyEntry: createSubsidyEntry,
        updateSubsidyEntry:updateSubsidyEntry,
        deleteSubsidyEntry:deleteSubsidyEntry
    };
 
    return factory;
 
    function fetchAllSubsidies() {
        var deferred = $q.defer();
        $http.get('getAllSbsdys')
            .then(
            function (response) {
            	if(response.data.status == "SUCCESS"){
                    deferred.resolve(response.data.subsidyList);
    				} else{
    					FlashService.error(response.data.errorMessage);
    				}
            },
            function(errResponse){
                console.error('Error while fetching Subsidy Maintains');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function createSubsidyEntry(user) {
        var deferred = $q.defer();
        $http.post('saveSbsdy', user)
            .then(
            function (response) {
            	if(response.data.status == "SUCCESS"){
                    deferred.resolve(response.data);
    				} else{
    					FlashService.error(response.data.errorMessage);
    				}
            },
            function(errResponse){
                console.error('Error while creating Subsidy Maintain');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
 
    function updateSubsidyEntry(user) {
        var deferred = $q.defer();
        $http.post('saveSbsdy', user)
            .then(
            function (response) {
               // deferred.resolve(response.data);
            	if(response.data.status == "SUCCESS"){
                    deferred.resolve(response.data);
    				} else{
    					FlashService.error(response.data.errorMessage);
    				}
            },
            function(errResponse){
                console.error('Error while updating Subsidy Maintain');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function deleteSubsidyEntry(id) {
        var deferred = $q.defer();
        
        return null;
    }
 
}]);