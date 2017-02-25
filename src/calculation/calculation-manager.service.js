(function (angular) {
    'use strict';

    angular.module('csg')
        .factory('calculationManagerService', calculationManagerService);

    calculationManagerService.$inject = ['calculationService'];
    function calculationManagerService(calculationService) {

        var calculations = {};
        var lastRetrievedCalculation;

        return {
            getCalculation: getCalculation,
            getLastRetrievedCalculation: getLastRetrievedCalculation
        };

        function getCalculation(rowCount) {
            if(calculations[rowCount]) {
                lastRetrievedCalculation = calculations[rowCount];
            } else {
                calculations[rowCount] = lastRetrievedCalculation = calculationService.calculateSphere(rowCount);
            }

            return lastRetrievedCalculation;
        }

        function getLastRetrievedCalculation() {
            return lastRetrievedCalculation;
        }
    }
})(window.angular);