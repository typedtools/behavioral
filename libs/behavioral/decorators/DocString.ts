import { createParamDecorator, ExecutionContext } from '../helpers/ParamInjector';

export const DocString = (): ParameterDecorator => createParamDecorator((context: ExecutionContext) => (
  context.step.docString?.content
));
