describe('calculation service', function() {
    var calculationService;
    var calculationBase;
    var Sphere;

    beforeEach(inject(function (_calculationService_, _Sphere_) {
        calculationService = _calculationService_;
        Sphere = _Sphere_;
    }));

    it('should exist', function () {
        expect(calculationService).toBeDefined();
    });

    describe('calculateSphere', function () {
        it('should exist', function () {
            expect(calculationService.calculateSphere).toBeDefined();
        });

        it('should return a Sphere', function () {
            var sphere = calculationService.calculateSphere(20);
            expect(sphere).toBeDefined();
            expect(sphere instanceof Sphere).toBeTruthy();
        });
    });

    describe('refreshCalculationBase', function () {
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

    describe('getRowStitchCount', function () {
        beforeEach(function () {
            calculationBase = calculationService.refreshCalculationBase(15);
        });

        it('should exist', function () {
            expect(calculationService.getRowStitchCount).toBeDefined();
        });

        // Spheres starts and end the same
        it('stitch count for first and penultimate rows should be 6', function () {
            var firstRowStitches = calculationService.getRowStitchCount(1);
            var lastRowStitches = calculationService.getRowStitchCount(14);
            expect(firstRowStitches).toBe(6);
            expect(lastRowStitches).toBe(6);
        });

        it('should return the correct stitch count for a given row', function () {
            var rowStitches = calculationService.getRowStitchCount(7);

            // unit sphere scale * step scale
            var expectedRowSitches = Math.round(0.9945 * 28.8584);

            expect(rowStitches).toBe(expectedRowSitches);
        });
    });

    describe('getRowDimensions', function () {
        beforeEach(function () {
            calculationBase = calculationService.refreshCalculationBase(15);
        });

        it('should exist', function () {
            expect(calculationService.getRowDimensions).toBeDefined();
        });

        // Spheres starts and end the same
        it('stitch return an array with 2 elements', function () {
            var dimensions = calculationService.getRowDimensions(1);
            expect(dimensions.length).toBe(2);
        });

        it('should return the correct dimensions for a given row with no previous calculation', function () {
            var dimensions = calculationService.getRowDimensions(1);

            var expectedWidth = '0.2079';
            var expectedHeight = '0.02185';

            expect(dimensions[0].toFixed(4)).toBe(expectedWidth);
            expect(dimensions[1].toFixed(5)).toBe(expectedHeight);
        });

        it('should return the correct dimensions for a given row with a previous height calculation', function () {
            var dimensions = calculationService.getRowDimensions(2, 0.02185);

            var expectedWidth = '0.4067';
            var expectedHeight = '0.06460';

            expect(dimensions[0].toFixed(4)).toBe(expectedWidth);
            expect(dimensions[1].toFixed(5)).toBe(expectedHeight);
        });
    });
});