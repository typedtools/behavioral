import {
  gherkin,
  Given, 
  Param,
  State, 
  Then, 
  When,
} from '@typedtools/behavioral';
import { Test } from '@typedtools/behavioral-jest';

@State()
export class Cucumbers {
  amount = 0;
}

@Test(gherkin`
Feature: Eating

  Background:
    Given a global administrator named "Greg"
      And a blog named "Greg's anti-tax rants"
      And a customer named "Dr. Bill"
      And a blog named "Expensive Therapy" owned by "Dr. Bill"

  @skip
  Scenario Outline: eating
    Given there are <start> cucumbers
      """
      Some Title, Eh?
      ===============
      Here is the first paragraph of my blog post. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
      """
     When I eat <eat> cucumbers
      | name   | email              | twitter         |
      | Aslak  | aslak@cucumber.io  | @aslak_hellesoy |
      | Julien | julien@cucumber.io | @jbpros         |
      | Matt   | matt@cucumber.io   | @mattwynne      |
     Then I should have <left> cucumbers

    Examples:
      | start | eat | left |
      |    12 |   5 |    7 |
      |    20 |   5 |   15 |
`)
export class EatingTest {
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
