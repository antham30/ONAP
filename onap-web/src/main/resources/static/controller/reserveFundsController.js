(function() {
	'use strict';
	angular.module('app').controller(
			'ReserveFundsController',
			[ '$scope', '$sce', '$location', 'FlashService', 'Constants',
					'CaseUpdateService', 'loginFactory', 'SharedDataService',
					ReserveFundsController ]);
	function ReserveFundsController($scope, $sce, $location, FlashService,
			Constants, CaseUpdateService, loginFactory, SharedDataService) {
		var vm = this;
		var reserveFundsData = SharedDataService.getReserveFunds();
		        if (angular.equals({}, reserveFundsData)) {
		            $location.path('/');
		        }
		vm.caseNumber = reserveFundsData.caseNumber;
		vm.signDocument = signDocument;
		vm.backToDashBoard = backToDashBoard;
		vm.cancelEsign = cancelEsign;
		vm.isIE = false || !!document.documentMode;
		vm.printPdf = printPdf;
		vm.downloadPdf = downloadPdf;
		vm.base64Pdf = $sce.trustAsResourceUrl('data:application/pdf;base64, '
				+ reserveFundsData.noticePdf);
		function initController() {
			// Render pdf
			if (vm.isIE) {
				renderPdf(reserveFundsData.noticePdf, 'reserveFundsPdf');
			}
			$('#middleInitial').inputmask('Regex', {
				regex : "^[a-zA-Z]",
			});
			$('#firstName').inputmask('Regex', {
				regex : "([A-Za-z]+ ){0,}",
			});
			$('#lastName').inputmask('Regex', {
				regex : "([A-Za-z]+ ){0,}",
			});
		}

		function backToDashBoard() {
			$location.path('/');
		}

		function cancelEsign() {
			angular.element('#cancelConfirmation').modal('hide');
			angular.element('.modal-backdrop').hide();
			angular.element('body').removeClass('modal-open');
			$location.path('/');
			$window.scrollTo(0, 0);
		}

		function signDocument() {
			vm.couldNotAuthenticate = false;
			var payLoad = {
				"caseNumber" : reserveFundsData.caseNumber,
				"documentName" : reserveFundsData.docName,
				"documentId" : reserveFundsData.documentId,
				"userConsent" : vm.consent,
				"firstName" : vm.firstName,
				"middleInitial" : vm.middleInitial,
				"lastName" : vm.lastName,
				"cohortNumber" : reserveFundsData.chrtNbr,
				"binderTypeCode" : reserveFundsData.binderTypeCd
			};
			CaseUpdateService
					.eSign(payLoad)
					.then(
							function(response) {
								FlashService
										.success(Constants.SUCCESS_MESSAGES.SIGNED_SUCCESSFULLY);
								vm.successfullySigned = true;
							});

		}

		function authenticateUser(userAuth) {
			var iv = "00000000000000000000000000000000";
			var salt = "00000000000000000000000000000000";
			var keySize = 128;
			var iterationCount = 10000;
			var pPhrase = "aesalgoisbestbes";
			var aesUtil = new AesUtil(keySize, iterationCount);
			var encrypt = aesUtil.encrypt(salt, iv, pPhrase, userAuth.userPwd);
			userAuth.userPwd = encrypt;
			return loginFactory.login(userAuth);
		}

		function renderPdf(base64Str, canvasId) {
			PDFJS.workerSrc = Constants.SERVER_URL + 'lib/pdf.worker.js';
			base64Str = atob(base64Str);
			// Using DocumentInitParameters object to load binary data.
			var loadingTask = PDFJS.getDocument({
				data : base64Str
			});
			loadingTask.promise.then(function(pdf) {
				// Fetch the first page
				var pageNumber = 1;
				pdf.getPage(pageNumber).then(function(page) {

					var scale = 1.75;
					var viewport = page.getViewport(scale);

					// Prepare canvas using PDF page dimensions
					var canvas = document.getElementById(canvasId);
					var context = canvas.getContext('2d');
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					// Render PDF page into canvas context
					var renderContext = {
						canvasContext : context,
						viewport : viewport
					};
					var renderTask = page.render(renderContext);
					renderTask.then(function() {

					});
				});
			}, function(reason) {
				console.error(reason);
			});
		}

		function printPdf(canvasId) {
			var canvas = document.getElementById(canvasId);
			var win = window.open('', '', '');
			var html = "<img src='" + canvas.toDataURL() + "'>";
			win.document.write(html);
			win.document.close();
			win.focus();
			win.print();
			win.close();
		}

		function downloadPdf() {
			var blob = b64toBlob(reserveFundsData.noticePdf, 'application/pdf',
					null);
			window.navigator.msSaveOrOpenBlob(blob, reserveFundsData.docName);
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
			var blob = new Blob(byteArrays, {
				type : contentType
			});
			return blob;
		}

		initController();
	}
})();