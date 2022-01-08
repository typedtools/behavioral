import { createParamDecorator } from './createParamDecorator';
import { Parameter } from './Type';

export const Param = (name: string, config?: Omit<Parameter, 'fn'>): ParameterDecorator => createParamDecorator({
  fn: context => (
    context.params[name]
  ),
  ...config
});
