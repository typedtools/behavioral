import { Expose } from 'class-transformer';
import { Scenario } from '..';
import { Location } from './Location';

export class Feature {
  name!: string;

  location!: Location;

  @Expose({ name: 'children', toClassOnly: true })
  scenarios: Scenario[];
}
