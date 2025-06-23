<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const backendUrl = "http://127.0.0.1:8000";

// State Management
const router = useRouter();
const cartItems = ref([]);
const isLoading = ref(true);
const isRemoving = ref(null);
const error = ref(null);

// Modal states
const showModal = ref(false);
const modalMessage = ref("");
const modalType = ref("info"); // 'info' | 'error' | 'confirm'
const confirmCallback = ref(null);
const cancelCallback = ref(null); // [TAMBAHAN] State untuk callback tombol cancel

// Computed Property untuk Total Harga
const grandTotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    const price = item.product?.harga_retail || 0;
    const quantity = item.kuantitas || 0;
    return total + price * quantity;
  }, 0);
});

// Helper Functions
const formatCurrency = (value) => {
  return Number(value).toLocaleString("id-ID");
};

// API Calls
const fetchCartItems = async () => {
  console.log("Cart items:", cartItems.value);
  isLoading.value = true;
  try {
    const res = await axios.get("/carts");
    cartItems.value = res.data.data;
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to load cart.";
  } finally {
    isLoading.value = false;
  }
};

const updateQuantity = async (item, delta) => {
  const newQty = item.kuantitas + delta; // Tidak perlu 'if (newQty < 1) return;' karena validasi sudah ada di setQuantity
  await setQuantity(item, newQty);
};

// [TAMBAHAN] Fungsi baru ini menjadi pusat logika untuk validasi dan update
const setQuantity = async (item, quantity) => {
  const stock = item.product?.stok || 0;
  let newQty = Number(quantity); // Pastikan tipenya angka

  // Validasi: kuantitas tidak boleh kurang dari 1
  if (isNaN(newQty) || newQty < 1) {
    // Jika tidak valid (misal: pengguna menghapus angka), jangan lakukan apa-apa atau reset ke 1
    // Untuk pengalaman terbaik, kita biarkan validasi @change yang menanganinya,
    // tapi untuk tombol, kita pastikan tidak di bawah 1.
    if (quantity < 1) return; // Untuk klik tombol minus di angka 1
    newQty = 1;
  }

  // Validasi: kuantitas tidak boleh melebihi stok
  if (newQty > stock) {
    newQty = stock;
    showInfo(`Maximum stock for this item is ${stock}.`);
  }

  // Update nilai di frontend agar input field sinkron
  item.kuantitas = newQty;

  try {
    // Kirim request ke backend hanya dengan nilai yang sudah divalidasi
    await axios.put(`/carts/${item.id}`, { kuantitas: newQty });
  } catch {
    showInfo("Failed to update quantity.");
    // Jika gagal, ambil ulang data dari server agar konsisten
    fetchCartItems();
  }
};

// [PERUBAHAN] Fungsi closeModal untuk menjadi default action
const closeModal = () => {
  showModal.value = false;
};

// Modal Functions
const askConfirm = (message, onConfirm) => {
  modalMessage.value = message;
  modalType.value = "confirm";
  confirmCallback.value = onConfirm;
  // [PERUBAHAN] Atur callback cancel ke default (hanya tutup modal)
  cancelCallback.value = closeModal;
  showModal.value = true;
};

const showInfo = (message) => {
  modalMessage.value = message;
  modalType.value = "info";
  confirmCallback.value = null;
  showModal.value = true;
};

const removeItem = async (item) => {
  const productName =
    item.product?.nama_sepatu || item.product?.name || "this item";
  const confirmationMessage = `Are you sure you want to remove "${productName}" from your cart?`;

  askConfirm(confirmationMessage, async () => {
    isRemoving.value = item.id;
    showModal.value = false;
    try {
      await axios.delete(`/carts/${item.id}`);
      await fetchCartItems();
      showInfo("Item removed successfully!");
    } catch {
      showInfo("Failed to remove item.");
    } finally {
      isRemoving.value = null;
    }
  });
};

// Lifecycle Hook
onMounted(() => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchCartItems();
  } else {
    // [PERUBAHAN] Logika untuk modal saat belum login
    modalMessage.value =
      "You need to log in to view your cart. Do you want to log in now?";
    modalType.value = "confirm";
    showModal.value = true;

    // Aksi untuk tombol "Yes" -> ke halaman login
    confirmCallback.value = () => {
      showModal.value = false;
      router.push("/login");
    };

    // [PERUBAHAN] Aksi untuk tombol "Cancel" -> ke halaman home
    cancelCallback.value = () => {
      showModal.value = false;
      router.push("/"); // Mengarahkan ke homepage
    };
  }
});
</script>

<template>
  <div class="bg-light min-vh-100 py-5">
    <div class="container">
      <router-link
        to="/viewmore"
        class="continue-flat-link d-inline-flex align-items-center gap-2 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="icon-back"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"
          />
        </svg>
        <span>Continue Shopping</span>
      </router-link>

      <h2 class="fw-bold mb-3">Your Cart</h2>

      <div v-if="isLoading" class="text-center p-5">
        <div class="spinner-border text-dark" role="status"></div>
        <p class="mt-3">Loading your cart...</p>
      </div>

      <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-else-if="cartItems.length > 0" class="vstack gap-4">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="bg-white p-4 rounded shadow-sm d-flex flex-column flex-md-row gap-4 align-items-center"
        >
          <img
            v-if="
              item.product &&
              item.product.images &&
              item.product.images.length > 0
            "
            :src="backendUrl + item.product.images[0].image_path"
            alt="Product image"
            class="img-fluid rounded shadow cart-img"
            style="max-height: 160px; object-fit: contain"
          />

          <div class="flex-grow-1 text-center text-md-start">
            <h5 class="fw-semibold">
              {{ item.product.nama_sepatu || item.product.name }}
            </h5>
            <small class="text-muted d-block"
              >Stock: {{ item.product?.stok }}</small
            >

            <div
              class="d-flex justify-content-start align-items-center gap-3 mt-2"
            >
              <button
                class="qty-icon-btn"
                @click="updateQuantity(item, -1)"
                :disabled="item.kuantitas <= 1"
                aria-label="Decrease quantity"
              >
                <i class="bi bi-dash-lg"></i>
              </button>

              <input
                type="number"
                class="qty-icon-input"
                v-model.number="item.kuantitas"
                @change="setQuantity(item, $event.target.value)"
                min="1"
                :max="item.product?.stok || 1"
              />

              <button
                class="qty-icon-btn"
                @click="updateQuantity(item, 1)"
                :disabled="item.kuantitas >= (item.product?.stok || 0)"
                aria-label="Increase quantity"
              >
                <i class="bi bi-plus-lg"></i>
              </button>
            </div>
            <p class="fw-bold text-success mt-2">
              Rp {{ formatCurrency(item.product.harga_retail) }}
            </p>
          </div>

          <button
            class="btn-delete-item"
            @click="removeItem(item)"
            :disabled="isRemoving === item.id"
            aria-label="Remove item"
          >
            <span
              v-if="isRemoving === item.id"
              class="spinner-border spinner-border-sm"
            ></span>
            <i v-else class="bi bi-trash"></i>
          </button>
        </div>

        <div
          class="d-flex justify-content-between align-items-center bg-white rounded shadow-sm p-4 mt-4"
        >
          <h4>
            Total:
            <span class="text-success"
              >Rp {{ formatCurrency(grandTotal) }}</span
            >
          </h4>
          <router-link
            to="/checkout"
            class="btn btn-success btn-lg rounded-pill px-5"
            >Checkout</router-link
          >
        </div>
      </div>

      <div v-else class="text-center bg-white p-5 rounded shadow-sm">
        <h5 class="text-muted">Your cart is empty 😢</h5>
        <router-link to="/viewmore" class="btn btn-dark mt-3"
          >Find Products</router-link
        >
      </div>
    </div>

    <div v-if="showModal" class="modal-backdrop fade show"></div>
    <div v-if="showModal" class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center">
          <div class="modal-body py-4 px-3">
            <p class="fs-6 mb-0">{{ modalMessage }}</p>
          </div>
          <div class="modal-footer justify-content-center border-0 pt-0 pb-4">
            <template v-if="modalType === 'confirm'">
              <button class="btn btn-secondary px-4" @click="cancelCallback">
                Cancel
              </button>
              <button class="btn btn-danger px-4" @click="confirmCallback()">
                Yes
              </button>
            </template>
            <template v-else>
              <button
                class="btn btn-dark px-4"
                @click="
                  confirmCallback ? confirmCallback() : (showModal = false)
                "
              >
                OK
              </button>
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
/* Menghilangkan panah di Chrome, Safari, Edge, dan Opera */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Menghilangkan panah di Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
@media (max-width: 768px) {
  .cart-img {
    width: 100px;
    height: 100px;
  }
}
.continue-flat-link {
  font-size: 14px;
  font-weight: 500;
  color: #444;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.continue-flat-link:hover {
  background-color: #f2f2f2;
  color: #000;
}

.icon-back {
  transition: transform 0.2s ease;
}

.continue-flat-link:hover .icon-back {
  transform: translateX(-3px);
}

.qty-icon-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
  padding: 4px;
  transition: color 0.2s ease, transform 0.15s ease;
}

.qty-icon-btn:hover:not(:disabled) {
  color: #000;
  transform: scale(1.2);
}

.qty-icon-btn:active:not(:disabled) {
  transform: scale(0.9);
}

.qty-icon-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-icon-input {
  width: 48px;
  height: 32px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-bottom: 1.5px solid #ccc;
  background: transparent;
  color: #111;
  transition: border-color 0.2s ease;
}

.qty-icon-input:focus {
  outline: none;
  border-color: #888;
}

.btn-delete-item {
  border: none;
  background: transparent;
  color: #888;
  font-size: 18px;
  transition: color 0.2s ease, transform 0.2s ease;
}

.btn-delete-item:hover {
  color: #dc3545; /* Bootstrap danger red */
  transform: scale(1.1);
}

.btn-delete-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
