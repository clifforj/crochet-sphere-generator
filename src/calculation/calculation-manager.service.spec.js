describe('calculation-manager service', function() {
    var calculationManagerService;
    var calculationService;
    var Sphere;

    beforeEach(inject(function (_calculationManagerService_, _calculationService_, _Sphere_) {
        calculationManagerService = _calculationManagerService_;
        calculationService = _calculationService_;
        Sphere = _Sphere_;
    }));

    it('should exist', function () {
        expect(calculationManagerService).toBeDefined();
    });

    describe('getCalculation', function () {
        it('should retrieve a calculation', function () {
            expect(calculationManagerService.getCalculation).toBeDefined();

            var calculation = calculationManagerService.getCalculation(15);
            expect(calculation instanceof Sphere).toBeTruthy();
        });

        it('should cache retrieved calculations and return them when asked for the same one', function () {
            var calculation = calculationManagerService.getCalculation(15);
            var calculation2 = calculationManagerService.getCalculation(15);

            expect(calculation).toBe(calculation2);
        });
    });

    describe('getLastRetrievedCalculation', function () {
        it('should retrieve the last calculation', function () {
            var calculation = calculationManagerService.getCalculation(15);
            var calculation2 = calculationManagerService.getLastRetrievedCalculation();

            expect(calculation).toBe(calculation2);
        });
    });

});