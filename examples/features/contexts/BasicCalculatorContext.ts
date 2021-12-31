import { Context, Given, Param, State, Then, When } from '@typedtools/behavioral';
import { Operator } from '../classes/Calculator';
import { CalculatorState } from '../states/CalculatorState';

@Context()
export class BasicCalculatorContext {
  @State()
  state!: CalculatorState;

  @Given('I start with "<num>"')
  @When('I type "<num>"')
  append(@Param('num') num: number): void {
    this.state.calculator.append(num);
  }

  @When('I add "<num>"')
  add(@Param('num') num: number): void {
    this.state.calculator.append(Operator.ADD);
    this.state.calculator.append(num);
  }

  @When('I subtract "<num>"')
  subtract(@Param('num') num: number): void {
    this.state.calculator.append(Operator.SUBTRACT);
    this.state.calculator.append(num);
  }

  @When('I divide by "<num>"')
  divide(@Param('num') num: number): void {
    this.state.calculator.append(Operator.DIVIDE);
    this.state.calculator.append(num);
  }

  @When('I multiply by "<num>"')
  multiply(@Param('num') num: number): void {
    this.state.calculator.append(Operator.MULTIPLY);
    this.state.calculator.append(num);
  }

  @Then('I see "<value>" as a result')
  checkResult(@Param('value') value: number): void {
    expect(this.state.calculator.result).toBe(value);
  }
}