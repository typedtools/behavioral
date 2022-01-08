import { createExpressionDecorator } from './createExpressionDecorator';

export const When = (text: string): MethodDecorator => createExpressionDecorator(text, 'when');