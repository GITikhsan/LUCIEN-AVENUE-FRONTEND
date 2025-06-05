//import './assets/main.css'
import './assets/input.css'
//import './assets/global.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import 'animate.css'
// import 'aos/dist/aos.css'
//import AOS from 'aos'

// Buat dulu instance app
const app = createApp(App)

// Pasang plugin/router
app.use(router)

// Mount ke elemen root
app.mount('#app')

// Inisialisasi AOS setelah mounting (jika digunakan)
//AOS.init({ duration: 800, once: true })
