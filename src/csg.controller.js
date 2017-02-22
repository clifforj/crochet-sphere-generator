(function (angular) {
    'use strict';

    angular.module('csg')
        .controller('CsgController', CsgController);

    CsgController.$inject = ['calculationService'];
    function CsgController(calculationService) {
        var vm = this;

        vm.numberOfRows = 15;
        vm.sphere = null;

        vm.calculate = calculate;

        /*****/

        function calculate() {
            vm.sphere = calculationService.calculateSphere(vm.numberOfRows);
        }
    }

})(window.angular);