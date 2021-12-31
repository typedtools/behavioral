---
sidebar_position: 1
---

# Introduction

Each step used in scenario require it's execution to be defined in context class. Execution context class needs to be decorated with `@Context()`. Take a look at the example below:

```gherkin title="guess-the-word.feature"
# Attach context to test
@bind(./guess-the-word.ts:GuessTheWordContext)
Feature: Guess the word

  # The second example has three steps
  Scenario: Breaker joins a game
    Given the Maker has started a game with the word "silky"
    When the Breaker joins the Maker's game
    Then the Breaker must guess a word with 5 characters
```

And That's how could execution context look like for test above:

```typescript title="guess-the-word.ts"
import { Context, Given, When, Then } from '@typedtools/behavioral';

@Context()
export class GuessTheWordContext {
  @Given('the Maker has started a game with the word "silky"')
  makerStartsAGame(): void {
    // here's step implementation
  }

  @When('the Breaker joins the Maker\'s game')
  breakerJoinsAGame(): void {
    // here's step implementation
  }

  @Then('the Breaker must guess a word with 5 characters')
  breakerGuessAWord(): void {
    // here's step implementation
  }
}
```

## Attaching step to execution

Behavioral uses method which decorator matches type (name of decorator Given, When or Then) and step sentence passed as first argument.

:::caution
**Exact match policy**

Step sentence needs to contain whole sentence not only part of it to be matched.
:::

One execution method can be used for multiple step sentences. To do this place decorator statement for each declared sentence.

```typescript
@When('the Breaker joins the Maker\'s game')
@When('the Breaker joining a game')
breakerJoinsAGame(): void {}
```