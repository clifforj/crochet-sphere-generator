describe('calculation-form directive', function() {
    var calculationForm;
    var calculationFormController;
    var scope;

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();

        calculationForm = $compile(angular.element('<calculation-form></calculation-form>'))(scope);
        scope.$digest();

        calculationFormController = calculationForm.controller('calculationForm');
    }));

    it('should have a default of 15 for "numberOfRows"', function() {
        expect(calculationFormController.numberOfRows).toEqual(15);
    });

    it('should have a calculate method that populates the directive controllers sphere', function() {
        expect(calculationFormController.calculate).toBeDefined();
        expect(calculationFormController.sphere).toBeFalsy();
        calculationFormController.calculate();
        expect(calculationFormController.sphere).toBeTruthy();
    });
});