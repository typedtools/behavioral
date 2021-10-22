import { registerRuntime } from '@typedtools/behavioral';
import { lastValueFrom } from 'rxjs';
import {
  Children,
  Gherkin,
  Scenario,
  Background,
} from '@typedtools/behavioral/models';

registerRuntime((gherkin: Gherkin): void => {
  describe(gherkin.feature.name, () => {
    gherkin.feature.children.forEach((child: Children) => {
      if (child instanceof Background) {
        beforeEach(() => lastValueFrom(child.execute()));
      } else if (child instanceof Scenario) {
        const testFn = child.isSkipped() ? test.skip : test;

        testFn(child.name, () => lastValueFrom(child.execute()));
      }
    });
  });
});
