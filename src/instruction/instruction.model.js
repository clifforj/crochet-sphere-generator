(function (angular) {
    'use strict';

    angular.module('csg')
        .factory('Instruction', model);

    function model() {

        function Instruction(rowIndex, previousRowCount, targetRowCount, rowDimensions) {
            this.rowIndex = rowIndex;
            this.previousRowCount = previousRowCount;
            this.targetRowCount = targetRowCount;
            this.rowDimensions = rowDimensions;
        }

        Instruction.INCREASE = 'inc';
        Instruction.DECREASE = 'dec';

        Instruction.prototype.generateInstructionSteps = function () {
            var steps = [];

            // Whether the number of crochets is going to be increasing or decreasing
            var changeType = this.targetRowCount > this.previousRowCount ? Instruction.INCREASE : Instruction.DECREASE;

            // The absolute difference in the number of crochets on the row
            var numChange = Math.abs(this.targetRowCount - this.previousRowCount);

            // The number of single crochets required (aka, times we don't need to increase/decrease)
            var numSingles = changeType == Instruction.INCREASE ?
                this.previousRowCount - numChange : this.targetRowCount - numChange;

            if(numChange === 1) {
                steps = this.generateStepsForSingleChange(numSingles, changeType);
            }

            return steps;
        };

        Instruction.prototype.generateStepsForSingleChange = function (numSingles, changeType) {
            // Divide the number of singles (5 is arbitrary, just need something to move the change around)
            var divided = numSingles / 5;

            // Put the change somewhere between all the singles (based off index so change isn't always in the same place)
            var initialSplit = Math.round(((this.rowIndex%4)+1) * divided);

            // The remaining amount of singles to put after the change
            var remaining = numSingles - initialSplit;

            return [initialSplit, changeType, remaining];
        };

        Instruction.prototype.generateInstructionText = function () {
            return 'magic circle with ' + this.targetRowCount + ' sc (' + this.targetRowCount + ')';
        };

        Instruction.prototype.getInstructionSteps = function () {
            if(!this.steps) {
                this.steps = this.generateInstructionSteps();
            }

            return this.steps;
        };

        Instruction.prototype.getInstructionText = function () {
            if(!this.text) {
                this.text = this.generateInstructionText();
            }
            return this.text;
        };

        return Instruction;
    }

})(window.angular);