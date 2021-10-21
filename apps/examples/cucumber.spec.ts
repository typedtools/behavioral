import 'reflect-metadata';
import {
  gherkin,
  Given, 
  Param,
  State, 
  StepDef, 
  Then, 
  When,
} from '@typedtools/behavioral';
import { execute } from '@typedtools/behavioral-jest';

@State()
class Cucumbers {
  amount = 0;
}

@StepDef()
class EatingDef {
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

execute(gherkin`
Feature: Eating

  Scenario Outline: eating
    Given there are <start> cucumbers
     When I eat <eat> cucumbers
     Then I should have <left> cucumbers

    Examples:
      | start | eat | left |
      |    12 |   5 |    7 |
      |    20 |   5 |   15 |
`, [EatingDef]);
