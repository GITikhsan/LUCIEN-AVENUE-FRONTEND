<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router'; // Pastikan RouterLink di-import
import axios from 'axios';

// Siapkan wadah untuk data user, loading, dan pesan error
const user = ref(null);
const isLoading = ref(true);
const errorMessage = ref('');

// Fungsi untuk mengambil data profil dari API
async function fetchUserAddress() {
  isLoading.value = true;
  try {
    // Kita panggil lagi endpoint /user yang sudah ada.
    // Axios di main.js akan otomatis melampirkan token.
    const response = await axios.get('/user');
    user.value = response.data;
  } catch (error) {
    errorMessage.value = 'Gagal memuat alamat. Silakan coba lagi.';
    console.error('Failed to fetch user address:', error);
  } finally {
    isLoading.value = false;
  }
}

// Panggil fungsi di atas saat komponen pertama kali dimuat
onMounted(fetchUserAddress);
</script>

<template>
  <div class="container py-5 text-center">
    <h2 class="fw-bold mb-4">MY ADDRESS</h2>

    <div v-if="isLoading" class="text-center">
      <p>Loading address...</p>
    </div>

    <div v-else-if="errorMessage" class="alert alert-danger mx-auto" style="max-width: 640px;">
      {{ errorMessage }}
    </div>

    <div v-else-if="user" class="mx-auto text-start border p-4" style="max-width: 640px;">
      
      <div v-if="!user.alamat" class="text-center text-muted">
        <p>You have not added a shipping address.</p>
      </div>

      <div v-else class="d-flex justify-content-between mb-2">
        <div>
          <p class="mb-1 fw-medium">{{ user.first_name }} {{ user.last_name }}</p>
          <p class="mb-1">{{ user.email }}</p>
          <p class="mb-1">{{ user.no_telepon }}</p>
          <p class="mb-1" style="white-space: pre-wrap;">{{ user.alamat }}</p>
          
          <span class="badge bg-dark border mt-2">Default shipping address</span>
        </div>
        <div>
          <RouterLink to="/EditAddress" class="text-decoration-underline small">Edit</RouterLink>
        </div>
      </div>
    </div>

    <RouterLink to="/AddAddress" class="btn btn-dark mt-4 px-5 py-2 fw-bold">
      Add Address
    </RouterLink>
  </div>
</template>