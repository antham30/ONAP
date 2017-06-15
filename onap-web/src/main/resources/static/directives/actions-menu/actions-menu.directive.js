(function() {
	angular
		.module('ActionsMenuModule')
	    .directive('actionsMenu', function() {
		    'use strict';
	        return {
	            link: function (scope, element, attrs) {},
	            templateUrl: 'directives/actions-menu/actions_menu.html',
	            restrict: 'E',
	            controller: 'ActionsMenuController',
	            controllerAs: 'actionsMenu'
	        };
	    });
})();
