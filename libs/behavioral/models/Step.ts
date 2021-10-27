import { Expose, Transform, Type } from 'class-transformer';
import { Type as Constructor } from '../types';
import { DataTable } from './DataTable';
import { DocString } from './DocString';
import { Location } from './Location';

export enum StepType {
  GIVEN = 'given',
  WHEN = 'when',
  THEN = 'then'
}

export class Step {
  @Expose()
  text!: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.keyword.toLowerCase().trim();
  })
  type!: StepType;

  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  @Type(() => DocString)
  docString?: DocString;

  @Expose()
  @Type(() => DataTable)
  dataTable?: DataTable;

  @Expose()
  @Transform(({ obj, key }) => {
    return obj[key];
  })
  params?: any;

  @Expose()
  @Transform(({ obj, key }) => {
    return obj[key];
  })
  class!: Constructor<any>;

  @Expose()
  @Transform(({ obj, key }) => {
    return obj[key];
  })
  method!: string;

  @Expose()
  @Transform(({ obj, key }) => {
    return obj[key];
  })
  arguments!: any[];

  @Expose()
  @Transform(({ obj, key }) => {
    return obj[key];
  })
  options!: any[];
}
