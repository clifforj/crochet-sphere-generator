(function (angular) {
    'use strict';

    angular.module('csg')
        .factory('Instruction', model);

    function model() {

        function Instruction(rowIndex, previousRowCount, targetRowCount, rowDimensions) {
            this.rowIndex = rowIndex;

            // if the previous row is zero, then this is the first row
            this.previousRowCount = previousRowCount === 0 ? targetRowCount : previousRowCount;
            this.targetRowCount = targetRowCount;

            this.rowDimensions = rowDimensions;
        }

        Instruction.INCREASE = 'inc';
        Instruction.DECREASE = 'dec';
        Instruction.SINGLE = ' sc';
        Instruction.MAGIC_CIRCLE = 'Magic circle with';

        Instruction.prototype.generateInstructionSteps = function () {
            var steps = [];

            // Whether the number of crochets is going to be increasing or decreasing
            var changeType = this.targetRowCount > this.previousRowCount ? Instruction.INCREASE : Instruction.DECREASE;

            // The absolute difference in the number of crochets on the row
            var numChange = Math.abs(this.targetRowCount - this.previousRowCount);

            // The number of single crochets required (aka, times we don't need to increase/decrease)
            var numSingles = changeType == Instruction.INCREASE ?
                this.previousRowCount - numChange : this.targetRowCount - numChange;

            // Each category of changes should be handled differently
            if(numChange === 1) {
                steps = this.generateStepsForSingleChange(numSingles, changeType);
            } else if(numChange === 0) {
                steps = [this.targetRowCount];
            } else {
                steps = this.generateStepsForMultipleChanges(numSingles, numChange, changeType);
            }

            for(var i = 0; i < steps.length; i++) {
                if(!isNaN(steps[i])) {
                    steps[i] += Instruction.SINGLE;
                }
            }

            return steps;
        };

        Instruction.prototype.generateStepsForSingleChange = function (numSingles, changeType) {
            // Divide the number of singles (5 is arbitrary, just need something to move the change around)
            var dividedSingles = numSingles / 5;

            // Put the change somewhere between all the singles (based off index so change isn't always in the same place)
            var initialSplit = Math.round(((this.rowIndex%4)+1) * dividedSingles);

            // The remaining amount of singles to put after the change
            var remaining = numSingles - initialSplit;

            return [initialSplit, changeType, remaining];
        };

        Instruction.prototype.generateStepsForMultipleChanges = function (numSingles, numChange, changeType) {
            var steps = [];
            // Divide the singles so they sit infront of each change
            var dividedSingles = numSingles/(numChange+1);

            // Any singles that remain get added as the last step
            var remainingSingles = numSingles-Math.round(dividedSingles*numChange);

            var currentStepSingles;
            for(var i = 0; i < numChange; i++) {
                if(dividedSingles !== 0) {
                    // Work out the singles for the current step. (number of singles until now, minus the number of
                    // singles from the previous step)
                    currentStepSingles = Math.round(dividedSingles * (i + 1)) - Math.round(dividedSingles * i);

                    if (currentStepSingles !== 0) {
                        steps.push(currentStepSingles);
                    }
                }

                steps.push(changeType);
            }

            // Push any remaining singles on the end. This stops instructions all ending with a change
            if(remainingSingles !== 0) {
                steps.push(remainingSingles);
            }

            return steps;
        };

        Instruction.prototype.generateInstructionText = function () {
            var text;

            if(this.rowIndex === 0) {
                text = [Instruction.MAGIC_CIRCLE, this.getInstructionSteps()[0]].join(' ');
            } else {
                text = this.getInstructionSteps().join(', ');
            }

            text += ' (' + this.targetRowCount + ')';

            return text;
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