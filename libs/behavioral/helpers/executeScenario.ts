import { concatMap, from, lastValueFrom, Observable, of } from 'rxjs';
import { Background, Feature, Scenario, Step, Tag } from '../models';
import { Async, StateLifecycle } from '../types';
import { Injector } from './Injector';
import { matchStep } from './matchStep';
import { ParamInjector } from './ParamInjector';
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

  const states = injector.all();

  const backgroundSteps: Step[] = parent.backgrounds.reduce(
    (acc: Step[], background: Background) => {
      acc.push(...background.steps);

      return acc;
    }, [] as Step[]
  );
  const getExecutionFnForStep = (step: Step) => {
    const [handler, method, params] = matchStep(step, handlers);

    return () => handler[method](...ParamInjector.get(handler, method).map(fn => fn({
      step,
      params,
    })));
  }

  const beforeScenarioHooks: Array<() => Async> = [];
  const afterScenarioHooks: Array<() => Async> = [];
  const afterBackgroundHooks: Array<() => Async> = [];
  const backgroundExecution: Array<() => Async> = backgroundSteps.map(getExecutionFnForStep);
  const testExecution: Array<() => Async> = scenario.steps.map(getExecutionFnForStep);

  states.forEach((state: StateLifecycle) => {
    if (state.beforeScenario) {
      beforeScenarioHooks.push(() => (state as Required<StateLifecycle>).beforeScenario());
    }

    if (state.afterScenario) {
      afterScenarioHooks.push(() => (state as Required<StateLifecycle>).afterScenario());
    }

    if (state.afterBackground) {
      afterBackgroundHooks.push(() => (state as Required<StateLifecycle>).afterBackground());
    }
  });

  const source$ = of(
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
