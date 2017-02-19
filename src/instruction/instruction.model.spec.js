describe('Instruction model', function () {

    var Instruction;
    var mockRowDimensions = [0.1, 0.2];

    beforeEach(inject(function (_Instruction_) {
        Instruction = _Instruction_;
    }));

    it('should exist', function () {
        expect(Instruction).toBeDefined();
    });

    it('should take row index, previous row counts, target row counts and row dimensions', function () {
        var instruction = new Instruction(1, 6, 12, mockRowDimensions);

        expect(instruction.rowIndex).toBe(1);
        expect(instruction.previousRowCount).toBe(6);
        expect(instruction.targetRowCount).toBe(12);
        expect(instruction.rowDimensions).toBe(mockRowDimensions);
    });

    it('should generate steps for Instructions that don\'t contain a change', function () {
        var instruction = new Instruction(0, 10, 10, mockRowDimensions);
        var steps = instruction.generateInstructionSteps();

        expect(steps).toEqual([10]);

        instruction = new Instruction(0, 32, 32, mockRowDimensions);
        steps = instruction.generateInstructionSteps();

        expect(steps).toEqual([32]);
    });

    it('should generate steps for Instructions that only change by one crochet', function () {
        var instruction = new Instruction(0, 10, 11, mockRowDimensions);
        spyOn(instruction, 'generateStepsForSingleChange').and.callThrough();

        var steps = instruction.generateInstructionSteps();

        expect(instruction.generateStepsForSingleChange).toHaveBeenCalledTimes(1);
        expect(steps).toEqual([2, Instruction.INCREASE, 7]);

        //-----

        instruction = new Instruction(1, 11, 10, mockRowDimensions);
        spyOn(instruction, 'generateStepsForSingleChange').and.callThrough();

        steps = instruction.generateInstructionSteps();

        expect(instruction.generateStepsForSingleChange).toHaveBeenCalledTimes(1);
        expect(steps).toEqual([4, Instruction.DECREASE, 5]);

        //-----

        instruction = new Instruction(2, 124, 125, mockRowDimensions);
        spyOn(instruction, 'generateStepsForSingleChange').and.callThrough();

        steps = instruction.generateInstructionSteps();

        expect(instruction.generateStepsForSingleChange).toHaveBeenCalledTimes(1);
        expect(steps).toEqual([74, Instruction.INCREASE, 49]);
    });

    it('should return instructions for starting the sphere if it\'s the first row', function () {
        var instruction = new Instruction(0, 0, 6, mockRowDimensions);

        expect(instruction.getInstructionText()).toBe('magic circle with 6 sc (6)');
    });

});