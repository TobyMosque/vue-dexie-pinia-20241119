import { defineStore } from 'pinia'
import { Dexie } from 'dexie'
import { useDiStore } from './di'
import { useLiveQuery } from '../composables/rxjs'
import { Person } from '../types/database'

export const usePeopleStore = defineStore('pinia', () => {
  const { db } = useDiStore()
  const people = useLiveQuery(() => db.people.toArray())

  async function insert(person: Omit<Person, 'id'>) {
    await db.people.add(person)
  }
  
  async function remove(id: Person['id']) {
    await db.people.where('id').equals(id).delete()
  }
  
  async function update(person: Person) {
    await db.people.put(Dexie.deepClone(person), person.id)
  }

  return {
    people,
    insert,
    update,
    remove
  }
})