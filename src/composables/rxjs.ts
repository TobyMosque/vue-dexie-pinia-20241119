import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import type { Observable } from 'rxjs'

export function useLiveQuery<T>(querier: Parameters<typeof liveQuery<T>>[0]) {
  const query: Observable<T> = liveQuery(querier) as never
  return useObservable(query)
}