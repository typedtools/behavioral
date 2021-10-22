import { Expose, Type } from 'class-transformer';
import { concatMap, from, Observable, of } from 'rxjs';
import { Location } from './Location';
import { Step } from './Step';
import { Tag } from './Tag';

export class Scenario {
  @Expose()
  name!: string;

  @Expose()
  @Type(() => Tag)
  tags!: Tag[];

  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  @Type(() => Step)
  steps!: Step[];

  isSkipped(): boolean {
    return this.tags?.find(tag => tag.name === '@skip') ? true : false;
  }

  execute(): Observable<void> {
    return of(new Promise(resolve => resolve(undefined)) as Promise<void>).pipe(
      concatMap(val => from(val))
    );
  }
}
