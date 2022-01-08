import { AnyConstructor } from '../context/Type';

export class Registry {
  private static store: Map<string, AnyConstructor> = new Map();

  static add(key: string, Value: AnyConstructor): void {
    this.store.set(key, Value);
  }

  static get(key: string): AnyConstructor {
    return this.store.get(key) as AnyConstructor;
  }
}