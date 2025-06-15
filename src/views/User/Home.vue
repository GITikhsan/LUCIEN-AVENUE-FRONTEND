<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'
import ProductGrid from '@/views/User/ProductGrid.vue'

const products = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/products')
    products.value = response.data
  } catch (error) {
    console.error('Gagal mengambil produk:', error)
  }
})
</script>
  
<template>
   <!-- Header Section -->
  <header class="header-section d-flex align-items-center justify-content-center text-white text-center">
   <div class="position-relative w-100 vh-100 bg-cover bg-center d-flex align-items-center justify-content-center text-center text-white"
     style="background-image: url('/public/images/M_BC_SHOES_LVTrainerDenim_Mars_01_DI3.webp'); background-size: cover; background-position: center;">
    
    <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
    
    <div class="container position-relative z-1">
        <h2 class="display-4 fw-bold text-uppercase mb-4">Your Fashion, Your Future</h2>
        <p class="lead mb-4">Explore the world of stylish sneakers 🌍</p>
        <RouterLink to="ViewMore" class="btn px-4 py-2 fw-semibold"
          style="backdrop-filter: blur(10px); background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); border-radius: 12px; color: #fff; transition: all 0.3s ease;">
          Explore Now
        </RouterLink>

    </div>
    </div>
  </header>
 <section class="py-5 text-center">
    <div class="container">
      <ProductGrid :products="products" title="Our Featured Products" />
    </div>
  </section>

  <!-- Banner Men -->
  <section>
        <div class="position-relative w-100 vh-100 bg-cover bg-center d-flex align-items-center justify-content-center text-center text-white"Add commentMore actions
     style="background-image: url('/public/images/fashion/Men.JPG'); background-size: cover; background-position: center;">
    
    <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
    
    <div class="container position-relative z-1">
        <h2 class="display-4 fw-bold text-uppercase mb-4">Men Products</h2>
        
        <RouterLink to="ViewMore" class="btn px-4 py-2 fw-semibold"
          style="backdrop-filter: blur(10px); background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); border-radius: 12px; color: #fff; transition: all 0.3s ease;">
          Explore Now
        </RouterLink>

    </div>
    </div>
  </section>

  <!-- Featured Men Products -->
  <section class="py-5 text-center">
    <div class="container">
      <ProductGrid :products="products" title="Our Featured Men Products" />
    </div>
  </section>

  <!-- Banner Women -->
  <section>
    <div class="position-relative w-100 vh-100 bg-cover bg-center d-flex align-items-center justify-content-center text-center text-white"Add commentMore actions
     style="background-image: url('/public/images/fashion/sepatu11.png'); background-size: cover; background-position: center;">
    
    <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
    
    <div class="container position-relative z-1">
        <h2 class="display-4 fw-bold text-uppercase mb-4">Women Products</h2>
        
        <RouterLink to="ViewMore" class="btn px-4 py-2 fw-semibold"
          style="backdrop-filter: blur(10px); background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); border-radius: 12px; color: #fff; transition: all 0.3s ease;">
          Explore Now
        </RouterLink>

    </div>
    </div>
  </section>

  <!-- Featured Women Products -->
  <section class="py-5 text-center">
    <div class="container">
      <ProductGrid :products="products" title="Our Featured Women Products" />
    </div>
  </section>

</template>