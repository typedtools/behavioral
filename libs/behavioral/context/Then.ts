import { createExpressionDecorator } from './createExpressionDecorator';

export const Then = (text: string): MethodDecorator => createExpressionDecorator(text, 'then');
