import { StepType } from '../models/Step';
import { Step } from './Step';

export const Then = (text: string): MethodDecorator => Step({
  type: StepType.THEN,
  text,
});
