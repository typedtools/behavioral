import { createParamDecorator, ExecutionContext } from '../helpers/ParamInjector';

export const Param = (name: string): ParameterDecorator => createParamDecorator((context: ExecutionContext) => (
  context.params[name]
));
