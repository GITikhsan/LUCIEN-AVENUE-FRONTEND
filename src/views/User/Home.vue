<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ProductGrid from '@/views/User/ProductGrid.vue'

const products = ref([])
const featuredProducts = ref([])
const featuredMen = ref([])
const featuredWomen = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/products')
    products.value = response.data.data.data

    featuredProducts.value = products.value.filter(p => [52].includes(p.produk_id))
    featuredMen.value = products.value.filter(p => [5, 6, 7, 10].includes(p.produk_id))
    featuredWomen.value = products.value.filter(p => [1, 2, 3, 4].includes(p.produk_id))
  } catch (error) {
    console.error('❌ Gagal mengambil produk:', error)
  }
})
</script>

<template>
  <!-- Header Section -->
  <header class="header-section d-flex align-items-center justify-content-center text-white text-center">
    <div class="position-relative w-100 vh-100 bg-cover bg-center d-flex align-items-center justify-content-center text-center text-white"
      style="background-image: url('/public/images/fashion/sigma.webp'); background-size: cover; background-position: center;">
      <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
      <div class="container position-relative z-1">
        <h2 class="display-4 fw-bold text-uppercase mb-4">Your Fashion, Your Future</h2>
        <p class="lead mb-4">Explore the world of stylish sneakers 🌍</p>
      </div>
    </div>
  </header>

  <!-- Featured Products -->
  <section class="py-5 text-center home-section">
    <div class="container">
      <ProductGrid :products="featuredProducts" title="Our Featured Products" />
    </div>
  </section>

  <!-- Banner Men -->
  <section>
    <div class="position-relative w-100 vh-100 bg-cover bg-center d-flex align-items-center justify-content-center text-center text-white"
      style="background-image: url('/public/images/fashion/man.webp'); background-size: cover; background-position: center;">
      <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
      <div class="container position-relative z-1">
        <h2 class="display-4 fw-bold text-uppercase mb-4">Men Products</h2>
      </div>
    </div>
  </section>

  <!-- Featured Men Products -->
  <section class="py-5 text-center home-section">
    <div class="container">
      <ProductGrid :products="featuredMen" title="Our Featured Men Products" />
    </div>
  </section>

  <!-- Banner Women -->
  <section>
    <div class="position-relative w-100 vh-100 bg-cover bg-center d-flex align-items-center justify-content-center text-center text-white"
      style="background-image: url('/public/images/fashion/woman.webp'); background-size: cover; background-position: center;">
      <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
      <div class="container position-relative z-1">
        <h2 class="display-4 fw-bold text-uppercase mb-4">Women Products</h2>
      </div>
    </div>
  </section>

  <!-- Featured Women Products -->
  <section class="py-5 text-center home-section">
    <div class="container">
      <ProductGrid :products="featuredWomen" title="Our Featured Women Products" />
    </div>
  </section>
</template>

<style>
/* === DARK MODE: Perluas background ke semua elemen utama === */
body.dark-mode {
  background-color: #121212 !important;
  color: #eaeaea !important;
}

/* Atur semua section/container agar tidak putih */
body.dark-mode section,
body.dark-mode .container,
body.dark-mode main,
body.dark-mode .row,
body.dark-mode .py-5 {
  background-color: transparent !important;
  color: inherit !important;
}

/* Pastikan bagian kosong (antar section) tidak putih */
body.dark-mode .mt-4,
body.dark-mode .pt-2,
body.dark-mode .mb-4,
body.dark-mode .pb-4 {
  background-color: transparent !important;
}

/* Tombol Explore More di-dark-mode */
body.dark-mode .explore-btn {
  background-color: rgba(255, 255, 255, 0.85);
  color: #111;
}
body.dark-mode .explore-btn:hover {
  background-color: #ffffff;
  color: #000;
}

/* Tambahkan padding bawah agar footer tidak terlalu mepet */
body.dark-mode footer {
  background-color: #0e0e0e;
  padding-bottom: 2rem;
}
</style>
