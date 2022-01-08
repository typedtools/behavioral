import { Observable } from 'rxjs';

export interface FeatureLifecycle {
  beforeScenario?(): Async;
  afterBackground?(): Async;
  afterScenario?(): Async;
}

export type Async<T = void> = T | Promise<T> | Observable<T>;

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface AnyConstructor {
  new (...args: any[]): any
}

export interface ContextTransformFn<Context> {
  (context: Context): any;
}

export interface Injection {
  type: () => AnyConstructor
}

export interface Expression {
  key: string | symbol
  value: string
}

export interface Parameter {
  fn: ContextTransformFn<any>
  type: () => AnyConstructor | [AnyConstructor]
}

export interface Type<T> {
  new (...args: any[]): T;
  injections?: { [key: string | symbol]: Injection };
  expressions?: { 
    given: Expression[],
    when: Expression[],
    then: Expression[]
  };
  parameters?: { [key: string | symbol]: { [key: number]: Parameter } };
}
