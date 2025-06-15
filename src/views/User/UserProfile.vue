<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // Pastikan axios sudah di-import

// Siapkan "wadah" untuk data user, loading, dan error
const user = ref(null);
const isLoading = ref(true);
const errorMessage = ref('');

// Fungsi untuk mengambil data profil dari API
async function fetchUserProfile() {
  try {
    // PERBAIKAN: Panggil endpoint '/user' yang benar.
    // Tidak perlu menambahkan URL lengkap atau header di sini,
    // karena baseURL dan Authorization header sudah diatur secara global di main.js
    const response = await axios.get('/user');

    // Simpan seluruh objek user yang diterima dari server
    user.value = response.data;

  } catch (error) {
    errorMessage.value = 'please login first';
    console.error('Failed to fetch user profile:', error);
  } finally {
    isLoading.value = false;
  }
}

// Jalankan fungsi di atas saat komponen pertama kali dimuat
onMounted(fetchUserProfile);

// Daftar menu Anda tetap sama
const menuItems = [
  { to: '/mydata', label: 'My data' },
  { to: '/myPurchases', label: 'My Purchases' },
  { to: '/address', label: 'Address' },
  { to: '/help', label: 'Help' },
];
</script>

<template>
  <div class="container py-5 text-center">

    <div v-if="isLoading">
      <h1 class="display-4 fw-normal font-serif mb-5">Loading...</h1>
    </div>

    <div v-else-if="errorMessage">
      <h1 class="display-4 fw-normal font-serif mb-5 text-dark">{{ errorMessage }}</h1>
    </div>

    <div v-else-if="user">
      <h1 class="display-4 fw-normal font-serif mb-5">
        {{ user.first_name }} {{ user.last_name }}
      </h1>

      <div class="text-start mx-auto" style="max-width: 520px">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <strong class="text-uppercase small">Help</strong>
          <a href="#" class="text-decoration-underline small fw-medium">See more</a>
        </div>
        <p class="mb-1">How can I pay for my online purchases?</p>
        <p class="mb-4">What is my size?</p>
      </div>

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
    
  </div>
</template>

<style scoped>
.font-serif {
  font-family: 'Georgia', 'Times New Roman', serif;
}
.text-danger {
  color: #dc3545; /* Bootstrap's danger color */
}

</style>