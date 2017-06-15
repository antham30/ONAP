(function () {
    'use strict';

    angular
        .module('ActionsMenuModule')
        .service('actionsMenuService', actionsMenuService);

    function actionsMenuService() {
    	var service = {},
        	viewMode,
        	modes = {
    			REGISTER_CASE: 'REGISTER_CASE'
    		};
        
        function getViewMode() {
        	return viewMode;
        }
    	
        function setViewMode(mode) {
        	viewMode = modes[mode];	
        }
        
        service.modes = modes;
        service.getViewMode = getViewMode;
        service.setViewMode = setViewMode;
        
        return service;
    }

})();