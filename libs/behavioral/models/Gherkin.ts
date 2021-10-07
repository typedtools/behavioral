import { Type } from 'class-transformer';
import { Feature } from './Feature';

export class Gherkin {
  filename?: string;

  @Type(() => Feature)
  feature!: Feature;
}
