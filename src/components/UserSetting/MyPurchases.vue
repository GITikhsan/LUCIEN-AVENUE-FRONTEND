<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router'; // Pastikan RouterLink di-import
import axios from 'axios';

// State untuk menampung data, loading, dan pesan error
const purchases = ref([]);
const isLoading = ref(true);
const errorMessage = ref('');

// Fungsi untuk mengambil riwayat pembelian dari API
async function fetchPurchases() {
  isLoading.value = true;
  errorMessage.value = ''; // Reset pesan error setiap kali fetch
  try {
    const response = await axios.get('/orders');
    
    // PERBAIKAN: Ambil array dari dalam properti 'data' pada respons
    purchases.value = response.data.data; 

  } catch (error) {
    errorMessage.value = "Gagal memuat riwayat pembelian. Silakan coba lagi nanti.";
    console.error("Failed to fetch purchases:", error);
  } finally {
    isLoading.value = false;
  }
}

// Panggil fungsi di atas saat komponen pertama kali dimuat
onMounted(fetchPurchases);
</script>

<template>
  <div class="container py-5">
    <h2 class="fw-bold text-center mb-5">MY PURCHASES</h2>

    <div v-if="isLoading" class="text-center">
      <p>Loading purchase history...</p>
      </div>

    <div v-else-if="errorMessage" class="alert alert-danger text-center">
      {{ errorMessage }}
    </div>

    <div v-else-if="purchases.length === 0" class="text-center card shadow-sm p-4 mx-auto" style="max-width: 500px;">
      <h5 class="card-title">You Have No Purchase History</h5>
      <p class="card-text text-muted">Let's start your shopping adventure and find your favorite products!</p>
      <div class="mt-3">
        <RouterLink to="/viewmore" class="btn btn-success">
          Start Shopping
        </RouterLink>
      </div>
    </div>

    <div v-else class="row justify-content-center g-4">
      <div v-for="order in purchases" :key="order.pesanan_id" class="col-md-10">
        <div class="card shadow-sm p-3">
          <div class="d-flex justify-content-between small text-muted mb-2">
            <span>ORDER: #{{ order.pesanan_id }}</span>
            <span>DATE: {{ new Date(order.created_at).toLocaleDateString('id-ID') }}</span>
          </div>
          <hr class="mt-0"/>

          <div v-for="item in order.items" :key="item.barang_pesanan_id" class="d-flex align-items-center mb-3">
            <img v-if="item.product" :src="item.product.image_url" :alt="item.product.nama_sepatu" class="rounded me-3" style="width: 80px; height: 80px; object-fit: cover;" />
            <div class="flex-grow-1">
              <div class="fw-semibold">{{ item.product ? item.product.nama_sepatu : 'Produk tidak ditemukan' }}</div>
              <div class="text-muted small">x{{ item.quantity }}</div>
              <div class="text-danger fw-bold">
                IDR {{ Number(item.harga).toLocaleString('id-ID') }}
              </div>
            </div>
          </div>
          
          <hr/>
          <div class="text-end fw-bold">
             Total Orders: <span class="text-danger">IDR {{ Number(order.jumlah_total).toLocaleString('id-ID') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Anda bisa menambahkan style kustom di sini jika perlu */
</style>