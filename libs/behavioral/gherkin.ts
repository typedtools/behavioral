import { Parser, AstBuilder, GherkinClassicTokenMatcher } from '@cucumber/gherkin';
import { v4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { Gherkin } from './models';

export const parse = (template: string, filename: string, handlers: any | any[]): Gherkin => {
  let ast: any;

  try {
    const builder = new AstBuilder(v4);

    ast = new Parser(
      builder, 
      new GherkinClassicTokenMatcher()
    ).parse(template);
  } catch (err) {
    console.log(err);
  }

  const parsedGherkin = plainToClass(Gherkin, {
    ...ast,
    feature: {
      ...ast.feature,
      handlers: Array.isArray(handlers) ? handlers : [handlers],
    },
    template,
  }, { strategy: 'excludeAll' });

  return parsedGherkin;
}
