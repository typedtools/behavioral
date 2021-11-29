import { Expose, Transform, Type } from 'class-transformer';
import { transformSteps } from '../transformers';
import { transformTags } from '../transformers/transformTags';
import { Location } from './Location';
import { Step } from './Step';
import { Tag } from './Tag';

export class Scenario {
  @Expose()
  name!: string;

  @Expose()
  @Transform(transformTags)
  tags!: Tag[];

  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  @Transform(transformSteps)
  steps!: Step[];
}
