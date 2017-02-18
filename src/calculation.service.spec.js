describe('calculation service', function() {
    var calculationService;

    beforeEach(inject(function (_calculationService_) {
        calculationService = _calculationService_;
    }));

    it('should exist', function() {
        expect(calculationService).toBeDefined();
    });

    describe('refreshCalculationBase', function() {
        it('should exist', function () {
            expect(calculationService.refreshCalculationBase).toBeDefined();
        });

        it('should provide a calculation base', function () {
            var cb = calculationService.refreshCalculationBase(15);
            expect(cb).toBeDefined();
        });

        it('should calculate the radians per step & step scale', function () {
            var cb = calculationService.refreshCalculationBase(15);

            // Expected values worked out the old fashioned way
            var expectedRadiansPerStep = '0.2094395'; // .toFixed(x) returns a string, so leave our expected as a string
            var expectedScale = '28.8584';

            expect(cb.radiansPerStep.toFixed(7)).toBe(expectedRadiansPerStep);
            expect(cb.stepScale.toFixed(4)).toBe(expectedScale);
        });
    });

    describe('getRowStitchCount', function() {
        it('should exist', function () {
            expect(calculationService.getRowStitchCount).toBeDefined();
        });

        // Spheres starts and end the same
        it('stitch count for first and penultimate rows should be 6', function () {
            calculationService.refreshCalculationBase(15);
            var firstRowStitches = calculationService.getRowStitchCount(1);
            var lastRowStitches = calculationService.getRowStitchCount(14);
            expect(firstRowStitches).toBe(6);
            expect(lastRowStitches).toBe(6);
        });

        it('should return the correct stitch count for a given row', function () {
            calculationService.refreshCalculationBase(15);
            var rowStitches = calculationService.getRowStitchCount(7);

            // unit sphere scale * step scale
            var expectedRowSitches = Math.round(0.9945 * 28.8584);

            expect(rowStitches).toBe(expectedRowSitches);
        });
    });
});