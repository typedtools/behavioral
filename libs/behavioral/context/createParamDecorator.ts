import { Type, Parameter, WithOptional } from './Type';

export const createParamDecorator = (config: WithOptional<Parameter, 'type'>): ParameterDecorator => (
  (target: any, propertyKey: symbol | string, parameterIndex: number) => {
    const context = target.constructor as Type<any>;
    const parametersMap = context.parameters = context.parameters ?? {};
    const parameters = parametersMap[propertyKey] = parametersMap[propertyKey] ?? {};

    parameters[parameterIndex] = {
      type: () => Reflect.getMetadata('design:paramtypes', target, propertyKey)[parameterIndex],
      ...config
    }
  }
)
