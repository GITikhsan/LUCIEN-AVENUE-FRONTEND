<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Inisialisasi state
const userName = ref('Memuat...')
const menuItems = [
  { to: '/mydata', label: 'My data' },
  { to: '/myPurchases',  label: 'My Purchases' },
  { to: '/address', label: 'Address' },
  { to: '/help', label: 'Help' },
]

// Ambil data user dari API saat komponen dimount
onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/users')
    
    // Karena pakai pagination, data user-nya ada di: data.data
    const users = response.data.data.data

    if (users.length > 0) {
      userName.value = users[0].name // ambil nama user pertama
    } else {
      userName.value = 'No user'
    }
  } catch (error) {
    console.error('Failed to load user data:', error)
    userName.value = 'Failed to load user'
  }
})

</script>

<template>
  <div class="container py-5 text-center">
    <!-- Nama Pengguna -->
    <h1 class="display-4 fw-normal font-serif mb-5">{{ userName }}</h1>

    <!-- Bantuan Singkat -->
    <div class="text-start mx-auto" style="max-width: 520px">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <strong class="text-uppercase small">Help</strong>
        <a href="#" class="text-decoration-underline small fw-medium">See more</a>
      </div>
      <p class="mb-1">How can I pay for my online purchases?</p>
      <p class="mb-4">What is my size?</p>
    </div>

    <!-- Daftar Navigasi -->
    <div class="mx-auto text-start" style="max-width: 520px">
      <RouterLink
        v-for="(item, idx) in menuItems"
        :key="idx"
        :to="item.to"
        class="d-flex justify-content-between align-items-center py-3 border-top text-decoration-none text-dark">
        <strong class="text-uppercase small m-0">{{ item.label }}</strong>
        <i class="bi bi-arrow-right"></i>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.font-serif {
  font-family: 'Georgia', 'Times New Roman', serif;
}
</style>
