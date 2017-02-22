describe('Sphere model', function () {

    var Sphere;
    var mockRowCounts = [6,12,18];
    var mockRowDimensions = [[0.1,0.2], [0.2,0.3], [0.3, 0.6]];

    beforeEach(inject(function (_Sphere_) {
        Sphere = _Sphere_;
    }));

    it('should exist', function () {
        expect(Sphere).toBeDefined();
    });

    it('should take row counts and row dimensions', function () {
        var sphere = new Sphere(mockRowCounts, mockRowDimensions);

        expect(sphere.rowCounts).toBe(mockRowCounts);
        expect(sphere.rowDimensions).toBe(mockRowDimensions);
    });

    it('should create instruction array for the passed row counts', function () {
        var sphere = new Sphere(mockRowCounts, mockRowDimensions);

        expect(sphere.instructions.length).toBe(3);
        expect(sphere.rowDimensions).toBe(mockRowDimensions);

        expect(sphere.instructions[0].targetRowCount).toBe(mockRowCounts[0]);
        expect(sphere.instructions[1].targetRowCount).toBe(mockRowCounts[1]);
        expect(sphere.instructions[2].targetRowCount).toBe(mockRowCounts[2]);
    });

    it('should create the first instruction with a 0 previousRowCount', function () {
        var sphere = new Sphere(mockRowCounts, mockRowDimensions);

        // This should trigger the instruction to set the previousRowCount to equal the targetRowCount
        expect(sphere.instructions[0].previousRowCount).toBe(6);
    });
});