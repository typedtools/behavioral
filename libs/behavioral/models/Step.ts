import { Expose, Type } from 'class-transformer';
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
  params?: any;
}
