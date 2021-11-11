module.exports = {
  process(raw, filename) {
    const handlers = raw
      .split(/@[a-zA-Z]+\((.*)\)/gi)
      .filter((val, idx) => idx % 2)
      .map((interpolation) => {
        const [filename, name] = interpolation.split(':');

        return `require('${filename}').${name}`;
      }).join(',');

    return `
      const { parse } = require('@typedtools/behavioral');
      const { lastValueFrom } = require('rxjs');

      const gherkin = parse(\`${raw}\`, '${filename}', [${handlers}]);

      describe(gherkin.feature.name, () => {
        gherkin.feature.scenarios.forEach((scenario) => {
          const testFn = scenario.isSkipped() ? test.skip : test;

          testFn(scenario.name, () => lastValueFrom(scenario.execute()));
        });
      });
    `;
  }
}
