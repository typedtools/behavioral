import { Type } from './Type';

export const State = (): PropertyDecorator => (
  (target: any, propertyKey: string | symbol) => {
    const context = target.constructor as Type<any>;
    const states = context.injections = context.injections ?? {};

    states[propertyKey] = {
      type: () => Reflect.getMetadata('design:type', target, propertyKey),
    }
  }
)
