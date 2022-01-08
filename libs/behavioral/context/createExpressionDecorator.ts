import { Type } from '../context/Type';

export const createExpressionDecorator = (expression: string, type: 'given' | 'when' | 'then'): MethodDecorator => (
  (target: any, propertyKey: string | symbol) => {
    const context = target.constructor as Type<any>;
    const expressions = context.expressions = context.expressions ?? {
      given: [],
      when: [],
      then: []
    };
    const regExp = new RegExp(`^${expression.replace(/</gi, '(?<').replace(/>/gi, '>.*)')}$`);

    expressions[type].push({
      key: propertyKey,
      value: expression
    });
  }
)