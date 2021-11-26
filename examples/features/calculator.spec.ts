import { Calculator } from './classes/Calculator';

describe('Calculator', () => {
    // Define state for test
    const calculator = new Calculator();

    test('display "0" as a result', () => {
        // Assert state with our criteria
        expect(calculator.result).toBe(0);
    });
});
