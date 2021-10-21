import { Parser, AstBuilder, GherkinClassicTokenMatcher } from '@cucumber/gherkin';
import { v4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { Gherkin } from '..';

export const parser = (value: TemplateStringsArray): Gherkin => {
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

  return plainToClass(Gherkin, {
    ...ast,
    raw,
  }, { strategy: 'excludeAll' });
}
