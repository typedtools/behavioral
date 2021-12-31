@bind(./contexts/BasicCalculatorContext.ts:BasicCalculatorContext)
Feature: Calculator

  Scenario: Addition
    When I add "12"
    Then I see "12" as a result

  Scenario: Subtraction
    When I subtract "12"
    Then I see "-12" as a result

  Scenario: Division
    When I divide by "2"
    Then I see "0" as a result

  Scenario: Multiply
    When I multiply by "2"
    Then I see "0" as a result
