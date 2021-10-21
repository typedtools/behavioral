import { Step } from '../models/Step';
import { StepArgument } from './Step';

export const DataTable = (): ParameterDecorator => StepArgument((step: Step) => {
  return step.dataTable?.rows.map(row => row.value);
});
