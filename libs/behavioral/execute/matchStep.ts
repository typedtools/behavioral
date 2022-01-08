import { plainToClass } from 'class-transformer';
import { Step } from '../parser/model';
import { AnyConstructor, Expression } from '../context/Type';

export const convertToType = (target: any, type: () => AnyConstructor): any => {
  const Type = type();

  if (Type instanceof Array) {
    return target.map((value: any) => plainToClass(Type[0], value));
  } else {
    return plainToClass(Type, target);
  }
}

export const matchStep = (step: Step, contexts: any[]): [any, string | symbol, any] => {
  let result: [any, string | symbol, any] | undefined;

  contexts.forEach(context => {
    context.constructor.expressions[step.type].forEach((expression: Expression) => {
      const regex = new RegExp(`^${expression.value.replace(/</gi, '(?<').replace(/>/gi, '>.*)')}$`);
      const match: any = regex.exec(step.text);

      if (match !== null) {
        result = [context, expression.key, Object.values(context.constructor.parameters?.[expression.key] ?? {}).map(({ fn, type }: any) => (
          convertToType(fn({
            step,
            params: match.groups,
          }), type)
        ))];
      }
    });
  });

  if (!result) throw new Error('Missing step definition');

  return result;
}