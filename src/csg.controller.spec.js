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
});