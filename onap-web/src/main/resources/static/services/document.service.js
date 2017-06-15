(function () {
    'use strict';

    angular
        .module('app')
        .factory('DocumentService', ['$http', '$q', 'Constants', 'FlashService', DocumentService]);

    function DocumentService($http, $q, Constants, FlashService) {
        var service = {};
        service.uploadFile = uploadFile;
        service.convertToBase64 = convertToBase64;
        service.formatBase64 = formatBase64;
        service.getDocumentList = getDocumentList;
        service.getConfirmationDetails = getConfirmationDetails;
        service.openDocument = openDocument;
        service.b64toBlob = b64toBlob;
        service.submitDocuments = submitDocuments;
        service.getDates = getDates;
        
        
        function convertToBase64(file) {
        	var deferred = $q.defer();
        	var reader = new FileReader();
        	reader.onload = function(e) {
        		deferred.resolve(e.target.result);
        	}
        	reader.readAsDataURL(file);
        	return deferred.promise;
        }
        
        function formatBase64(str) {
        	// remove data type i.e. data:text/plain;base64,
        	return str.substring(str.lastIndexOf(',')+1, str.length);
        }
        
        function uploadFile(loanId, caseNumber, file, categoryCd, docId, documentType) {
        	var deferred = $q.defer();
        	
        	// Require a pdf
        	if (file.type !== 'application/pdf' && file.name.split('.').pop().toLowerCase() !== 'pdf') {
        		FlashService.error('Only PDF files are accepted.');
        		deferred.resolve(false);
        		return deferred.promise;
        	}
        	
        	return convertToBase64(file)
        		.then(function(base64) {
        			
        			var formattedBase64 = formatBase64(base64);

	        		var data = {
	        				documentContent: formattedBase64,
	    					createDt: new Date(),
	    					caseNumber: caseNumber,
	    					documentName: file.name,
	    					docCtgryCd: categoryCd,
	    					documentId: docId,
	    					documentType: documentType
	    			};
	        		
	    			return $http.post(Constants.API_ENDPOINTS.UPLOAD_DOCUMENT.replace(":loanId", loanId), data)
					.then(searchSuccess, searchFailure);
        	});
        }
        
        function getDocumentList(loanId) {
			return $http.get(Constants.API_ENDPOINTS.GET_DOCUMENT_LIST.replace(":loanId", loanId))
			.then(searchSuccess, searchFailure);
        }
        
        function getConfirmationDetails(agencyId) {
        	var someValue = {
        		"lgFeeAmountPaid" : '$123.00',
        		"lgFeePaidDate" : '12/31/2009'
        	};
        	var deferred = $q.defer();
        	deferred.resolve(someValue);
        	return deferred.promise;
        }
        function openDocument(documentId, documentName) {
        	var data = {
        			documentId: documentId,
        			documentName: documentName
        	};
        	return $http.post(Constants.API_ENDPOINTS.RETRIEVE_PDF, data)
        	.then(searchSuccess, searchFailure);
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
		
		function getDates(loanId) {
			return $http.get(Constants.API_ENDPOINTS.GET_CLOSING_DATES.replace(":loanId", loanId))
			.then(searchSuccess, searchFailure);
		}
		
		function submitDocuments(loanId, data) {
			return $http.post(Constants.API_ENDPOINTS.SUBMIT_DOCUMENTS.replace(":loanId", loanId), data)
			.then(searchSuccess, searchFailure);
		}
        
        function searchSuccess(response) {
        	// got a 200, return the data.
        	return {
        		success: true, 
        		data: response.data
        	};
        }

        function searchFailure(response) {
        	// XHR failed, send the error object back.
        	return {
        			success: false, 
    				error: response.data
        	};
        }

        return service;
       
    }

})();