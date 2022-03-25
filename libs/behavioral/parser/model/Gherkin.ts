import { Expose, Transform, plainToClass } from 'class-transformer';
import { Background } from './Background';
import { Scenario } from './Scenario';
import { Feature } from './Feature';

const transformScenarioOutline = (astScenario: any): Scenario[] => {
  return astScenario.examples.reduce((scenarios: Scenario[], example: any) => {
    scenarios.push(...example.tableBody.map((row: any, i: number) => {
        const data = row.cells.reduce((data: any, cell: any, j: number) => {
          data[example.tableHeader.cells[j].value] = cell.value;

          return data;
        }, {});

        return plainToClass(Scenario, {
          ...astScenario,
          name: `${astScenario.name} #${i + 1}`,
          steps: astScenario.steps.map((step: any) => ({
            ...step,
            text: Object.entries(data).reduce((text: string, [key, value]: any) => {
              return text.replace(`<${key}>`, value);
            }, step.text),
          })),
        }, { strategy: 'excludeAll' });
    }));

    return scenarios;
  }, []);
}

export class Gherkin {
  @Expose()
  @Transform(({ obj, key }: any) => {
    const backgrounds: Background[] = [];
    const scenarios: Scenario[] = [];

    obj[key].children.forEach((child: any) => {
      if (child.background) {
        backgrounds.push(plainToClass(Background, child.background, { strategy: 'excludeAll' }));
      }

      if (child.scenario) {
        switch (child.scenario.keyword.trim()) {
          case 'Scenario Outline':
            scenarios.push(...transformScenarioOutline(child.scenario));
            break;
          case 'Scenario':
            scenarios.push(plainToClass(Scenario, child.scenario, { strategy: 'excludeAll' }));
            break;
        }
      }
    });

    return plainToClass(Feature, {
      ...obj[key],
      backgrounds,
      scenarios,
    }, { strategy: 'excludeAll' });
  })
  feature!: Feature;
}
