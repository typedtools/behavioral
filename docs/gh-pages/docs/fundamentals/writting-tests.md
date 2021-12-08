---
sidebar_position: 1
---

# Writting tests

Behavioral uses Gherkin syntax to describe test execution. Here's example:

```gherkin title="guess-the-word.feature"
Feature: Guess the word

  # The first example has two steps
  Scenario: Maker starts a game
    When the Maker starts a game
    Then the Maker waits for a Breaker to join

  # The second example has three steps
  Scenario: Breaker joins a game
    Given the Maker has started a game with the word "silky"
    When the Breaker joins the Maker's game
    Then the Breaker must guess a word with 5 characters
```

This code is equivalent of the one below:

```typescript
describe('Guess the word', () => {
  it('Maker starts a game', () => {
    // Here's step execution
  });

  it('Breaker joins a game', () => {
    // Here's step execution
  });
});
```

As we can see test is create for each scenario individually and group by the name of feature.

:::info
Behavioral is responsible for converting Gherkin syntax into test runner of your choice (e.g. [jest](https://jestjs.io/) or [karma](https://karma-runner.github.io/latest/index.html)).
:::

**Easy to read**

In behavioral test description is decoupled from it's execution. One of the reason behind it is that tests with mixed description and execution mostly are very hard to read. 

**AAA pattern**

In contrast to traditional JavaScript testing framework like jest, gherkin syntax is powered by [AAA pattern](https://docs.microsoft.com/en-us/visualstudio/test/unit-test-basics?view=vs-2022#write-your-tests), so each arrange, act and assert has his own description and each phase is clearly defined (given == arrange, when == act, then == assert).

```typescript
describe('Guess the word', () => {
  test('Breaker joins a game', () => {
    // the Maker has started a game with the word "silky" - Arrange
    startAGame('silky');

    // the Breaker joins the Maker's game - Act
    breakerJoins();

    // the Breaker must guess a word with 5 characters - Assert
    expect(getBreakerResult()).toBeLessThanOrEqual(5);
  });
});
```

**Sharing**

Each step definition can be easly reused in other tests without additional effort of extracting it.

## Tagging

Behavioral uses gherkin tags to add context to test execution. There is several ready to use built-in tags.

**@skip**

Setting it on feature level is equivalent of `describe.skip` (skipping whole file). When set on scenario level only tagged scenario is skipped.

**@use()**

Allows to pass execution context to tests. This tag requires path to the file containing [execution context class](./execution-context).

```gherkin
# Use context from ./path/to/ExecutionContext exported as ExecutionContext
@use(./path/to/ExecutionContext:ExecutionContext)
# Use context from ./path/to/ExecutionContext default export
@use(./path/to/ExecutionContext) 
```

It can be defined for feature or scenario. All context defined on feature level are inherited by scenarios.

:::info
For full gherkin reference read [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)
:::
