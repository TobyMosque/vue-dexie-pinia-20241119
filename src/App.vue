<script setup lang="ts">
import { usePeopleStore } from './stores/people'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { faker } from '@faker-js/faker';
import PersonRow from './components/PersonRow.vue'
import type { Person } from './types/database'

const peopleStore = usePeopleStore()
const { people } = storeToRefs(peopleStore)
const { insert } = peopleStore

async function insertRandom() {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email = faker.internet.email({ firstName, lastName }).toLowerCase()
  await peopleStore.insert({
    firstName,
    lastName,
    email
  })
}
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <button @click="insertRandom">Insert Random</button>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <person-row v-for="person in people" :key="person.id" :person="person"></person-row>
    </tbody>
  </table>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
