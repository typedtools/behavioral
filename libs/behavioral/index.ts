export * from './decorators/DocString';
export * from './decorators/DocTable';
export * from './decorators/Given';
export * from './decorators/Param';
export * from './decorators/Specification';
export * from './decorators/Then';
export * from './decorators/When';
export * from './decorators/State';
export * from './decorators/Inject';
export * from './decorators/State';

export interface Type<T> {
  new (...args: any): T;
}

export class Runtime {
  private declarations: Type<any>[] = [];

  use(declarations: Type<any>[]): this {
    this.declarations = declarations;

    return this;
  }

  run(): void {

  }
}

export const gherkin = (value: TemplateStringsArray) => {
  return new Runtime();
}
