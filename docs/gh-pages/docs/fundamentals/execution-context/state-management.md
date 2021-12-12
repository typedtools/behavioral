---
sidebar_position: 3
---

# State Management

Almost always tests require state management. State can be stored in memory (variable) or outside the process (e.g. file or database).

### In-Memory state

In Behavioral state is defined via state classes. Here's example state class:

```typescript
export interface Post {
  title: string;
  description: string;
}

export class BlogState {
  posts: Post[] = [];
}
```

To use state class in execution context declare property and decorate it with `State` decorator.

```typescript
import { State, Given, Then, Param } from '@typedtools/behavioral';

// ...

@ExecutionContext()
export class BlogContext {
  @State()
  state!: BlogState;

  @Given('I have posts:')
  getPosts(@DataTable() posts: Post[]): void {
    this.state.posts.push(...p)
  }

  @Then('I see "<amount>" posts')
  seeNumOfPosts(@Param('amount') amount: number): void {
    expect(this.state.posts.length).toBe(amount);
  }
}
```

:::caution
By default state is assigned before scenario starts with separate instance for every scenario.
:::

### Remote state

Remote state requires to be restored to it's initial value after every scenario. To avoid defining steps for setup or teardown Behavioral provides set of life-cycle methods. Life-cycle methods are defined in `FeatureLifecycle` interface.

```typescript
import type { FeatureLifecycle } from '@typedtools/behavioral';

export class BlogState implements FeatureLifecycle {
  posts: Post[] = [];

  afterScenario(): void {
    this.posts = [];
  }
}
```
