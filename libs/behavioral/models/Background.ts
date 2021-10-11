import { Expose, Type } from 'class-transformer';
import { Location } from './Location';
import { Step } from './Step';

export class Background {
  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  @Type(() => Step)
  steps!: Step[];
}
