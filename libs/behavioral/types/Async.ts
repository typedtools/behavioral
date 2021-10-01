import { Observable } from 'rxjs';

export type Async<T = void> = T | Promise<T> | Observable<T>;
