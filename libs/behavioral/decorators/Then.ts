import { StepType } from '../models/Step';
import { Step } from './Step';

export const Then = (stepMatch: string): MethodDecorator => Step({
  type: StepType.THEN,
  expression: stepMatch,
});
