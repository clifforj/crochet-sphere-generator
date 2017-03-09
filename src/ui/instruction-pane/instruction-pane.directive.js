(function (angular) {
    'use strict';

    angular.module('csg')
        .directive('instructionPane', instructionPane);

    function instructionPane() {
        return {
            restrict: 'E',
            scope: {},
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'ui/instruction-pane/instruction-pane.html'
        };
    }

    Controller.$inject = ['calculationManagerService'];
    function Controller(calculationManagerService) {
        var vm = this;

        vm.latestCalculation = getLatestCalculation();

        vm.getLatestCalculation = getLatestCalculation;

        /*****/

        function getLatestCalculation() {
            vm.latestCalculation = calculationManagerService.getLastRetrievedCalculation();
            return vm.latestCalculation;
        }
    }

})(window.angular);