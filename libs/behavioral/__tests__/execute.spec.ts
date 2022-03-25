import { map, Observable, of, tap } from 'rxjs';
import { Context, DataTable, DocString, executeScenario, Given, Param, parse, Registry, State, Then } from '..';

const Scenario = `
@bind(./context.ts:default)
Feature: param injection

  Scenario: inject param
    Given I have two params "1" and "2"
        * I have data table:
        | id | name     |
        | 1  | example1 |
        | 2  | example2 |
        * I have data table of type:
        | id | name     |
        | 1  | example1 |
        | 2  | example2 |
        * I have doc string:
        """
        very long string
        """
        * I have json string:
        """
        {
          "id": 1,
          "name": "example1"
        }
        """
     Then verify
`;

const ScenarioWithNotImplemented = `
@bind(./empty.ts:default)
Feature: example with empty context

  Scenario: _
    Given I have no implemented step
`;

class JSONObject {
  id!: number;
  name!: string;
}

class TestState {
  par1!: number;
  par2!: string;
  data!: { id: string, name: string }[];
  data2!: JSONObject[]
  content!: string;
  json!: JSONObject;
}

@Context()
class EmptyContext {}

@Context()
class TestContext {
  @State()
  state!: TestState

  @Given('I have two params "<par1>" and "<par2>"')
  getTwoParams(@Param('par1') par1: number, @Param('par2') par2: string): void {
    this.state.par1 = par1;
    this.state.par2 = par2;
  }

  @Given('I have data table:')
  async getDataTable(@DataTable() data: { id: string, name: string }[]): Promise<void> {
    return new Promise((resolve) => {
      this.state.data = data;
      resolve();
    });
  }

  @Given('I have data table of type:')
  async getDataTableOfType(@DataTable({ type: () => [JSONObject] }) data: JSONObject[]): Promise<void> {
    return new Promise((resolve) => {
      this.state.data2 = data;
      resolve();
    });
  }

  @Given('I have doc string:')
  getLongText(@DocString() content: string): void {
    this.state.content = content;
  }

  @Given('I have json string:')
  getJSONObject(@DocString() object: JSONObject): Observable<void> {
    return of(1).pipe(
      tap(() => this.state.json = object),
      map(() => undefined)
    );
  }

  @Then('verify')
  verify(): void {
    expect(this.state).toEqual({
      par1: 1,
      par2: '2',
      data: [
        {
          id: '1',
          name: 'example1'
        },
        {
          id: '2',
          name: 'example2'
        }
      ],
      data2: [
        {
          id: '1',
          name: 'example1'
        },
        {
          id: '2',
          name: 'example2'
        }
      ],
      content: 'very long string',
      json: {
        id: 1,
        name: 'example1'
      }
    })
  }
}

Registry.add('./context.ts:default', TestContext);

Registry.add('./empty.ts:default', EmptyContext);

describe('execute', () => {
  test('run scenario binded with context', async () => {
    const gherkin = parse(Scenario, 'example.feature');

    await executeScenario(gherkin.feature.scenarios[0], gherkin.feature);
  });

  test('run scenario with missing steps', async () => {
    const gherkin = parse(ScenarioWithNotImplemented, 'missing-step.feature');
    let error: Error | null;

    try {
      await executeScenario(gherkin.feature.scenarios[0], gherkin.feature);
      error = null;
    } catch (err: any) {
      error = err;
    }

    expect(error).not.toBeNull();
  });
});
