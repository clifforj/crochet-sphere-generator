(function (angular) {
    'use strict';

    angular.module('csg')
        .factory('calculationService', calculationService);

    function calculationService() {
        // The number of stitches in the first row (keep this number low to avoid flat tops)
        var FIRST_ROW_SIZE = 6;

        // Calculation base - Some values used across the generation
        var cb = null;

        return {
            generateInstructions: generateInstructions,
            refreshCalculationBase: refreshCalculationBase,
            getRowStitchCount: getRowStitchCount
        };

        function generateInstructions(numberOfRows) {
            refreshCalculationBase(numberOfRows);

            var rowStitchCounts = []; // The number of stitches for each row
            var rowDimensions = []; // The dimensions of the row for diagramming purposes

            for(var i = 1; i < numberOfRows; i++) {
                rowStitchCounts.push(getRowStitchCount());

                var currentCos = Math.abs(Math.cos(stepAmount*i));
                var currentHeight = 1 - currentCos;
                var calculatedHeight = Math.abs(currentHeight - prevHeight);
                prevHeight = currentHeight;

                raws.push([rawSin, calculatedHeight]);
            }
        }

        function getRowStitchCount(rowIndex) {
            var unscaledRowStitches = Math.sin(cb.radiansPerStep*rowIndex); // Stitch numbers based on a unit circle
            return Math.round(unscaledRowStitches*cb.stepScale); // Scaled up in line with the initial row size
        }

        function refreshCalculationBase(numberOfRows) {
            var radiansPerStep = Math.PI/numberOfRows;

            // The scaling amount used for each row. This is based off the size of the first row
            var scale = FIRST_ROW_SIZE/Math.sin(radiansPerStep);

            cb = {
                radiansPerStep: radiansPerStep,
                stepScale: scale
            };

            return cb
        }
    }

})(window.angular);