import { Async } from './Async';

export interface StateLifecycle {
  beforeScenario?(): Async;
  afterBackground?(): Async;
  afterScenario?(): Async;
}
