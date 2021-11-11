import { Given, Handler, Param, Then, When } from '@typedtools/behavioral/decorators';
import { CucumbersState } from '../states/CucumbersState';

@Handler()
export class EatingHandler {
  constructor(
    private cucumbers: CucumbersState,
  ) {}

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