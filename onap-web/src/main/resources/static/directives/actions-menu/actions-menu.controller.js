(function() {
    'use strict';

    angular
    	.module('ActionsMenuModule')
        .controller('ActionsMenuController', ['$rootScope', '$scope', '$window', '$location', 'Idle', ActionsMenuController]);


    function ActionsMenuController($rootScope, $scope, $window, $location, Idle) {

    	var vm = this;
    	
    	var knownUsers = {
    			lender: ['summer'],
    			olg: 	{
	    			      	supervisor: ['onapsupervisor@hud.gov'],
							staff: ['mthorpe',
							        'rfloyd',
									'sanderson',
									'twright',
									'jennpost',
									'jjin@credence-llc.com',
									'ama@credence-llc.com',
									'onapendorser1@hud.gov',
									'onapendorser2@hud.gov',
									'onapendorser3@hud.gov',
									'onapendorser4@hud.gov',
									'onapendorser5@hud.gov'
							],
							administrator: ['onapadmin@hud.gov']
    					}
    	};
    	
    	vm.knownUsers = knownUsers;
    	
    	vm.isOLGMember = (knownUsers.olg.staff.indexOf($rootScope.userName) !== -1) || knownUsers.olg.supervisor.indexOf($rootScope.userName) !== -1 || knownUsers.olg.administrator.indexOf($rootScope.userName) !== -1;
    	vm.isOLGSupervisor = knownUsers.olg.supervisor.indexOf($rootScope.userName) !== -1;
    	vm.isOLGAdmin = knownUsers.olg.administrator.indexOf($rootScope.userName) !== -1;
    	vm.isOLG = (knownUsers.olg.staff.indexOf($rootScope.userName) !== -1);
    	vm.isLender = !vm.isOLGMember;
    	
    	$rootScope.lenderName  = JSON.parse($window.sessionStorage.getItem("lenderName"));
	    $rootScope.lndrName = $rootScope.lenderName;
	    $rootScope.role = $window.sessionStorage.getItem("role");
	    	
	    function getRole(){
	    	if(vm.isOLG){
	    		return 'OLG Endorser'
	    	}
	    	else if(vm.isOLGSupervisor){
	    		return 'OLG Supervisor'
	    	}
	    	else if(vm.isOLGAdmin){
	    		return 'OLG Administrator'
	    	}
	    	else{
	    		return 'Lender'
	    	}
	    }
    	// Navigation elements functionality
    	vm.isLenderDashboardPage = isLenderDashboardPage;
    	vm.isOLGDashboardPage = isOLGDashboardPage;
    	vm.isCaseRegistrationPage = isCaseRegistrationPage;
    	vm.isFundsReservationPage = isFundsReservationPage;
    	vm.isReportsPage = isReportsPage;
    	vm.isAdminFunctionsPage = isAdminFunctionsPage;
    	vm.isEndorsementPage = isEndorsementPage;
    	vm.isCaseProfilePage = isCaseProfilePage;
    	vm.clearRegisterCase = clearRegisterCase;
    	vm.isOLGCasesDashboardPage = isOLGCasesDashboardPage;
    	
    	function clearRegisterCase() {
    		$window.localStorage.clear();
    	}
    	
    	function isLenderDashboardPage() {
    		return $location.path() === '/lenderDashboard';
    	}
    	
    	function isOLGDashboardPage() {
    		return $location.path() === '/olgDashboard';
    	}
    	
    	function isCaseRegistrationPage() {
    		return ['/lender', '/borrower', '/property', '/loan', '/loanSearch', '/cancelSearch'].indexOf($location.path()) !== -1;
    	}
    	
    	function isFundsReservationPage() {
    		return ['/loanSearch/appraisalLogging'].indexOf($location.path()) !== -1;
    	}
    	
    	function isReportsPage() {
    		return ['/cohortReport', '/dailyarc'].indexOf($location.path()) !== -1;
    	}
    	
    	function isAdminFunctionsPage() {
    		return ['/subsidyMaintenance'].indexOf($location.path()) !== -1;
    	}
    	
    	function isEndorsementPage() {
    		return ['/loanSearch/endorsement', '/endorsement'].indexOf($location.path()) !== -1;
    	}
    	
    	function isCaseProfilePage() {
    		return ['/changePassword'].indexOf($location.path()) !== -1;
    	}
    	
    	function isOLGCasesDashboardPage() {
    		return $location.path() === '/olgCasesDashboard';
    	}
        // Watch for inactivity
        Idle.watch();
    }
})();