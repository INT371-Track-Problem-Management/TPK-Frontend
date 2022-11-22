import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import AppLayout from './layouts/AppLayout'
import './assets/index.css'
import "@lottiefiles/lottie-player";
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// import moment from 'moment-timezone'
// moment.tz.setDefault('Asia/Bangkok')

const app = createApp(App)
// app.prototype.$moment = moment
app.component('DatePicker', DatePicker);
app.use(router)
app.component('AppLayout', AppLayout)
app.mount('#app')
