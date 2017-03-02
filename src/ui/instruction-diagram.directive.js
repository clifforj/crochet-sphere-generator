(function (angular) {
    'use strict';

    angular.module('csg')
        .directive('instructionDiagram', instructionDiagram);

    function instructionDiagram() {
        return {
            restrict: 'E',
            scope: {},
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'ui/instruction-diagram.html'
        };
    }

    Controller.$inject = ['calculationManagerService'];
    function Controller(calculationManagerService) {
        var vm = this;

        vm.latestCalculation = getLatestCalculation();

        vm.getLatestCalculation = getLatestCalculation;
        vm.getRowHeight = getRowHeight;
        vm.getRowWidth = getRowWidth;

        /*****/

        function getLatestCalculation() {
            vm.latestCalculation = calculationManagerService.getLastRetrievedCalculation();
            return vm.latestCalculation;
        }

        function getRowHeight(rowIndex) {
            return (vm.latestCalculation.instructions[rowIndex].rowDimensions[1]*150)+'px';
        }

        function getRowWidth(rowIndex) {
            return (vm.latestCalculation.instructions[rowIndex].rowDimensions[0]*300)+'px';
        }
    }

})(window.angular);