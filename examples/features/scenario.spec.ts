import 'reflect-metadata';
/* Place in jest configuration: start */
import '@typedtools/behavioral-jest';
import { gherkin } from '@typedtools/behavioral';
import { BasicCalculatorHandler } from './handlers/BasicCalculatorHandler';

gherkin`
@use(${BasicCalculatorHandler})
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
`
