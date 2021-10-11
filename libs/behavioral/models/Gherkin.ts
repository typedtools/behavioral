import { Expose, Type } from 'class-transformer';
import { Feature } from './Feature';

export class Gherkin {
  @Type(() => Feature)
  @Expose()
  feature!: Feature;

  @Expose()
  raw!: string;
}
