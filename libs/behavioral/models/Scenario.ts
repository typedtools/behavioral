import { Expose, Type } from 'class-transformer';
import { Location } from './Location';
import { Step } from './Step';
import { Tag } from './Tag';

export class Scenario {
  @Expose()
  name!: string;

  @Expose()
  @Type(() => Tag)
  tags!: Tag[];

  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  @Type(() => Step)
  steps!: Step[];
}
