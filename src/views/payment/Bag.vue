<template>
  <div class="bg-body-tertiary min-vh-100 py-5">
    <div class="container">
      <!-- Link Kembali -->
      <div class="mb-4">
        <a href="ViewMore" class="text-decoration-none text-secondary-emphasis fw-medium">
          ← Lanjutkan Belanja
        </a>
      </div>

      <!-- Header -->
      <div class="mb-4">
        <h2 class="fw-bold">Keranjang Kamu</h2>
        <p class="text-muted">Total: {{ products.length }} produk</p>
      </div>

      <!-- Cart Items -->
      <div v-if="products.length > 0" class="vstack gap-4">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="bg-white p-4 rounded-4 shadow-sm d-flex flex-column flex-md-row gap-4 align-items-center"
        >
          <!-- Gambar -->
          <img :src="product.image" :alt="product.model" class="cart-img shadow rounded-4" />

          <!-- Info -->
          <div class="flex-grow-1 text-center text-md-start">
            <h5 class="fw-semibold mb-1">{{ product.model }}</h5>
            <p class="text-muted small mb-1">Ukuran: {{ product.size }}</p>
            <p class="fw-bold text-primary fs-5 mb-0">Rp {{ product.price.toLocaleString('id-ID') }}</p>
          </div>

          <!-- Hapus -->
          <div>
            <button class="btn btn-outline-danger" @click="removeItem(index)">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Kosong -->
      <div v-else class="text-center bg-white p-5 rounded-4 shadow-sm mt-4">
        <h5 class="text-muted mb-3">Keranjang kamu kosong 😢</h5>
        <a href="ViewMore" class="btn btn-dark">Cari Produk</a>
      </div>

      <!-- Total & Checkout -->
      <div
        v-if="products.length > 0"
        class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-5 p-4 bg-white rounded-4 shadow-sm"
      >
        <h4 class="mb-3 mb-md-0">
          Total: <span class="text-success fw-bold">Rp {{ grandTotal.toLocaleString('id-ID') }}</span>
        </h4>
        <a href="Checkout" class="btn btn-success btn-lg px-5 py-2 rounded-4 shadow-sm">
          Checkout →
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          model: "Air Jordan 1 Low Illuminates Vivid Orange",
          size: 43,
          price: 3630000,
          image: "/images/3JT/3630.webp",
        },
        {
          model: "Air Jordan 1 Retro Low OG Mocha",
          size: 42,
          price: 2200000,
          image: "/images/2JT/2200.webp",
        },
      ],
    };
  },
  computed: {
    grandTotal() {
      return this.products.reduce((total, p) => total + p.price, 0);
    },
  },
  methods: {
    removeItem(index) {
      if (confirm("Yakin ingin menghapus produk ini?")) {
        this.products.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.cart-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  background-color: #f8f9fa;
  padding: 6px;
}
@media (max-width: 576px) {
  .cart-img {
    width: 65px;
    height: 65px;
  }
}
</style>
