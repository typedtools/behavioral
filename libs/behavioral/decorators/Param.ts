import { Step } from '../models/Step';
import { StepArgument } from './Step';

export const Param = (name: string): ParameterDecorator => StepArgument((step: Step) => {
  return step.params[name];
});
