
(function() {
angular.module('app')
	.controller('caseReviewEndoresementReviewController', ['$rootScope', '$scope', '$window', '$q', '$location', '$filter', '$timeout', 'CaseUpdateService', 'DocumentService', 'CommonFormService', 'SharedDataService', 'FlashService', 'Constants', caseReviewEndoresementReviewController]);

	function caseReviewEndoresementReviewController($rootScope, $scope, $window, $q, $location, $filter, $timeout, CaseUpdateService, DocumentService, CommonFormService, SharedDataService, FlashService, Constants) {
		
		var vm = this;
		var currentCase = SharedDataService.getCaseReview();
		var loanTabData = SharedDataService.getLoanTabData();
		var documentCategories = [];
		var popup;
		vm.caseNumber = $scope.caseNumber = currentCase.caseNumber;
		vm.caseId = $scope.caseId = currentCase.caseId;
		vm.loanIsDisabled = loanIsDisabled;
		vm.openDocument = openDocument;
		vm.escalateCase = escalateCase;
		vm.saveEndorsementReview = saveEndorsementReview;
		vm.escalationComments = "";
		vm.suspensionRsn = "";      
		vm.suspendCase = suspendCase;
		vm.addComment = addComment;
		vm.comments = "";
		vm.addr = [];
		vm.endorseCase = endorseCase;
		vm.documentCategories = [];
		vm.doSubmissionConfirmation = doSubmissionConfirmation;
		vm.caseEndorsementPojo = {
				userName : $rootScope.userName,
				loanId : vm.caseId,
				action : '',
				caseNumber : vm.caseNumber,
				newComment : '',
				reason : ''
		};
		vm.commentPojo = {
				loanId : vm.caseId,
				loanNoteTxt : ''
		};
		
		function suspendedStatuses() {
			return ['LGSI', 'LGSG', 'LGSP', 'LGSL', 'LGSA', 'LGSC', 'LGIS'];
		}
		

		$('.currency').inputmask('currency', {
			rightAlign : false,
			autoUnmask : true,
			unmaskAsNumber: true,
			allowMinus: false,
			allowPlus: false,
			integerDigits: 8,
			digits: 2
		});
		
		$('#projectedClosingDate, #lgFeePaidDate').datepicker({
	      	  maxPicks: 1,
	      	  changeMonth : true,
	          changeYear : true,
	          yearRange: '-100y:c+nn',
	          dateFormat: "mm/dd/yy"
	        });
		
		$('#closingDate').datepicker({
			maxDate: "+3m",
	      	maxPicks: 1,
	      	changeMonth : true,
	        changeYear : true,
	        yearRange: '-100y:c+nn',
	        dateFormat: "mm/dd/yy"
		});
		
		$('#maturityDate').datepicker({
	      	maxPicks: 1,
	      	changeMonth : true,
	        changeYear : true,
	        yearRange: '-100y:+31y',
	        dateFormat: "mm/dd/yy"
		})
		
		$('#maturityDate, #closingDate, #projectedClosingDate, #lgFeePaidDate, #firstPaymentDate').inputmask({
			mask: '99-99-9999'
		});
		
		$('#firstPaymentDate').datepicker({
			maxDate: "+1m",
	      	maxPicks: 1,
	      	changeMonth : true,
	        changeYear : true,
	        yearRange: '-100y:c+nn',
	        dateFormat: "mm/dd/yy"
		});
		
		// Only 1 comment can be persisted at a time
		function addComment(comments) {
			
			vm.structuredComment = [{
				loanNoteTxt: comments
			}];
			vm.pageComments += '\n' + comments + '\n';
		}
		
		CaseUpdateService.getLoanCalculations(vm.caseId)
			.then(function(response) {
				if (CommonFormService.isSuccess(response)) {
					vm.loanTabData = response.data;
				}
			})
		
		CommonFormService.getReferenceGroup('CASESUSPEND')
			.then(function(response) {
				if (CommonFormService.isOk(response)) {
					vm.suspensionReasons = response.data;
				}
			});
		
		CommonFormService.getReferenceCodes('LOAN CLOSED BY')
			.then(function(response) {
				if (CommonFormService.isOk(response)) {
					vm.closedByOptions = response.data;
				}
			});
		
		CaseUpdateService.getLoanCalculations(vm.caseId)
			.then(function(response) {
				vm.loanTabData = response.data;
			})
			
		function doSubmissionConfirmation(doEndorse) {
			// Verify document review submissions
			
			var yChecks = [];
			var xMarks = [];
			var naMarks = [];
			var docTotal = 0;
			
			vm.documentCategories.forEach(function(category) {
				category.documents.forEach(function(doc) {
					var review_code = doc.cntntRvwCd;
					switch(review_code) {
					case 'Y':
							yChecks.push(doc);
							docTotal++;
							break;
					case 'N':
							xMarks.push(doc);
							docTotal++;
							break;
					case 'N/A':
							naMarks.push(doc);
							docTotal++;
							break;
					}
				});
			});
			
			if (docTotal > 0) {
				if (yChecks.length == docTotal || naMarks.length == docTotal || (yChecks.length+naMarks.length) == docTotal) {
					if (doEndorse) {
						angular.element('#binderComplete2').modal('show');
					}
					else {
						angular.element('#binderComplete').modal('show');
					}
				}
				else {
					if (doEndorse) {
						endorseCase();
					}
					else {
						saveEndorsementReview(vm.data);	
					}
				}
			}
			else {
				FlashService.error('You cannot endorse a case with a \'Not Acceptable\' document.');
			}
		}
		
		function saveEndorsementReview(data, bypassSave) {
			
			data.lastReviewDt = new Date();
			data.lastupdtdBy = $rootScope.userName;
			data.userName = $rootScope.userName;
			if (validateForEndorsement()) {
				if (vm.comments) {
					data.newComment = angular.copy(vm.commentPojo);
					data.newComment.loanNoteTxt = vm.comments;
				}
				if (!bypassSave) {
				return CaseUpdateService.saveLoanEndorsementReview(vm.caseId, data)
					.then(function(response) {
						if (response.data && response.data.status === 'SUCCESS') {
							FlashService.success('Successfully saved endorsement review.');
							vm.data = response.data;
						}
						else {
							FlashService.error(response.data.errorMessage);
						}
					});
				}
			}
			var deferred = $q.defer();
			deferred.resolve(true);
			return deferred.promise;
		}
			
			CaseUpdateService.getLoanEndorsementReview(vm.caseId)
			.then(function(data) {
				
				vm.data = data.data;
				
				// Set default review type (standard)
				if (vm.data.rvwTypeCd === null) {
					vm.data.rvwTypeCd = 'STRD';
				}
				if (!vm.data.loanClsdByCd) {
					vm.data.loanClsdByCd = 'SPSR';
				}
				
				// Set default closed by value
				vm.updateAvailableAddrs();
				
				// Format comments for view
				vm.pageComments = vm.data.comments ? angular.copy(vm.data.comments) : [];
				var commentStr = '';
				vm.pageComments = vm.pageComments.forEach(function(cmt) {
					commentStr += $filter('date')(cmt.createdDate, 'M/dd/yyyy H:mm:ss a') + ' - ' + cmt.personName + ' - ' + cmt.createdBy + '\n' + cmt.loanNoteTxt + '\n\n';
				});
				vm.pageComments = commentStr.trim()  + '\n';
				
				// Organize categories and documents
				
				vm.data.documentReviewList.forEach(function(item) {
					if (documentCategories.indexOf(item.documentCtgry) === -1) {
						documentCategories.push(item.documentCtgry);
					}
				});
				
				var categoryPromises = [];
				documentCategories.forEach(function(categoryValue) {
					categoryPromises.push(CommonFormService.getReferenceCodeByType('DOCUMENT CATEGORY', categoryValue));
				});
				
				$q.all(categoryPromises)
					.then(function(response) {
							response.forEach(function(category) {
								if (vm.documentCategories.filter(function(cat) {
									return cat.categoryName === category.data.referenceCodeName;
								}).length === 0) {
									vm.documentCategories.push({
										categoryName: category.data.referenceCodeName,
										documents: vm.data.documentReviewList.filter(function(doc) {
											return category.data.referenceCodeValue === doc.documentCtgry;
										}),
										categoryCode: category.data.referenceCodeValue
									})
								}
							});
							var docTypes = [];
							CaseUpdateService.getDocumentList(vm.caseId)
							.then(function(response) {
								vm.documentsForCase = response.data.documentList;
								vm.documentCategories.forEach(function(category) {
									category.documents.forEach(function(doc) {
										if (docTypes.indexOf(doc.docTypeCd) === -1) {
											docTypes.push(doc.docTypeCd);
										}
									});
									var binderDoc = response.data.documentList.filter(function(doc) {
										return doc.docCtgryCd == category.categoryCode;
									});
									
									if (binderDoc.length > 0) {
										category.documentId = binderDoc[0].documentId;
										category.documentName = binderDoc[0].documentName;
									}
								});
								// Add Tooltips
								$('[data-toggle="tooltip"]').tooltip();
							});
						});
			});
			

		vm.updateAvailableAddrs = function(refCodeValue) {
			if (refCodeValue == 'SPSR') {
				vm.availableAddrs = vm.data.lendrAddr;
			}
			else if (refCodeValue == 'BRKR') {
				vm.availableAddrs = vm.data.brkrAddr;
			}
			else {
				vm.availableAddrs = vm.data.lndrAddr;
			}
		}

		
		function backToDashboard() {
			$location.path('/');
		}
			
		function openDocument(documentId, documentName, isSynchronous) {
			
			var isIE = window.navigator && window.navigator.msSaveOrOpenBlob;
			
			if (isSynchronous) {
				if(!isIE) {
					popup = $window.open('','_blank');
				}
			}

			return DocumentService.openDocument(documentId, documentName)
				.then(function(response) {
					if (response.success && response.data.status === 'SUCCESS') {
						var blob = DocumentService.b64toBlob(response.data.noticePDF, 'application/pdf', null);
						if (isIE) {
							window.navigator.msSaveOrOpenBlob(blob, response.data.documentName);
						}
						else {
							var blobUrl = URL.createObjectURL(blob);
							popup.location.href = blobUrl;
						}
					}
					else if (response.data.status === 'ERROR' || response.error) {
						if (popup) popup.close();
						FlashService.error(response.data.errorMessage);
					}
				}, function(response) {
					FlashService.error(Constants.ERROR_MESSAGES.DOCUMENT_RETRIEVAL_ERROR);
				})
		}
		
		function requiredByDefault() {
			return ['CVPD', 'BRIN', 'CRIN'];
		}

		function isRequired(documentCategory) {
			var req = requiredByDefault();
			var value = documentCategory.referenceCodeValue;
			if (req.indexOf(value) !== -1) {
				return true;
			}
			if (vm.loanData.loanTypeCd === 'ACQ') {
				if (value === 'PURD') {
					return true;
				}
				if (vm.loanData.loanPrpsCd === 'AN') {
					if (value === 'NEWD') {
						return true;
					}
				}
			}
			if (vm.loanData.loanTypeCd === 'REFI') {
				if (vm.loanData.loanPrpsCd === 'RN') {
					if (value === 'NEWD') {
						return true;
					}
				}
			}

			if (vm.loanData.landTypeCd === 'TRIB' || vm.loanData.landTypeCd === 'ALLT' || vm.loanData.landTypeCd === 'FSIM') {
				if (value === 'TWTL') {
					return true;
				}
			}
			return false;
		}
		
		function cancelledStatuses() {
			return ['RFEX', 'LREX', 'RFCL', 'LRCB', 'RFCB', 'LGCL', 'LRCL'];
		}
		
		function loanIsDisabled() {
			if (vm.loanData) {
				var stats = cancelledStatuses();
				if (!vm.loanData.chrtNbr) return true;
				if (stats.indexOf(vm.loanData.caseStatus) !== -1) return true;
			}
		}
		
		function escalateCase() {
			var payLoad = angular.copy(vm.data);
			if(payLoad.caseEndorsement == null || payLoad.caseEndorsement == {}){
				payLoad.caseEndorsement = angular.copy(vm.caseEndorsementPojo);
			}
			payLoad.caseEndorsement.newComment = angular.copy(vm.commentPojo);
			payLoad.caseEndorsement.newComment.loanNoteTxt = vm.escalationComments;
			payLoad.caseEndorsement.action = 'escalate';
			CaseUpdateService.invokeReviewCase(payLoad)
				.then(function(response) {
					if (CommonFormService.isSuccess(response)) {
						FlashService.success(Constants.SUCCESS_MESSAGES.CASE_ESCALATION_SUPERVISOR);
						$location.path('/olgDashboard')
						// Clear comments
						vm.escalationComments = '';
					}
					else if (CommonFormService.isError(response)) {
						FlashService.error(Constants.ERROR_MESSAGES.CASE_ESCALATION_SUPERVISOR_ERROR);
					}
				})
		}
		
		function suspendCase() {
			var payLoad = angular.copy(vm.data);
			if(payLoad.caseEndorsement == null || payLoad.caseEndorsement == {}){
				payLoad.caseEndorsement = angular.copy(vm.caseEndorsementPojo);
			}
			payLoad.caseEndorsement.reason = vm.suspensionRsn;
			payLoad.caseEndorsement.action = 'suspend';
			payLoad.caseEndorsement.newComment = angular.copy(vm.commentPojo);
			CaseUpdateService.invokeReviewCase(payLoad)
				.then(function(response) {
					if (CommonFormService.isSuccess(response)) {
						FlashService.success(Constants.SUCCESS_MESSAGES.CASE_SUSPENDED);
						$location.path('/olgDashboard')
						vm.suspensionRsn = '';
					}
					else if (CommonFormService.isError(response)) {
						FlashService.error(Constants.ERROR_MESSAGES.SUSPEND_CASE_ERROR);
					}
				})
		}
		
		function endorseCase(){
			saveEndorsementReview(vm.data, true)
				.then(function() {
					var payLoad = angular.copy(vm.data);
					if(payLoad.caseEndorsement == null || payLoad.caseEndorsement == {}){
						payLoad.caseEndorsement = angular.copy(vm.caseEndorsementPojo);
					}
					delete payLoad.caseEndorsement.reason;
					delete payLoad.caseEndorsement.newComment;
					
					if (!payLoad.userName) payLoad.userName = $rootScope.userName;
					payLoad.caseEndorsement.action = 'endorse';
					if(validateForEndorsement(true)) {
						if (vm.comments) {
							payLoad.newComment = angular.copy(vm.commentPojo);
							payLoad.newComment.loanNoteTxt = vm.comments;
						}
						var isIE = window.navigator && window.navigator.msSaveOrOpenBlob;
						if(!isIE) {
							popup = $window.open('','_blank');
						}
						CaseUpdateService.invokeReviewCase(payLoad)
							.then(function(response) {
									if (response.data && response.data.documentId && response.data.documentName) {
										FlashService.success('Case has been successfuly endorsed.');
										openDocument(response.data.documentId, response.data.documentName);
									}
									else {
										if(popup) popup.close();
										FlashService.error('An error occurred while endorsing your case.');
									}
							});
					}
				})
		}
		
		function validateForEndorsement(useROFValidation){
			if (useROFValidation) {
				if(validateROF() && validateRequiredFields()){
					return true;
				}
				else {
					return false;
				}
			}
			else {
				if (validateRequiredFields()) {
					
					// Additional validadtion for date fields
					var regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
					if(vm.data.actlClsngDt && !regex.test(vm.data.actlClsngDt)) {
						vm.showClosingDateError = true;
						return false;
					}
					if (vm.data.frstPymntDt && !regex.test(vm.data.frstPymntDt)) {
						vm.showFirstPaymentDateError = true;
						return false;
					} 
					
					if (vm.data.trsryLgFeeDt && !regex.test(vm.data.trsryLgFeeDt)) {
						vm.showLgFeeDateError = true;
						return false;
					}
					
					if (vm.data.mtrtyDt && !regex.test(vm.data.mtrtyDt)) {
						vm.showMaturityDateError = true;
						return false;
					}
					
					return true;
				}
				else{
					return false;
				}
			}
		}
		
		function validateROF(){
			var basePlusLG = loanTabData.loanData.editable.mortgWithLgFeeFncdAmt;
			var ROF = loanTabData.loanData.editable.fndsRsrvdAmt;
			if(ROF > basePlusLG){
				FlashService.error(Constants.ERROR_MESSAGES.CASE_ENDORSEMENT_ROF_GT_LG);
				return false;
			}
			else if(ROF < basePlusLG){
				FlashService.error(Constants.ERROR_MESSAGES.CASE_ENDORSEMENT_ROF_LT_LG);
				return false;
			}
			else{
				return true;
			}
		}
		
		function validateRequiredFields(){
			var returnVal = true;
			vm.closingDateErrorShow = false;
			vm.maturityDateErrorShow = false;
			vm.firstPaymentDateErrorShow = false;
			vm.lgFeeAmountPaidErrorShow = false;
			vm.lgFeePaidDateErrorShow = false;
			vm.showAddressError = false;
//			vm.caseBinderCompleteErrorShow = false;
			
			if(!vm.data.actlClsngDt){
				returnVal = false;
				vm.closingDateErrorShow = true;
			}
			if(!vm.data.mtrtyDt){
				returnVal = false;
				vm.maturityDateErrorShow = true;
			}
			if(!vm.data.frstPymntDt){
				returnVal = false;
				vm.firstPaymentDateErrorShow = true;
			}
			if(!vm.data.trsryLgFeeAmt){
				returnVal = false;
				vm.lgFeeAmountPaidErrorShow = true;
			}
			if(!vm.data.trsryLgFeeDt){
				returnVal = false;
				vm.lgFeePaidDateErrorShow = true;
			}
			if (!vm.data.selectedAddr) {
				returnVal = false;
				vm.showAddressError = true;
			}
			
			return returnVal;
		}
	}
}())