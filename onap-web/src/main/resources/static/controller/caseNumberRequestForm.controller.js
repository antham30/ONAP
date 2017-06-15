(function () {
    'use strict';

    angular
        .module('app')
        .controller('CaseNumberRequestFormController', caseNumberRequestFormControllerFunction);

    caseNumberRequestFormControllerFunction.$inject = ['$scope', '$log'];

    function caseNumberRequestFormControllerFunction($scope, $log) {

        $scope.model = {
            "lender": {
                "name": "ABC Lending Company",
                "tinNumber": "7876534",
                "contactName": "Jane Doe",
                "emailAddress": "jane.doe@abclending.com",
                "telephone": "800.555.1234",
                "fax": "866.555.4321",
                "sponsor": "Joe Sponsor"
            },
            "purposeOfLoan": {
                "purposeOfLoan": "streamlineWithoutAppraisal",
                "priorCaseNumber": "N/A"
            },
            "classification": {"classification": "hudUnderwritten"},
            "borrower": {
                "firstName": "John",
                "middleInitial": "Q",
                "lastName": "Public",
                "tribalAffiliation": "CHER",
                "coborrowerNameAndTribe": "Albert Smith (CHER)",
                "documentation": "true"
            },
            "property": {
                "streetAddress": "1234 Main Street",
                "city": "Vienna",
                "county": "Fairfax",
                "state": "VA",
                "zipCode": "77655"
            },
            "mortgage": {
                "amount": "100000",
                "loanTerm": "15",
                "numberOfUnits": "180"
            },
            "landStatus": {
                "landStatus": "tribalTrust",
                "biaReservationNumber": "897234897",
                "biaTrackingNumber": "98-78365482-324",
                "nameOfTribeWithLandJurisdiction": "OK"
            },
            "condominium": {
                "fhaCondoIdNumber": "008762837",
                "submissionNumber": "2371683",
                "name": "Antelope Run"
            }
        };

        $scope.showButtons = true;

        $scope.submitForm = function () {
            $log.info("submit form");

            // set fields to read only

            // make buttons disappear
            $scope.showButtons = false;
        };

        $scope.resetForm = function () {
            $log.info("reset form");
            $scope.model.purposeOfLoan = {};
            $scope.model.classification = {};
            $scope.model.borrower = {};
            $scope.model.property = {};
            $scope.model.mortgage = {};
            $scope.model.landStatus = {};
            $scope.model.condominium = {};
        };
    };
})();