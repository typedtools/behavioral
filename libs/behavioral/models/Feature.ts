import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import { Scenario } from './Scenario';
import { Location } from './Location';
import { Background } from './Background';

export type Children = Scenario | Background;

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

export class Feature {
  @Expose()
  name!: string;

  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  @Transform(({ key, obj }) => {
    return obj[key].reduce((acc: Children[], child: any) => {
      if (child.scenario) {
        switch (child.scenario?.keyword) {
          case 'Scenario Outline':
            acc.push(...transformScenarioOutline(child.scenario));
            break;
          case 'Scenario':
            acc.push(plainToClass(Scenario, child.scenario, { strategy: 'excludeAll' }));
            break;
          default:
            break;
        }
      } else if (child.background) {
        acc.push(plainToClass(Background, child.background, { strategy: 'excludeAll' }));
      }

      return acc;
    }, [] as Children[]);
  })
  children!: Children[];
}
