/*
 * This is the exemplar controller (Loan Search).  Please follow this for proper coding guidance.
 */
(function() {
    'use strict';

    angular.module('app')
        .controller('cancelSearchController', cancelSearchController);

    // manually inject to avoid minification errors.
    cancelSearchController.$inject = ['$rootScope', 'LoanSearchService', 'FlashService', 'ExtApiService', '$http', '$location', '$scope', '$window', '$timeout', 'Constants'];

    function cancelSearchController($rootScope, LoanSearchService, FlashService, ExtApiService, $http, $location, $scope, $window, $timeout, Constants) {
    	
        var vm = this;
        vm.searchComplete = false;
        vm.leapSearchComplete = false;
        vm.user = null;
        vm.showAppraisalBtn = ($location.path() === '/loanSearch/appraisalLogging');
        

        // hoisted functions in the view model ($scope)
        vm.searchLoans = searchLoans;
        vm.searchLenders = searchLenders;
        vm.refreshCache = refreshCache;
        vm.validateCaseId = validateCaseId;
        vm.resetLoan = resetLoan;
        vm.resetCaseId = resetCaseId;
        vm.requiresAppraisalLogging = requiresAppraisalLogging;
        vm.clearAllFields= clearAllFields;
        vm.submitCancelBtn= submitCancelBtn;
		vm.submitCancelBeforeBtnOLGAdmin =submitCancelBeforeBtnOLGAdmin;
		vm.submitCancelBtnOLGAdmin = submitCancelBtnOLGAdmin;
        
        $timeout(function(){
        	var caseIdInput = angular.element("#caseId");
        	caseIdInput.focus();
        	caseIdInput.attr("autofocus", true);
        });

        function requiresAppraisalLogging(loan) {
        	var loanType = loan.loanType,
        		loanPurpose = loan.loanPurpose;
        	
        	if (loanPurpose === 'STREAMLINE WITHOUT APPRAISAL' && loanType === 'REFINANCE') {
        		return false;
        	}
        	else {
        		if (loanPurpose !== 'STREAMLINE WITHOUT APPRAISAL') {
        			return true;
        		}
        		else {
        			return false;
        		}
        	}
        }

        // use mask to format caseId
        $('#caseId1').mask('000-000000');
        var caseIdRegex = /^[0-9]{3}\-[0-9]{6}$/;

        function resetLoan() {
        	vm.loan = null;
        }
        
        function resetCaseId() {
        	$scope.searchloanId = '';
        }
        
        function getLenderId() {
        	var abc = JSON.parse($window.sessionStorage.getItem("abc"));
        	return abc !== null ? abc.split('##')[0] : null;
        }

        function searchLoans() {
            if (!validateCaseId($scope.searchloanId)) {
            	FlashService.error('Please enter a Case number in the following format: [###-######].');
            	resetLoan();
            	return;
            }
            var caseId = $scope.searchloanId; // bind to the searchbox's value.
            var lenderId = getLenderId();
	        vm.leapSearchComplete = false;
	
	       // The search service will return a promise, so use the .then() function to invoke searchLoanComplete.	
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

		  var knowStatus = {
    		
    			olg: 	{
	    			      
							statusCode: [
									'RFOS',
									'RFLC',
									'RFEX',
									'RFCL',
									'RFCB',
									'LGBS',
									'LGBA',
									'LGBR',
									'LGSI',
									'LGSG',
									'LGSP',
									'LGSL',
									'LGSA',
									'LGSC',
									'LGRS',
									'LGSR',
									'LGCT'
									
									
							]
							
    					}
    	};
    	
    	vm.knownUsers = knownUsers;
    	vm.knowStatus = knowStatus;
    	
    	vm.isOLGMember = (knownUsers.olg.staff.indexOf($rootScope.userName) !== -1) || knownUsers.olg.supervisor.indexOf($rootScope.userName) !== -1 || knownUsers.olg.administrator.indexOf($rootScope.userName) !== -1;
    	vm.isOLGSupervisor = knownUsers.olg.supervisor.indexOf($rootScope.userName) !== -1;
    	vm.isOLGAdmin = knownUsers.olg.administrator.indexOf($rootScope.userName) !== -1;
    	 
    	vm.isOLG = (knownUsers.olg.staff.indexOf($rootScope.userName) !== -1);
    	vm.isLender = !vm.isOLGMember;
		
		
		if($rootScope.userName!='jennpost')	 {     
		  LoanSearchService.searchById(caseId, lenderId)
	           .then(function(response) {
	                if (response.success) {
	
	                    // update the search complete flag to be true. if is true, the view shows the results table.
	                    vm.searchComplete = true;
	
	                    // clears the status message
	                    FlashService.removeFlashMessage();
	
	                    // check to see if there were any loans that matched the ID passed in.
	                    if (response.data.status === 'FAILED') {
	                    	var errorMessage;
	                    	if (response.data.errorCode === 'ONAP.CaseLenderAssociationMismatch') {
	                    		errorMessage = 'Case number is not associated with your lending institution.';
	                    	}
	                    	else {
	                    		errorMessage = 'Case not found.';
	                    	}
	                        FlashService.error(errorMessage);
	                        resetLoan();
	                        resetCaseId();
	                    } else  {
	    	                    // Update the view model with the response. 
	                    	var errorMessage1;
	                    	if (response.data.errorMessage!=null) {
	                    		errorMessage1 = response.data.errorMessage;
								 FlashService.error(errorMessage1);
	                    	}
	                    	else {
	                    		 vm.loan = response.data;
								 vm.getErrorValue = vm.loan.loanAmount;
								 console.log("res"+JSON.stringify(vm.loan));
									vm.isLoanStatusCode = knowStatus.olg.statusCode.indexOf(vm.loan.caseStatusCode) !== -1;
									errorMessage1= '1 record found.';
									 FlashService.success(errorMessage1);
	                    	}
	                    	
	    	                   	
	                    }
	                } else {
	                    // an error occurred, pass the error object to the handler.
	                    searchLoanErrorHandler(response.error);
	                }
	            });
		}else{
			 $http({
	            method: 'GET',
	             url: 'case/dashboard/extendFunds/' + caseId ,
	            //headers: {"Content-Type": "application/json", "Accept": "application/json"},
	            //data: JSON.stringify(caseNumber)
	        }).success(function (response) {
	        	
					 if (response.status == 'SUCCESS') {
						 
	                    	if(response.dashBoardCases[0] !='' && response.dashBoardCases[0] != null){
	    	                    // Update the view model with the response.   
	    	                    vm.loan = response.dashBoardCases[0];
								 if(vm.loan.caseExpirationDate !== null ){
						  vm.loan.caseExpirationDate = new Date(vm.loan.caseExpirationDate);
						  var dd = vm.loan.caseExpirationDate.getDate();
						  var mm = vm.loan.caseExpirationDate.getMonth()+1; //January is 0! 
	
						  var yyyy = vm.loan.caseExpirationDate.getFullYear();
						  vm.loan.caseExpirationDate = mm+'/'+dd+'/'+yyyy;
					  }else{
						  vm.loan.caseExpirationDate = '';
					  }
					   if(vm.loan.fundExpirationDate !== null ){
						  vm.loan.fundExpirationDate = new Date(vm.loan.fundExpirationDate);
						  var dd1 = vm.loan.fundExpirationDate.getDate();
						  var mm1 = vm.loan.fundExpirationDate.getMonth()+1; //January is 0! 
	
						  var yyyy1 = vm.loan.fundExpirationDate.getFullYear();
						  vm.loan.fundExpirationDate = mm1+'/'+dd1+'/'+yyyy1;
					  }else{
						  vm.loan.fundExpirationDate = '';
					  }
					   if(vm.loan.caseAssignmentDate !== null ){
						  vm.loan.caseAssignmentDate = new Date(vm.loan.caseAssignmentDate);
						  var dd2 = vm.loan.caseAssignmentDate.getDate();
						  var mm2 = vm.loan.caseAssignmentDate.getMonth()+1; //January is 0! 
	
						  var yyyy2 = vm.loan.caseAssignmentDate.getFullYear();
						  vm.loan.caseAssignmentDate = mm2+'/'+dd2+'/'+yyyy2;
					  }else{
						  vm.loan.caseAssignmentDate = '';
					  }
					   if(vm.loan.fundRsrvdDate !== null ){
						  vm.loan.fundRsrvdDate = new Date(vm.loan.fundRsrvdDate);
						  var dd3 = vm.loan.fundRsrvdDate.getDate();
						  var mm3 = vm.loan.fundRsrvdDate.getMonth()+1; //January is 0! 
	
						  var yyyy3 = vm.loan.fundRsrvdDate.getFullYear();
						  vm.loan.fundRsrvdDate = mm3+'/'+dd3+'/'+yyyy3;
					  }else{
						  vm.loan.fundRsrvdDate = '';
					  }
					    vm.loan.loanAmount = Number(vm.loan.loanAmount).toFixed(2).	replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
					    vm.loan.loanGuaranteeFee = Number(vm.loan.loanGuaranteeFee).toFixed(2).	replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
					
							
							vm.searchComplete = true;
	                    		FlashService.success('1 record found.');
								
							
								
	                    }
					  else {
						var errorMessage = 'Case not found.';
	                    	
	                        FlashService.error(errorMessage);
	                        resetLoan();
	                        resetCaseId();
	                    } 
						
						
						
						
					 }
				
				}).error(function () {
				FlashService.error('error');
	        });
		}
        }
        
        function validateCaseId(caseId) {
        	return caseIdRegex.test(caseId);
        }
        
        function searchLoanErrorHandler(error) {

            // An unhandled API exception is handled in the presentation layer.  This is an example of 
            // how to handle that or any raised exception from the API.
            if (error.exception == "org.springframework.beans.TypeMismatchException") {
                // The search was of the wrong type, display an error showing that.
                FlashService.error(Constants.ERROR_MESSAGES.TYPE_ERROR);
            } else {
                // An unknown exception occured, display it.
                FlashService.error(Constants.ERROR_MESSAGES.SEARCH_ERROR);
            }
        }

        function refreshCache() {
            // clear the cache and recall search.
            FlashService.info("Clearing cache and redoing search.");
            vm.loan = [{
                "loanId": "",
                "adpCd": "",
                "borrowerType": "",
                "borrowerName": "",
                "originatorName": "",
                "loanStatus": ""
            }];

            LoanSearchService.clearCacheLoanId($scope.searchloanId);
            searchLoans();
            FlashService.info("Cache cleared.");
        }
         function clearAllFields() {
  		

	 $http({
 		        method: 'GET',
 		        url: 'loan/iscohortnumbergenerated/'+ $scope.searchloanId,
 		        headers: {"Content-Type": "application/json", "Accept": "application/json"}
 		    }).success(function (response) {
			
 		    if(vm.loan.caseStatus != 'LOAN REG WITHDRAWN BY LENDER' && vm.loan.caseStatus != 'LOAN REG WITHDRAWN BY BORROWER' &&
 		    		vm.loan.caseStatus != 'LOAN REG CANCELLED EXPIRED'){
 		   if(vm.isOLGAdmin){
			  
			   
 		    	if(response.status == "SUCCESS" && vm.isLoanStatusCode){
 		   $('.hideText').hide();
 		   
/*dfd*/
 $http({
	        method: 'GET',
	        url: 'case/referenceCodes/group/CASERSCANCEL',
	        headers: {"Content-Type": "application/json", "Accept": "application/json"}
	    }).success(function (response) {
	     
	        $scope.loanCancel=response;
	     
	    }).error(function () {
	    
	    });
/*dfd*/
 	  		 $('.showText').show();
 		    } else {
 		    	FlashService.error(Constants.ERROR_MESSAGES.CANOT_CANCEL_CASE_ERROR_OLGAdmin);
 		    	
			$('#clearData').modal('hide');
 		    }
			
		   } else{
			   
			   if(response.status == "FAILED"){
 		   $('.hideText').hide();
/*dfd*/
 $http({
	        method: 'GET',
	        url: 'case/referenceCodes/group/CASECANCEL',
	        headers: {"Content-Type": "application/json", "Accept": "application/json"}
	    }).success(function (response) {
	     
	        $scope.loanCancel=response;
	     
	    }).error(function () {
	    
	    });
/*dfd*/
 	  		 $('.showText').show();
 		    } else if(response.status == "SUCCESS"){
 		    	FlashService.error(Constants.ERROR_MESSAGES.CANOT_CANCEL_CASE_ERROR);
 		    	
			$('#clearData').modal('hide');
 		    }
		   }		
			
			
} else{
FlashService.error(Constants.ERROR_MESSAGES.CASE_ALREADY_CANCEL__ERROR);
$('#clearData').modal('hide');
}
 }).error(function () {
 		     
		FlashService.error(Constants.ERROR_MESSAGES.IS_COHORT_CASE_RETRIEVAL_ERROR);
 		    });



         
      } 

 function submitCancelBtn() {
vm.errorCancelCase = false;
  		
	if(vm.loan.reasonCnclCase != undefined && vm.loan.reasonCnclCase != null && vm.loan.reasonCnclCase != ''){
									 $http({
 		        method: 'GET',
 		        url: 'loan/updateLoanStatus'+'/'+$scope.searchloanId +'/'+vm.loan.reasonCnclCase,
 		        headers: {"Content-Type": "application/json", "Accept": "application/json"}
 		    }).success(function (response) {
 		    	if(response.status == "ERROR"){
 				  
                                          $('#clearData').modal('hide');
                                         
                                          FlashService
											.success(Constants.SUCCESS_MESSAGES.CASE_CANCEL_SUCCESS);
                                         
						window.location.reload();	
 		    	}  //
		    	 else{
			    		FlashService.error(response.errorMessage);
			    	}
                                        }).error(function () {
  
                                        	FlashService.error(Constants.ERROR_MESSAGES._CASE_CANCEL_RETRIEVAL_ERROR);     
                                          

                                        });   

  		
         }else{
              vm.errorCancelCase = true;
			}
      }
 function submitCancelBeforeBtnOLGAdmin() {
vm.errorCancelCase = false;
  		
	if(vm.loan.reasonCnclCase != undefined && vm.loan.reasonCnclCase != null && vm.loan.reasonCnclCase != ''){
						 $('#clearData').modal('hide');			
$('#alertBox').modal('show');
  		
         }else{
              vm.errorCancelCase = true;
			}
      }

 function submitCancelBtnOLGAdmin() {
	
									 $http({
 		        method: 'GET',
 		        url: 'loan/updateLoanStatus'+'/'+$scope.searchloanId +'/'+vm.loan.reasonCnclCase +'/' + $rootScope.userName,
 		        headers: {"Content-Type": "application/json", "Accept": "application/json"}
 		    }).success(function (response) {
 		    	if(response.status == "SUCCESS"){
 				  
                                          $('#alertBox').modal('hide');
                                         
                                          FlashService
											.success(Constants.SUCCESS_MESSAGES.CASE_CANCEL_SUCCESS);
                                         
						window.location.reload();	
 		    	}  //
		    	 else{
			    		FlashService.error(response.errorMessage);
			    	}
                                        }).error(function () {
  
                                        	FlashService.error(Constants.ERROR_MESSAGES._CASE_CANCEL_RETRIEVAL_ERROR);     
                                          

                                        });   

  		
        
      }

        // This controller function is not exemplar.  Follow Loan Search's patterns.
        function searchLenders() {
            ExtApiService.getLeapLenderData($scope.searchLenderId)
                .success(function(response) {
                    $scope.leap = response.lenderSearchResults;
                    // clears the status message
                    FlashService.removeFlashMessage();
                })
                .error(function() {
                    FlashService.error(Constants.ERROR_MESSAGES.SEARCH_ERROR);
                });

            vm.searchComplete = false;
            vm.leapSearchComplete = true;
        }
        
    }

})();