describe('csg controller', function() {
    var CsgController;

    beforeEach(inject(function ($controller) {
        CsgController = $controller('CsgController');
    }));

    it('should exist', function() {
        expect(CsgController).toBeDefined();
    });

    it('should have a default of 15 for "numberOfRows"', function() {
        expect(CsgController.numberOfRows).toEqual(15);
    });

    it('should have a calculate method that populates the controllers sphere', function() {
        expect(CsgController.calculate).toBeDefined();
        expect(CsgController.sphere).toBeFalsy();
        CsgController.calculate();
        expect(CsgController.sphere).toBeTruthy();
    });
});