import { Step } from '../models';

export class MissingHandlerError extends Error {
  constructor(step: Step) {
    super(`Missing handler for ${step.text}`);
  }
}
