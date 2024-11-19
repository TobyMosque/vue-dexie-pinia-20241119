import Dexie from "dexie";
import { createPinia } from "pinia";
import type { Database } from "../types/database";

export function createStore() {
  const pinia = createPinia()
  const db = new Dexie('vue-pinia-dexie-database') as Database

  db.version(1).stores({
    people: '++id, firstName, lastName, mail'
  });
  
  pinia.use(() => ({ db }))
  return pinia
}