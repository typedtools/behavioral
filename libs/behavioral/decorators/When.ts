import { StepType } from '../models/Step';
import { Step } from './Step';

export const When = (stepMatch: string): MethodDecorator => Step({
  type: StepType.WHEN,
  expression: stepMatch,
});
