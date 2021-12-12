---
sidebar_position: 2
---

# Accessing step arguments

Using parameters allow to make step sentences to be more reusable. To declare parameter in step sentence add it's name wrapped with acute brackets (e.g. `<name>`). Here's example:

```typescript
import { Given, Param } from '@typedtools/behavioral';

// ...

@Given('the Maker has started a game with the word "<word>"')
makerStartsAGame(@Param('word') word: string): void {}

// ...
```

:::tip
Wrapping parameters with quotes are highlighted by editor and it's easier to define what is a parameter in step sentence.
:::

:::info
Context execution method can return `void`, `Promise` or `Observable`. 
:::

### Premitive types

**Parameter value injected to step execution method will be converted to type provided in type annotation**. Here's a list of available types:

| Type    | Possible values      |
|---------|----------------------|
| string  | Any string           |
| boolean | false, true, off, on |
| number  | Any number           |

### Passing more complex types

To pass data that not fit in single line string or it's hard to convert it to string you can use `Doc String`, `Data Table` or `Dictionary`.

#### Doc String

Doc Strings allows to pass long strings as step parameter. To see how to pass Doc String in step see [Doc String Reference](https://cucumber.io/docs/gherkin/reference/). Here's an example of using Doc String in action:

```gherkin
Given I enter blog main page
Then I see following content:
  """markdown
  Blog
  ===============

  Recent blog posts:

  * [Most dangarous animals on planet](./most-dangerous-animals-on-planet)
  * [Fungies](./fungies)
  """
```

And to access Doc String passed with step use `DocString` decorator on step execution method argument:

```typescript
import { Then, DocString } from '@typedtools/behavioral';

// ...

@Then('I see following content:')
seeContent(@DocString() content: string): void {
  // Here's the assertion
}
```

:::tip
Using colon on end of step sentence is optional, but helps to mark requires of complex argument.
:::

When pass json object in doc string, behavioral will parse it into object. Here's an example:

```gherkin
Given I recieved following object:
  """json
  {
    "title": "Most dangarous animals on planet",
    "description": "Let's go through list of most dangarous animals..."
  }
  """
```

To recieve object or collection of objects annotate step execution argument with object or array type:

```typescript
import { Given, DocString } from '@typedtools/behavioral';

// ...

export interface Post {
  title: string;
  description: string;
}

// ...

@Given('I recieved following object:')
recieveObject(@DocString() post: Post): void {}
```

:::tip
Instead of creating type you can pass also `any` type.

Nevertheless providing interfaces ensure better documentation of possible values recieved in step and type safe validation on context execution side.
:::

:::danger
Behavioral do not provide validation of JSON structure only throw argument exception when provided string is not valid json.
:::

Doc String also allows to pass collection instead of single object. To achive it update json to pass collection:

```gherkin
"""json
[{
  "title": "Most dangarous animals on planet",
  "description": "Let's go through list of most dangarous animals..."
}]
"""
```

And change type adnotation:

```typescript
recieveObject(@DocString() posts: Post[]): void {}
```

#### Data Table

Data Table is different approach to pass collection as parameter for step. It represents collection in form of table:

```gherkin
Given I have posts:
  | title                             | description                                         |
  | Most dangarous animals on planet  | Let's go through list of most dangarous animals...  |
```

To access parameter use `DataTable` decorator on context execution method:

```typescript
import { Given, DataTable } from '@typedtools/behavioral';

// ...

export interface Post {
  title: string;
  description: string;
}

// ...

@Given('I have posts:')
getPosts(@DataTable() posts: Post[]): void {}
```

#### Converting param to class type

Instead of using interface you can pass class and behavioral will convert it to provided in type annotation. Here's an example:

```typescript
import { Given, DocString } from '@typedtools/behavioral';

// ...

export class Post {
  title!: string;
  description!: string;
}

// ...

@Given('I recieved following object:')
recieveObject(@DocString() post: Post): void {}
```

When using with collection `DocString` and `DataTable` requires providing type factory function:

```typescript
recieveObject(@DocString(() => [Post]) posts: Post[]): void {}
```

:::tip
Using class approach you don't need to define every field (only required without defined default).
:::
