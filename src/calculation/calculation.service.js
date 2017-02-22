(function (angular) {
    'use strict';

    angular.module('csg')
        .factory('calculationService', calculationService);

    calculationService.$inject = ['Sphere'];
    function calculationService(Sphere) {
        // The number of stitches in the first row (keep this number low to avoid flat tops)
        var FIRST_ROW_SIZE = 6;

        // Calculation base - Some values used across the generation
        var cb = null;

        return {
            calculateSphere: calculateSphere,
            refreshCalculationBase: refreshCalculationBase,
            getRowStitchCount: getRowStitchCount,
            getRowDimensions: getRowDimensions
        };

        function calculateSphere(numberOfRows) {
            refreshCalculationBase(numberOfRows);

            var rowStitchCounts = []; // The number of stitches for each row
            var rowDimensions = []; // The dimensions of the row for diagramming purposes
            var currentRowDimensions;
            var previousRowHeight = 0;

            for(var i = 1; i < numberOfRows; i++) {
                rowStitchCounts.push(getRowStitchCount(i));

                currentRowDimensions = getRowDimensions(i, previousRowHeight);
                previousRowHeight = currentRowDimensions[1]; // Take the previous rows height to save recalculating
                rowDimensions.push(currentRowDimensions);
            }

            return new Sphere(rowStitchCounts, rowDimensions);
        }

        function getRowStitchCount(rowIndex) {
            var unscaledRowStitches = Math.sin(cb.radiansPerStep*rowIndex); // Stitch numbers based on a unit circle
            return Math.round(unscaledRowStitches*cb.stepScale); // Scaled up in line with the initial row size
        }

        function getRowDimensions(rowIndex, previousRowHeight) {
            var prevHeight = previousRowHeight || 0;

            if(!previousRowHeight) {
                var prevDistFromCenter = Math.abs(Math.cos(cb.radiansPerStep*(rowIndex-1)));
                prevHeight = 1 - prevDistFromCenter;
            }

            var distFromCenter = Math.abs(Math.cos(cb.radiansPerStep*rowIndex));
            var currentHeight = 1 - distFromCenter;

            var calculatedWidth = Math.sin(cb.radiansPerStep * rowIndex); // As a percentage of max width
            var calculatedHeight = Math.abs(currentHeight - prevHeight); // As a percentage of max height

            return [calculatedWidth, calculatedHeight];
        }

        function refreshCalculationBase(numberOfRows) {
            var radiansPerStep = Math.PI/numberOfRows;

            // The scaling amount used for each row. This is based off the size of the first row
            var scale = FIRST_ROW_SIZE/Math.sin(radiansPerStep);

            cb = {
                radiansPerStep: radiansPerStep,
                stepScale: scale
            };

            return cb;
        }
    }

})(window.angular);