import { createParamDecorator, ExecutionContext } from '../helpers/ParamInjector';

export const DataTable = (options?: any): ParameterDecorator => createParamDecorator((context: ExecutionContext) => (
  context.step.dataTable?.rows.map(row => row.value)
), options);
