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

    it('should generate steps with the correct number of crochets in them', function () {
        var instruction = new Instruction(1, 6, 12, mockRowDimensions);
        var steps = instruction.getInstructionSteps();

        expect(stepCrochetCounter(steps)).toBe(12);
        expect(steps).toBe(instruction.getInstructionSteps()); // make sure steps gets cached

        instruction = new Instruction(1, 56, 58, mockRowDimensions);
        steps = instruction.getInstructionSteps();

        expect(stepCrochetCounter(steps)).toBe(58);

        instruction = new Instruction(1, 1, 4, mockRowDimensions);
        steps = instruction.getInstructionSteps();

        expect(stepCrochetCounter(steps)).toBe(4);

        // Big one
        instruction = new Instruction(1, 1864, 1578, mockRowDimensions);
        steps = instruction.getInstructionSteps();
        expect(stepCrochetCounter(steps)).toBe(1578);
    });

    it('should generate steps for Instructions that have multiple changes', function () {
        var instruction = new Instruction(1, 6, 12, mockRowDimensions);
        var steps = instruction.generateInstructionSteps();

        expect(steps).toEqual([
            Instruction.INCREASE,
            Instruction.INCREASE,
            Instruction.INCREASE,
            Instruction.INCREASE,
            Instruction.INCREASE,
            Instruction.INCREASE
        ]);

        instruction = new Instruction(1, 20, 24, mockRowDimensions);
        steps = instruction.generateInstructionSteps();

        expect(steps).toEqual([
            '3 sc',
            Instruction.INCREASE,
            '3 sc',
            Instruction.INCREASE,
            '4 sc',
            Instruction.INCREASE,
            '3 sc',
            Instruction.INCREASE,
            '3 sc'
        ]);

        instruction = new Instruction(1, 58, 50, mockRowDimensions);
        steps = instruction.generateInstructionSteps();

        expect(steps).toEqual([
            '5 sc',
            Instruction.DECREASE,
            '4 sc',
            Instruction.DECREASE,
            '5 sc',
            Instruction.DECREASE,
            '5 sc',
            Instruction.DECREASE,
            '4 sc',
            Instruction.DECREASE,
            '5 sc',
            Instruction.DECREASE,
            '5 sc',
            Instruction.DECREASE,
            '4 sc',
            Instruction.DECREASE,
            '5 sc'
        ]);
    });

    it('should generate steps for Instructions that don\'t contain a change', function () {
        var instruction = new Instruction(1, 10, 10, mockRowDimensions);
        var steps = instruction.generateInstructionSteps();

        expect(steps).toEqual(['10 sc']);

        instruction = new Instruction(1, 32, 32, mockRowDimensions);
        steps = instruction.generateInstructionSteps();

        expect(steps).toEqual(['32 sc']);
    });

    it('should generate steps for Instructions that only change by one crochet', function () {
        var instruction = new Instruction(1, 10, 11, mockRowDimensions);
        spyOn(instruction, 'generateStepsForSingleChange').and.callThrough();

        var steps = instruction.generateInstructionSteps();

        expect(instruction.generateStepsForSingleChange).toHaveBeenCalledTimes(1);
        expect(steps).toEqual(['4 sc', Instruction.INCREASE, '5 sc']);

        //-----

        instruction = new Instruction(1, 11, 10, mockRowDimensions);
        spyOn(instruction, 'generateStepsForSingleChange').and.callThrough();

        steps = instruction.generateInstructionSteps();

        expect(instruction.generateStepsForSingleChange).toHaveBeenCalledTimes(1);
        expect(steps).toEqual(['4 sc', Instruction.DECREASE, '5 sc']);

        //-----

        instruction = new Instruction(2, 124, 125, mockRowDimensions);
        spyOn(instruction, 'generateStepsForSingleChange').and.callThrough();

        steps = instruction.generateInstructionSteps();

        expect(instruction.generateStepsForSingleChange).toHaveBeenCalledTimes(1);
        expect(steps).toEqual(['74 sc', Instruction.INCREASE, '49 sc']);
    });

    it('should return instruction text for starting the sphere if it\'s the first row', function () {
        var instruction = new Instruction(0, 0, 6, mockRowDimensions);
        expect(instruction.getInstructionText()).toBe('Magic circle with 6 sc (6)');
    });

    it('should return instructions for row', function () {
        var instruction = new Instruction(1, 6, 12, mockRowDimensions);
        spyOn(instruction, 'generateInstructionText').and.callThrough();
        expect(instruction.getInstructionText()).toBe('inc, inc, inc, inc, inc, inc (12)');
        instruction.getInstructionText();
        expect(instruction.generateInstructionText).toHaveBeenCalledTimes(1); // Make sure text generation is cached

    });

    function stepCrochetCounter(steps) {
        var count = 0;

        var currentStep;
        for (var i = 0; i < steps.length; i++) {
            currentStep = steps[i];

            if (currentStep === Instruction.INCREASE) {
                count += 2;
            } else if (currentStep === Instruction.DECREASE){
                count++;
            } else {
                count += parseInt(currentStep);
            }
        }

        return count;
    }

});

