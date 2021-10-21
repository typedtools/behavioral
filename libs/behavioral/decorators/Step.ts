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

export interface StepMatcher {
  type: StepType;
  expression: string;
}

export interface StepHandler {
  method: string | symbol;
  matchers: StepMatcher[];
  arguments: StepArgument[];
  options: StepMatcherOption[];
}

export const Step = (stepMatcher: StepMatcher): MethodDecorator => (
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const handlers: StepHandler[] = Reflect.getOwnMetadata(STEP_META_KEY, target.constructor) ?? [];
  const handler: StepHandler | undefined = handlers.find(handler => handler.method === propertyKey);

  if (handler) {
    handler.matchers.push(stepMatcher);
  } else {
    handlers.push({
      method: propertyKey,
      matchers: [stepMatcher],
      options: [],
      arguments: [],
    });
  }

  Reflect.defineMetadata(STEP_META_KEY, handlers, target.constructor);
}

export const StepOption = <T>(option: StepMatcherOption<T>): MethodDecorator => (
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const handlers: StepHandler[] = Reflect.getOwnMetadata(STEP_META_KEY, target.constructor) ?? [];
  const handler: StepHandler | undefined = handlers.find(handler => handler.method === propertyKey);

  if (handler) {
    handler.options.push(option);
  } else {
    handlers.push({
      method: propertyKey,
      matchers: [],
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
  const handlers: StepHandler[] = Reflect.getOwnMetadata(STEP_META_KEY, target.constructor) ?? [];
  const handler: StepHandler | undefined = handlers.find(handler => handler.method === propertyKey);
  const option = { fn, index: parameterIndex };

  if (handler) {
    handler.arguments.push(option);
  } else {
    handlers.push({
      method: propertyKey,
      matchers: [],
      options: [],
      arguments: [option],
    });
  }

  Reflect.defineMetadata(STEP_META_KEY, handlers, target.constructor);
}
