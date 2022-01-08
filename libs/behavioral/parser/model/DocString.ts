import { Expose, Type } from 'class-transformer';
import { Location } from './Location';

export class DocString {
  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  content!: string;
}
