import { Parser, AstBuilder, GherkinClassicTokenMatcher } from '@cucumber/gherkin';
import { v4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { Feature, Gherkin } from '..';

// export const parseScenarioOutline = (): Scenario[] => {

// }

// export const parseScenario = (): Scenario => {
//   return new Scenario()
// }

export const parser = (value: TemplateStringsArray): Gherkin => {
  let ast: any;

  try {
    const builder = new AstBuilder(v4);

    ast = new Parser(builder, new GherkinClassicTokenMatcher()).parse(value.join(''))
  } catch (err) {

  }

  return plainToClass(Gherkin, ast);
}
