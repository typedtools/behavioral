import { createParamDecorator } from './createParamDecorator';
import { Parameter } from './Type';

export const DataTable = (config?: Omit<Parameter, 'fn'>): ParameterDecorator => createParamDecorator({
  fn: context => (
    context.step.dataTable?.rows.map((row: any) => row.value)
  ),
  ...config,
});
