import { Context, Given, Param, State, Then, When } from '@typedtools/behavioral';
import { CucumbersState } from '../states/CucumbersState';

@Context()
export class EatingContext {
  @State()
  cucumbers!: CucumbersState;

  @Given('there are <amount> cucumbers')
  setCucumberAmount(@Param('amount') amount: number): void {
    this.cucumbers.amount = amount;
  }

  @When('I eat <amount> cucumbers')
  eat(@Param('amount') amount: number): void {
    this.cucumbers.amount = this.cucumbers.amount - amount;
  }

  @Then('I should have <amount> cucumbers')
  verifyCucumberAmount(@Param('amount') amount: number): void {
    expect(this.cucumbers.amount).toBe(amount);
  }
}