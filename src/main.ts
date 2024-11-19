import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { createStore } from './stores'

const app = createApp(App)
const pinia = createStore()

app.use(pinia)
app.mount('#app')
