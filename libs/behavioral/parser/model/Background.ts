import { Expose, Type, Transform } from 'class-transformer';
import { transformSteps } from './transformSteps';
import { Location } from './Location';
import { Step } from './Step';

export class Background {
  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  @Transform(transformSteps)
  steps!: Step[];
}
