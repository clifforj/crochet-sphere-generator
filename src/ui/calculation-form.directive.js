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
            templateUrl: 'ui/calculation-form.html'
        };
    }

    Controller.$inject = ['calculationManagerService'];
    function Controller(calculationManagerService) {
        var vm = this;

        vm.numberOfRows = 15;

        vm.calculate = calculate;

        /*****/

        function calculate() {
            vm.sphere = calculationManagerService.getCalculation(vm.numberOfRows);
        }
    }

})(window.angular);