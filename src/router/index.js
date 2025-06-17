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
      {
        path: 'Product/:produk_id', // Tetap, untuk detail produk -> /product/123
        name: 'Product',
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
      // === REVISI UTAMA: Mengelompokkan semua halaman setting di bawah UserProfile ===
      {
        path: 'UserProfile', // URL Induk -> /user-profile
        component: UserProfile,
        // Di dalam komponen UserProfile.vue, kamu perlu menambahkan <router-view />
        // agar anak-anak rute ini bisa ditampilkan.
        children: [
          {
            path: '', // Path kosong, jadi halaman default saat buka /user-profile
            name: 'MyData',
            component: MyData
          },
          {
            path: 'my-purchases', // URL menjadi -> /user-profile/my-purchases
            name: 'MyPurchases',
            component: MyPurchases
          },
          {
            path: 'address', // URL menjadi -> /user-profile/address
            name: 'Address',
            component: Address
          },
          {
            path: 'address/add', // URL menjadi -> /user-profile/address/add
            name: 'AddAddress',
            component: AddAddress
          },
          {
            path: 'address/edit/:addressId', // URL menjadi -> /user-profile/address/edit/1
            name: 'EditAddress',
            component: EditAddress
          },
          {
            path: 'help', // URL menjadi -> /user-profile/help
            name: 'Help',
            component: Help
          },
        ]
      }
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