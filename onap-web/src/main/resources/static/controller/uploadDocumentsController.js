(function() {
	angular
	.module('app')
	.controller('UploadDocumentsController', ['$rootScope', '$scope', '$window', '$q', '$location', 'CaseUpdateService', 'DocumentService', 'CommonFormService', 'SharedDataService', 'FlashService', 'Constants', UploadDocumentsController]);


	function UploadDocumentsController($rootScope, $scope, $window, $q, $location, CaseUpdateService, DocumentService, CommonFormService, SharedDataService, FlashService, Constants) {
		// SharedDataService.requireUploadDocuments();
		var vm = this;

		vm.docData = SharedDataService.getUploadDocuments();
		vm.caseId = vm.docData.caseId;
		vm.caseNumber = vm.docData.caseNumber;
		vm.documentCategories = null;
		vm.fileUploadName = 'fileUpload';
		vm.documentList = null;
		vm.validateDocumentList = validateDocumentList;
		vm.openDocument = openDocument;
		vm.uploadFile = uploadFile;
		vm.uploadAdditionalFile = uploadAdditionalFile;
		vm.submitDocuments = submitDocuments;
		vm.loanTypeCd = null;
		vm.loanPrpsCd = null;
		vm.requiredCategories = [];
		vm.nonRequiredCategories = [];
		vm.resubmittedCategories = [];
		vm.isRequired = isRequired;
		vm.loanIsDisabled = loanIsDisabled;
		vm.loanIsSuspended = loanIsSuspended;
		vm.cancelSubmit = cancelSubmit;
		vm.selectedCategory = "";
		vm.selectedDocumentType = "";
		vm.validateBaseAmountWithROF = validateBaseAmountWithROF;
		vm.resubmitDocMessage = Constants.INFO_MESSAGES.RESUBMIT_DOC_EXISTS_MESSAGE;
		vm.doUploadAdditionalFile = doUploadAdditionalFile;

		// Validates submit button validation
		vm.validateLgFeePaid = "";
		
		
		$('#prjctdClsngDt, #actlClsngDt').datepicker({
	      	  maxPicks: 1,
	      	  changeMonth : true,
	          changeYear : true,
	          yearRange: '-100y:c+nn',
	          dateFormat: "mm/dd/yy"
	        });
		
		
		// Retrieve document categories
		CommonFormService.getReferenceCodes('DOCUMENT CATEGORY')
		.then(function(response) {
			if (response.status === 200 && response.statusText === "OK") {
				vm.documentCategories = response.data;
				
				var promises = [];

				DocumentService.getDocumentList(vm.caseId)
				.then(function(response) {
					if (response.success && response.data.status === 'SUCCESS') {
						var promise;
						vm.documentList = response.data.documentList.filter(function(item) {
							return item.rfrncCdGrp === 'LENDER SUPPLIED';
						});
						vm.documentCategories.forEach(function(category) {
							var filtered = vm.documentList.filter(function(doc) {
								return doc.docCtgryCd === category.referenceCodeValue;
							});
							// Set uploaded document (found from filtering our
							// doc list array)
							category.uploadedDocument = filtered.length > 0 ? filtered[0] : null;
							promise = CommonFormService.getReferenceGroup(category.referenceCodeValue)
							.then(function(response) {
								if (response.status === 200 && response.statusText === "OK") {
									// Add document types onto each reference
									// object
									category.documentTypes = response.data;
								}
							});
							promises.push(promise);
						});
					}
					$q.all(promises)
						.then(function() {
							// Retrieve relevant loan data
							CaseUpdateService.getLoanCalculations(vm.caseId)
							.then(function(response) {
								if (response.success && response.data.status === 'SUCCESS') {
									vm.loanData = {
											loanTypeCd: response.data.loanTypeCd,
											loanPrpsCd: response.data.loanPrpsCd,
											chrtNbr: response.data.chrtNbr,
											loanEndrsmntDt: response.data.loanEndrsmntDt,
											caseStatus: response.data.caseStatus
									};
									vm.reservedFundFromData = response.data.fndsRsrvdAmt;
									vm.basePlusLG = response.data.mortgWithLgFeeFncdAmt;
									// Retrieve Land Type
									CaseUpdateService.getPropertyForCase(vm.caseId)
									.then(function(response) {
										if (response.success && response.data.status === 'SUCCESS') {
											var requiredCategories = [];
											vm.loanData.landTypeCd = response.data.landTypeCd.replace(/ /g, '');
											
											vm.documentCategories.forEach(function(ctgy) {
												if (isRequired(ctgy)) {
													requiredCategories.push(ctgy);
												}
												if (ctgy.referenceCodeValue === 'OTHR') {
													vm.nonRequiredCategories.push(ctgy);
												}
												
												// Sort required categories
												var categorySortOrder = ['PURD', 'CVPD', 'NEWD', 'TWTL', 'BRIN', 'CRIN'];
												var sortedCategories = [];
												for (var i = 0; i < categorySortOrder.length; i++) {
													var filtered = requiredCategories.filter(function(cat) {
														return cat.referenceCodeValue === categorySortOrder[i];
													});
													if (filtered.length > 0) {
														sortedCategories.push(filtered[0]);
													}
												}
												vm.requiredCategories = sortedCategories;
												vm.allCategories = vm.requiredCategories.concat(vm.nonRequiredCategories);
											});
										}
									});
								}
								else {
									FlashService.error(Constants.ERROR_MESSAGES.LOAN_LOAD_ERROR);
								}
						});
					});
				});

			}
		});
		
		// Function for retrieving resubmitted documents
		DocumentService.getDocumentList(vm.caseId)
			.then(function(response) {
			if (response.success && response.data.status === 'SUCCESS') {
				var promise;
				vm.resubmittedDocumentList = response.data.documentList.filter(function(item) {
					return item.rfrncCdGrp === 'LENDER SUPPLIED' && item.docUpldRsnCd === 'UPL';
				});
				
				CommonFormService.getReferenceCodes('DOCUMENT CATEGORY')
				.then(function(response) {
					if (response.status === 200 && response.statusText === "OK") {
						var cats = response.data;
						
						vm.resubmittedDocumentList.forEach(function(doc) {
							var matchingCat = cats.filter(function(cat) {
								return doc.docCtgryCd === cat.referenceCodeValue;
							});
							if (matchingCat.length > 0) {
								matchingCat[0].uploadedDocument = doc;
								vm.resubmittedCategories.push(matchingCat[0]);
							}
						});
					}
				});
			}
			});

		DocumentService.getDates(vm.caseId)
		.then(function(response) {
			if (response.success && response.data.status === 'SUCCESS'){
				vm.dates = response.data;
			}
		});
		
		function validateDocumentList() {
			if (vm.requiredCategories) {
				var missingDocuments = [];
				vm.requiredCategories.forEach(function(category) {
					// if missing an uploaded document
					if (!category.uploadedDocument) {
						missingDocuments.push(category);
					}
				});
				if (missingDocuments.length === 0) {
					return true;
				}
			}
			return false;
		}
		
		function cancelledStatuses() {
			return ['RFEX', 'LREX', 'RFCL', 'LRCB', 'RFCB', 'LGCL', 'LRCL'];
		}
		
		function suspendedStatuses() {
			return ['LGSI', 'LGSG', 'LGSP', 'LGSL', 'LGSA', 'LGSC', 'LGIS'];
		}
		
		function loanIsSuspended() {
			if (vm.loanData) {
				var stats = suspendedStatuses();
				if (stats.indexOf(vm.loanData.caseStatus) !== -1) return true;
			}
		}
		
		function loanIsDisabled() {
			if (vm.loanData) {
				var stats = cancelledStatuses();
				if (!vm.loanData.chrtNbr) return true;
				if (stats.indexOf(vm.loanData.caseStatus) !== -1) return true;
				// Endorsed
				if (vm.loanData.caseStatus === 'LGBS') return true;
			}
		}

		function uploadFile(idx, categoryCd, docId) {
			if (loanIsDisabled()) {
				return;
			}
			var fileUploadName = vm.fileUploadName + '_' + categoryCd + '_' + idx,
			field = document.getElementById(fileUploadName),
			file = field.files.length > 0 ? field.files[0] : null;
	
			if (file) {
				DocumentService.uploadFile(vm.caseId, vm.caseNumber, file, categoryCd, docId)
					.then(function(response) {
						if (response.success && response.data.status === 'SUCCESS') {
							FlashService.success(Constants.SUCCESS_MESSAGES.FILE_UPLOADED);
	
							// Clear file input value
							angular.element('#' + fileUploadName).val('');
	
							// Find category for newly uploaded document
							var filtered = vm.documentCategories.filter(function(category) {
								return category.referenceCodeValue === response.data.docCtgryCd;
							});
	
							if (filtered.length > 0) {
								// Append uploaded document to UI
								filtered[0].uploadedDocument = response.data;
							}
									
						}
						else {
							FlashService.error(Constants.ERROR_MESSAGES.DOCUMENT_UPLOAD_ERROR);
						}
					}, function() {
						FlashService.error(Constants.ERROR_MESSAGES.DOCUMENT_UPLOAD_ERROR);
					});
				}
		}
		
		function doUploadAdditionalFile(selectedCategory, selectedDocumentType) {
			if (selectedCategory !== 'OTHR' && (!selectedCategory || !selectedDocumentType)) {
				FlashService.error('Please select a category and document type.');
				return;
			}
			if (vm.resubmittedCategories.length > 0) {
				var existing_files = vm.resubmittedCategories.filter(function(cat) {
					return cat.referenceCodeValue === selectedCategory;
				});
				if (existing_files.length > 0) {
					angular.element('#resubmitCatExistsModal').modal('show');
					return;
				}
			}
			return uploadAdditionalFile(selectedCategory, selectedDocumentType);
		}
		
		function uploadAdditionalFile(selectedCategory, selectedDocumentType) {
			var fileUploadName = 'mainAdditionalUpload';
			field = document.getElementById(fileUploadName),
			file = field.files.length > 0 ? field.files[0] : null;
	
			if (file) {
				
				DocumentService.uploadFile(vm.caseId, vm.caseNumber, file, selectedCategory, null, selectedDocumentType)
					.then(function(response) {
						if (response.success && response.data.status === 'SUCCESS') {
							FlashService.success(Constants.SUCCESS_MESSAGES.FILE_UPLOADED);
	
							// Clear file input value
							angular.element('#' + fileUploadName).val('');
	
							// Find category for newly uploaded document
							var filtered = vm.documentCategories.filter(function(category) {
								return category.referenceCodeValue === response.data.docCtgryCd;
							});
	
							if (filtered.length > 0) {
								// Append uploaded document to UI
								filtered[0].uploadedDocument = response.data;
								vm.resubmittedCategories.push(filtered[0]);
							}
							else {
								FlashService.error(Constants.ERROR_MESSAGES.DOCUMENT_UPLOAD_ERROR);
							}
						}
						else {
							FlashService.error(Constants.ERROR_MESSAGES.DOCUMENT_UPLOAD_ERROR);
						}
					}, function() {
						FlashService.error(Constants.ERROR_MESSAGES.DOCUMENT_UPLOAD_ERROR);
					});
				}
			else {
				FlashService.error('An error occurred while uploading file.');
			}
		}

		function submitDocuments(loanId) {
			if (loanIsDisabled()) {
				return;
			}
			var docListValid = validateDocumentList();
			var baseAmountValid = validateBaseAmountWithROF();
			var datesValid = validateDates();
			if (docListValid && baseAmountValid && datesValid) {
				var id = loanId || vm.caseId;
				return DocumentService.submitDocuments(id,vm.dates)
					.then(function(response) {
						if (response.success && response.data.status === 'SUCCESS') {
							// Refresh case summary
							$scope.$broadcast('refreshCaseSummary');
							FlashService.success(Constants.SUCCESS_MESSAGES.DOCUMENTS_SUBMITTED);
							
							// Refresh loan data (including status)
							// Retrieve relevant loan data
							CaseUpdateService.getLoanCalculations(vm.caseId)
							.then(function(response) {
								if (response.success && response.data.status === 'SUCCESS') {
									vm.loanData = {
											loanTypeCd: response.data.loanTypeCd,
											loanPrpsCd: response.data.loanPrpsCd,
											chrtNbr: response.data.chrtNbr,
											loanEndrsmntDt: response.data.loanEndrsmntDt,
											caseStatus: response.data.caseStatus
									};
								}
							});
							
						}
						else {
							FlashService.error(Constants.ERROR_MESSAGES.SUBMIT_DOCUMENTS_ERROR);
						}
					})
			}
			else {
				if(!docListValid){
					FlashService.error(Constants.ERROR_MESSAGES.DOCUMENTS_MISSING_ERROR);
				}
			}
		}
		
		function validateBaseAmountWithROF(){
			if(vm.reservedFundFromData && vm.basePlusLG){
				if(vm.reservedFundFromData < vm.basePlusLG){
					FlashService.error(Constants.ERROR_MESSAGES.ENDORSE_ROF_LT_LG);
					return false;
				}
				else if(vm.reservedFundFromData > vm.basePlusLG){
					FlashService.error(Constants.ERROR_MESSAGES.ENDORSE_ROF_GT_LG);
					return false;
				}
				else{
					return true;
				}
			}
			else{
				return false;
			}
		}
		
		function validateDates(){
			vm.showActlClsngDtNull = false;
			vm.showPrjctdClsngDtNull = false;
			if(vm.dates && vm.dates.actlClsngDt && vm.dates.prjctdClsngDt && vm.dates.fndsExprtnDt){
				var fundsExp = new Date(vm.dates.fndsExprtnDt);
				var projectedDate = new Date(vm.dates.prjctdClsngDt);
				var actualClosingDate = new Date(vm.dates.actlClsngDt);
				var retVal = true;
				if(fundsExp.getTime() < projectedDate.getTime()){
					FlashService.error(Constants.ERROR_MESSAGES.PROJECTED_DATE_EXCEEDS_EXP);
					retVal = false;
				}
				if(fundsExp.getTime() < actualClosingDate.getTime()){
					FlashService.error(Constants.ERROR_MESSAGES.ACTUAL_DATE_EXCEEDS_EXP);
					retVal = false;
				}
				return retVal;
			}
			else{
				if(!vm.dates.actlClsngDt){
					vm.showActlClsngDtNull = true;
				}
				if(!vm.dates.prjctdClsngDt){
					vm.showPrjctdClsngDtNull = true;
				}
				return false;
			}
		}
		
		function openDocument(documentId, documentName) {

			var isIE = window.navigator && window.navigator.msSaveOrOpenBlob;
			var popup;
			if(!isIE) {
				popup = $window.open('','_blank');
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

		function submitUploadedFiles() {
			if (!validateDocumentList()) {
				// Send back loan id
				FlashService.error(Constants.ERROR_MESSAGES.CASE_BINDER_INCOMPLETE_ERROR);
			}
			else {

				// Refresh case summary
				$scope.$broadcast('refreshCaseSummary');
			}
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
		
		function cancelSubmit() {
			$location.path('/');
		}
	}
}());