import { createExpressionDecorator } from './createExpressionDecorator';

export const Given = (text: string): MethodDecorator => createExpressionDecorator(text, 'given');
