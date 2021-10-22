import { Parser, AstBuilder, GherkinClassicTokenMatcher } from '@cucumber/gherkin';
import { v4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { Gherkin } from './models';

export interface ExecutionRuntimeFunction {
  (gherkin: Gherkin): void
}

let executionRuntimeFn: ExecutionRuntimeFunction | undefined;

export const registerRuntime = (runtimeFn: ExecutionRuntimeFunction): void => {
  executionRuntimeFn = runtimeFn;
};

export const gherkin = (value: TemplateStringsArray, ...interpolations: any[]): Gherkin => {
  let ast: any;
  let raw: string = value.join('');

  try {
    const builder = new AstBuilder(v4);

    ast = new Parser(
      builder, 
      new GherkinClassicTokenMatcher()
    ).parse(raw);
  } catch (err) {
    console.log(err);
  }

  const parsedGherkin = plainToClass(Gherkin, {
    ...ast,
    raw,
    interpolations,
  }, { strategy: 'excludeAll' });

  if (executionRuntimeFn) {
    executionRuntimeFn(parsedGherkin);
  }

  return parsedGherkin;
}
