(function () {
    'use strict';

    angular
        .module('app')
        .factory('FlashService', FlashService);

    function FlashService($rootScope) {
    	
    	//toastr default setting
    	toastr.options.closeButton = true;
    	//toastr.options.positionClass = 'toastrAbsoluteCenter';
    	//toastr.options.positionClass = 'toast-top-full-width';
    	toastr.options.positionClass = 'toastrMiddleCenter';
    	
        $rootScope.$on('$locationChangeStart', function () {
        	 var flash = $rootScope.flash;
             if (flash) {
                 if (!flash.keepAfterLocationChange) {
                     delete $rootScope.flash;
                 } else {
                     // only keep for a single location change
                     flash.keepAfterLocationChange = false;
                 }
             }
        });

        this.removeFlashMessage = function() {
            delete $rootScope.flash;
        };
    
        this.clear = function() {
    	  $rootScope.flash = {
                  message: '',
                  type: '',
                  keepAfterLocationChange: false
              };
    	  $rootScope.$apply();
    	};
    
	    this.success = function(message, keepAfterLocationChange) {
	    	toastr.success(message);
	    };
	    
	    this.modalSuccess = function(message, keepAfterLocationChage) {
	    	$rootScope.flashMessage = message;
	    	var successModal = angular.element('#indexSuccessModal');
	    	if(successModal.length > 0){
	    		successModal.modal('show');
	    	}
	    };
	
	    this.error = function(message, keepAfterLocationChange) {
	    	toastr.error(message);
	    };
	    
	    this.info = function(message, keepAfterLocationChange) {
	    	toastr.info(message);
	    };
	    
	    return this;
    }
    
})();