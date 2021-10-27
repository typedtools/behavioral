import { StepType } from '../models/Step';
import { Step } from './Step';

export const Given = (text: string): MethodDecorator => Step({
  type: StepType.GIVEN,
  text,
});
