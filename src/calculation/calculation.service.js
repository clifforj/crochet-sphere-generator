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

            for(var i = 1; i < numberOfRows; i++) {
                rowStitchCounts.push(getRowStitchCount(i));

                currentRowDimensions = getRowDimensions(i);

                rowDimensions.push(currentRowDimensions);
            }

            return new Sphere(rowStitchCounts, rowDimensions);
        }

        function getRowStitchCount(rowIndex) {
            var unscaledRowStitches = Math.sin(cb.radiansPerStep*rowIndex); // Stitch numbers based on a unit circle
            return Math.round(unscaledRowStitches*cb.stepScale); // Scaled up in line with the initial row size
        }

        function getRowDimensions(rowIndex) {
            var rowStartHeight = Math.cos(cb.radiansPerStep*(rowIndex-1));
            var rowEndHeight = Math.cos(cb.radiansPerStep*rowIndex);
            var currentHeight;
            if(rowStartHeight > 0 && rowEndHeight < 0) {
                currentHeight = rowStartHeight + Math.abs(rowEndHeight);
            } else if(rowStartHeight > 0 && rowEndHeight > 0) {
                currentHeight = rowStartHeight - rowEndHeight;
            } else {
                // We've passed the midpoint, so we need to reverse how we calculate height
                rowStartHeight = Math.cos(cb.radiansPerStep*rowIndex);
                rowEndHeight = Math.cos(cb.radiansPerStep*(rowIndex+1));
                currentHeight = Math.abs(rowEndHeight) - Math.abs(rowStartHeight);
            }

            var calculatedWidth = Math.sin(cb.radiansPerStep * rowIndex); // As a percentage of max width
            var calculatedHeight = Math.abs(currentHeight); // As a percentage of max height

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