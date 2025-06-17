import { createRouter, createWebHistory } from 'vue-router'

// 1. Impor komponen Layout dan semua halaman (Tidak ada perubahan di sini)
import MainLayout from '@/layout/MainLayout.vue'
import Home from '@/views/User/Home.vue'
import Product from '@/views/product/Product.vue'
import ViewMore from '@/views/User/ViewMore.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import AboutUs from '@/views/User/AboutUs.vue'
import Admin from '@/views/admin/Admin.vue'

// Halaman User Profile dan anak-anaknya
import UserProfile from '@/views/User/UserProfile.vue'
import MyData from '@/components/UserSetting/MyData.vue'
import MyPurchases from '@/components/UserSetting/MyPurchases.vue'
import Address from '@/components/UserSetting/Address.vue'
import Help from '@/components/UserSetting/Help.vue'
import AddAddress from '@/components/UserSetting/AddAddress.vue'
import EditAddress from '@/components/UserSetting/EditAddress.vue'

// Halaman Payment Flow
import Bag from '@/views/payment/Bag.vue'
import Checkout from '@/views/payment/Checkout.vue'
import Payment from '@/views/payment/Payment.vue'

const routes = [
  // --- GRUP RUTE UTAMA (YANG PAKAI NAVBAR & FOOTER) ---
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '', // Tetap, untuk homepage -> /
        name: 'Home',
        component: Home
      },
      // GANTI DENGAN BLOK INI
      {
        path: 'product/:id', // <-- DIUBAH: jadi huruf kecil dan :id
        name: 'ProductDetail',
        component: Product
      },
      {
        path: 'ViewMore', // REVISI: Menggunakan kebab-case, lebih umum untuk URL
        name: 'View More',
        component: ViewMore
      },
      {
        path: 'AboutUs', // REVISI: Menggunakan kebab-case
        name: 'About Us', // Nama bisa tetap spasi
        component: AboutUs
      },
      {
        path: 'bag', // Tetap -> /bag
        name: 'Bag',
        component: Bag
      },
      {
        path: 'checkout', // REVISI: Dihapus '/' di depan, karena ini anak dari MainLayout
        name: 'Checkout',
        component: Checkout
      },
      {
        path: 'payment', // REVISI: Dihapus '/' di depan
        name: 'Payment',
        component: Payment
      },
      //Profile
      { path: '/mydata', name: 'My Data', component: MyData },
      { path: '/myPurchases', name: 'My Purchases', component: MyPurchases },
      { path: '/address', name: 'Address', component: Address },
      { path: '/help', name: 'Help', component: Help },
      { path: '/addAddress', name: 'Add Address', component: AddAddress },
      { path: '/editAddress', name: 'Edit Address', component: EditAddress },
      { path: '/userProfile', name: 'Profile', component: UserProfile }
          
      
    ]
  },

  // --- GRUP RUTE STANDALONE (TIDAK PAKAI NAVBAR & FOOTER DARI MAINLAYOUT) ---
  // Tidak ada perubahan di sini, ini sudah benar.
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Fungsi ini akan membuat halaman selalu scroll ke atas saat pindah rute
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router