import { Type } from '../types';

export class Injector {
  private store: Map<Type<any>, any> = new Map();

  get<T = any>(Ctor: Type<T>, isSingleton = false): T {
    let instance = isSingleton ? this.store.get(Ctor) : undefined;

    if (!instance) {
      const Deps = Reflect.getMetadata('design:paramtypes', Ctor) ?? [];
      instance = new Ctor(...Deps.map((Dep: Type<any>) => this.get(Dep, true)));

      if (isSingleton) {
        this.store.set(Ctor, instance);
      }
    }

    return instance;
  }

  all(): any[] {
    return Array.from(this.store.values());
  }
}
