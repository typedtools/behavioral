import { Gherkin } from '@typedtools/behavioral';

export const Test = (gherkin: Gherkin): ClassDecorator => (
  target: any,
) => {
  console.log(JSON.stringify(gherkin, undefined, 2));

  describe(gherkin.feature.name, () => {
    it('should pass', () => {
      expect(true).toBe(true);
    });
  });
}
