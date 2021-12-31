import { Async } from './Async';

export interface FeatureLifecycle {
  beforeScenario?(): Async;
  afterBackground?(): Async;
  afterScenario?(): Async;
}
