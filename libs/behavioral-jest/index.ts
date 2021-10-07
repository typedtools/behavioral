import { Gherkin } from '@typedtools/behavioral';

export const execute = (gherkin: Gherkin) => {
  describe(gherkin.feature.name, () => {
    it('should pass', () => {
      expect(true).toBe(true);
    });
  });
}
