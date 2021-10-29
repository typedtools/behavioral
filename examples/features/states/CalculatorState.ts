import { State } from '@typedtools/behavioral/decorators';
import { Calculator } from '../classes/Calculator';

@State()
export class CalculatorState {
  calculator = new Calculator();
}
