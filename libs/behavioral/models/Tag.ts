import { Expose, Type } from 'class-transformer';
import { Location } from './Location';

export class Tag {
  @Expose()
  name!: string

  @Expose()
  @Type(() => Location)
  location!: Location;
}