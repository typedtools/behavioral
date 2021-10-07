import {
  gherkin,
  Given, 
  Param, 
  Def, 
  State, 
  Then, 
  When,
} from '@typedtools/behavioral';
import { execute } from '@typedtools/behavioral-jest';

@State()
export class Cucumbers {
  amount = 0;
}

@Def()
export class EatingDef {
  constructor(
    private cucumbers: Cucumbers,
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

const parsedGherkin = gherkin`
Feature: Eating

  Scenario Outline: eating
    Given there are <start> cucumbers
     When I eat <eat> cucumbers
     Then I should have <left> cucumbers

    Examples:
      | start | eat | left |
      |    12 |   5 |    7 |
      |    20 |   5 |   15 |
`

console.log(parsedGherkin);

execute(parsedGherkin);
