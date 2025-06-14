import { createRouter, createWebHistory } from 'vue-router'

// 1. Impor komponen Layout dan semua halaman
import MainLayout from '@/layout/MainLayout.vue'
import Home from '@/views/User/Home.vue'
import Product from '@/views/product/Product.vue'
import ViewMore from '@/views/User/ViewMore.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'

import AboutUs from '@/views/User/AboutUs.vue'
import Admin from '@/views/admin/Admin.vue'
// ... import halaman lainnya jika ada



import UserProfile from '@/views/User/UserProfile.vue'
import MyData    from '@/components/UserSetting/MyData.vue'
import MyPurchases    from '@/components/UserSetting/MyPurchases.vue'
import Address from '@/components/UserSetting/Address.vue'
import Help from '@/components/UserSetting/Help.vue'
import AddAddress from '@/components/UserSetting/AddAddress.vue'
import EditAddress from '@/components/UserSetting/EditAddress.vue'

import Bag from '@/views/payment/Bag.vue'
import Checkout from '@/views/payment/Checkout.vue'
import Payment from '@/views/payment/Payment.vue'



const routes = [

  { path: '/payment',   name: 'Payment',     component: Payment },
  { path: '/checkout',   name: 'Checkout',  component: Checkout },
  { path: '/mydata', name: 'My Data', component: MyData },
  { path: '/myPurchases', name: 'My Purchases', component: MyPurchases },
  { path: '/address', name: 'Address', component: Address },
  { path: '/help', name: 'Help', component: Help },
  { path: '/addAddress', name: 'Add Address', component: AddAddress },
  { path: '/editAddress', name: 'Edit Address', component: EditAddress },
  // --- GRUP RUTE YANG MENGGUNAKAN MAINLAYOUT ---
  {
    path: '/',
    component: MainLayout, // Tentukan "Rumah" atau "Bingkai"-nya di sini
    children: [            // Definisikan "Kamar-kamar" di dalamnya
      {
        path: '', // Path kosong berarti ini adalah halaman utama untuk grup ini (URL: /)
        name: 'Home',
        component: Home
      },
      {
        path: 'product/:id', // URL menjadi: /product/123
        name: 'Product',
        component: Product
      },
      {
        path: 'viewMore',
        name: 'ViewMore',
        component: ViewMore
      },
      {
        path: 'userProfile', // URL menjadi: /userProfile
        name: 'Profile',
        component: UserProfile
      },
      {
        path: 'bag', // URL menjadi: /bag
        name: 'Bag',
        component: Bag
      },
      {
        path: 'aboutUs', // URL menjadi: /aboutUs
        name: 'About Us',
        component: AboutUs
      }
      // Tambahkan halaman lain yang butuh Navbar & Footer di sini
    ]
  },

  // --- GRUP RUTE YANG TIDAK MENGGUNAKAN MAINLAYOUT ---
  // Contoh: Halaman Login, Register, dan Admin tidak perlu Navbar & Footer yang sama
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})