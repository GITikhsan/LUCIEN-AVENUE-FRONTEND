import { createRouter, createWebHistory } from 'vue-router'

import Home       from '@/views/User/Home.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Portofolio from '@/views/User/Portfolio.vue'
import Skills     from '@/views/User/Skills.vue'
import AboutUs    from '@/views/User/AboutUs.vue'
import Product    from '@/views/product/Product.vue'

const routes = [
  { path: '/',          name: 'Fashion',    component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register',name: 'Register', component: Register },
  { path: '/portofolio', name: 'Portofolio', component: Portofolio },
  { path: '/skills',    name: 'Keahlian',   component: Skills },
  { path: '/AboutUs',   name: 'About Us',     component: AboutUs },
   { path: '/Product',   name: 'Product',     component: Product }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})
