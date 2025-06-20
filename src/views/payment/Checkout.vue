<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// =================================================================
// BAGIAN PALING PENTING UNTUK MENGATASI ERROR 401
// =================================================================

// 1. Tentukan Base URL API Laravel Anda
const API_BASE_URL = 'http://127.0.0.1:8000/api';
axios.defaults.baseURL = API_BASE_URL;

// 2. Ambil token dari localStorage (diasumsikan sudah disimpan saat login)
const token = localStorage.getItem('auth_token');

// 3. Jika token ada, pasang sebagai header default untuk SEMUA request axios
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  // Jika tidak ada token, idealnya jangan biarkan user masuk halaman ini
  console.error("Tidak ada token autentikasi. Harap login terlebih dahulu.");
  // Anda bisa menambahkan logika untuk redirect ke halaman login di sini
  // router.push('/login'); 
}

// =================================================================
// State Management Komponen
// =================================================================
const order = ref(null);
const address = ref(null);
const selectedPaymentMethod = ref('');
const isLoading = ref(true);
const isProcessing = ref(false);
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
// API Calls (Memanggil endpoint relatif yang sudah benar)
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
    const errorMessage = err.response?.data?.message || 'Gagal mengambil data alamat.';
    console.error("Error fetching default address:", err.response);
    throw new Error(errorMessage);
  }
};

// =================================================================
// Lifecycle Hook
// =================================================================
onMounted(async () => {
  // Pastikan ada token sebelum mencoba fetch data
  if (!token) {
      error.value = "Anda harus login untuk melihat halaman ini.";
      isLoading.value = false;
      return; // Hentikan eksekusi jika tidak ada token
  }

  try {
    await Promise.all([
        fetchOrderSummary(), 
        // fetchDefaultAddress()
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
              <hr>
              <div class="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>Rp {{ formatCurrency(order.subtotal) }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span>Ongkir</span>
                <span>Rp {{ formatCurrency(order.shippingCost) }}</span>
              </div>
              <hr>
              <div class="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>Rp {{ formatCurrency(order.total) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-5 order-lg-1">
          <form @submit.prevent="payNow">
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
                  <p>Alamat tidak ditemukan.</p>
              </div>
              <router-link to="/add-address" class="btn btn-outline-dark mt-3 m-3 px-4 py-2 fw-bold">Tambah Alamat Baru</router-link>
            </div>

            <h5 class="mt-4">Metode Pembayaran</h5>
            <div class="card p-3">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="pembayaran" id="transfer" value="transfer_bank" v-model="selectedPaymentMethod">
                    <label class="form-check-label" for="transfer">Transfer Bank</label>
                </div>
                <hr class="my-2">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="pembayaran" id="ewallet" value="e-wallet" v-model="selectedPaymentMethod">
                    <label class="form-check-label" for="ewallet">E-Wallet (OVO, DANA, dll)</label>
                </div>
            </div>

            <button type="submit" class="btn btn-dark w-100 mt-4 py-2 fw-bold" :disabled="isProcessing">
              <span v-if="isProcessing" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-else>Bayar Sekarang</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
/* Styling khusus untuk komponen ini jika diperlukan */
.form-check {
  padding: 0.5rem 1rem;
}
.btn:disabled {
  cursor: not-allowed;
}
</style>