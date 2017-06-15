(function() {
	'use strict';
	angular.module('app').controller(
			'LoanTabController',
			['$rootScope', '$scope', '$http', '$window', '$location', '$filter', 'CaseUpdateService', 'CasesService',
			 'CommonFormService', 'FlashService', 'Constants', 'SharedDataService', '$timeout', LoanTabController]);

	function LoanTabController($rootScope, $scope, $http, $window, $location, $filter, CaseUpdateService, 
			CasesService, CommonFormService, FlashService, Constants, SharedDataService, $timeout) {
		
/*		$timeout(function() {
			angular.element('[data-target="#aftrTab"]').trigger('click');
		});*/
		
		SharedDataService.requireCaseReview();
		
		var vm = this;
		vm.loggedUserId = $window.sessionStorage.getItem("abc").split('##')[1];
		var currentCase = SharedDataService.getCaseReview();
		vm.caseNumber = $scope.caseNumber = currentCase.caseNumber;
		vm.caseId = $scope.caseId = currentCase.caseId;
		SharedDataService.setLoanTabData(vm);
		vm.goToRoute = function(route) {
			$location.path('/' + route);
		}
		
		vm.loanData = {};

		/** Public accessors * */
		vm.getCaseSummary = getCaseSummary;
		
		vm.addNotes = addNotes;
		vm.exceededBaseLoanAmountMax = exceededBaseLoanAmountMax;
		vm.getCaseReviewBorrowerFundsData = getCaseReviewBorrowerFundsData;
		vm.getCaseReviewNotes = getCaseReviewNotes;
		vm.calculateLoanPurpose = calculateLoanPurpose;
		vm.calculateBaseMortgagePlusLgFee = calculateBaseMortgagePlusLgFee;
		vm.calculateReservationOfFunds = calculateReservationOfFunds;
		vm.calculateReservationOfFundsMax = calculateReservationOfFundsMax;
		vm.calculateLgFee = calculateLgFee;
		vm.calculateLgFinanced = calculateLgFinanced;
		vm.calculateLgCash = calculateLgCash;
		vm.calculateInitialLgFeeFinanced = calculateInitialLgFeeFinanced;
		vm.saveLoanInfo = saveLoanInfo;
		vm.resetLoanData = resetLoanData;
		vm.invalidLgFeeAmounts = invalidLgFeeAmounts;
		vm.enablePriorCaseStatus = enablePriorCaseStatus;
		vm.updateLoanPurposes = updateLoanPurposes;
		vm.updateConstructionCode = updateConstructionCode;
		vm.showStatusPrior = showStatusPrior;
		vm.hasReservedFunds = hasReservedFunds;
		vm.resetLgFinancedCash = resetLgFinancedCash;
		vm.showsStrOrgn=false;
		vm.findConstructionCodeName = findConstructionCodeName;
		vm.reserveFunds = reserveFunds;
		vm.enablePrincipalBalance = enablePrincipalBalance;
		vm.requireSalesPrice = requireSalesPrice;
		vm.requireAppraisedValue = requireAppraisedValue;
		vm.calculateMIP = calculateMIP;
		vm.showExceededBaseLoanAmountMaxError = false;
		vm.checkToShowExceededBaseLoanAmountError = checkToShowExceededBaseLoanAmountError;
		vm.updateUndewriterReserve = updateUndewriterReserve;
		vm.invalidUnderwriterErrorText = Constants.ERROR_MESSAGES.INVALID_UNDERWRITER_ERROR;
		vm.loanIsDisabled = loanIsDisabled;
		
		function requireSalesPrice() {
			if (vm.loanData.editable) {
				if (vm.loanData.editable.loanTypeCd === 'REFI') {
					return false;
				}
			}
			return true;
		}
		
		function requireAppraisedValue() {
			if (vm.loanData.editable) {
				if (vm.loanData.editable.loanPrpsCd === 'RS') {
					return false;
				}
			}
			return true;
		}
		
		$('#priorCaseStatus').attr("disabled", true);
		/**strts  retrieving loan updated text for notes**/
		getCaseReviewNotes();
		function getCaseReviewNotes(){
			vm.notesDisplayText = [];
			$http({
				method: 'GET',
				url: 'case/loannotes/'+vm.caseId,
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

		/** ****** Start input masks ******* */
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate()+1);
		$('#actualClosingDatePicker, #projectedClosingDatePicker').datepicker({
	      	  maxPicks: 1,
	      	  changeMonth : true,
	          changeYear : true,
	          yearRange: '-100y:c+nn',
	          minDate: tomorrow,
	          dateFormat: "mm/dd/yy"
	        });
		
		$('.currency').inputmask('currency', {
			rightAlign : false,
			autoUnmask : true,
			unmaskAsNumber: true,
			allowMinus: false,
			allowPlus: false,
			integerDigits: 8,
			digits: 2
		});
		$('#mortgIntrstRt').inputmask('percentage', {
			digits : 3,
			integerDigits : 2,
			decimalProtect : false,
			rightAlign : false,
			autoUnmask : true,
			allowMinus: false,
			allowPlus: false,
			clearMaskOnLostFocus: false
		});
		$('#loanTermNbr').inputmask('Regex', {
			regex: '([0-9]|[1-8][0-9]|9[0-9]|[12][0-9]{2}|3[0-5][0-9]|360)'
		});
		$('#loanToValRatioPct').inputmask('percentage', {
			digits : 2,
			integerDigits : 5,
			decimalProtect : false,
			rightAlign : false,
			autoUnmask : true,
			allowMinus: false,
			allowPlus: false,
			clearMaskOnLostFocus: false
		});
		$('#upfrntFeeRate').inputmask('percentage', {
			digits : 2,
			integerDigits : 2,
			decimalProtect : false,
			rightAlign : false,
			autoUnmask : true,
			allowMinus: false,
			allowPlus: false,
			clearMaskOnLostFocus: false
		});
		$('#anulFeeRate').inputmask('percentage', {
			digits : 3,
			integerDigits : 2,
			decimalProtect : false,
			rightAlign : false,
			autoUnmask : true,
			allowMinus: false,
			allowPlus: false,
			clearMaskOnLostFocus: false
		});
	
		$('#prrCaseNbr').mask('000-000000');
		
		/******** End input masks *********/
		
		function roundCurrency(num) {
			return Math.round(num * 100) / 100;
		}

		
    
        function addNotes() {
			vm.errorNotesMsg = false;
			if(vm.loan.notes != undefined && vm.loan.notes != null && vm.loan.notes != '') {
			
			vm.sendNotes = {
			      "loanId": vm.caseId,
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
			}).success(function (response, data) {
				if(response.status == "SUCCESS"){
				FlashService.success(Constants.SUCCESS_MESSAGES.UPDATED_SUCCESSFULLY);
				getCaseReviewNotes();
				vm.loan.notes = "";
				}else{
					FlashService.error(response.errorMessage);
					
				}
			}).error(function (response, data) {
			
				FlashService.error(Constants.ERROR_MESSAGES.NOTES_SAVING_ERROR);
			})
			
			}
			else {
				vm.errorNotesMsg = true;
			}
        }
    
      
   
    
		function getCaseReviewBorrowerFundsData(caseNumber) {

			if (angular.isObject(vm.caseReviewBorrowerFundsData))
				return;
			var caseId = caseId || vm.caseId;
			var caseNumber = caseNumber || vm.caseNumber;
			return CaseUpdateService
					.getCaseReviewBorrowerFundsData(caseNumber)
					.then(
							function(response) {
								if (response.success) {
									var data = mapBorrowerDataOnRetrieve(response.data);
									vm.caseReviewBorrowerFundsData = CommonFormService
											.createFormDataObj(data);
								}
							});
		}

		function calculateLoanPurpose() {
			if (vm.loanData.editable && vm.loanData.editable.mortgWthtFnclLfFeeAmt && vm.loanData.editable.loanPrpsCd) {
				var lp = vm.loanData.editable.loanPrpsCd,
					baseLoanAmt = parseFloat(vm.loanData.editable.mortgWthtFnclLfFeeAmt),
					appraisedAmt = vm.loanData.editable.aprsdAmt ? parseFloat(vm.loanData.editable.aprsdAmt) : 0,
					salesPrice = vm.loanData.editable.salePriceAmt ? parseFloat(vm.loanData.editable.salePriceAmt) : 0;
				if (lp === 'AE' || lp === 'ARE' || lp === 'AN' || lp === 'PCON' || lp === 'UCON') {
					vm.loanData.editable.loanToValRatioPct = baseLoanAmt / (Math.min.apply(null, [appraisedAmt, salesPrice]));
				}
				if (lp === 'RWE') {
					vm.loanData.editable.loanToValRatioPct = baseLoanAmt / appraisedAmt;
				}
				if (lp === 'RWC') {
					vm.loanData.editable.loanToValRatioPct = baseLoanAmt / appraisedAmt;
				}
				if (lp === 'RWOC') {
					vm.loanData.editable.loanToValRatioPct = baseLoanAmt / appraisedAmt;
				}
				if (lp === 'RS') {
					vm.loanData.editable.loanToValRatioPct = baseLoanAmt / parseFloat(vm.loanData.editable.orgnlPrncplBlncAmt);
				}
				if (lp === 'RSA') {
					vm.loanData.editable.loanToValRatioPct = baseLoanAmt / appraisedAmt;
				}
				if (lp === 'RN') {
					vm.loanData.editable.loanToValRatioPct = baseLoanAmt / appraisedAmt;
				}
				
				vm.loanData.editable.loanToValRatioPct *= 100;
				
				// Blank out field if error occurs
				if (exceededBaseLoanAmountMax() !== false) {
					vm.loanData.editable.loanToValRatioPct = null;
				}
			}
		}

		
		function calculateMIP() {
			if (vm.loanData.editable) {
				var ltv = vm.loanData.editable.loanToValRatioPct;
				if (!ltv && ltv !== 0) {
					vm.loanData.editable.mortgPymntPiAmt = 0;
				}
				else {
					if (parseFloat(ltv) < 78) {
						vm.loanData.editable.mortgPymntPiAmt = 0;
					}
					else {
						vm.loanData.editable.mortgPymntPiAmt = vm.loanData.original.mortgPymntPiAmt;
					}
				}
			}
		}
		
		function checkToShowExceededBaseLoanAmountError() {
			if (vm.loanData.editable && vm.loanData.editable.loanTypeCd !== 'REFI') {
				if (vm.loanData.editable.salePriceAmt && vm.loanData.editable.aprsdAmt) {
					vm.showExceededBaseLoanAmountMaxError = true;
					return true;
				}
				else{
					vm.showExceededBaseLoanAmountMaxError = false;
					return false;
				}
			}
			else if (vm.loanData.editable && vm.loanData.editable.loanTypeCd == 'REFI'){
				if (vm.loanData.editable && vm.loanData.editable.aprsdAmt) {
					vm.showExceededBaseLoanAmountMaxError = true;
					return true;
				}
				else{
					vm.showExceededBaseLoanAmountMaxError = false;
					return false;
				}
			}
			else{
				vm.showExceededBaseLoanAmountMaxError = false;
				return false;
			}
		}
		
		function exceededBaseLoanAmountMax() {
			// Sales price calculation
			var salesPrice = null;
			var appraisedValue = null;
			
			if (vm.loanData.editable && vm.loanData.editable.loanTypeCd !== 'REFI') {
					salesPrice = parseFloat((vm.loanData.editable.salePriceAmt || 0));
					if (salesPrice > 50000) {
						salesPrice *= 0.9775;
					} else if (salesPrice <= 50000) {
						salesPrice *= 0.9875;
					}
			}
			
			if (vm.loanData.editable && vm.loanData.editable.loanPrpsCd != 'RS') {
				appraisedValue = parseFloat((vm.loanData.editable.aprsdAmt || 0));
				if (appraisedValue > 50000) {
					appraisedValue *= 0.9775;
				} else if (appraisedValue <= 50000) {
					appraisedValue *= 0.9875;
				}
			}

			var values = [vm.maxMortageLimitAmount];
			if (appraisedValue !== null) {
				values.push(roundCurrency(appraisedValue));
			}
			if (salesPrice !== null) {
				values.push(roundCurrency(salesPrice));
			}
			
			var compareValue = Math.min.apply(null, values);
			if (vm.loanData.editable && parseFloat(vm.loanData.editable.mortgWthtFnclLfFeeAmt) > compareValue) {
				return compareValue;
			}
			return false;
		}
        
		function openReserveFunds() {
        	angular.element('#reserveFundsConfirmation').modal('hide');
        	angular.element('.modal-backdrop').hide();
        	angular.element('body').removeClass('modal-open');
        	$location.path('/reserveFunds');
        	$window.scrollTo(0, 0);
		}
		
		function createUnderwriterParams() {
			var user = JSON.parse($window.sessionStorage.getItem("activeUser")),
				abc = JSON.parse($window.sessionStorage.getItem("abc"));
			return {
				 userName: user.loggedUser,
				 currentUnderwriterId: vm.person.undrWriterId,
				 lenderId: abc.split('##')[0],
				 loanId: vm.caseId
			}
		}
		
        function reserveFunds() {
        	var stats = Loanvalidation();
        	if(stats === true && !hasReservedFunds() && !loanIsDisabled()) {
        		var uwParams = createUnderwriterParams();
	        	CaseUpdateService.verifyUnderwriter(uwParams)
	        		.then(function(response) {
	        			if (response.success) {
	        				// Is underwriter in the list?
	        				var isUnderwriter = response.data.lenderUnderwriter || response.data.currentUnderwriter;
	        				var underwriterId = response.data.lenderUnderwriterId || response.data.currentUnderwriterId;
		        			if (!isUnderwriter || !(retrieveUnderwriter(vm.underwriters, underwriterId))) {
		        				vm.invalidUnderwriterErrorText = Constants.ERROR_MESSAGES.NON_APPROVED_UNDERWRITER_ERROR;
		        				angular.element('#requiredUnderwriterError').modal('show');
		        			}
		        			else {
		        				vm.currentUserUnderwriterId = response.data.lenderUnderwriterId || response.data.currentUnderwriterId;
			        			if (!response.data.currentUnderwriter) {
			        				angular.element('#underwriterVerification').modal('show');
			        			}
			        			else {
			        				doReservation();
			        			}
		        			}
	        			}
	        		})
	        	}
        }
        
        function updateUndewriterReserve() {
        	$rootScope.lender.undrWriterId = vm.currentUserUnderwriterId;
        	CaseUpdateService.updateCase($rootScope.lender)
        		.then(function(response) {
        			if (response.success) {
        				doReservation();
        			}
        			CommonFormService.clearCache(Constants.API_ENDPOINTS.GET_PERSON_FOR_CASE.replace(':caseId', vm.caseId));
        		});
        }
        
        function doReservation() {
        	var data = mapDataForReserveFunds();
        	CaseUpdateService.reserveFunds(vm.caseId, data)
        		.then(function(response) {
        			if (response.success) {
        				var data = response.data;
        				SharedDataService.setReserveFunds({
        					documentId: data.docId,
        					caseNumber: vm.caseNumber,
        					chrtNbr: data.chrtNbr,
        					docName: data.docName,
        					docUrl: data.docUrl,
        					noticePdf: data.noticePdf,
        					binderTypeCd: data.binderTypeCd
        				});
        	        	
        				if (angular.isDefined(data.noticePdf) && data.noticePdf !== null) {
        					openReserveFunds();
        				}
            	        else if (response.error) {
            	        	var error = response.error.error;
            	        	FlashService.error(error);
            	        }
        	        }
        	        else if (response.error) {
        	        	var error = response.error.error;
        	        	FlashService.error(error);
        	        }
        	    }, function(error) {
        	    	FlashService.error(Constants.ERROR_MESSAGES.RESERVE_FUNDS_PROCESS_ERROR);
        	    });
        }
		
		function validateForm() {
			if (exceededBaseLoanAmountMax() !== false) {
				return false;
			}
			if (vm.caseReviewBorrowerFundsData && vm.caseReviewBorrowerFundsData.editable) {
				if (Number(vm.caseReviewBorrowerFundsData.editable.sellerContributionPercent) > 6) {
					return false;
				}
			}
			if (invalidLgFeeAmounts()) {
				vm.lgFeeAmountsError = true;
				return false;
			}
			else {
				vm.lgFeeAmountsError = false;
			}
			if (vm.loanData.editable.mortgWithLgFeeFncdAmt < vm.loanData.editable.fndsRsrvdAmt){
				return false;
			}
			return true;
		}
		
		function enablePriorCaseStatus() {
			if (vm.loanData.editable && vm.loanData.editable.loanPrpsCd) {
				if (vm.loanData.editable.loanPrpsCd === 'RS' || vm.loanData.editable.loanPrpsCd === 'RSA') {
					return true;
				}
			}
			return false;
		}
		
		
		function enablePrincipalBalance() {
			if (vm.loanData.editable) {
				return vm.loanData.editable.loanTypeCd == 'REFI';
			}
		}

		function calculateLgFee() {
			if (vm.loanData.editable) {
				if (angular.isDefined(vm.loanData.editable.upfrntFeeRate) && angular.isDefined(vm.loanData.editable.mortgWthtFnclLfFeeAmt)) {
					var loanGrnteeFee = roundCurrency(parseFloat(vm.loanData.editable.upfrntFeeRate));
					var mortgWthtFnclLfFeeAmt = roundCurrency(parseFloat(vm.loanData.editable.mortgWthtFnclLfFeeAmt));
					vm.loanData.editable.loanGrnteeFee = (roundCurrency(loanGrnteeFee)/100) * mortgWthtFnclLfFeeAmt;
				}
			}
		}
		
		function calculateInitialLgFeeFinanced(resetOriginal) {
				var loanGrnteeFee = roundCurrency(parseFloat(vm.loanData.editable.loanGrnteeFee || 0));
				vm.loanData.editable.grnteeFeeFncdAmt = loanGrnteeFee;
				vm.loanData.editable.grnteeFeePaidInCashAmt = 0;
				if(resetOriginal){
					vm.loanData.original.grnteeFeeFncdAmt = loanGrnteeFee;
					vm.loanData.original.grnteeFeePaidInCashAmt = 0;
				}
		}
		
		function calculateLgCash() {
			if (vm.loanData.editable) {
				var loanGrnteeFee = roundCurrency(parseFloat(vm.loanData.editable.loanGrnteeFee || 0));
				var lgFeeFinanced = roundCurrency(parseFloat(vm.loanData.editable.grnteeFeeFncdAmt || 0));
				var lgFeeCash = roundCurrency(loanGrnteeFee - lgFeeFinanced);
				if (lgFeeFinanced >= 0 && lgFeeCash >= 0) {
					if (roundCurrency(lgFeeFinanced + lgFeeCash) > loanGrnteeFee) {
						vm.lgFeeFinancedError = true;
					}
					else {
						vm.lgFeeFinancedError = false;
						vm.loanData.editable.grnteeFeePaidInCashAmt = roundCurrency(loanGrnteeFee - lgFeeFinanced);
					}
				}
				else {
					vm.loanData.editable.grnteeFeeFncdAmt = loanGrnteeFee;
					vm.loanData.editable.grnteeFeePaidInCashAmt = 0;
				}
			}
		}
		
		function calculateLgFinanced() {
			if (vm.loanData.editable) {
				var loanGrnteeFee = roundCurrency(parseFloat(vm.loanData.editable.loanGrnteeFee || 0));
				var lgFeeCash = roundCurrency(parseFloat(vm.loanData.editable.grnteeFeePaidInCashAmt || 0));
				var lgFeeFinanced = roundCurrency(loanGrnteeFee - lgFeeCash);
				if (lgFeeFinanced >= 0 && lgFeeCash >= 0) {
					if (roundCurrency(lgFeeFinanced + lgFeeCash) > loanGrnteeFee) {
						vm.lgPaidCashError = true;
					}
					else {
						vm.lgPaidCashError = false;
						vm.loanData.editable.grnteeFeeFncdAmt = roundCurrency(loanGrnteeFee - lgFeeCash);
					}
				}
				else {
					vm.loanData.editable.grnteeFeePaidInCashAmt = loanGrnteeFee;
					vm.loanData.editable.grnteeFeeFncdAmt = 0;
				}
			}
		}
		
		function resetLgFinancedCash() {
			vm.loanData.editable.grnteeFeePaidInCashAmt = 0;
			vm.loanData.editable.grnteeFeeFncdAmt = 0;
			if (!hasReservedFunds()) {
				calculateInitialLgFeeFinanced();
			}
		}
		
		function invalidLgFeeAmounts() {
			if (vm.loanData && vm.loanData.editable && vm.loanData.editable.loanGrnteeFee) {
				var guaranteeFeeFinanced = vm.loanData.editable.grnteeFeeFncdAmt ? parseFloat(vm.loanData.editable.grnteeFeeFncdAmt) : 0;
				var guaranteeFeeCash = vm.loanData.editable.grnteeFeePaidInCashAmt ? parseFloat(vm.loanData.editable.grnteeFeePaidInCashAmt) : 0;
				var lgFee = parseFloat(vm.loanData.editable.loanGrnteeFee);
				if ((roundCurrency(guaranteeFeeFinanced) + roundCurrency(guaranteeFeeCash)) === roundCurrency(lgFee)) {
					return false;
				}
			}
			return true;
		}

		function calculateBaseMortgagePlusLgFee(resetOriginal) {
			if (vm.loanData.editable) {
				if (angular.isDefined(vm.loanData.editable.grnteeFeeFncdAmt) && angular.isDefined(vm.loanData.editable.mortgWithLgFeeFncdAmt)) {
					var lgFeeFinanced = parseFloat(vm.loanData.editable.grnteeFeeFncdAmt || 0);
					var baseLoanAmount = parseFloat(vm.loanData.editable.mortgWthtFnclLfFeeAmt || 0);
					vm.loanData.editable.mortgWithLgFeeFncdAmt = roundCurrency(lgFeeFinanced) + roundCurrency(baseLoanAmount);
					// Calculate base loan amount plus lg fee
					var lgFee = parseFloat(vm.loanData.editable.loanGrnteeFee);
                    vm.loanData.editable.mortgWithFnclLfFeeAmt = roundCurrency(lgFee) + roundCurrency(baseLoanAmount);
                    if(resetOriginal){
                    	vm.loanData.original.mortgWithLgFeeFncdAmt = roundCurrency(lgFeeFinanced) + roundCurrency(baseLoanAmount);
                    	vm.loanData.original.mortgWithFnclLfFeeAmt = roundCurrency(lgFee) + roundCurrency(baseLoanAmount);
                    }
				}
			}
		}
		
		function calculateReservationOfFunds(resetOriginal) {
			if (vm.loanData.editable && !hasReservedFunds()) {
				if (angular.isDefined(vm.loanData.editable.grnteeFeeFncdAmt) && angular.isDefined(vm.loanData.editable.mortgWithLgFeeFncdAmt)) {
					var lgFeeFinanced = parseFloat(vm.loanData.editable.grnteeFeeFncdAmt || 0);
					var baseLoanAmount = parseFloat(vm.loanData.editable.mortgWthtFnclLfFeeAmt || 0);
					vm.loanData.editable.fndsRsrvdAmt = roundCurrency(lgFeeFinanced) + roundCurrency(baseLoanAmount);
					if(resetOriginal){
						vm.loanData.original.fndsRsrvdAmt = roundCurrency(lgFeeFinanced) + roundCurrency(baseLoanAmount);
					}
				}
			}
		}
		
		function calculateReservationOfFundsMax() {
			if (vm.loanData.editable) {
				if (angular.isDefined(vm.loanData.editable.grnteeFeeFncdAmt) && angular.isDefined(vm.loanData.editable.mortgWithLgFeeFncdAmt)) {
					var lgFeeFinanced = parseFloat(vm.loanData.editable.grnteeFeeFncdAmt || 0);
					var baseLoanAmount = parseFloat(vm.loanData.editable.mortgWthtFnclLfFeeAmt || 0);
					if (vm.loanData.editable.fndsRsrvdAmt > roundCurrency(lgFeeFinanced) + roundCurrency(baseLoanAmount)) {
						vm.loanData.editable.fndsRsrvdAmt = roundCurrency(lgFeeFinanced) + roundCurrency(baseLoanAmount);
					}
				}
			}
		}

		vm.showStarPurpose= false;
	
		function showStatusPrior() {
			var loanPurpose = false;
			if(vm.loanData && vm.loanData.editable && vm.loanData.editable.loanPrpsCd){
				loanPurpose = vm.loanData.editable.loanPrpsCd.indexOf("RS", 0) === 0;
			}
			if(vm.loanData.editable.loanPrpsCd == 'RS') {
				vm.showsStrOrgn=true;
			}
			else {
				vm.showsStrOrgn=false;
			}
			if(loanPurpose == true){
				vm.showStarPurpose= true;
			}
			else {
				vm.showStarPurpose= false;
				$('#priorCaseStatus').attr("disabled", true);
			}
		}

		vm.prrCaseNbrErrorText = Constants.ERROR_MESSAGES.PRIOR_CASE_REQUIRED;
		vm.prrCaseStatErrorText = Constants.ERROR_MESSAGES.PRIOR_CASE_REQUIRED;
		vm.loanTypeCdErrorText = Constants.ERROR_MESSAGES.LOAN_TYPE_REQUIRED; 
		vm.appicationRcvdCodeErrorText = Constants.ERROR_MESSAGES.APPLICATION_RECEIVED_BY_REQUIRED;
		vm.grnteeFeeFncdAmtErrorText = Constants.ERROR_MESSAGES.LG_FEE_FINANCED_REQUIRED;
		vm.grnteeFeePaidInCashAmtErrorText = Constants.ERROR_MESSAGES.LG_FEE_FINANCED_CASH_INVALID;
		vm.loanTermNbrErrorText = Constants.ERROR_MESSAGES.LOAN_TERM_REQUIRED;
		vm.salePriceAmtErrorText = Constants.ERROR_MESSAGES.SALES_PRICE_REQUIRED;
		vm.aprsdAmtErrorText = Constants.ERROR_MESSAGES.APPRAISED_VALUE_REQUIRED;
		vm.orgnlPrncplBlncAmtErrorText = Constants.ERROR_MESSAGES.ORIG_PRINCIPAL_BALANCE_REQUIRED;
		vm.realEstTxsAmtErrorText = Constants.ERROR_MESSAGES.TAXES_REQUIRED;
		vm.loanPrpsCdErrorText = Constants.ERROR_MESSAGES.LOAN_PURPOSE_REQUIRED;
		vm.bsamtErrorText = Constants.ERROR_MESSAGES.BASES_FOR_MORTGAGE_CALC_REQUIRED;
		vm.mortgIntrstRtErrorText = Constants.ERROR_MESSAGES.INTEREST_RATE_REQUIRED;
		vm.hzrdFldAmtErrorText = Constants.ERROR_MESSAGES.HAZARD_FLOOD_REQUIRED;
		vm.mortgIntrstRtMinErrorText = Constants.ERROR_MESSAGES.INTEREST_RATE_MINIMUM;
		vm.mortgWithLgFeeFncdAmtErrorText = Constants.ERROR_MESSAGES.RESERVATION_OF_FUNDS_EXCEED_ERROR;
		vm.sellerContributionPercentErrorText = Constants.ERROR_MESSAGES.SELLER_CONTRIBUTION_ERROR;
		vm.mortgWthtFnclLfFeeAmtErrorText = Constants.ERROR_MESSAGES.BASE_LOAN_AMOUNT_REQUIRED;
		vm.lgFeePaidInCashErrorText = Constants.ERROR_MESSAGES.LG_FEE_PAID_CASH_REQUIRED;
		vm.lgFeeCombinedErrorText = Constants.ERROR_MESSAGES.LG_FEE_FINANCED_CASH_INVALID;
		vm.ltvMaxErrorText = Constants.ERROR_MESSAGES.LTV_MAX_ERROR;
		vm.projectedDateErrorText = Constants.ERROR_MESSAGES.PROJECTED_DATE_REQUIRED;
		vm.projectedDateMaxErrorText = Constants.ERROR_MESSAGES.PROJECTED_DATE_MAX_ERROR;
		vm.projectedDateExceedsROFText = Constants.ERROR_MESSAGES.PROJECTED_DATE_EXCEEDS_EXP;
		vm.actualDateExceedsROFText = Constants.ERROR_MESSAGES.ACTUAL_DATE_EXCEEDS_EXP;
		
		
		$scope.$watch(function() {
			return exceededBaseLoanAmountMax();
		}, function(value) {
			vm.exceededBaseLoanAmountMaxErrorText = Constants.ERROR_MESSAGES.MAX_BASE_LOAN_AMOUNT_ERROR
															.replace(":num", $filter('currency')(value));
		});

		function Loanvalidation() {
			var loanPurpose = vm.loanData.editable.loanPrpsCd.lastIndexOf("RS", 0) === 0;
			var statusCheck = false;
			vm.prrCaseNbr = false;
			vm.prrCaseStat = false;
			vm.loanTypeCd = false;
			vm.appicationRcvdCode = false;
			vm.grnteeFeeFncdAmt = false;
			vm.grnteeFeePaidInCashAmt = false;
			vm.loanTermNbr = false;
			vm.salePriceAmt = false;
			vm.aprsdAmt = false;
			vm.orgnlPrncplBlncAmt = false;
			vm.realEstTxsAmt = false;
			vm.mortgPymntPiAmt = false;
			vm.loanPrpsCd = false;
			vm.bsamt= false;
			vm.mortgIntrstRt = false;
			vm.showMinIntrstRt = false;
			vm.showLgFeeMsg = false;
			vm.hzrdFldAmt = false;
			vm.showLtvMaxError = false;
			vm.showProjectedDateError = false;
			vm.showExceededBaseLoanAmountMaxError = false;
			vm.showProjectedDateMaxError = false;
			
			if(loanPurpose == true) {
				var prrCaseNbr = vm.loanData.editable.prrCaseNbr;
				var prrCaseStat = vm.loanData.editable.prrCaseStat;
				if (prrCaseNbr != undefined && prrCaseNbr!= null && prrCaseNbr!= '') {
						
				}
				else {
					statusCheck = true;
					vm.prrCaseNbr = true;
				}
				if(prrCaseStat!= undefined && prrCaseStat!= null && prrCaseStat!= '') {
								
				} 
				else {
					statusCheck = true;
					vm.prrCaseStat = true;
				}
			}
			else {
			
			}
			if (vm.loanData.editable.hzrdFldAmt != undefined && vm.loanData.editable.hzrdFldAmt != null && vm.loanData.editable.hzrdFldAmt != '') {
				
			}
			else {
				if (vm.landType === 'FEE SIMPLE') {
					statusCheck = true;
					vm.hzrdFldAmt = true;
				}
			}
			if(vm.loanData.editable.loanTypeCd!= undefined && vm.loanData.editable.loanTypeCd!= null && vm.loanData.editable.loanTypeCd!= '') {
						
			}
			else {
				statusCheck = true;
				vm.loanTypeCd = true;
			}
			
			if (vm.loanData.editable.appicationRcvdCode!= undefined && vm.loanData.editable.appicationRcvdCode!= null && vm.loanData.editable.appicationRcvdCode!= '') {

			}
			else {
				statusCheck = true;
				vm.appicationRcvdCode = true;
			}
			if (vm.loanData.editable.loanTypeCd !== 'REFI') {
				if (vm.loanData.editable.salePriceAmt!= undefined && vm.loanData.editable.salePriceAmt!= null && vm.loanData.editable.salePriceAmt!= '') {
							
				}
				else {
					statusCheck = true;
					vm.salePriceAmt = true;
				}
			}
			if (vm.loanData.editable.loanPrpsCd != 'RS') {
				vm.showsStrOrgn=false;
				if(vm.loanData.editable.aprsdAmt!= undefined && vm.loanData.editable.aprsdAmt!= null && vm.loanData.editable.aprsdAmt!= '' && vm.loanData.editable.aprsdAmt!= '$0.00') {
							
				} 
				else {
					statusCheck = true;
					vm.aprsdAmt = true;
				}
			}
			else {
				vm.showsStrOrgn=true;
				if (vm.loanData.editable.orgnlPrncplBlncAmt!= undefined && vm.loanData.editable.orgnlPrncplBlncAmt!= null && vm.loanData.editable.orgnlPrncplBlncAmt!= ''&& vm.loanData.editable.orgnlPrncplBlncAmt!= 0.00) {
							
				}
				else {
					statusCheck = true;
					vm.orgnlPrncplBlncAmt = true;
				}
			}
			
			if((vm.loanData.editable.grnteeFeePaidInCashAmt== undefined || vm.loanData.editable.grnteeFeePaidInCashAmt== null || vm.loanData.editable.grnteeFeePaidInCashAmt== '') && (vm.loanData.editable.grnteeFeeFncdAmt== undefined || vm.loanData.editable.grnteeFeeFncdAmt== null || vm.loanData.editable.grnteeFeeFncdAmt== '')) {
				statusCheck = true;
				vm.showLgFeeMsg = true;
			}
			else if ((vm.loanData.editable.grnteeFeePaidInCashAmt!= undefined && vm.loanData.editable.grnteeFeePaidInCashAmt!= null && vm.loanData.editable.grnteeFeePaidInCashAmt!= '') && (vm.loanData.editable.grnteeFeeFncdAmt== undefined && vm.loanData.editable.grnteeFeeFncdAmt== null || vm.loanData.editable.grnteeFeeFncdAmt== '')) {

			}else if ((vm.loanData.editable.grnteeFeePaidInCashAmt== undefined || vm.loanData.editable.grnteeFeePaidInCashAmt== null || vm.loanData.editable.grnteeFeePaidInCashAmt== '') && (vm.loanData.editable.grnteeFeeFncdAmt!= undefined && vm.loanData.editable.grnteeFeeFncdAmt!= null && vm.loanData.editable.grnteeFeeFncdAmt!= '')) {

			}
			else {
			
			}
			
			if(vm.loanData.editable.realEstTxsAmt!= undefined && vm.loanData.editable.realEstTxsAmt!= null && vm.loanData.editable.realEstTxsAmt!= '') {
							
			}
			else {
				if (vm.landType == 'FEE SIMPLE') {
					statusCheck = true;
					vm.realEstTxsAmt = true;
				}
			}
			
			if(vm.loanData.editable.loanPrpsCd!= undefined && vm.loanData.editable.loanPrpsCd!= null && vm.loanData.editable.loanPrpsCd!= '')
						{
							
						}else{
							
							statusCheck = true;
			vm.loanPrpsCd = true;
							}
			if(vm.loanData.editable.baseMortgCalcCd!= undefined && vm.loanData.editable.baseMortgCalcCd!= null && vm.loanData.editable.baseMortgCalcCd!= '')
						{
							
						}else{
							
							statusCheck = true;
			vm.bsamt = true;
							}
			if(vm.loanData.editable.mortgIntrstRt!= undefined && vm.loanData.editable.mortgIntrstRt!= null && vm.loanData.editable.mortgIntrstRt!= '')
						{
							
						}else{
							
							statusCheck = true;
			vm.mortgIntrstRt = true;
							}
			if (parseFloat(vm.loanData.editable.mortgIntrstRt) <= 0) {
				statusCheck = true;
				vm.showMinIntrstRt = true;
			}
			if(vm.loanData.editable.loanTermNbr!= undefined && vm.loanData.editable.loanTermNbr!= null && vm.loanData.editable.loanTermNbr!= '')
						{
							
						}else{
							
							statusCheck = true;
			vm.loanTermNbr = true;
							}
			
			if (vm.loanData.editable.loanPrpsCd === 'RWC') {
				if (parseFloat(vm.loanData.editable.loanToValRatioPct || 0) > 85) {
					statusCheck = true;
					vm.showLtvMaxError = true;
				}
			}
			
			if (parseFloat(vm.loanData.editable.mortgWithLgFeeFncdAmt) < parseFloat(vm.loanData.editable.fndsRsrvdAmt) && vm.hasBeenSubmitted) {
				statusCheck = true;
				FlashService.error(vm.mortgWithLgFeeFncdAmtErrorText);
			}
			
			//There are two validation going on for code below
			//1) Validation to see if projected closing date is empty
			if (vm.loanData.editable.prjctdClsngDt != undefined && vm.loanData.editable.prjctdClsngDt != null && vm.loanData.editable.prjctdClsngDt != ''){
				//2) Validation to see if projected closing date is 120 days after case registration date;
				if(vm.caseRegistrationDate != undefined && vm.caseRegistrationDate != null && vm.caseRegistrationDate != ''){
					var projectedClosingDate = new Date(vm.loanData.editable.prjctdClsngDt);
					var caseRegDate = new Date(vm.caseRegistrationDate);
					caseRegDate.setDate(caseRegDate.getDate() + 120);
					if(caseRegDate.getTime() < projectedClosingDate.getTime()){
						statusCheck = true;
						vm.showProjectedDateMaxError = true;
					}
				}
			}
			else{
				statusCheck = true;
				vm.showProjectedDateError = true;
			}
			
			
			//determining what to return
			if (statusCheck == false){
				return true;
			} else{
				return false
				}
			
			}
		
		function saveLoanInfo() {
			var stats = Loanvalidation();
			if(stats == true) {
				if (!validateForm()) {
					return false;
				}
				vm.hasBeenSubmitted = true;
				var data = mapDataForSave();
				return CaseUpdateService.saveLoanInfo(vm.caseId, data)
					.then(function(response) {
						if (response.success) {
							FlashService.success(Constants.SUCCESS_MESSAGES.SAVED_SUCCESSFULLY);
							var data = mapDataOnRetrieve(response.data);
							vm.loanData = CommonFormService.createFormDataObj(data);
							$scope.$broadcast('refreshCaseSummary');
							CommonFormService.clearCache(Constants.API_ENDPOINTS.GET_LOAN_CALCULATIONS.replace(":loanId", vm.caseId));
							CommonFormService.clearCache(Constants.API_ENDPOINTS.GET_CASE_SUMMARY.replace(":caseId", vm.caseId));
							CommonFormService.clearCache(Constants.API_ENDPOINTS.GET_LOAN_FOR_CASE.replace(":caseId", vm.caseId));
						}
					}, function(response) {
						if (response.error) {
							FlashService.error(response.error);
						}
					});
			}
		}

		function initController() {
			// Retrieve case summary
			getCaseSummary(vm.caseNumber).then(function(response) {
				vm.caseSummary = response.data;
				vm.loanPurpose = vm.caseSummary.loanPrps;
				vm.caseRegistrationDate = vm.caseSummary.caseCrtdDt;
			}, function(response) {
				if (response.error) {
					FlashService.error(response.error);
				}
			});

			// Retrieve prior case statuses
			CommonFormService.getReferenceCodes('PRIOR CASE STATUS').then(
					function(response) {
						vm.priorCaseStatuses = response.data;
					});

			// Retrieve application recieved by
			CommonFormService.getReferenceCodes('APPLICATION RECEIVED').then(
					function(response) {
						vm.applicationReceived = response.data;
					});
		
			// Retrieve loan types
			CommonFormService.getReferenceCodes('LOAN TYPE').then(
				function(response) {
					vm.loanTypes = response.data;
				});
			
			// Retrieve construction codes
			CommonFormService.getReferenceCodes('CONSTRUCTION CODE').then(
					function(response) {
						vm.constructionCodes = response.data;
					});
					
			// Retrieve basis for mortgage calculation
			CommonFormService.getReferenceCodes('BASE MORTGAGE CALCULATION').then(
					function(response) {
						vm.baseMortgageCalculation = response.data;
					});
			
			CommonFormService.getReferenceCodes('LAND STATUS').then(
					function(response) {
						vm.landTypes = response.data;
					});
			
			CommonFormService.getReferenceCodes('BORROWER TYPE').then(
					function(response) {
						vm.borrowerTypes = response.data;
					});
			
			CommonFormService.getReferenceCodes('TRIBE').then(
					function(response) {
						vm.tribes = response.data;
					});

			// Retrieve loan for case
			CaseUpdateService.getLoanForCase(vm.caseId).then(
					function(response) {
						if (response) {
							if (response.success && response.data.status == "SUCCESS") {
								vm.loan = response.data;
							}
							else if (response.error || (response.data && response.data.status == "ERROR")) {
								FlashService.error(response.data.errorMessage);
							}
						}
					});

			// Retrieve property for case
			CaseUpdateService.getPropertyForCase(vm.caseId).then(
					function(response) {
						if (response.success && response.data.status === 'SUCCESS') {
							vm.property = response.data;
							// Retrieve max mortgage limit amount
							var addr = vm.property.prprtyAddr;
							CaseUpdateService.getMaxMortgageLimitAmt(addr.stCd, addr.cntyNm, vm.property.nbrOfUnits).then(
									function(response) {
										if (response.success && response.data.status == "SUCCESS") {
											vm.maxMortageLimitAmount = parseFloat(response.data.unitAmount);
										}
									else if (response.error || response.data.status == "ERROR") {
										FlashService.error(Constants.ERROR_MESSAGES.MAX_BASE_LOAN_AMOUNT_RETRIEVAL_ERROR);
									}
									}, function(response) {
										FlashService.error(Constants.ERROR_MESSAGES.MAX_BASE_LOAN_AMOUNT_RETRIEVAL_ERROR);
									});
									if (vm.landTypes) {
										vm.landTypes.forEach(function(status) {
											if (vm.property.landTypeCd.trim() === status.referenceCodeValue) {
												vm.landType = status.referenceCodeName;
											}
										});
									}
						}
					});

			// Retrieve borrowers for case
			CaseUpdateService.getBorrowersForCase(vm.caseId).then(
					function(response) {
						vm.borrowers = response.data;
					});
			
			
			// Retrieve underwriters
			CaseUpdateService.getUnderWriters()
				.then(function(response) {
					if(response.data && response.data.personsList){
						vm.underwriters = response.data.personsList;
					}
					else{
						vm.underwriters = response.data;
					}
				});
			
			// Retrieve loan calculations
			CaseUpdateService.getLoanCalculations(vm.caseId)
				.then(function(response) {
					if (response.success) {
						var data = mapDataOnRetrieve(response.data);
						vm.loanData = CommonFormService.createFormDataObj(data);
						vm.updateLoanPurposes();

						// initiate LG Fee Financed amount
						calculateInitialLgFeeFinanced(true);
						
						vm.calculateBaseMortgagePlusLgFee(true);
						// initiate Reservation of Funds amount
						if(!vm.loanData.editable.fndsRsrvdAmt){
							calculateReservationOfFunds(true);
						}
						
						calculateLoanPurpose();
					}
				}, function(response) {
					if (response.error) {
						FlashService.error(response.error);
					}
				});
			
			 // Retrieve person for case
			 CaseUpdateService.getPersonForCase(vm.caseId)
			 	.then(function(response) {
			 		if (response.success && response.data.status === 'SUCCESS') {
				 		vm.person = response.data;
						CaseUpdateService.getSponsorBrokers(vm.person.lndrId)
						.then(function(response) {
							if (response.success) {
								vm.brokers = response.data;
								if (angular.isArray(vm.brokers.sponserBrokerPojos)) {
									vm.brokers.sponserBrokerPojos.forEach(function(broker) {
										if (broker.lenderId === vm.person.loanBrokerId) {
											vm.broker = broker.lenderName;
										}
									})
								}
							}
							else if (response.error) {
								FlashService.error(Constants.ERROR_MESSAGES.SPONSOR_BROKERS_RETRIEVAL_ERROR);
							}
						}, function(error) {
							FlashService.error(Constants.ERROR_MESSAGES.SPONSOR_BROKERS_RETRIEVAL_ERROR);
						});
			 		}
			 	});
			
			// Get Case Review Borrower Funds Data
			getCaseReviewBorrowerFundsData(vm.caseNumber);
		}
	
		function cancelledStatuses() {
			return ['RFEX', 'LREX', 'RFCL', 'LRCB', 'RFCB', 'LGCL', 'LRCL'];
		}
		
		function loanIsDisabled() {
			if (vm.loanData && vm.loanData.editable) {
				var stats = cancelledStatuses();
				if (stats.indexOf(vm.loanData.editable.caseStatus) !== -1) return true;
				return false;
			}
		}
		
		function getUserName() {
			if ($window.sessionStorage.getItem("activeUser")) {
				return JSON.parse($window.sessionStorage.getItem("activeUser")).loggedUser;
			}
			return null;
		}
		
		function mapDataForReserveFunds() {
			var reserveFundsData = {
					caseNbr: vm.caseNumber,
					fndsRsrvdDt: null,
					fndsExprtnDt: null,
					originator: vm.broker || vm.person.lndrName,
					sponsor: vm.person.lndrName,
					borrower: retrieveBorrower(vm.borrowers, vm.tribes) || null,
					coBorrowers: retrieveCoborrowers(vm.borrowers.persns),
					property: concatenateAddress(vm.property.prprtyAddr),
					landType: retrieveLandType(vm.landTypes, vm.property.landTypeCd),
					dgUnderwriter: retrieveUnderwriter(vm.underwriters, $rootScope.lender.undrWriterId),
					userName: getUserName(),
					binderTypeCd: "ROF"
			};
	
			var data = angular.extend({}, reserveFundsData, mapDataForSave());
			return data;
		}

    	function concatenateAddress(addr) {
    		if (addr) {
	    		return addr.addrStrNm + ", " + addr.cityNm + ", " + addr.stCd + " " + (addr.zipPlus4Cd || addr.zip5Cd);
    		}
    	}
    	
    	function retrieveLandType(landTypes, value) {
    		if (landTypes) {
    			var trimmedLandType,
    				trimmedValue,
    				matched = null;
    			landTypes.forEach(function(landType) {
    				trimmedLandType = landType.referenceCodeValue.replace(/ /g, '');
    				trimmedValue = value.replace(/ /g, '');
    				if (trimmedLandType === trimmedValue) {
    					matched = landType.referenceCodeValue;
    				}
    			})
    			return matched;
    		}
    	}
    	
    	function retrieveTribe(tribes, value) {
    		if (tribes) {
    			var trimmedTribe,
    				trimmedValue,
    				matched = null;
    			if (angular.isArray(tribes)) {
	    			tribes.forEach(function(tribe) {
	    				trimmedTribe = tribe.referenceCodeValue.replace(/ /g, '');
	    				trimmedValue = value.replace(/ /g, '');
	    				if (trimmedTribe === trimmedValue) {
	    					matched = tribe.referenceCodeName;
	    				}
	    			});
    			}
    			return matched;
    		}
    	}
    	
    	function retrieveUnderwriter(underwriters, value) {
    		var underwriterId = value,
    			matched = null;
    		
    		if (angular.isArray(underwriters)) {
	    		underwriters.forEach(function(uw) {
	    			if (uw.personId === underwriterId) {
	    				matched = uw.personName;
	    			}
	    		});
    		}
    		
    		return matched;
    	}
    	
    	function retrieveBorrower(borrowers, tribes) {
    		var borrowerType = borrowers.borrowerType,
    			borrowerValue = null;
    		if (borrowerType === 'IND') {
    			var persons = borrowers.persns;
    			// Primary borrower
    			borrowerValue = persons[0].firstname + ' ' + persons[0].lastname;
    		}
    		else if (borrowerType === 'IHA' || borrowerType === 'TDHE') {
    			borrowerValue = borrowers.orgnsn;
    		}
    		else if (borrowerType === 'TRE') {
    			borrowerValue = retrieveTribe(tribes, borrowers.tribal);
    		}
    		return borrowerValue;
    	}
    	
    	function retrieveCoborrowers(borrowers) {;
    		if (!borrowers) return null;
    		var borrowerValue = "";
    		borrowers.slice(1).forEach(function(brwr) {
    			borrowerValue += brwr.firstname + ' ' + brwr.lastname + ', ';
    		});
    		borrowerValue = borrowerValue.slice(0, -2);
    		return borrowerValue;
    	}
		
		function getCaseSummary(caseNumber) {
			return CasesService.getCaseSummary(caseNumber);
		}
		
		function findConstructionCodeName(codeVal) {
			if (vm.constructionCodes && codeVal) {
				var filtered = vm.constructionCodes.filter(function(code) {
					return code.referenceCodeValue === codeVal;
				});
				if (filtered.length > 0) {
					return filtered[0].referenceCodeName;
				}
			}
			return "";
		}
		
		function resetLoanData() {
			CommonFormService.resetFormDataObj(vm.loanData);
			$('#clearData').modal('hide');
		}
		
		function mapDataOnRetrieve(data) {
			data.prrCaseStat = data.prrCaseStat || "";
			data.appicationRcvdCode = data.appicationRcvdCode || "";
			data.baseMortgCalcCd = data.baseMortgCalcCd || "";
			data.loanTypeCd = data.loanTypeCd || "";
			data.loanPrpsCd = data.loanPrpsCd || "";
			data.constrnCd = data.constrnCd || "";
			data.fndsRsrvdAmt = data.fndsRsrvdAmt || data.mortgWithFnclLfFeeAmt;
			data.caseStatus = data.caseStatus || "";
			return data;
		}
		
		function mapBorrowerDataOnRetrieve(data) {
			data.giftTickets = data.giftTickets || [];
			return data;
		}
		
		function numberValueReturn(num) {
			if (angular.equals(0, num) || angular.equals(null, num)) {
				return 0;
			}
			return num;
		}
		
		function updateLoanPurposes(reset) {
			var loanTypeCode = vm.loanData.editable ? vm.loanData.editable.loanTypeCd : '';
			if (reset) vm.loanData.editable.loanPrpsCd = "";
			return CommonFormService.getReferenceGroup(loanTypeCode)
				.then(function(response) {
					vm.loanPurposes = response.data;
				});
		}
		
		function hasReservedFunds() {
			return vm.loanData.editable && vm.loanData.editable.chrtNbr;
		}
		
		function updateConstructionCode() {
			if (vm.loanData.editable && vm.loanData.editable.loanPrpsCd) {
				var loanPurposeCode = vm.loanData.editable.loanPrpsCd;
				if (['RS', 'RSW', 'RSA', 'RWC', 'RWOC', 'AE'].indexOf(loanPurposeCode) != -1) {
					vm.loanData.editable.constrnCd = 'EX';
				}
				else if (loanPurposeCode === 'NCON' || loanPurposeCode === 'AL') {
					vm.loanData.editable.constrnCd = 'NEW';
				}
				else if (loanPurposeCode === 'PCON') {
					vm.loanData.editable.constrnCd = 'PRO';
				}
				else if (loanPurposeCode === 'RN' || loanPurposeCode === 'AN') {
					vm.loanData.editable.constrnCd = 'NEW';
				}
				else if (loanPurposeCode === 'ARE') {
					vm.loanData.editable.constrnCd = 'REH';
				}
				else {
					vm.loanData.editable.constrnCd = '';
				}
			}
			else {
				vm.loanData.editable.constrnCd = '';
			}
		}
		
		function mapDataForSave() {
			return {
					appicationRcvdCode: vm.loanData.editable.appicationRcvdCode || null,
					loanAmt: numberValueReturn(vm.loanData.editable.loanAmt),
					loanTermNbr: numberValueReturn(vm.loanData.editable.loanTermNbr),
					loanGrnteeFee: numberValueReturn(vm.loanData.editable.loanGrnteeFee),
					prrCaseNbr: numberValueReturn(vm.loanData.editable.prrCaseNbr),
					prrCaseStat: vm.loanData.editable.prrCaseStat || null,
					aprsdAmt: numberValueReturn(vm.loanData.editable.aprsdAmt),
					grnteeFeePaidInCashAmt: numberValueReturn(vm.loanData.editable.grnteeFeePaidInCashAmt),
					hzrdFldAmt: numberValueReturn(vm.loanData.editable.hzrdFldAmt),
					loanToValRatioPct: numberValueReturn(vm.loanData.editable.loanToValRatioPct),
					mortgOthrAmt: numberValueReturn(vm.loanData.editable.mortgOthrAmt),
					mortgPymntPiAmt: numberValueReturn(vm.loanData.editable.mortgPymntPiAmt),
					realEstTxsAmt: numberValueReturn(vm.loanData.editable.realEstTxsAmt),
					salePriceAmt: numberValueReturn(vm.loanData.editable.salePriceAmt),
					anulFeeRate: numberValueReturn(vm.loanData.editable.anulFeeRate),
					mortgWthtFnclLfFeeAmt: numberValueReturn(vm.loanData.editable.mortgWthtFnclLfFeeAmt),
					mortgWithFnclLfFeeAmt: numberValueReturn(vm.loanData.editable.mortgWithFnclLfFeeAmt),
					upfrntFeeRate: numberValueReturn(vm.loanData.editable.upfrntFeeRate),
					anulMipAmt: numberValueReturn(vm.loanData.editable.anulMipAmt),
					grnteeFeeFncdAmt: numberValueReturn(vm.loanData.editable.grnteeFeeFncdAmt),
					mortgIntrstRt: numberValueReturn(vm.loanData.editable.mortgIntrstRt),
					orgnlPrncplBlncAmt: numberValueReturn(vm.loanData.editable.orgnlPrncplBlncAmt),
					mortgWithLgFeeFncdAmt: numberValueReturn(vm.loanData.editable.mortgWithLgFeeFncdAmt),
					baseMortgCalcCd: vm.loanData.editable.baseMortgCalcCd || null,
					constrnCd: vm.loanData.editable.constrnCd || null,
					loanPrpsCd: vm.loanData.editable.loanPrpsCd || null,
					loanTypeCd: vm.loanData.editable.loanTypeCd || null,
					chrtNbr: vm.loanData.editable.chrtNbr,
					fndsRsrvdAmt: numberValueReturn(vm.loanData.editable.fndsRsrvdAmt),
					actlClsngDt: vm.loanData.editable.actlClsngDt || null,
					prjctdClsngDt: vm.loanData.editable.prjctdClsngDt || null
				}
		}
		

		/** Initialize **/
		initController();

	}
}());
