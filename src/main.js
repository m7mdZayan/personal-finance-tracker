import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)

console.log(router, 'router')

app.use(router) // Use Vue Router
app.use(createPinia()) // Use Pinia for state management

app.mount('#app')
