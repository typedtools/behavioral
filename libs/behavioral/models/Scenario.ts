import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import { concatMap, from, Observable, of } from 'rxjs';
import { Background, Feature } from '.';
import { Injector } from '../helpers/Injector';
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
