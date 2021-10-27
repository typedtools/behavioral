import { registerRuntime } from '@typedtools/behavioral';
import { lastValueFrom } from 'rxjs';
import {
  Gherkin,
  Scenario,
} from '@typedtools/behavioral/models';

registerRuntime((gherkin: Gherkin): void => {
  describe(gherkin.feature.name, () => {
    gherkin.feature.scenarios.forEach((scenario: Scenario) => {
      const testFn = scenario.isSkipped() ? test.skip : test;

      testFn(scenario.name, () => lastValueFrom(scenario.execute()));
    });
  });
});
