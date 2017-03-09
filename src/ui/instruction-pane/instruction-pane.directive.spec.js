describe('calculation-form directive', function() {
    var instructionPane;
    var instructionPaneController;
    var scope;
    var calculationManagerService;
    var latestCalculation;

    beforeEach(inject(function($rootScope, $compile, _calculationManagerService_) {
        scope = $rootScope.$new();
        calculationManagerService = _calculationManagerService_;

        // put a calculation in the manager
        latestCalculation = calculationManagerService.getCalculation(15);

        instructionPane = $compile(angular.element('<instruction-pane></instruction-pane>'))(scope);
        scope.$digest();

        instructionPaneController = instructionPane.controller('instructionPane');

    }));

    it('should init with the latest calculation', function() {
        expect(instructionPaneController.latestCalculation).toBe(latestCalculation);
    });

    it('should have a method to get the latest calculation', function() {
        expect(instructionPaneController.getLatestCalculation).toBeDefined();
        expect(instructionPaneController.getLatestCalculation()).toBe(latestCalculation);

        latestCalculation = calculationManagerService.getCalculation(25);
        expect(instructionPaneController.getLatestCalculation()).toBe(latestCalculation);
    });
});