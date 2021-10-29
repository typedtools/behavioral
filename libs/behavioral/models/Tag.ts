import { Expose, Type } from 'class-transformer';
import { Location } from './Location';

export class Tag<T = any> {
  @Expose()
  name!: string;

  @Expose()
  arguments?: T[];

  @Expose()
  @Type(() => Location)
  location!: Location;
}
