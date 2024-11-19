import type { Dexie, EntityTable } from "dexie"

declare module 'pinia' {
  export interface PiniaCustomProperties {
    db: Database
  }
}

export interface Person {
  id: number,
  firstName: string,
  lastName: string,
  mail: string,
}

export type Database = Dexie & {
  people: EntityTable<Person, 'id'>
}
