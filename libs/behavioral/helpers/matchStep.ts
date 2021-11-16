import { STEP_META_KEY } from '../decorators';
import { Step } from '../models';
import { Type } from '../types';

export const matchStep = (step: Step, handlers: any[]): [any, string, any[], any] => {
  let result: [Type<any>, string, any[], any] | undefined;

  const matchers: any[] = handlers.reduce(
    (matchers: any[], handler: any) => {
      const nextMatchers = Reflect.getMetadata(STEP_META_KEY, handler.constructor);

      matchers.push(...nextMatchers.map((matcher: any) => ({
        ...matcher,
        class: handler,
      })));

      return matchers;
    },
    [],
  );

  matchers.forEach((matcher: any) => {
    matcher.expressions.forEach((expression: any) => {
      if (expression.type === step.type) {
        const regex = new RegExp(`^${expression.text.replace(/</gi, '(?<').replace(/>/gi, '>.*)')}$`);
        const match: any = regex.exec(step.text);

        if (match !== null) {
          result = [matcher.class, matcher.method, matcher.arguments, match.groups];
        }
      }
    });
  });

  if (!result) throw new Error('Missing step definition');

  return result;
}