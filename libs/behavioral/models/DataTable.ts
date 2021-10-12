import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import { Location } from './Location';

export class DataTableRow<T = any> {
  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  value!: T;
}

export class DataTable {
  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  @Transform(({ obj }) => {
    const [header, ...data] = obj.rows;

    return data.map((row: any) => {
      return plainToClass(DataTableRow, row.cells.reduce((acc: any, cell: any, idx: number) => {
        acc.value[header.cells[idx].value] = cell.value;
        
        return acc;
      }, {
        location: row.location,
        value: {}
      }));
    });
  })
  rows!: DataTableRow[]
}
