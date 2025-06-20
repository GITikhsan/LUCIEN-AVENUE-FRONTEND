<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// =================================================================
// Konfigurasi API dan Autentikasi
// =================================================================
const API_BASE_URL = 'http://127.0.0.1:8000/api';
axios.defaults.baseURL = API_BASE_URL;

const token = localStorage.getItem('auth_token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  console.error("Tidak ada token autentikasi. Harap login terlebih dahulu.");
}

// =================================================================
// State Management Komponen
// =================================================================
const order = ref(null);
const address = ref(null);
const isLoading = ref(true);
const error = ref(null);
const router = useRouter();

// =================================================================
// Helper Functions
// =================================================================
const formatCurrency = (value) => {
  if (value === null || typeof value === 'undefined') return '0';
  return Number(value).toLocaleString('id-ID');
};

// =================================================================
// API Calls
// =================================================================
const fetchOrderSummary = async () => {
  try {
    const response = await axios.get('/checkout/summary');
    order.value = response.data;
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Gagal mengambil data pesanan.';
    console.error("Error fetching order summary:", err.response);
    throw new Error(errorMessage);
  }
};

const fetchDefaultAddress = async () => {
  try {
    const response = await axios.get('/checkout/address');
    address.value = response.data;
  } catch (err) {
    console.warn("Could not fetch default address:", err.response?.data?.message || err.message);
    address.value = null;
  }
};

// =================================================================
// Lifecycle Hook
// =================================================================
onMounted(async () => {
  if (!token) {
    error.value = "Anda harus login untuk melihat halaman ini.";
    isLoading.value = false;
    return;
  }

  try {
    await Promise.all([
      fetchOrderSummary(), 
      fetchDefaultAddress()
    ]);
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="bg-light py-5">
    <div class="container">
      <div v-if="isLoading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Memuat data pesanan...</p>
      </div>

      <div v-else-if="error" class="alert alert-danger">
        <strong>Terjadi Kesalahan:</strong> {{ error }}
      </div>
      
      <div v-else class="row">
        <div class="col-lg-7 order-lg-2 mb-4">
          <div v-if="order" class="card">
            <div class="card-header bg-white">
              <h5 class="mb-0">Ringkasan Pesanan</h5>
            </div>
            <div class="card-body">
              <div v-for="product in order.products" :key="product.productId" class="d-flex mb-3">
                <img :src="product.image" class="me-3 rounded" style="width: 100px; height: 100px; object-fit: cover;" :alt="product.name">
                <div>
                  <h6 class="mb-1">{{ product.name }}</h6>
                  <small v-if="product.size">Ukuran: {{ product.size }}</small><br>
                  <small>Jumlah: {{ product.quantity }}</small>
                </div>
                <div class="ms-auto text-end">
                  <p class="mb-0">Rp {{ formatCurrency(product.price) }}</p>
                </div>
              </div>
              
              <!-- Metode ongkir (Jika ingin digunakan) -->

              <!-- <div class="d-flex justify-content-between">
                <span>Ongkir</span>
                <span>Rp {{ formatCurrency(order.shippingCost) }}</span>
              </div> -->
              <hr>
              <div class="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>Rp {{ formatCurrency(order.total) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-5 order-lg-1">
            <div class="card text-start border p-1 rounded bg-white">
              <div class="card-header bg-white">
                <h5 class="mb-0 fw-bold">Alamat Pengiriman</h5>
              </div>
              <div v-if="address" class="d-flex justify-content-between mb-2 p-1 m-2">
                <div>
                  <p class="mb-1 fw-medium">{{ address.recipientName }}</p>
                  <p class="mb-1 text-muted">{{ address.email }}</p>
                  <p class="mb-1 text-muted">{{ address.phoneNumber }}</p>
                  <p class="mb-1">{{ address.fullAddress }}</p>
                  <span v-if="address.isDefault" class="badge bg-dark border mt-2">Alamat pengiriman default</span>
                </div>
                <div>
                  <router-link to="/edit-address" class="text-decoration-underline small">Edit</router-link>
                </div>
              </div>
              <div v-else class="p-3">
                  <p class="text-muted">Alamat pengiriman utama tidak ditemukan.</p>
              </div>
              <router-link to="/add-address" class="btn btn-outline-dark mt-3 m-3 px-4 py-2 fw-bold">Atur Alamat</router-link>
            </div>
            
            <router-link 
              to="/payment" 
              class="btn btn-dark w-100 mt-4 py-2 fw-bold text-white text-decoration-none"
            >
              Lanjutkan ke Pembayaran
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styling khusus untuk komponen ini jika diperlukan */
.btn-dark {
    display: block;
    text-align: center;
}
</style>