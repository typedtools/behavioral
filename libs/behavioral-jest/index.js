const { parse } = require('@typedtools/behavioral');

module.exports = {
  process(raw, filename) {
    const gherkin = parse(raw, filename);

    const exports = raw
      .split(/@[a-zA-Z]+\((.*)\)/gi)
      .filter((val, idx) => idx % 2)
      .map((interpolation) => {
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

      ${exports.reduce((acc, exp) => acc + `Registry.add('${exp.filename}:${exp.exportAs}', require('${exp.filename}').${exp.exportAs});`, '')}

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
