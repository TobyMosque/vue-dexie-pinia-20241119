<script setup lang="ts">
import { ref } from 'vue'
import { Dexie } from 'dexie'
import { usePeopleStore } from '../stores/people'
import type { Person } from '../types/database'

const props = defineProps<{ person: Person }>()
const peopleStore = usePeopleStore()
const { update, remove } = peopleStore

const editMode = ref(false)
const clone = ref<Person>()

function edit() {
  editMode.value = true
  clone.value = Dexie.deepClone(props.person)
}

function cancel() {
  editMode.value = false
  clone.value = undefined
}

async function save() {
  await update(clone.value)
  cancel()
}
</script>

<template>
  <tr v-if="editMode && clone">
    <td>{{ person.id }}</td>
    <td><input v-model="clone.firstName" /></td>
    <td><input v-model="clone.lastName" /></td>
    <td><input v-model="clone.email" /></td>
    <td>
      <button @click="cancel">Cancel</button>
      <button @click="save">Save</button>
    </td>
  </tr>
  <tr v-else>
    <td>{{ person.id }}</td>
    <td>{{ person.firstName }}</td>
    <td>{{ person.lastName }}</td>
    <td>{{ person.email }}</td>
    <td>
      <button @click="edit">Edit</button>
      <button @click="remove(person.id)">Del</button>
    </td>
  </tr>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
