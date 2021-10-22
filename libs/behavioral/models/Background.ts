import { Expose, Type } from 'class-transformer';
import { concatMap, from, Observable, of } from 'rxjs';
import { Location } from './Location';
import { Step } from './Step';

export class Background {
  @Expose()
  @Type(() => Location)
  location!: Location;

  @Expose()
  @Type(() => Step)
  steps!: Step[];

  execute(): Observable<void> {
    return of(new Promise(resolve => resolve(undefined)) as Promise<void>).pipe(
      concatMap(val => from(val))
    );
  }
}
