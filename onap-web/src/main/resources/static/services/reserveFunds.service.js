(function() {
    'use strict';

    angular
        .module('app')
        .factory('ReserveFundsService', ReserveFundsService);

    function ReserveFundsService() {
        var service = {},
        	data = {};
        
        service.getData = getData;
        service.setData = setData;
        
        function setData(dataToSet) {
        	data = dataToSet;
        }
        
        function getData() {
        	return data;
        }
        
        return service;
    }

    })();