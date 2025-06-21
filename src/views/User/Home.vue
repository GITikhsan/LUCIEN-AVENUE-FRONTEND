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
    const response = await axios.get('http://127.0.0.1:8000/api/products', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    products.value = response.data.data.data

    // ✅ Pilih produk berdasarkan ID
    // Contoh: Ambil 4 produk pertama sebagai featuredProducts
    featuredProducts.value = products.value.slice(0, 8)
    featuredMen.value = products.value.filter(p => p.gender === 'Pria').slice(0, 8)
    featuredWomen.value = products.value.filter(p => p.gender === 'Wanita').slice(0, 8)

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
  <section class="py-5 text-center">
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
  <section class="py-5 text-center">
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
  <section class="py-5 text-center">
    <div class="container">
      <ProductGrid :products="featuredWomen" title="Our Featured Women Products" />
    </div>
  </section>
</template>
