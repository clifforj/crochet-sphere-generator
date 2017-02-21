(function (angular) {
    'use strict';

    angular.module('csg')
        .factory('Instructions', model);

    model.$inject = ['Instruction'];
    function model(Instruction) {

        function Instructions(rowCounts, rowDimensions) {
            this.rowCounts = rowCounts;
            this.rowDimensions = rowDimensions;

            this.instructions = [];

            for(var i = 0; i < rowCounts.length; i++) {
                if(i === 0) {
                    this.instructions.push(new Instruction(0, 0, rowCounts[i], rowDimensions[i]));
                } else {
                    this.instructions.push(new Instruction(i, rowCounts[i-1], rowCounts[i], rowDimensions[i]));
                }
            }
        }

        return Instructions;
    }

})(window.angular);