import { Given, Handler, Param, Then, When } from '@typedtools/behavioral/decorators';
import { CalculatorState } from '../states/CalculatorState';

@Handler()
export class BasicCalculatorHandler {
  constructor(
    private state: CalculatorState,
  ) {}

  @Given('I start with "<num>"')
  @When('I type "<num>"')
  append(@Param('num') num: number): void {
    this.state.calculator.append(num);
  }

  @When('I add "<num>"')
  add(@Param('num') num: number): void {
    this.state.calculator.add(num);
  }

  @When('I subtract "<num>"')
  subtract(@Param('num') num: number): void {
    this.state.calculator.subtract(num);
  }

  @When('I divide by "<num>"')
  divide(@Param('num') num: number): void {
    this.state.calculator.divide(num);
  }

  @When('I multiply by "<num>"')
  multiply(@Param('num') num: number): void {
    this.state.calculator.multiply(num);
  }

  @Then('I see "<value>" as a result')
  checkResult(@Param('value') value: number): void {
    expect(this.state.calculator.result).toBe(value);
  }
}