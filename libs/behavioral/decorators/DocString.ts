import { Step } from '../models/Step';
import { StepArgument } from './Step';

export const DocString = (): ParameterDecorator => StepArgument((step: Step) => {
  return step.docString?.content;
});
