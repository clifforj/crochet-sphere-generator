describe('calculation-form directive', function() {
    var instructionDiagram;
    var instructionDiagramController;
    var scope;
    var calculationManagerService;
    var latestCalculation;

    beforeEach(inject(function($rootScope, $compile, _calculationManagerService_) {
        scope = $rootScope.$new();
        calculationManagerService = _calculationManagerService_;

        // put a calculation in the manager
        latestCalculation = calculationManagerService.getCalculation(15);

        instructionDiagram = $compile(angular.element('<instruction-diagram></instruction-diagram>'))(scope);
        scope.$digest();

        instructionDiagramController = instructionDiagram.controller('instructionDiagram');

    }));

    it('should init with the latest calculation', function() {
        expect(instructionDiagramController.latestCalculation).toBe(latestCalculation);
    });

    it('should have a method to get the latest calculation', function() {
        expect(instructionDiagramController.getLatestCalculation).toBeDefined();
        expect(instructionDiagramController.getLatestCalculation()).toBe(latestCalculation);

        latestCalculation = calculationManagerService.getCalculation(25);
        expect(instructionDiagramController.getLatestCalculation()).toBe(latestCalculation);
    });
});