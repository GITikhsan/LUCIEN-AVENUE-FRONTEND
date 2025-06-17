<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// --- State Management ---
const cartItems = ref([]);
const isLoading = ref(true);
const isRemoving = ref(null);
const error = ref(null);
const router = useRouter();

// --- Computed Property untuk Total Harga (dibuat lebih aman) ---
const grandTotal = computed(() => {
  if (!cartItems.value || cartItems.value.length === 0) {
    return 0;
  }
  return cartItems.value.reduce((total, item) => {
    // Pastikan item.product ada sebelum mengakses propertinya
    const price = item.product ? item.product.harga_retail : 0;
    const quantity = item.quantity || 0;
    return total + (price * quantity);
  }, 0);
});

// --- Helper Function ---
const formatCurrency = (value) => {
  if (value === null || typeof value === 'undefined') return '0';
  return Number(value).toLocaleString('id-ID');
};

// --- API Calls (memanggil URL yang sudah benar) ---
const fetchCartItems = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    // Memanggil URL relatif yang benar: '/carts'
    // Axios akan otomatis menggabungkannya dengan baseURL dari main.js
    const response = await axios.get('/carts');
    cartItems.value = response.data.data;
  } catch (err) {
    console.error("Gagal mengambil data keranjang:", err.response);
    error.value = err.response?.data?.message || "Tidak dapat memuat keranjang. Pastikan Anda sudah login.";
  } finally {
    isLoading.value = false;
  }
};

const removeItem = async (cartItemId) => {
  if (!confirm("Yakin ingin menghapus produk ini dari keranjang?")) {
    return;
  }
  isRemoving.value = cartItemId;
  error.value = null;
  try {
    // Memanggil URL relatif yang benar
    await axios.delete(`/carts/${cartItemId}`);
    await fetchCartItems(); // Refresh data setelah berhasil hapus
  } catch (err) {
    console.error("Gagal menghapus item:", err.response);
    error.value = err.response?.data?.message || "Gagal menghapus item.";
  } finally {
    isRemoving.value = null;
  }
};

// --- Lifecycle Hook ---
onMounted(() => {
  // PERBAIKAN: Definisikan 'token' di dalam sini, tepat sebelum digunakan.
  const token = localStorage.getItem('AUTH_TOKEN'); // Gunakan nama kunci yang benar

  if (token) {
    // Jika ada token, jalankan fungsi untuk mengambil data keranjang
    fetchCartItems();
  } else {
    // Jika tidak ada token, langsung tampilkan pesan error
    error.value = "Anda harus login untuk melihat keranjang.";
    isLoading.value = false;
  }
});
</script>


<style scoped>
.cart-img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  background-color: #f8f9fa;
  padding: 8px;
}

@media (max-width: 768px) {
  .cart-img {
    width: 100px;
    height: 100px;
  }
}
</style>



<template>
  <div class="bg-body-tertiary min-vh-100 py-5">
    <div class="container">
      <!-- Link Kembali -->
      <div class="mb-4">
        <router-link to="/products" class="text-decoration-none text-secondary-emphasis fw-medium">
          ← Lanjutkan Belanja
        </router-link>
      </div>

      <!-- Header -->
      <div class="mb-4">
        <h2 class="fw-bold">Keranjang Kamu</h2>
        <!-- Menampilkan jumlah item dari data dinamis -->
        <p class="text-muted" v-if="!isLoading">Total: {{ cartItems.length }} produk</p>
      </div>

      <!-- Loading Spinner -->
      <div v-if="isLoading" class="text-center p-5">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Memuat keranjang...</p>
      </div>

      <!-- Pesan Error -->
      <div v-else-if="error" class="alert alert-danger">
        <strong>Terjadi Kesalahan:</strong> {{ error }}
      </div>

      <!-- Cart Items -->
      <div v-else-if="cartItems.length > 0" class="vstack gap-4">
        <div
          v-for="item in cartItems"
          :key="item.id" <!-- Menggunakan item.id sebagai key unik -->
          class="bg-white p-4 rounded-4 shadow-sm d-flex flex-column flex-md-row gap-4 align-items-center"
        >
          <!-- Gambar -->
          <!-- Mengambil data gambar dari relasi produk -->
          <img :src="item.product.image_url" :alt="item.product.name" class="cart-img shadow rounded-4" />

          <!-- Info -->
          <div class="flex-grow-1 text-center text-md-start">
            <!-- Mengambil data nama dari relasi produk -->
            <h5 class="fw-semibold mb-1">{{ item.product.name }}</h5>
            <p class="text-muted small mb-1">Jumlah: {{ item.quantity }}</p>
            <!-- Mengambil harga dari relasi produk -->
            <p class="fw-bold text-primary fs-5 mb-0">Rp {{ formatCurrency(item.product.price) }}</p>
          </div>

          <!-- Tombol Hapus -->
          <div>
            <button class="btn btn-outline-danger" @click="removeItem(item.id)" :disabled="isRemoving === item.id">
              <!-- Menampilkan spinner kecil saat item sedang dihapus -->
              <span v-if="isRemoving === item.id" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <i v-else class="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Keranjang Kosong -->
      <div v-else class="text-center bg-white p-5 rounded-4 shadow-sm mt-4">
        <h5 class="text-muted mb-3">Keranjang kamu kosong 😢</h5>
        <router-link to="/products" class="btn btn-dark">Cari Produk</router-link>
      </div>

      <!-- Total & Checkout -->
      <div
        v-if="cartItems.length > 0"
        class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-5 p-4 bg-white rounded-4 shadow-sm"
      >
        <h4 class="mb-3 mb-md-0">
          Total: <span class="text-success fw-bold">Rp {{ formatCurrency(grandTotal) }}</span>
        </h4>
        <router-link to="/checkout" class="btn btn-success btn-lg px-5 py-2 rounded-4 shadow-sm">
          Checkout →
        </router-link>
      </div>
    </div>
  </div>
</template>
