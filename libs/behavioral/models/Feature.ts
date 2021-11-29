import { Expose, Transform, Type } from 'class-transformer';
import { Scenario } from './Scenario';
import { Location } from './Location';
import { Background } from './Background';
import { Tag } from '.';
import { transformTags } from '../transformers/transformTags';

export class Feature {
  @Expose()
  name!: string;

  @Expose()
  @Type(() => Tag)
  @Transform(transformTags)
  tags!: Tag[];

  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  backgrounds: Background[] = [];

  @Expose()
  scenarios!: Scenario[];
}
