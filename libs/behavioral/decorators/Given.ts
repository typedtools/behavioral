import { StepType } from '../models/Step';
import { Step } from './Step';

export const Given = (stepMatch: string): MethodDecorator => Step({
  type: StepType.GIVEN,
  expression: stepMatch,
});
