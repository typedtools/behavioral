import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import { Scenario } from './Scenario';
import { Location } from './Location';
import { Background } from './Background';

const transformScenarioOutline = (astScenario: any, handlers: any[], backgrounds: Background[]): Scenario[] => {
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
          handlers,
          backgrounds,
        }, { strategy: 'excludeAll' });
    }));

    return scenarios;
  }, []);
}

export class Feature {
  @Expose()
  name!: string;

  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  @Transform(({ obj }) => {
    let backgrounds: Background[] = [];

    return obj.children.reduce((acc: Scenario[], child: any) => {
      if (child.background) {
        backgrounds.push(plainToClass(Background, child.background, { strategy: 'excludeAll' }));
      }

      if (child.scenario) {
        switch (child.scenario?.keyword.trim()) {
          case 'Scenario Outline':
            acc.push(...transformScenarioOutline(
              {
                ...child.scenario,
                tags: [...obj.tags, ...child.scenario.tags],
              },
              obj.handlers,
              backgrounds,
            ));
            break;
          case 'Scenario':
            acc.push(plainToClass(Scenario, {
              ...child.scenario,
              tags: [...obj.tags, ...child.scenario.tags],
              handlers: obj.handlers,
              backgrounds,
            }, { strategy: 'excludeAll' }));
            break;
          default:
            break;
        }
      }

      return acc;
    }, [] as Scenario[]);
  })
  scenarios!: Scenario[];
}
