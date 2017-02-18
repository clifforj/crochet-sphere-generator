(function (angular) {
    'use strict';

    angular.module('csg')
        .controller('CsgController', CsgController);

    function CsgController() {
        var vm = this;

        vm.numberOfRows = 15;
    }

})(window.angular);