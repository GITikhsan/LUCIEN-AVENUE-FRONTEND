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
import ViewMore    from '@/views/User/ViewMore.vue'


import MyData    from '@/components/UserSetting/MyData.vue'
import MyPurchases    from '@/components/UserSetting/MyPurchases.vue'
import Address from '@/components/UserSetting/Address.vue'
import Help from '@/components/UserSetting/Help.vue'
import AddAddress from '@/components/UserSetting/AddAddress.vue'
import EditAddress from '@/components/UserSetting/EditAddress.vue'
import Payment from '@/views/payment/Payment.vue'
import Admin from '@/views/admin/Admin.vue'
import Bag from '@/views/payment/Bag.vue'

const routes = [
  { path: '/',          name: 'Fashion',    component: Home },


  { path: '/login', name: 'Login', component: Login },
  { path: '/register',name: 'Register', component: Register },
  { path: '/forgot',name: 'Forgot', component: Forgot },
  { path: '/otp',name: 'OTP', component: OTP },


  { path: '/mydata', name: 'My Data', component: MyData },
  { path: '/myPurchases', name: 'My Purchases', component: MyPurchases },
  { path: '/address', name: 'Address', component: Address },
  { path: '/help', name: 'Help', component: Help },
  { path: '/addAddress', name: 'Add Address', component: AddAddress },
   { path: '/editAddress', name: 'Edit Address', component: EditAddress },

  { path: '/userProfile', name: 'Profile', component: UserProfile },
  { path: '/userSetting',    name: 'Setting',   component: UserSetting },
  { path: '/aboutUs',   name: 'About Us',     component: AboutUs },
  { path: '/viewMore',   name: 'View More',     component: ViewMore },
  { path: '/product',   name: 'Product',     component: Product },
  { path: '/payment',   name: 'Payment',     component: Payment },
  { path: '/admin',   name: 'Admin',     component: Admin },
  { path: '/bag',   name: 'Bag',     component: Bag }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})
