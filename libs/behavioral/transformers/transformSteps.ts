import { plainToClass } from 'class-transformer';
import { STEP_META_KEY } from '../decorators';
import { MissingHandlerError } from '../errors';
import { Step } from '../models';

export const transformSteps = ({ obj, key }: any): Step[] => {
  let prevKeyword: string;

  const matchers: any[] = obj.handlers.reduce(
    (matchers: any[], handler: any) => {
      const nextMatchers = Reflect.getMetadata(STEP_META_KEY, handler);

      matchers.push(...nextMatchers.map((matcher: any) => ({
        ...matcher,
        class: handler,
      })));

      return matchers;
    },
    [],
  );

  return obj[key].map((step: any) => {
    let result: any = {...step};
    const keyword = step.keyword.toLowerCase().trim();

    if (['and', '*'].includes(keyword)) {
      result.keyword = prevKeyword;
    } else {
      prevKeyword = keyword;
      result.keyword = keyword;
    }

    matchers.forEach((matcher: any) => {
      matcher.expressions.forEach((expression: any) => {
        if (expression.type === keyword) {
          const regex = new RegExp(`^${expression.text.replace(/</gi, '(?<').replace(/>/gi, '>.*)')}$`);
          const match: any = regex.exec(step.text);

          if (match !== null) {
            result.params = {...match.groups};
            result.method = matcher.method;
            result.class = matcher.class;
            result.options = matcher.options;
            result.arguments = matcher.arguments;
          }
        }
      });
    });

    if (!result.class) {
      throw new MissingHandlerError(step);
    }

    return plainToClass(Step, result, { strategy: 'excludeAll' });
  });
}