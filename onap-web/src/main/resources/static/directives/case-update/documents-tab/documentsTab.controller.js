(function() {
	'use strict';
	angular.module('app').controller(
			'DocumentsTabController',
			['$scope', '$http', '$window', '$location', '$filter', '$timeout', 'CaseUpdateService', 'CasesService',
			 'CommonFormService', 'FlashService', 'Constants', 'SharedDataService', DocumentsTabController]);

	function DocumentsTabController($scope, $http, $window, $location, $filter, $timeout, CaseUpdateService, 
			CasesService, CommonFormService, FlashService, Constants, SharedDataService) {

		SharedDataService.requireCaseReview();
		
		var vm = this;
		vm.loggedUserId = $window.sessionStorage.getItem("abc").split('##')[1];
		var currentCase = SharedDataService.getCaseReview();
		vm.caseNumber = $scope.caseNumber = currentCase.caseNumber;
		vm.caseId = $scope.caseId = currentCase.caseId;
		vm.documentList = [];
		vm.goToRoute = function(route) {
			$location.path('/' + route);
		}
		
		vm.showDocPDF = function(doc){
			var payLoad =	{
		 				"documentName": doc.documentName,
		 				"documentId": doc.documentId
					};
			var notIE = !(window.navigator && window.navigator.msSaveOrOpenBlob);
			var blobUrl;
			var popup;
			if(notIE){
				popup = $window.open('','_blank');
			}
			CaseUpdateService.retrievePDF(payLoad).then(function(response){
				if (response.success){
					var blob = b64toBlob(response.data.noticePDF, 'application/pdf', null);
					if (!notIE) {
					    window.navigator.msSaveOrOpenBlob(blob,response.data.documentName);
					}
					else {
						blobUrl = URL.createObjectURL(blob);
						popup.location.href = blobUrl;
					}
				}
			});			
		}
		
		function b64toBlob(b64Data, contentType, sliceSize) {
			  contentType = contentType || '';
			  sliceSize = sliceSize || 512;
			  var byteCharacters = atob(b64Data);
			  var byteArrays = [];

			  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			    var slice = byteCharacters.slice(offset, offset + sliceSize);

			    var byteNumbers = new Array(slice.length);
			    for (var i = 0; i < slice.length; i++) {
			      byteNumbers[i] = slice.charCodeAt(i);
			    }

			    var byteArray = new Uint8Array(byteNumbers);

			    byteArrays.push(byteArray);
			  }

			  var blob = new Blob(byteArrays, {type: contentType});
			  return blob;
			}
		
		function initController() {
			// Retrieve docs for case
			CaseUpdateService.getDocumentList(vm.caseId).then(
					function(response) {
						if (response.success && response.data.status == "SUCCESS") {
							vm.documentList = response.data.documentList.filter(function(obj){
								return obj.rfrncCdGrp === 'SYSTEM GENERATED';
							});
						}
						else if (response.error || (response.data && response.data.status == "ERROR")) {
							FlashService.error(response.data.errorMessage);
						}
					});
		}

		/** Initialize **/
		initController();

	}
}());
