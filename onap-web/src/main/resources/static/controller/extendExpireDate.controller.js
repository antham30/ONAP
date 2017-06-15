/*
 * This is the exemplar controller (Loan Search).  Please follow this for proper coding guidance.
 */
(function() {
    'use strict';

    angular.module('app')
        .controller('extendExpireDateController', extendExpireDateController);

    // manually inject to avoid minification errors.
    extendExpireDateController.$inject = ['$rootScope', 'LoanSearchService', 'FlashService', 'ExtApiService', '$http', '$location', '$scope', '$window', '$timeout', 'Constants'];

    function extendExpireDateController($rootScope, LoanSearchService, FlashService, ExtApiService, $http, $location, $scope, $window, $timeout, Constants) {
    	
        var vm = this;
        vm.searchComplete = false;
        vm.leapSearchComplete = false;
        vm.user = null;
        vm.showAppraisalBtn = ($location.path() === '/loanSearch/appraisalLogging');
        vm.loggedUserId = $window.sessionStorage.getItem("abc").split('##')[1];

        // hoisted functions in the view model ($scope)
        vm.searchLoans = searchLoans;
        vm.searchLenders = searchLenders;
        vm.refreshCache = refreshCache;
        vm.validateCaseId = validateCaseId;
        vm.resetLoan = resetLoan;
        vm.editButton = editButton;
        vm.changingInsertedvalue = changingInsertedvalue;
        vm.showNotes = showNotes;
        vm.getCaseReviewNotes = getCaseReviewNotes;
		vm.addNotes = addNotes;
		
        vm.backToEdit = backToEdit;
        vm.resetCaseId = resetCaseId;
        vm.requiresAppraisalLogging = requiresAppraisalLogging;
        vm.submitAllFields= submitAllFields;
        vm.submitCancelBtn= submitCancelBtn;
        
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
        $('#caseExtend').mask('000-000000');
        var caseIdRegex = /^[0-9]{3}\-[0-9]{6}$/;

		function getCaseReviewNotes(){
			vm.notesDisplayText = [];
			$http({
				method: 'GET',
				url: 'case/loannotes/'+vm.loan.caseId,
				headers: {"Content-Type": "application/json", "Accept": "application/json"}
			}).success(function (response) {
				
						if(response.status == "SUCCESS"){
				var status=0;
				for (var i=0; i<response.loanNotes.length; i++){
					status++;
					vm.notesDisplayText.push(response.loanNotes[i]);
			
					 var createdDate = response.loanNotes[i].createdDate;
					 vm.personName = response.loanNotes[i].personName;
					 vm.keyId = response.loanNotes[i].keyId;
					 vm.sourceId = response.loanNotes[i].sourceId;
					 vm.loanId = response.loanNotes[i].loanId;
					 vm.userId = response.loanNotes[i].userId;
					 var now = new Date(createdDate);
					 var date1 = now.toLocaleDateString();
					 var time1 = now.toLocaleTimeString();
					 createdDate = date1+' '+time1;
					
					 vm.notesDisplayText[i].showNotesDetails = createdDate +' EST' + '-'+ vm.personName;
				}
						}else{
								
							FlashService.error(response.errorMessage);
						}
			if (status == response.loanNotes.length) {
					
				vm.displayNoteDetails = vm.notesDisplayText;
				
				if(vm.displayNoteDetails!=undefined && vm.displayNoteDetails!=null && vm.displayNoteDetails!=''){
					$scope.bftcExpanded1=true;
							$("#collapseTwo").show();
				}
			}	
							
			}).error(function () {
				FlashService.error(Constants.ERROR_MESSAGES.NOTES_RETRIEVAL_ERROR);
			});
}
		/** ends retrieving loan updated text for notes**/
		  function addNotes() {
			vm.errorNotesMsg = false;
			if(vm.loan.notes != undefined && vm.loan.notes != null && vm.loan.notes != '') {
			
			vm.sendNotes = {
			      "loanId": vm.loan.caseId,
			      "loanNoteTxt": vm.loan.notes,
			      "userId": vm.loggedUserId,
			      "keyId": vm.keyId,
			      "sourceId": vm.sourceId
			    }
				
			
	$http({
				"method": "POST",
			    url: 'case/loannotes/update',
			    "headers": {"Content-Type": "application/json", "Accept": "application/json"},
			    "data": vm.sendNotes
			}).success(function (response) {
				if(response.status == "SUCCESS"){
				FlashService.success(Constants.SUCCESS_MESSAGES.UPDATED_SUCCESSFULLY);
				getCaseReviewNotes();
				vm.loan.notes = "";
				
				
				}else{
					FlashService.error(response.errorMessage);
					
				}
			}).error(function () {
			
				FlashService.error(Constants.ERROR_MESSAGES.NOTES_SAVING_ERROR);
			})
			
			}
			else {
				vm.errorNotesMsg = true;
			}
        }
		
		 /** adding loan updated text for notes ends**/

        function resetLoan() {
        	vm.loan = null;
        }
		/** changes for extend date**/
		vm.showEdit= true;
		vm.showInputFieldFunds= true;
		vm.showInputFieldCase= true;
		vm.showNotesDataTable = false;
		function editButton() {
			vm.showEdit = false;
			vm.showNotesDataTable =true;
			 if(vm.loan.statusCode == 'RFOS' || vm.loan.statusCode =='RFLC'){
								
								vm.showInputFieldFunds = false;	
								}else{
									
									vm.showInputFieldCase = false;	
								}
        	
        	
        }
		function showNotes() {
        	vm.showNotesDataTable = true;
        	
			$('#clearData').modal('hide');
			$('#goTonotes').show();
        }
		
		function backToEdit() {
        	
			
			$('#clearData').modal('hide');
			$('#confrmationPopUp').modal('hide');
			
        }
        
        function resetCaseId() {
        	$scope.searchloanId = '';
        }
        
       
        
        
		var newdate = new Date();
		var currDate = new Date();
			var years = newdate.getFullYear() + 1;
			newdate.setDate( newdate.getDate() );
			 newdate.setMonth(newdate.getMonth() + 6);
			newdate.setFullYear(years - 1);
			//console.log("date:::"+newdate)
		$scope.fundsDatePick =function(){
            
       
        $('#fundsExpire').datepicker({
        	maxPicks: 1,
					changeMonth : true,
					changeYear : true,
					minDate:currDate,
					yearRange: '1917:'+years,
					maxDate:newdate,
					dateFormat: "mm/dd/yy"
                   });
        $('#fundsExpire').datepicker('show');
  
	}

	$scope.caseDatePick =function(){
      

        

        $('#caseExpire').datepicker({
        	maxPicks: 1,
					changeMonth : true,
					changeYear : true,
					minDate:currDate,
					yearRange: '1917:'+years,
					maxDate:newdate,
					dateFormat: "mm/dd/yy"
                   });
        $('#caseExpire').datepicker('show');
  
	}

        function searchLoans() {
            if (!validateCaseId($scope.searchloanId)) {
            	FlashService.error('Please enter a Case number in the following format: [###-######].');
            	resetLoan();
            	return;
            }
            var caseId = $scope.searchloanId; // bind to the searchbox's value.
            
	        vm.leapSearchComplete = false;
	
			 $http({
	            method: 'GET',
	             url: 'case/dashboard/extendFunds/' + caseId ,
	           
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
					   vm.loan.loanGuaranteeFee = Number(vm.loan.loanAmount) + Number(vm.loan.loanGuaranteeFee);
					    vm.loan.loanAmount = Number(vm.loan.loanAmount).toFixed(2).	replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
					   
					    vm.loan.loanGuaranteeFee = Number(vm.loan.loanGuaranteeFee).toFixed(2).	replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
					
							
							vm.searchComplete = true;
	                    		FlashService.success('1 record found.');
								
getCaseReviewNotes();								
changingInsertedvalue();								
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
        
        function validateCaseId(caseId) {
        	return caseIdRegex.test(caseId);
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
         function changingInsertedvalue() {
			 if(vm.loan.statusCode == 'RFOS' || vm.loan.statusCode =='RFLC'){
 
   vm.insertedFieldName ='Funds Expiration Date';
   vm.insertedFieldValue =vm.loan.fundExpirationDate;
  	}
else{
	
    vm.insertedFieldName ='Case Expiration Date';
   vm.insertedFieldValue =vm.loan.caseExpirationDate;
}
		 }
         function submitAllFields() {
  	
	var myDate,fundExpirationDate;
	if(vm.loan.statusCode == 'RFOS' || vm.loan.statusCode =='RFLC'){
 myDate = new Date(vm.loan.fundExpirationDate);
   fundExpirationDate = myDate.getTime();
   
  	}
else{
	myDate = new Date(vm.loan.caseExpirationDate);
   fundExpirationDate = myDate.getTime();
   
}
$scope.extendsExpireDate = {
appicationRcvdCode:  null,
loanAmt: null,
loanTermNbr: null,
loanGrnteeFee: null,
prrCaseNbr: null,	
fndsExprtnDt:fundExpirationDate
}

        	 $http({
 		        method: 'POST',
 		        url: 'loan/fundExpiration/'+ vm.loan.caseId,
 		        headers: {"Content-Type": "application/json", "Accept": "application/json"},
				data:$scope.extendsExpireDate
 		    }).success(function (response) {
 		    
 		   
 		    	if(response.status == "SUCCESS"){
				$('#confrmationPopUp').modal('hide');
				$('#clearData').modal('hide');
				$('#saveBtn').hide();
				$('#notesArea').hide();
				
				vm.showEdit= true;
		vm.showInputFieldFunds= true;
		vm.showInputFieldCase= true;
		vm.showNotesDataTable= false;
				FlashService.success(Constants.SUCCESS_MESSAGES.UPDATED_SUCCESSFULLY);
				}else{
				FlashService.error(response.errorMessage);	
				}
 }).error(function () {
 		     
		FlashService.error(Constants.ERROR_MESSAGES.EOF_ERROR);
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
 		    	if(response.status == "SUCCESS"){
 				  
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