import { plainToClass } from 'class-transformer';
import { Step as Model, StepType } from '../models/Step';

export const STEP_META_KEY = 'behavioral:step';

export interface StepMatcherOption<T = any> {
  name: string;
  value: T;
}

export interface StepArgumentFunction {
  (step: Model): any;
}

export interface StepArgument {
  index: number;
  fn: StepArgumentFunction
}

export interface StepExpression {
  type: StepType;
  text: string;
}

export interface StepHandler {
  method: string | symbol;
  expressions: StepExpression[];
  arguments: StepArgument[];
  options: StepMatcherOption[];
}

export const Step = (expression: StepExpression): MethodDecorator => (
  target: any,
  propertyKey: string | symbol,
) => {
  const handlers: StepHandler[] = Reflect.getMetadata(STEP_META_KEY, target.constructor) ?? [];
  const handler: StepHandler | undefined = handlers.find(handler => handler.method === propertyKey);

  if (handler) {
    handler.expressions.push(expression);
  } else {
    handlers.push({
      method: propertyKey,
      expressions: [expression],
      options: [],
      arguments: [],
    });
  }

  Reflect.defineMetadata(STEP_META_KEY, handlers, target.constructor);
}

export const StepOption = <T>(option: StepMatcherOption<T>): MethodDecorator => (
  target: any,
  propertyKey: string | symbol
) => {
  const handlers: StepHandler[] = Reflect.getMetadata(STEP_META_KEY, target.constructor) ?? [];
  const handler: StepHandler | undefined = handlers.find(handler => handler.method === propertyKey);

  if (handler) {
    handler.options.push(option);
  } else {
    handlers.push({
      method: propertyKey,
      expressions: [],
      options: [option],
      arguments: [],
    });
  }

  Reflect.defineMetadata(STEP_META_KEY, handlers, target.constructor);
}

export const StepArgument = (fn: StepArgumentFunction): ParameterDecorator => (
  target: any,
  propertyKey: string | symbol,
  parameterIndex: number,
) => {
  const handlers: StepHandler[] = Reflect.getMetadata(STEP_META_KEY, target.constructor) ?? [];
  const handler: StepHandler | undefined = handlers.find(handler => handler.method === propertyKey);
  const option = { fn: (step: Model) => {
    const type = Reflect.getMetadata('design:paramtypes', target, propertyKey)[parameterIndex];

    return plainToClass(type, fn(step));
  }, index: parameterIndex };

  if (handler) {
    handler.arguments.push(option);
  } else {
    handlers.push({
      method: propertyKey,
      expressions: [],
      options: [],
      arguments: [option],
    });
  }

  Reflect.defineMetadata(STEP_META_KEY, handlers, target.constructor);
}
