import { Expose } from 'class-transformer';

export class Location {
  @Expose()
  line!: number;

  @Expose()
  column!: number;
}
