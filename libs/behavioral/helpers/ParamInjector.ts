import { plainToClass } from 'class-transformer';
import { Step } from '../models';

export interface ExecutionContext {
    step: Step;
    params: any;
}

export interface ParamInjectFn<T = any> {
    (context: ExecutionContext): T;
}

export interface ParamDecoratorOptions {
    type?: () => new (...args: any) => any | [new (...args: any) => any]
}

export class ParamInjector {
    private static store: Map<string, { [key: number]: ParamInjectFn }> = new Map();

    static add(target: any, propertyKey: string | symbol, parameterIndex: number, fn: ParamInjectFn): void {
        const params: any = this.store.get(this.getKey(target, propertyKey)) ?? {};

        params[parameterIndex] = fn;

        this.store.set(this.getKey(target, propertyKey), params);
    }

    static get(target: any, propertyKey: string): ParamInjectFn[] {
        return Object.values(this.store.get(this.getKey(target, propertyKey)) as { [key: number]: ParamInjectFn });
    }

    private static getKey(target: any, propertyKey: string | symbol): string {
        return [target.constructor.name, propertyKey].join('.')
    }
}

// eslint-disable-next-line
export const createParamDecorator = (fn: ParamInjectFn, options?: ParamDecoratorOptions): ParameterDecorator => (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number,
) => {
    const Type = Reflect.getMetadata('design:paramtypes', target, propertyKey)[parameterIndex];

    ParamInjector.add(
        target,
        propertyKey,
        parameterIndex,
        (context: ExecutionContext) => {
           return plainToClass(Type, fn(context));
        }
    );
}
