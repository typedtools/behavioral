import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import { concatMap, from, Observable, of } from 'rxjs';
import { Background } from '.';
import { transformSteps } from '../transformers';
import { Async, Type as Constructor } from '../types';
import { Location } from './Location';
import { Step } from './Step';
import { Tag } from './Tag';

export class Scenario {
  @Expose()
  name!: string;

  @Expose()
  @Type(() => Tag)
  @Transform(({ obj, key }) => {
    return obj[key].map((val: any) => plainToClass(Tag, val, { strategy: 'excludeAll' }));
  })
  tags!: Tag[];

  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  @Transform(transformSteps)
  steps!: Step[];

  @Expose()
  handlers!: Constructor<any>;

  @Expose()
  backgrounds!: Background[];

  isSkipped(): boolean {
    return this.tags?.find(tag => tag.name === '@skip') ? true : false;
  }

  execute(): Observable<void> {
    let states = new Map<any, any>();
    let handlers = new Map<any, any>();
    const backgroundSteps: Step[] = this.backgrounds.reduce((acc: Step[], background: Background) => {
      acc.push(...background.steps);

      return acc;
    }, [] as Step[]);

    return of(...backgroundSteps, ...this.steps).pipe(
      concatMap((step: Step) => {
        let handler: any;

        if (!handlers.has(step.class)) {
          const States = Reflect.getMetadata('design:paramtypes', step.class);

          handler = new step.class(...States.map((State: any) => {
            let state: any;
  
            if (!states.has(State)) {
              state = new State();
              states.set(State, state);
            } else {
              state = states.get(State);
            }
  
            return state;
          }));

          handlers.set(step.class, handler);
        } else {
          handler = handlers.get(step.class);
        }

        const result = handler[step.method](...step.arguments.map(arg => arg.fn(step))) as Async;

        return result instanceof Promise || result instanceof Observable ? from(result) : of(result);
      }),
    );
  }
}
