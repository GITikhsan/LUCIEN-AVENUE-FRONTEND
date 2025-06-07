import { createRouter, createWebHistory } from 'vue-router'

import Home       from '@/views/User/Home.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'

import UserProfile from '@/views/User/UserProfile.vue'
import UserSetting from '@/views/User/UserSetting.vue'


import AboutUs    from '@/views/User/AboutUs.vue'
import Product    from '@/views/product/Product.vue'
import Forgot    from '@/views/auth/Forgot.vue'
import OTP    from '@/views/auth/OTP.vue'


// import Data    from '@/components/Data.vue'
// import Pembelian    from '@/components/Pembelian.vue'
// import Pengembalian from '@/components/Pengembalian.vue'

const routes = [
  { path: '/',          name: 'Fashion',    component: Home },


  { path: '/login', name: 'Login', component: Login },
  { path: '/register',name: 'Register', component: Register },
  { path: '/forgot',name: 'Forgot', component: Forgot },
  { path: '/otp',name: 'OTP', component: OTP },


  // { path: '/data', name: 'Data', component: Data },
  // { path: '/pembelian',name: 'Pembelian', component: Pembelian },
  // { path: '/pengembalian',name: 'Pengembalian', component: Pengembalian},


  { path: '/UserProfile', name: 'Profile', component: UserProfile },
  { path: '/UserSetting',    name: 'Setting',   component: UserSetting },
  { path: '/AboutUs',   name: 'About Us',     component: AboutUs },
  { path: '/Product',   name: 'Product',     component: Product }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})
