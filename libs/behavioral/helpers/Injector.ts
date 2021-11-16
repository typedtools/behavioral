import { Type } from '../types';

export class Injector {
  private store: Map<Type<any>, any> = new Map();

  get<T = any>(Ctor: Type<T>): T {
    let instance = this.store.get(Ctor);

    if (!instance) {
      const Deps = Reflect.getMetadata('design:paramtypes', Ctor) ?? [];
      instance = new Ctor(...Deps.map((Dep: Type<any>) => this.get(Dep)));

      this.store.set(Ctor, instance);
    }

    return instance;
  } 
}
