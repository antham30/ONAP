(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['$rootScope', '$location', 'FlashService', 'Constants'];

    function UserController($rootScope, $location, FlashService, Constants) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.displayUsers = [];
        vm.allCompanies = [];
        vm.isLoading = true;
        vm.isCompanyLoading = true;
        vm.deleteUser = deleteUser;
 
        function loadCurrentUser() {
            vm.user = $rootScope.globals.currentUser;
        }

    }

})();