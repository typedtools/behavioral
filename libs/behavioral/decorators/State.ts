import { DecoratorTypes } from '../DecoratorTypes';

export const State = (): PropertyDecorator => (
  (target: any, propertyKey: string | symbol) => {
    const decorators = target.constructor.decorators = target.constructor.decorators ?? {};
    const propertyDecorators = decorators[propertyKey] = decorators[propertyKey] ?? [];
    const args = [() => Reflect.getMetadata('design:type', target, propertyKey)];

    propertyDecorators.push({ type: DecoratorTypes.STATE, args });
  }
)
