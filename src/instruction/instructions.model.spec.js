describe('Instructions model', function () {

    var Instructions;
    var mockRowCounts = [6,12,18];
    var mockRowDimensions = [[0.1,0.2], [0.2,0.3], [0.3, 0.6]];

    beforeEach(inject(function (_Instructions_) {
        Instructions = _Instructions_;
    }));

    it('should exist', function () {
        expect(Instructions).toBeDefined();
    });

    it('should take row counts and row dimensions', function () {
        var instructions = new Instructions(mockRowCounts, mockRowDimensions);

        expect(instructions.rowCounts).toBe(mockRowCounts);
        expect(instructions.rowDimensions).toBe(mockRowDimensions);
    });

    it('should create instruction array for the passed row counts', function () {
        var instructions = new Instructions(mockRowCounts, mockRowDimensions);

        expect(instructions.instructions.length).toBe(3);
        expect(instructions.rowDimensions).toBe(mockRowDimensions);
    });

});