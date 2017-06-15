
(function() {
    'use strict';

    angular
    	.module('app')
        .controller('LGFeePaidFormController', ['$scope', 'CommonFormService', 'FlashService', 'DocumentService', 'Constants', LGFeePaidFormController]);

    function LGFeePaidFormController($scope, CommonFormService, FlashService, DocumentService, Constants) {
    	var vm = this;
    	vm.confirmTrackingId = confirmTrackingId;
    	vm.lgAmountDue = '$123.00';
    	vm.notExistInPayGov = false;
    	vm.foundLGPaidDetails = false;
    	vm.noMatch = false;    	
    	
    	function confirmTrackingId(){
    		DocumentService.getConfirmationDetails(vm.agencyTrackingNumber)
			.then(
					function(response) {
						vm.lgFeeAmountPaid = response.lgFeeAmountPaid;
						vm.lgFeePaidDate = response.lgFeePaidDate;
						//demo only
						if(vm.agencyTrackingNumber == 1){
							vm.noMatch = false;
							vm.notExistInPayGov = false;
							vm.foundLGPaidDetails = true;
							$scope.validateLgFee = "true";
						}
						else if(vm.agencyTrackingNumber == 2){
							vm.foundLGPaidDetails = true;
							vm.noMatch = true;
							vm.notExistInPayGov = false;
							vm.lgFeeAmountPaid = '$100.00';
							$scope.validateLgFee = "";
						}
						else {
							vm.notExistInPayGov = true;
							vm.foundLGPaidDetails = false;
					    	vm.noMatch = false;
					    	$scope.validateLgFee = "";
						}
						//
						
						
						
//						if(vm.lgAmountDue != vm.lgFeeAmountPaid){
//							vm.noMatch = true;
//			    		}
//						else{
//							vm.noMatch = false;
//						}
						
					});    		
    	}
    	
    }
})();