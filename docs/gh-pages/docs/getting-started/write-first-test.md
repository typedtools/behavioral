---
sidebar_position: 2
---

# Write first test

In this short tutorial we will write test for following class using Behavioral.

```typescript
export enum Operator {
  ADD = '+',
  SUBTRACT = '-',
  DIVIDE = '/',
  MULTIPLY = '*',
}

export class Calculator {
  private _expression: (string | number)[] = [0];

  append(part: number | Operator): void {
    if (typeof part === 'number') {
      if (typeof this._expression[this._expression.length - 1] === 'number') {
        this._expression[this._expression.length - 1] = part;
      } else {
        this._expression.push(part);
      }
    } else {
      if (typeof this._expression[this._expression.length - 1] === 'string') {
        this._expression[this._expression.length - 1] = part;
      } else {
        this._expression.push(part);
      }
    }
  }

  reset(): void {
    this._expression = [];
  }

  get expression(): string {
    return this._expression.join(' ');
  }

  get result(): number {
    return eval(this.expression);
  }
}
```

It implements simple calculator. Behavioral requires to define class which will store state of a test.

```typescript
import { State } from '@typedtools/behavioral/decorators';
import { Calculator } from '../classes/Calculator';

@State()
export class CalculatorState {
  calculator = new Calculator();
}
```

Provided state class can be injected to handler class. Handlers are classes used to define implementation for gherkin steps. Below is example handler created for `Calculator` class.

```typescript
import { Given, Handler, Param, Then, When } from '@typedtools/behavioral/decorators';
import { Operator } from '../classes/Calculator';
import { CalculatorState } from '../states/CalculatorState';

@Handler()
export class BasicCalculatorHandler {
  /*
    State object is injected via constructor.
    There is only one instance of state class per scenario, 
    but each scenario has it's own instance of it.
  */
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
```

As you can see step is defined by wrapping handler class method with one of available decorators `Given`, `When` or `Then` and passing it's template as an argument.

You can define multiple steps on single handler method.

Now you are ready to write your first scenarios.

```typescript
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
```

Now we can run it with jest command.
