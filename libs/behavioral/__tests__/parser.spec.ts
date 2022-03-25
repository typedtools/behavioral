import { parse } from '..';
import { StepType } from '../parser/model';

const SimpleScenario = `
Feature: Simple scenario example

  Scenario: Addition
    When I add "12"
    Then I see "12" as a result
`;

const ScenarioWithBackground = `
Feature: Scenario with background example

  Background:
    Given I have something important
      And I gave it away to help someone

  Scenario: Charity
    Then I feel proud myself
`;

const ScenarioWithDataTable = `
Feature: Scenario with data table

  Scenario: Data Table example
    Then I have data:
    | id | name     |
    | 1  | Example1 |
    | 2  | Example2 |
`;

const OutlineScenario = `
Feature: Outline Scenario

  Scenario Outline: eating
    Given there are <start> cucumbers
    When I eat <eat> cucumbers
    Then I should have <left> cucumbers

    Examples:
      | start | eat | left |
      |    12 |   5 |    7 |
      |    20 |   5 |   15 |
`;

const ScenarioWithTags = `
@skip
Feature: Scenario example

  @tap(argument1)
  Scenario: example
    Then see result
`;

const ScenarioWithDocString = `
Feature: DocString with doc string

  Scenario: DocString example
    Then I see content:
    """
    My very long content first line
    My very long content second line
    """
`;

describe('gherkin parser', () => {
  test('simple scenario', () => {
    expect(parse(SimpleScenario, 'scenario.feature')).toEqual(expect.objectContaining({
      feature: expect.objectContaining({
        name: 'Simple scenario example',
        tags: [],
        scenarios: [
          expect.objectContaining({
            name: 'Addition',
            tags: [],
            steps: [
              expect.objectContaining({
                text: 'I add "12"',
                type: StepType.WHEN,
                docString: undefined,
                dataTable: undefined
              }),
              expect.objectContaining({
                text: 'I see "12" as a result',
                type: StepType.THEN,
                docString: undefined,
                dataTable: undefined
              })
            ]
          })
        ]
      })
    }));
  });

  test('scenario with background', () => {
    expect(parse(ScenarioWithBackground, 'scenario-with-background.feature')).toEqual(expect.objectContaining({
      feature: expect.objectContaining({
        name: 'Scenario with background example',
        backgrounds: [
          expect.objectContaining({
            steps: [
              expect.objectContaining({
                text: 'I have something important',
                type: StepType.GIVEN,
                docString: undefined,
                dataTable: undefined
              }),
              expect.objectContaining({
                text: 'I gave it away to help someone',
                type: StepType.GIVEN,
                docString: undefined,
                dataTable: undefined
              })
            ]
          })
        ],
        scenarios: [
          expect.objectContaining({
            name: 'Charity',
            tags: [],
            steps: [
              expect.objectContaining({
                text: 'I feel proud myself',
                type: StepType.THEN,
                docString: undefined,
                dataTable: undefined
              })
            ]
          })
        ]
      })
    }));
  });

  test('scenario with data table', () => {
    expect(parse(ScenarioWithDataTable, 'scenario-with-data-table.feature')).toEqual(expect.objectContaining({
      feature: expect.objectContaining({
        name: 'Scenario with data table',
        scenarios: [
          expect.objectContaining({
            steps: [
              expect.objectContaining({
                text: 'I have data:',
                type: StepType.THEN,
                docString: undefined,
                dataTable: expect.objectContaining({
                  rows: [
                    expect.objectContaining({
                      value: {
                        id: '1',
                        name: 'Example1'
                      }
                    }),
                    expect.objectContaining({
                      value: {
                        id: '2',
                        name: 'Example2'
                      }
                    })
                  ]
                })
              })
            ]
          })
        ]
      })
    }))
  });

  test('outline scenario', () => {
    expect(parse(OutlineScenario, 'outline-scenario.feature')).toEqual(expect.objectContaining({
      feature: expect.objectContaining({
        scenarios: [
          expect.objectContaining({
            name: 'eating #1',
            steps: [
              expect.objectContaining({
                text: 'there are 12 cucumbers',
                type: StepType.GIVEN
              }),
              expect.objectContaining({
                text: 'I eat 5 cucumbers',
                type: StepType.WHEN
              }),
              expect.objectContaining({
                text: 'I should have 7 cucumbers',
                type: StepType.THEN
              }),
            ]
          }),
          expect.objectContaining({
            name: 'eating #2',
            steps: [
              expect.objectContaining({
                text: 'there are 20 cucumbers',
                type: StepType.GIVEN
              }),
              expect.objectContaining({
                text: 'I eat 5 cucumbers',
                type: StepType.WHEN
              }),
              expect.objectContaining({
                text: 'I should have 15 cucumbers',
                type: StepType.THEN
              }),
            ]
          })
        ]
      })
    }));
  });

  test('scenario with tags', () => {
    expect(parse(ScenarioWithTags, 'scenario-with-tags.feature')).toEqual(expect.objectContaining({
      feature: expect.objectContaining({
        tags: [
          expect.objectContaining({
            name: 'skip'
          })
        ],
        scenarios: [
          expect.objectContaining({
            tags: [
              expect.objectContaining({
                name: 'tap',
                arguments: [
                  'argument1'
                ]
              })
            ]
          })
        ]
      })
    }));
  });

  test('scenario with doc string', () => {
    expect(parse(ScenarioWithDocString, 'scenario-with-doc-string.feature')).toEqual(expect.objectContaining({
      feature: expect.objectContaining({
        scenarios: [
          expect.objectContaining({
            steps: [
              expect.objectContaining({
                text: 'I see content:',
                docString: expect.objectContaining({
                  content: 'My very long content first line\nMy very long content second line'
                }),
              })
            ]
          })
        ]
      })
    }));
  });
});
