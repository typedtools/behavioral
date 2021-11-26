import { Feature, Scenario, Tag } from '../models';

export const isSkipped = (scenario: Scenario, parent: Feature): boolean => {
  return [...parent.tags, ...scenario.tags].find((tag: Tag) => tag.name === 'skip') !== undefined
};
