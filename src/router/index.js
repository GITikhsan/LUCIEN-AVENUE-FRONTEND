import { createRouter, createWebHistory } from 'vue-router'

// 1. Impor komponen Layout dan semua halaman
import MainLayout from '@/layout/MainLayout.vue'
import Home from '@/views/User/Home.vue'
import Product from '@/views/product/Product.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import UserProfile from '@/views/User/UserProfile.vue'
import Bag from '@/views/payment/Bag.vue'
import AboutUs from '@/views/User/AboutUs.vue'
import Admin from '@/views/admin/Admin.vue'
// ... import halaman lainnya jika ada

const routes = [
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