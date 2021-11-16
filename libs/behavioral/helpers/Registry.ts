import { Type } from '../types';

export class Registry {
  private static store: Map<string, Type<any>> = new Map();

  static add<T>(key: string, Value: Type<T>): void {
    this.store.set(key, Value);
  }

  static get<T>(key: string): Type<T> {
    return this.store.get(key) as Type<T>;
  }
}