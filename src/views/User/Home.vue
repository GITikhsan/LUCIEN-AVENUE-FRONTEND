<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'

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
        <a href="ViewMore" class="btn px-4 py-2 fw-semibold"
          style="backdrop-filter: blur(10px); background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); border-radius: 12px; color: #fff; transition: all 0.3s ease;">
          Explore Now
        </a>

    </div>
    </div>
  </header>
 <section class="py-5 text-center">
    <div class="container">
      <h2 class="mb-5 fw-bold">Our Featured Products</h2>
      <div class="row g-4">
        <div 
          v-for="(product, index) in products" 
          :key="index"
          class="col-12 col-sm-6 col-md-3 mb-4"
        >
          <div class="card border-0 rounded-4 shadow-sm overflow-hidden h-100 position-relative" style="transition: transform 0.3s ease;">
            <router-link :to="Product" class="stretched-link"></router-link>
            <div class="position-relative bg-white d-flex align-items-center justify-content-center" style="aspect-ratio: 4/3; padding: 1rem;">
              <img :src="products_image" :alt="products.nama_sepatu" class="img-fluid" style="object-fit: contain; max-height: 100%; max-width: 100%;" />
            </div>
            <div class="card-body text-start px-3 py-3 d-flex flex-column justify-content-between">
              <div style="min-height: 3.8em;">
                <h6 class="fw-semibold mb-2" style="font-size: 0.95rem; line-height: 1.2em;">
                  {{ products.nama_sepatu }}
                </h6>
              </div>
              <div>
                <p class="fw-bold mb-0 text-success" style="font-size: 1rem;">
                  {{ products.harga_retail }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-4 pt-2 text-center">
        <router-link to="/viewmore"
          class="btn btn-dark rounded-pill px-4 py-2 fw-semibold shadow-sm"
          style="font-size: 0.9rem; transition: all 0.3s ease;">
          Explore Now
        </router-link>
      </div>
    </div>
  </section>
 
  <section>
     <div class="position-relative w-100 vh-100 bg-cover bg-center d-flex align-items-center justify-content-center text-center text-white"
     style="background-image: url('/public/images/fashion/Men.JPG'); background-size: cover; background-position: center;">
    
    <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
    
    <div class="container position-relative z-1">
        <h2 class="display-4 fw-bold text-uppercase mb-4">Men Products</h2>
        
        <a href="ViewMore" class="btn px-4 py-2 fw-semibold"
          style="backdrop-filter: blur(10px); background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); border-radius: 12px; color: #fff; transition: all 0.3s ease;">
          Explore Now
        </a>

    </div>
    </div>
  </section>

  <!-- Featured Products Section -->
  <section class="py-5 text-center">
    <div class="container">
      <h2 class="mb-5 fw-bold">Our Featured Products</h2>
      <div class="row g-4">
        <div 
          v-for="(product, index) in products" 
          :key="index"
          class="col-12 col-sm-6 col-md-3 mb-4"
        >
          <div class="card border-0 rounded-4 shadow-sm overflow-hidden h-100 position-relative" style="transition: transform 0.3s ease;">
            <router-link :to="Product" class="stretched-link"></router-link>
            <div class="position-relative bg-white d-flex align-items-center justify-content-center" style="aspect-ratio: 4/3; padding: 1rem;">
              <img :src="product.image" :alt="products.nama_sepatu" class="img-fluid" style="object-fit: contain; max-height: 100%; max-width: 100%;" />
            </div>
            <div class="card-body text-start px-3 py-3 d-flex flex-column justify-content-between">
              <div style="min-height: 3.8em;">
                <h6 class="fw-semibold mb-2" style="font-size: 0.95rem; line-height: 1.2em;">
                  {{ product.nama_sepatu }}
                </h6>
              </div>
              <div>
                <p class="fw-bold mb-0 text-success" style="font-size: 1rem;">
                  {{ products.harga_retail }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 pt-2 text-center">
        <router-link to="/viewmore"
          class="btn btn-dark rounded-pill px-4 py-2 fw-semibold shadow-sm"
          style="font-size: 0.9rem; transition: all 0.3s ease;">
          Explore Now
        </router-link>
      </div>
    </div>
  </section>

  <section>
     <div class="position-relative w-100 vh-100 bg-cover bg-center d-flex align-items-center justify-content-center text-center text-white"
     style="background-image: url('/public/images/fashion/sepatu11.png'); background-size: cover; background-position: center;">
    
    <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
    
    <div class="container position-relative z-1">
        <h2 class="display-4 fw-bold text-uppercase mb-4">Women Products</h2>
  
        <a href="ViewMore" class="btn px-4 py-2 fw-semibold"
          style="backdrop-filter: blur(10px); background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); border-radius: 12px; color: #fff; transition: all 0.3s ease;">
          Explore Now
        </a>

    </div>
    </div>
  </section>
  <!-- Featured Products Section -->
  <section class="py-5 text-center">
    <div class="container">
      <h2 class="mb-5 fw-bold">Our Featured Women Products</h2>
      <div class="row g-4">
        <!-- Card Product -->
        <!-- Ulangi blok ini sesuai jumlah produk -->
        
       <section class="py-5 text-center">
    <div class="container">
      
      <div class="row g-4">
        <div 
          v-for="(product, index) in products" 
          :key="index"
          class="col-12 col-sm-6 col-md-3 mb-4"
        >
          <div class="card border-0 rounded-4 shadow-sm overflow-hidden h-100 position-relative" style="transition: transform 0.3s ease;">
            <router-link :to="Product" class="stretched-link"></router-link>
            <div class="position-relative bg-white d-flex align-items-center justify-content-center" style="aspect-ratio: 4/3; padding: 1rem;">
              <img :src="product.image" :alt="products.nama_sepatu" class="img-fluid" style="object-fit: contain; max-height: 100%; max-width: 100%;" />
            </div>
            <div class="card-body text-start px-3 py-3 d-flex flex-column justify-content-between">
              <div style="min-height: 3.8em;">
                <h6 class="fw-semibold mb-2" style="font-size: 0.95rem; line-height: 1.2em;">
                  {{ products.nama_sepatu }}
                </h6>
              </div>
              <div>
                <p class="fw-bold mb-0 text-success" style="font-size: 1rem;">
                  {{ products.harga_retail }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 pt-2 text-center">
        <router-link to="/viewmore"
          class="btn btn-dark rounded-pill px-4 py-2 fw-semibold shadow-sm"
          style="font-size: 0.9rem; transition: all 0.3s ease;">
          Explore Now
        </router-link>
      </div>
    </div>
  </section>

      </div>
      
    </div>
  </section>

</template>