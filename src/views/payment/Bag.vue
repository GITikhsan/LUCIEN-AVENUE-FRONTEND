<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartItems = ref([]);
const isLoading = ref(true);
const isRemoving = ref(null);
const error = ref(null);

// --- Modal states ---
const showModal = ref(false);
const modalMessage = ref('');
const modalType = ref('info'); // 'info' | 'error' | 'confirm'
const confirmCallback = ref(null);

// --- Total Harga ---
const grandTotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    const price = item.product?.price || 0;
    const quantity = item.kuantitas || 0;
    return total + price * quantity;
  }, 0);
});

// --- Format Rupiah ---
const formatCurrency = (value) => {
  return Number(value).toLocaleString('id-ID');
};

// --- Fetch Cart ---
const fetchCartItems = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get('/carts');
    cartItems.value = res.data.data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal memuat keranjang.';
  } finally {
    isLoading.value = false;
  }
};

// --- Konfirmasi Hapus ---
const askConfirm = (message, onConfirm) => {
  modalMessage.value = message;
  modalType.value = 'confirm';
  confirmCallback.value = onConfirm;
  showModal.value = true;
};

// --- Hapus Item ---
const removeItem = async (id) => {
  askConfirm("Yakin ingin menghapus item ini?", async () => {
    isRemoving.value = id;
    showModal.value = false;
    try {
      await axios.delete(`/carts/${id}`);
      await fetchCartItems();
      showInfo("Item berhasil dihapus!");
    } catch {
      showInfo("Gagal menghapus item.");
    } finally {
      isRemoving.value = null;
    }
  });
};

// --- Show Info Modal ---
const showInfo = (message) => {
  modalMessage.value = message;
  modalType.value = 'info';
  confirmCallback.value = null; // Tambahkan ini agar modal tidak looping
  showModal.value = true;
};

// --- Lifecycle ---
onMounted(() => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    fetchCartItems();
  } else {
    modalMessage.value = "Silakan login terlebih dahulu.";
    modalType.value = 'info';
    showModal.value = true;
    confirmCallback.value = () => router.push('/login');
  }
});
</script>

<template>
  <div class="bg-light min-vh-100 py-5">
    <div class="container">
      <router-link to="/viewmore" class="text-decoration-none text-dark mb-3 d-inline-block">← Lanjutkan Belanja</router-link>
      <h2 class="fw-bold mb-3">Keranjang Kamu</h2>

      <div v-if="isLoading" class="text-center p-5">
        <div class="spinner-border text-dark" role="status"></div>
        <p class="mt-3">Memuat keranjang...</p>
      </div>

      <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-else-if="cartItems.length > 0" class="vstack gap-4">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="bg-white p-4 rounded shadow-sm d-flex flex-column flex-md-row gap-4 align-items-center"
        >
          <img
            :src="item.product.image_url"
            class="rounded shadow cart-img"
            alt="Gambar Produk"
          />
          <div class="flex-grow-1 text-center text-md-start">
            <h5 class="fw-semibold">{{ item.product.name }}</h5>
            <p class="mb-1 text-muted">Jumlah: {{ item.kuantitas }}</p>
            <p class="fw-bold text-success">Rp {{ formatCurrency(item.product.price) }}</p>
          </div>
          <button class="btn btn-outline-danger" @click="removeItem(item.id)" :disabled="isRemoving === item.id">
            <span v-if="isRemoving === item.id" class="spinner-border spinner-border-sm"></span>
            <i v-else class="bi bi-trash3"></i>
          </button>
        </div>

        <div class="d-flex justify-content-between align-items-center bg-white rounded shadow-sm p-4 mt-4">
          <h4>Total: <span class="text-success">Rp {{ formatCurrency(grandTotal) }}</span></h4>
          <router-link to="/checkout" class="btn btn-success btn-lg rounded-pill px-5">Checkout</router-link>
        </div>
      </div>

      <div v-else class="text-center bg-white p-5 rounded shadow-sm">
        <h5 class="text-muted">Keranjang kamu kosong 😢</h5>
        <router-link to="/viewmore" class="btn btn-dark mt-3">Cari Produk</router-link>
      </div>
    </div>

    <!-- Modal Pop-up -->
    <div v-if="showModal" class="modal-backdrop fade show"></div>
    <div v-if="showModal" class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center">
          <div class="modal-body py-4 px-3">
            <p class="fs-6 mb-0">{{ modalMessage }}</p>
          </div>
          <div class="modal-footer justify-content-center border-0 pt-0 pb-4">
            <template v-if="modalType === 'confirm'">
              <button class="btn btn-secondary px-4" @click="showModal = false">Batal</button>
              <button class="btn btn-danger px-4" @click="confirmCallback()">Ya</button>
            </template>
            <template v-else>
              <button class="btn btn-dark px-4" @click="confirmCallback ? confirmCallback() : (showModal = false)">OK</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
