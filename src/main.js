import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'animate.css'
import 'aos/dist/aos.css'
import './assets/global.css'

import AOS from 'aos'

// Atur base URL untuk semua request. Sesuaikan port jika berbeda.
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

// Cek apakah ada token otentikasi di penyimpanan lokal browser
const token = localStorage.getItem('auth_token');

// Jika token ditemukan, lampirkan sebagai header default di setiap permintaan
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const app = createApp(App)

app.use(router)
app.mount('#app')

AOS.init({ duration: 800, once: true })
