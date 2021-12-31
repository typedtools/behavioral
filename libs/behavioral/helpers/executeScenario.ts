import { concatMap, from, lastValueFrom, Observable, of } from 'rxjs';
import { DecoratorTypes } from '../DecoratorTypes';
import { Background, Feature, Scenario, Step, Tag } from '../models';
import { Async, FeatureLifecycle } from '../types';
import { matchStep } from './matchStep';
import { ParamInjector } from './ParamInjector';
import { Registry } from './Registry';

export const executeScenario = (scenario: Scenario, parent: Feature): Promise<void> => {
  const contexts: any[] = [...parent.tags, ...scenario.tags]
    .filter((tag: Tag) => (
      tag.name === 'bind'
    ))
    .map((tag: Tag) => (
      new (Registry.get(tag.arguments[0]))
    ));

  const backgroundSteps: Step[] = parent.backgrounds.reduce(
    (acc: Step[], background: Background) => {
      acc.push(...background.steps);

      return acc;
    }, [] as Step[]
  );
  const getExecutionFnForStep = (step: Step) => {
    const [context, method, params] = matchStep(step, contexts);

    return () => context[method](...ParamInjector.get(context, method).map(fn => fn({
      step,
      params,
    })));
  }

  const beforeScenarioHooks: Array<() => Async> = [];
  const afterScenarioHooks: Array<() => Async> = [];
  const afterBackgroundHooks: Array<() => Async> = [];
  const backgroundExecution: Array<() => Async> = backgroundSteps.map(getExecutionFnForStep);
  const testExecution: Array<() => Async> = scenario.steps.map(getExecutionFnForStep);

  contexts.forEach((context: FeatureLifecycle) => {
    if (context.beforeScenario) {
      beforeScenarioHooks.push(() => (context as Required<FeatureLifecycle>).beforeScenario());
    }

    if (context.afterScenario) {
      afterScenarioHooks.push(() => (context as Required<FeatureLifecycle>).afterScenario());
    }

    if (context.afterBackground) {
      afterBackgroundHooks.push(() => (context as Required<FeatureLifecycle>).afterBackground());
    }
  });

  const injectStates = () => {
    contexts.forEach(context => {
      Object.entries(context.constructor.decorators)
        .map(([key, decorators]: any) => [
          key, 
          decorators.find((decorator: any) => decorator.type === DecoratorTypes.STATE)
        ])
        .filter(([_, decorator]: any) => decorator !== undefined)
        .forEach(([key, decorator]: any) => {
          context[key] = new (decorator.args[0]());
        })
    })
  }

  const source$ = of(
    injectStates,
    ...beforeScenarioHooks,
    ...backgroundExecution,
    ...afterBackgroundHooks,
    ...testExecution,
    ...afterScenarioHooks
  )
    .pipe(
      concatMap((fn: () => Async) => {
        const result = fn();

        return result instanceof Promise || result instanceof Observable ? from(result) : of(result);
      })
    )

  return lastValueFrom(source$);
}
