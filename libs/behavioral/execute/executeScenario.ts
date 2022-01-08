import { concatMap, from, lastValueFrom, Observable, of } from 'rxjs';
import { Background, Feature, Scenario, Step, Tag } from '../parser/model';
import { Async } from '../context/Type';
import { AnyConstructor, Type } from '../context/Type';
import { matchStep } from './matchStep';
import { Registry } from './Registry';

export const executeScenario = (scenario: Scenario, parent: Feature): Promise<void> => {
  const contexts: InstanceType<Type<any>>[] = [...parent.tags, ...scenario.tags]
    .filter((tag: Tag) => (
      tag.name === 'bind'
    ))
    .map<any>((tag: Tag) => (
      new (Registry.get(tag.arguments[0]))
    ));

  const backgroundSteps: Step[] = parent.backgrounds.reduce(
    (acc: Step[], background: Background) => {
      acc.push(...background.steps);

      return acc;
    }, [] as Step[]
  );
  const getExecutionFnForStep = (step: Step) => {
    const [context, method, parameters] = matchStep(step, contexts);

    return () => context[method](...parameters);
  }
  let states: Map<AnyConstructor, any>;

  const backgroundExecution: Array<() => Async> = backgroundSteps.map(getExecutionFnForStep);
  const testExecution: Array<() => Async> = scenario.steps.map(getExecutionFnForStep);

  const injectStates = () => {
    states = new Map<AnyConstructor, any>();

    contexts.forEach(context => {
      if (!context.constructor.injections) return;

      Object.entries(context.constructor.injections)
        .map(([key, config]: any) => {
          const Ctr = config.type(); 
          const state = states.get(Ctr) ?? new Ctr();

          context[key] = state;

          states.set(Ctr, state);
        });
    })
  }

  const executeStateHook = (name: string): () => Async => {
    return () => {
      const jobs = [];

      for (const state of states.values()) {
        if (state[name]) {
          const result = state[name]();

          if (result instanceof Observable) {
            jobs.push(lastValueFrom(result));
          } else {
            jobs.push(result);
          }

          jobs.push(result instanceof Observable ? lastValueFrom(result) : result);
        }
      }

      // eslint-disable-next-line
      return Promise.all(jobs).then(() => {});
    }
  }

  const source$ = of(
    injectStates,
    executeStateHook('beforeScenario'),
    ...backgroundExecution,
    executeStateHook('afterBackground'),
    ...testExecution,
    executeStateHook('afterScenario'),
  )
    .pipe(
      concatMap((fn: () => Async) => {
        const result = fn();

        return result instanceof Promise || result instanceof Observable ? from(result) : of(result);
      })
    )

  return lastValueFrom(source$);
}
