/* eslint-disable */
import 'reflect-metadata';
import {
  Context,
  DataTable,
  Given,
  Param,
  DocString,
  State,
  Then,
  When
} from '../context';

interface DataTableItem {
  key: string
  value: string
}

interface JSONObject {

}

class Item {
  key!: string;

  value!: number;
}

class TestState {}

@Context()
class TestContext {
  @State()
  state!: TestState;

  @Given('I get data table for interface type:')
  getDataTableForInterface(@DataTable() data: DataTableItem[]): void {

  }

  @Given('I get data table for class type:')
  getDataTableForClass(@DataTable({ type: () => [Item]}) data: Item[]): void {

  }

  @Given('I get parameters "<num1>" and "<string1>"')
  getParameters(@Param('num1') num1: number, @Param('string1') string1: string): void {

  }

  @Given('I get large string:')
  getDocString(@DocString() content: string): void {

  }

  @Given('I get object:')
  getJSONObject(@DocString() obj: JSONObject): void {

  }

  @When('I change "<variable>" value')
  changeValue(@Param('variable') variable: string): void {

  }

  @Then('I see "<variable>" value')
  seeValue(@Param('variable') variable: string): void {
    
  }
}

describe('context class', () => {
  test('should be decorated with properties metadata', () => {
    expect(TestContext).toEqual(expect.objectContaining({
      parameters: {
        getDataTableForInterface: {
          '0': expect.objectContaining({
            fn: expect.any(Function),
            type: expect.any(Function)
          })
        },
        getDataTableForClass: {
          '0': expect.objectContaining({
            fn: expect.any(Function),
            type: expect.any(Function)
          })
        },
        getParameters: {
          '0': expect.objectContaining({
            fn: expect.any(Function),
            type: expect.any(Function)
          }),
          '1': expect.objectContaining({
            fn: expect.any(Function),
            type: expect.any(Function)
          })
        },
        getDocString: {
          '0': expect.objectContaining({
            fn: expect.any(Function),
            type: expect.any(Function)
          })
        },
        getJSONObject: {
          '0': expect.objectContaining({
            fn: expect.any(Function),
            type: expect.any(Function)
          })
        },
        changeValue: {
          '0': expect.objectContaining({
            fn: expect.any(Function),
            type: expect.any(Function)
          })
        },
        seeValue: {
          '0': expect.objectContaining({
            fn: expect.any(Function),
            type: expect.any(Function)
          })
        }
      }
    }));
  });

  test('should be decorated with expression metadata', () => {
    expect(TestContext).toEqual(expect.objectContaining({
      expressions: {
        given: [
          {
            key: 'getDataTableForInterface',
            value: 'I get data table for interface type:'
          },
          {
            key: 'getDataTableForClass',
            value: 'I get data table for class type:'
          },
          {
            key: 'getParameters',
            value: 'I get parameters "<num1>" and "<string1>"'
          },
          {
            key: 'getDocString',
            value: 'I get large string:'
          },
          {
            key: 'getJSONObject',
            value: 'I get object:'
          }
        ],
        when: [
          {
            key: 'changeValue',
            value: 'I change "<variable>" value'
          }
        ],
        then: [
          {
            key: 'seeValue',
            value: 'I see "<variable>" value'
          }
        ]
      }
    }))
  });

  test('should be decorated with injections metadata', () => {
    expect(TestContext).toEqual(expect.objectContaining({
      injections: {
        state: {
          type: expect.any(Function)
        }
      }
    }));
    expect((TestContext as any).injections.state.type()).toBe(TestState);
  });
});
