import { StepOption } from './Step';

export const Timeout = (ms: number): MethodDecorator => StepOption<number>({
  name: 'timeout',
  value: ms,
});
