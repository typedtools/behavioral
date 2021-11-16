import { concatMap, from, lastValueFrom, Observable, of } from 'rxjs';
import { Background, Feature, Scenario, Step, Tag } from '../models';
import { Async } from '../types';
import { Injector } from './Injector';
import { matchStep } from './matchStep';
import { Registry } from './Registry';

export const executeScenario = (scenario: Scenario, parent: Feature): Promise<void> => {
  const injector = new Injector();
  const handlers: any[] = [...parent.tags, ...scenario.tags]
    .filter((tag: Tag) => (
      tag.name === 'use'
    ))
    .map((tag: Tag) => (
      injector.get(Registry.get(tag.arguments[0]))
    ));

  const backgroundSteps: Step[] = parent.backgrounds.reduce(
    (acc: Step[], background: Background) => {
      acc.push(...background.steps);

      return acc;
    }, [] as Step[]
  );
  const source$ = of(...backgroundSteps, ...scenario.steps).pipe(
    concatMap((step: Step) => {
      const [handler, method, args, params] = matchStep(step, handlers);

      const result = handler[method](...args.map(arg => arg.fn({
        step,
        params,
      }))) as Async;

      return result instanceof Promise || result instanceof Observable ? from(result) : of(result);
    }),
  );

  return lastValueFrom(source$);
}
