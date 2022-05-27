import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import AppLayout from './layouts/AppLayout'
import './assets/index.css'

const app = createApp(App)
app.use(router)
app.component('AppLayout', AppLayout)
app.mount('#app')
