import { createParamDecorator } from './createParamDecorator';
import { Parameter } from './Type';

export const DocString = (config?: Omit<Parameter, 'fn'>): ParameterDecorator => createParamDecorator({
  fn: context => (
    context.step.docString?.content
  ),
  ...config
});
