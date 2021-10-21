import { Children, Gherkin, Scenario, Type } from '@typedtools/behavioral';
import { Background } from '@typedtools/behavioral/models/Background';

export const execute = (gherkin: Gherkin, definitions: Type<any>[]): void => {
  // console.log(JSON.stringify(gherkin, undefined, 2));
  definitions.forEach(def => {
    console.log(Reflect.getOwnMetadata('behavioral:step', def));
  });

  console.log(definitions);

  describe(gherkin.feature.name, () => {
    gherkin.feature.children.forEach((child: Children) => {
      if (child instanceof Background) {
        beforeEach(() => {
          // child.steps
        });
      } else if (child instanceof Scenario) {
        const testFn = child.tags.find(tag => tag.name === '@skip') ? test.skip : test;

        testFn(child.name, () => {
          
        });
      }
    });
  });
}
