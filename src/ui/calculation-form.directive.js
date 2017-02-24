(function (angular) {
    'use strict';

    angular.module('csg')
        .directive('calculationForm', calculationForm);

    function calculationForm() {
        return {
            restrict: 'E',
            scope: {},
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            template: 'calculationForm' // TODO - add html2js library and proper template
        }
    }

    Controller.$inject = ['calculationService'];
    function Controller(calculationService) {
        var vm = this;

        vm.numberOfRows = 15;

        vm.calculate = calculate;

        /*****/

        function calculate() {
            vm.sphere = calculationService.calculateSphere(vm.numberOfRows);
        }
    }

})(window.angular);