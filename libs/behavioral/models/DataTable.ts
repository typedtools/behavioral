import { Expose, Type } from "class-transformer";

export class DataTable {
  @Expose()
  @Type(() => Location)
  location!: Location;
}
