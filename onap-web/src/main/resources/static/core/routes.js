function configureRoutes($routeProvider) {
    $routeProvider
    /*.when('/', {
     templateUrl: 'view/dashboard.view.html'
     })*/
    // TODO: PoC starting point
    
	    .when('/', {
	        templateUrl : 'view/login.html',
	        controller: 'loginController',
			      controllerAs : 'lc'
	    })
	    
	    .when("/dashboard", {
	    	templateUrl: "view/dashboard.html",
	    	controller: 'DashboardController',
	    	controllerAs: 'dashboardc'
	    })
	      .when("/cohort", {
	    	templateUrl: "view/cohort.html",
	    	controller: 'cohortController',
	    	controllerAs: 'cohort'
	    })
	     .when("/daily", {
	    	templateUrl: "view/daily.html",
	    	controller: 'dailyController',
	    	controllerAs: 'daily'
	    })
	      .when("/changePassword", {
	    	templateUrl: "view/changePassword.html",
	    	controller: 'changePasswordController',
	    	controllerAs: 'pass'
	    })
	    .when("/subsidy", {
	    	templateUrl: "view/subsidyMaintenance.html",
	    	controller: 'SubsidyMaintainController',
	    	controllerAs: 'ctrl'
	    })
	    
	    .when('/lenderRegistration', {
	        templateUrl : 'view/registration.html',
	        controller: "registrationController",
	        controllerAs: 'rc'
	    })
	    
	    .when('/olgDashboard', {
	        templateUrl : 'view/olgDashboard.html',
	        controller: "olgDashboardController",
	        controllerAs: 'vm'
	 
	    })
	    
	    .when('/olgCasesDashboard', {
	        templateUrl : 'view/olgCasesDashboard.html',
	        controller: "olgCasesDashboardController",
	        controllerAs: 'vm'
	 
	    })
	    
	    .when('/lenderDashboard', {
	        templateUrl : 'view/lenderDashboard.html',
	        controller: "lenderDashboardCon",
	        controllerAs: 'ldc'
	 
	    })
	    .when("/addressMaintenance", {
	    	templateUrl: "view/addressMaintenance.html",
	    	controller: 'addressMaintenanceController',
	    	controllerAs: 'vm'
	    })
	     .when("/UploadLGFeesPaid", {
	    	templateUrl: "view/uploadLgFee.html",
	    	controller: 'uploadLgFeeController',
	    	controllerAs: 'vm'
	    })

	    .when('/caseReview', {
	        templateUrl : 'view/caseReview.html',
	        controller: "LenderTabController",
	        controllerAs: 'csdsc'
	 
	    })
		
		.when("/lender", {
		    templateUrl : "view/lender.html",
		    controller:'lenderController',
		    controllerAs: 'lenderc'
		  })
		  
	    .when("/loan", {
	        templateUrl : "view/loan.html",
	        controller:'loanController',
	        controllerAs: 'loanc'
	    })
	    
	    .when("/property", {
	        templateUrl : "view/property.html",
	        controller:'propertyController',
	        controllerAs: 'pc'
	    })
	    
	    .when("/borrower", {
	        templateUrl : "view/borrower.html",
	        controller:'borrowerController',
	        controllerAs: 'bc'
	    })
	   
	    .when("/appraisalLogging", {
	        templateUrl : "view/appraisal-logging.html",
	        controller:'appraisalLoggingTabsController',
	        controllerAs: 'appraisalCtrl'
	    })
	    
	    .when("/endorsement", {
	    	templateUrl: "view/uploadDocuments.html",
	    	controller: "UploadDocumentsController",
	    	controllerAs: "vm"
	    })
	    
	    .when('/allTabContent', {
	        templateUrl : 'view/totalContent.html',
	        controller: "allTabController",
	        controllerAs: 'allc'
	    })
	 
	    .when('/reserveFunds', {
	        templateUrl : 'view/reserveFunds.html',
	        controller: "ReserveFundsController",
	        controllerAs: 'vm'
	    })
	    
	    .when('/caseRegistration', {
	        //templateUrl: 'view/pocPages.view.html'
	        templateUrl: 'view/caseRegistration_loan.html'
	    })
	    
	    .when('/home', {
	        templateUrl: 'view/dashboard.view.html'
	    })

        // TODO: just for the PoC
        .when('/loanDetails/loan/documents', {
            controller: 'LoanDetailsDocumentUploadController',
            templateUrl: 'view/loanDocuments.view.html'
        })

        .when('/case/caseNumberRequest', {
            controller: 'CaseNumberRequestFormController',
            templateUrl: 'view/caseNumberRequestForm.view.html'
        })
         .when('/ManageMortageLimit', {
            controller: 'ManageMortageLimitsController',
            templateUrl: 'view/ManageMortageLimit.html',
            controllerAs: 'vm'
        })
         .when('/ManageDgUnderwriters', {
            controller: 'ManageDgUnderwritersController',
            templateUrl: 'view/ManageDgUnderwriters.html',
            controllerAs: 'vm'
        })

        .when('/loanSearch', {
            controller: 'LoanSearchController',
            templateUrl: 'view/loanSearch.view.html',
            controllerAs: 'vm'
        })
          .when('/cancelSearch', {
            controller: 'cancelSearchController',
            templateUrl: 'view/cancelSearch.view.html',
            controllerAs: 'vm'
        })
         .when('/extendExpireDate', {
            controller: 'extendExpireDateController',
            templateUrl: 'view/extendExpireDate.view.html',
            controllerAs: 'vm'
        })
        
        .when('/loanSearch/appraisalLogging', {
            controller: 'LoanSearchController',
            templateUrl: 'view/loanSearch.view.html',
            controllerAs: 'vm'
        })
        .when('/loanSearch/adjustFundsReserved', {
            controller: 'LoanSearchController',
            templateUrl: 'view/loanSearch.view.html',
            controllerAs: 'vm'
        })
        .when('/loanSearch/endorsement', {
            controller: 'LoanSearchController',
            templateUrl: 'view/loanSearch.view.html',
            controllerAs: 'vm'
        })

        .when('/loanDetails/loan/:loanId', {
            controller: 'LoanDetailsController',
            templateUrl: 'view/loanDetails.view.html',
            controllerAs: 'vm'
        })

        .when('/loanDetails/loan/:loanId/documents', {
            controller: 'LoanDetailsDocumentUploadController',
            templateUrl: 'view/loanDocuments.view.html'
        })

        .when('/cases/myCases', {
            templateUrl: 'view/caseReviewMyCases.view.html'
        })

        .when('/cases/review/:caseId', {
            templateUrl: 'view/caseReviewStartReview.view.html'
        })

        .when('/dashboard/nationalCoordinator', {
            templateUrl: 'view/dashboard_nationalCoordinator.view.html'
        })

        .when('/error/:errorId', {
            templateUrl: 'view/error.view.html'
        })

        .when('/error', {
            templateUrl: 'view/error.view.html'
        })

        .when('/autologin/', {
            controller: 'AutologinController',
            templateUrl: 'view/autologin.view.html'
        })

        .when('/address', {
            templateUrl: 'view/addressVerification.partial.html'
        })
        
        .when('/leap', {
            templateUrl: 'view/leap.partial.html'
        })
        
        .when('/skillsMatrix', {
            controller: 'AdministratorController',
            templateUrl: 'view/skillsMatrix.view.html',
            controllerAs: 'vm'
        })
        
        .otherwise({
            redirectTo: '/'
        });
}
