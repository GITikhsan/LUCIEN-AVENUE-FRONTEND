import { createRouter, createWebHistory } from 'vue-router'

import Home       from '@/views/Home.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Portfolio  from '@/views/Portfolio.vue'
import Skills     from '@/views/Skills.vue'
import AboutUs    from '@/views/AboutUs.vue'

const routes = [
  { path: '/',          name: 'Fashion',    component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register',name: 'Register', component: Register },
  { path: '/portfolio', name: 'Portofolio', component: Portfolio },
  { path: '/skills',    name: 'Keahlian',   component: Skills },
  { path: '/AboutUs',   name: 'About Us',     component: AboutUs }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})
