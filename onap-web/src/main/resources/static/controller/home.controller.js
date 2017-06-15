(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    function HomeController($rootScope) {
        var vm = this;
       
        vm.user = null;

        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            vm.user = $rootScope.globals.currentUser;
        }

    }

})();