import { StepType } from '../models/Step';
import { Step } from './Step';

export const When = (text: string): MethodDecorator => Step({
  type: StepType.WHEN,
  text,
});
