---
sidebar_position: 1
---

# Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

Install Behavioral with dependencies all at once with following command:

<Tabs>
  <TabItem value="npm" label="NPM" default>
    <CodeBlock language="shell">
      npm install --save-dev reflect-metadata jest typescript ts-jest @types/jest @typedtools/behavioral @typedtools/behavioral-jest
    </CodeBlock>
  </TabItem>
  <TabItem value="yarn" label="Yarn">
    <CodeBlock language="shell">
      yarn add --dev reflect-metadata jest typescript ts-jest @types/jest @typedtools/behavioral @typedtools/behavioral-jest
    </CodeBlock>
  </TabItem>
  <TabItem value="pnpm" label="PNPM">
    <CodeBlock language="shell">
      pnpm add --save-dev reflect-metadata jest typescript ts-jest @types/jest @typedtools/behavioral @typedtools/behavioral-jest
    </CodeBlock>
  </TabItem>
</Tabs>

## Configure typescript

Behavioral uses decorators which are not turned on by default. Update your tsconfig.json file with the following options:

```
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

## Configure jest

Behavioral requires typescript which is not available in Jest by default. To add support for typescript configure [ts-jest](https://kulshekhar.github.io/ts-jest/) with the following command:

<Tabs>
  <TabItem value="npm" label="NPM" default>
    <CodeBlock language="shell">
      npx ts-jest config:init
    </CodeBlock>
  </TabItem>
  <TabItem value="yarn" label="Yarn">
    <CodeBlock language="shell">
      yarn ts-jest config:init
    </CodeBlock>
  </TabItem>
</Tabs>



This command will create `jest.config.js` in project root directory. Needs to be updated about setup file with following content:

<Tabs>
  <TabItem value="config" label="jest.config.js" default>
    <CodeBlock className="language-javascript" metastring="{5-10}">
      {`/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/*.feature", "**/*.{spec,test}.{ts,js}"],
  moduleFileExtensions: ['feature', 'js', 'mjs', 'ts'],
  transform: {
    "\\.feature$": "@typedtools/behavioral-jest"
  },
  setupFilesAfterEnv: ['<rootDir>/setup.ts'],
};
      `}
    </CodeBlock>
  </TabItem>
  <TabItem value="setup" label="setup.ts">
    <CodeBlock className="language-typescript">
      import 'reflect-metadata';
    </CodeBlock>
  </TabItem>
</Tabs>

And that's it you are ready to go 😄
