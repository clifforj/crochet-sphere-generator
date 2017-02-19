(function (angular) {
    'use strict';

    angular.module('csg')
        .factory('Instructions', model);

    function model() {

        function Instructions(rowCounts, rowDimensions) {
            this.rowCounts = rowCounts;
            this.rowDimensions = rowDimensions;
        }

        return Instructions;
    }

})(window.angular);