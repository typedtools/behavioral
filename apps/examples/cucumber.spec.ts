import { 
  gherkin, 
  Given, 
  Param, 
  Specification, 
  State, 
  Then, 
  When,
} from '@typedtools/behavioral';

@State()
export class EatingState {
  amount = 0;
}

@Specification()
export class EatingSpecification {
  constructor(
    private state: EatingState,
  ) {}

  @Given('there are <amount> cucumbers')
  setCucumberAmount(@Param('amount') amount: number): void {
    this.state.amount = amount;
  }

  @When('I eat <amount> cucumbers')
  eat(@Param('amount') amount: number): void {
    this.state.amount = this.state.amount - amount;
  }

  @Then('I should have <amount> cucumbers')
  verifyCucumberAmount(@Param('amount') amount: number): void {
    expect(this.state.amount).toBe(amount);
  }
}

gherkin`
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
  .use([
    EatingSpecification
  ])
  .run();
