import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import { concatMap, from, Observable, of } from 'rxjs';
import { Background } from '.';
import { STEP_META_KEY } from '../decorators';
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
  @Transform(({ obj, key }) => {
    let prevKeyword: string;
    const matchers: any[] = obj.handlers.reduce(
      (matchers: any[], handler: any) => {
        const nextMatchers = Reflect.getMetadata(STEP_META_KEY, handler);

        matchers.push(...nextMatchers.map((matcher: any) => ({
          ...matcher,
          class: handler,
        })));

        return matchers;
      },
      [],
    );
    
    return obj[key].map((step: any) => {
      let result: any = {...step};
      const keyword = step.keyword.toLowerCase().trim();

      if (['and', '*'].includes(keyword)) {
        result.keyword = prevKeyword;
      } else {
        prevKeyword = keyword;
        result.keyword = keyword;
      }

      matchers.forEach((matcher: any) => {
        matcher.expressions.forEach((expression: any) => {
          if (expression.type === keyword) {
            const regex = new RegExp(`^${expression.text.replace(/</gi, '(?<').replace(/>/gi, '>\\w+)')}$`);
            const match: any = regex.exec(step.text);

            if (match !== null) {
              result.params = {...match.groups};
              result.method = matcher.method;
              result.class = matcher.class;
              result.options = matcher.options;
              result.arguments = matcher.arguments;
            }
          }
        });
      });

      return plainToClass(Step, result, { strategy: 'excludeAll' });
    });
  })
  steps!: Step[];

  @Expose()
  handlers!: Constructor<any>;

  @Expose()
  backgrounds?: Background[];

  isSkipped(): boolean {
    return this.tags?.find(tag => tag.name === '@skip') ? true : false;
  }

  execute(): Observable<void> {
    let states = new Map<any, any>();
    let handlers = new Map<any, any>();

    return of(...this.steps).pipe(
      concatMap((step: Step) => {
        let handler: any;

        if (!handlers.has(step.class)) {
          const States = Reflect.getMetadata('design:paramtypes', step.class);

          handler = new step.class(...States.map((State: any) => {
            let state: any;
  
            if (!states.has(State)) {
              state = new State();
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
      })
    );
  }
}
