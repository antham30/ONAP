/**
 * A service for managing user information and operations
 */

(function() {
	angular.module('UserModule', []);
	
	angular.module('UserModule')
		.service('UserService', ['Constants', '$q', UserService]);
	
	function UserService(Constants, $q) {
		var service = this;
		
    	var knownUsers = {
    		LENDER: ['summer'],
    		OLG_SUPERVISOR: ['onapsupervisor@hud.gov'],
    		OLG_ADMINISTRATOR: ['onapadmin@hud.gov'],
			OLG_ENDORSER: ['mthorpe', 'rfloyd', 'sanderson', 'twright','jennpost','ama@credence-llc.com','jjin@credence-llc.com',
							'onapendorser1@hud.gov',
							'onapendorser2@hud.gov',
							'onapendorser3@hud.gov',
							'onapendorser4@hud.gov',
							'onapendorser5@hud.gov']
    	};
    	
    	function getUserRole(username) {
    		var deferred = $q.defer();
    		var role = null;
    		Object.keys(knownUsers).forEach(function(key) {
    			var rolesList = knownUsers[key];
    			if (rolesList.indexOf(username) !== -1) role = key;
    		});
    		deferred.resolve(role);
    		return deferred.promise;
    	}
    	
    	service.getUserRole = getUserRole;
		return service;
	}
}());