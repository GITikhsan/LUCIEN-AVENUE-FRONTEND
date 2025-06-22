<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const backendUrl = 'http://127.0.0.1:8000';
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
const promoCode = ref('');
const isApplyingPromo = ref(false);
const promoMessage = ref('');
const promoMessageType = ref('error'); // 'error' atau 'success'



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

    // Inisialisasi properti diskon jika tidak ada dari API
    if (!response.data.hasOwnProperty('discount')) {
        response.data.discount = 0;
    }

    // HITUNG SUBTOTAL SECARA MANUAL (LEBIH AMAN)
    const calculatedSubtotal = response.data.products.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
    }, 0);
    
    // Tetapkan subtotal dan total awal
    response.data.subtotal = calculatedSubtotal;
    // Jika API tidak memberikan total, kita bisa set dari subtotal
    if (!response.data.hasOwnProperty('total')) {
        response.data.total = calculatedSubtotal;
    }

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

// ... di dalam file komponen Vue.js Anda

const applyPromoCode = async () => {
    if (!promoCode.value.trim() || !order.value.products) return;

    isApplyingPromo.value = true;
    promoMessage.value = '';

    try {
        // =================================================================
        // PERBAIKI BAGIAN INI
        // =================================================================

        // 1. Kumpulkan produk dengan format { productId, quantity }
        const productsWithQuantity = order.value.products.map(p => ({
            productId: p.productId, // Pastikan nama properti ini sesuai dengan data 'order' Anda
            quantity: p.quantity    // Pastikan nama properti ini juga sesuai
        }));

        // 2. Siapkan payload baru dengan struktur yang benar
        const payload = {
            coupon_code: promoCode.value,
            products: productsWithQuantity // Kirim array objek, bukan array ID
        };
        
        // =================================================================
        // AKHIR DARI PERBAIKAN
        // =================================================================
        
        // 3. Panggil endpoint (baris ini tidak perlu diubah)
        const response = await axios.post('/promotions/apply-coupon', payload);
        
        // ... sisa kodenya tidak perlu diubah ...
        if (response.data.success) {
            order.value.discount = response.data.discount;
            order.value.total = response.data.final_total;
            
            promoMessageType.value = 'success';
            promoMessage.value = response.data.message;
        }

    } catch (err) {
        promoMessageType.value = 'error';
        // Ini akan menampilkan pesan error dari Laravel dengan lebih baik
        promoMessage.value = err.response?.data?.message || 'Gagal menerapkan kode promo.';
    } finally {
        isApplyingPromo.value = false;
    }
};


  const startPayment = async () => {
  try {
    if (!address.value) {
      alert("Alamat belum tersedia.");
      return;
    }

    // 1. Buat order dari cart
    const orderResponse = await axios.post('/order/create-from-cart');
    const pesananId = orderResponse.data.pesanan_id;

    // 2. Simpan pesanan_id ke order state
    order.value.pesanan_id = pesananId;

    // 3. Kirim ke Midtrans
    const response = await axios.post('/payment', {
      amount: order.value.total,
      name: address.value?.recipientName || 'Customer',
      email: address.value?.email || 'test@email.com',
      pesanan_id: pesananId,
      metode_pembayaran: 'midtrans'
    });

    const snapToken = response.data.token;

    // 4. Panggil popup Midtrans
    window.snap.pay(snapToken, {
      onSuccess: (result) => {
        console.log('Pembayaran sukses:', result);
        router.push('/order-success');
      },
      onPending: (result) => {
        console.log('Menunggu pembayaran:', result);
        router.push('/myPurchases');
      },
      onError: (result) => {
        console.error('Pembayaran gagal:', result);
        alert("Pembayaran gagal. Silakan coba lagi.");
      },
      onClose: () => {
  console.log('Popup Midtrans ditutup oleh pengguna.');
  alert('Anda menutup jendela pembayaran. Pesanan Anda telah dibuat dan menunggu pembayaran. Anda bisa melihat detailnya di halaman riwayat pesanan.');
  // Jika Anda ingin mengarahkannya ke halaman tertentu setelah alert ditutup,
  // Anda bisa tambahkan router.push di sini, misalnya kembali ke keranjang.
  // router.push('/cart'); 
}
    });

  } catch (err) {
    console.error("Gagal memulai pembayaran:", err.response?.data?.message || err.message);
    alert("Terjadi kesalahan saat memproses pembayaran.");
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
                <img v-if="product.images && product.images.length > 0"
     :src="backendUrl + product.images[0].image_path"
     alt="Product image"
     class="img-fluid rounded me-3"
     style="width: 60px; height: 60px; object-fit: contain;">
                <div>
                  <h6 class="mb-1">{{ product.nama_sepatu }}</h6>
                  <small v-if="product.size">Ukuran: {{ product.size }}</small><br>
                  <small>Jumlah: {{ product.quantity }}</small>
                </div>
                <div class="ms-auto text-end">
                  <p class="mb-0">Rp {{ formatCurrency(product.price) }}</p>
                </div>
              </div>
            
              <hr>

              <div class="mb-3">
                 <label for="promoCode" class="form-label">Kode Promo</label>
                 <div class="input-group">
                   <input 
                     type="text" 
                     id="promoCode"
                     class="form-control" 
                     placeholder="Masukkan kode promo" 
                     v-model="promoCode"
                     :disabled="isApplyingPromo">
                   <button 
                     class="btn btn-outline-dark" 
                     type="button" 
                     @click="applyPromoCode" 
                     :disabled="isApplyingPromo || !promoCode.trim()">
                     <span v-if="isApplyingPromo" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                     <span v-else>Apply</span>
                   </button>
                 </div>
                 <div v-if="promoMessage" :class="`mt-2 small text-${promoMessageType === 'success' ? 'success' : 'danger'}`">
                   {{ promoMessage }}
                 </div>
              </div>
              
              <hr>

              <div class="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>Rp {{ formatCurrency(order.subtotal) }}</span>
              </div>
              <div v-if="order.discount > 0" class="d-flex justify-content-between text-success">
                <span>Diskon</span>
                <span>- Rp {{ formatCurrency(order.discount) }}</span>
              </div>

              <hr class="my-2">

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
            <router-link to="/addaddress" class="btn btn-outline-dark mt-3 m-3 px-4 py-2 fw-bold">Atur Alamat</router-link>
          </div>
          
          <button 
  class="btn btn-dark w-100 mt-4 py-2 fw-bold text-white"
  @click="startPayment"
  :disabled="!order || !address"
>
  Pay now
</button>
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
.text-success {
    color: #198754 !important;
}
.text-danger {
    color: #dc3545 !important;
}
</style>