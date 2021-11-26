import { parse } from '@typedtools/behavioral';

export default {
  process(raw: any, filename: string): string {
    const gherkin = parse(raw, filename);

    const exports = raw
      .split(/@[a-zA-Z]+\((.*)\)/gi)
      .filter((_: string, idx: number) => idx % 2)
      .map((interpolation: string) => {
        let filename, exportAs;

        if (interpolation.indexOf(':') > -1) {
          [filename, exportAs] = interpolation.split(':');
        } else {
          filename = interpolation;
          exportAs = 'default';
        }

        return {
          filename,
          exportAs,
        };
      });

    return `
      const { parse } = require('@typedtools/behavioral');
      const { Registry, isSkipped, executeScenario } = require('@typedtools/behavioral/helpers');

      ${exports.reduce((acc: string, exp: any) => acc + `Registry.add('${exp.filename}:${exp.exportAs}', require('${exp.filename}').${exp.exportAs});`, '')}

      const gherkin = ${JSON.stringify(gherkin)};

      describe(gherkin.feature.name, () => {
        gherkin.feature.scenarios.forEach((scenario) => {
          const testFn = isSkipped(scenario, gherkin.feature) ? test.skip : test;

          testFn(scenario.name, () => executeScenario(scenario, gherkin.feature));
        });
      });
    `;
  }
}
