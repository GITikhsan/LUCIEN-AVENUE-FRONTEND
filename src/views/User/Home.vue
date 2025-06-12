<script setup>
import { onMounted } from 'vue'



const products = [
  {
    name: "Air Jordan 1 Low Fragment x Travis Scott",
    price: "Rp 15.000.000",
    image: "/images/15JT/15000.webp",
    link: "/product" // pastikan ini sesuai route
  },
  {
    name: "Nike Dunk Low Retro Panda",
    price: "Rp 2.000.000",
    image: "/images/2JT/dunklowpanda.webp",
    link: "/product"
  },
  {
    name: "New Balance 550 White Grey",
    price: "Rp 3.100.000",
    image: "/images/3JT/nb550.webp",
    link: "/product"
  },
  {
    name: "Adidas Samba OG White Black",
    price: "Rp 1.750.000",
    image: "/images/1JT/samba.webp",
    link: "/product"
  }
]
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
            <router-link :to="product.link" class="stretched-link"></router-link>
            <div class="position-relative bg-white d-flex align-items-center justify-content-center" style="aspect-ratio: 4/3; padding: 1rem;">
              <img :src="product.image" :alt="product.name" class="img-fluid" style="object-fit: contain; max-height: 100%; max-width: 100%;" />
            </div>
            <div class="card-body text-start px-3 py-3 d-flex flex-column justify-content-between">
              <div style="min-height: 3.8em;">
                <h6 class="fw-semibold mb-2" style="font-size: 0.95rem; line-height: 1.2em;">
                  {{ product.name }}
                </h6>
              </div>
              <div>
                <p class="fw-bold mb-0 text-success" style="font-size: 1rem;">
                  {{ product.price }}
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
  <!-- Gallery Carousel -->
  <!-- <div id="galleryCarousel" class="carousel slide container py-5" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="/public/images/4JT/4,240,000.png" class="d-block w-100 rounded shadow" alt="Fashion 1">
      </div>
      <div class="carousel-item">
        <img src="/public/images/3JT/3,210,000(1).png" class="d-block w-100 rounded shadow" alt="Fashion 2">
      </div>
      <div class="carousel-item">
        <img src="/public/images/2JT/2,030,000(1).png" class="d-block w-100 rounded shadow" alt="Fashion 3">
      </div>
      Tambah item lainnya jika dibutuhkan -->
    <!-- </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#galleryCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon bg-dark rounded-circle p-2"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#galleryCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon bg-dark rounded-circle p-2"></span>
    </button>
  </div> --> 
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

  <!-- Hero Section -->
  <!-- <section class="bg-light py-5 px-3">
    <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
      <div class="text-start">
        <h1 class="h3 fw-bold mb-3">🔥 New Arrival: Streetwear Sneakers</h1>
        <p class="text-muted mb-3">Comfort and style come together in one step</p>
        <a href="viewmore" class="btn btn-secondary fw-bold">Explore Now</a>
      </div>
      <div>
        <img src="/public/images/2JT/2,030,000(1).png" alt="Sneaker Promo" class="img-fluid rounded">
      </div>
    </div>
  </section> -->

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
            <router-link :to="product.link" class="stretched-link"></router-link>
            <div class="position-relative bg-white d-flex align-items-center justify-content-center" style="aspect-ratio: 4/3; padding: 1rem;">
              <img :src="product.image" :alt="product.name" class="img-fluid" style="object-fit: contain; max-height: 100%; max-width: 100%;" />
            </div>
            <div class="card-body text-start px-3 py-3 d-flex flex-column justify-content-between">
              <div style="min-height: 3.8em;">
                <h6 class="fw-semibold mb-2" style="font-size: 0.95rem; line-height: 1.2em;">
                  {{ product.name }}
                </h6>
              </div>
              <div>
                <p class="fw-bold mb-0 text-success" style="font-size: 1rem;">
                  {{ product.price }}
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

  <!-- Hero Section -->
  <!-- <section class="bg-light py-5 px-3">
    <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
      <div class="text-start">
        <h1 class="h3 fw-bold mb-3">🔥 New Arrival: Streetwear Sneakers</h1>
        <p class="text-muted mb-3">Comfort and style come together in one step</p>
        <a href="viewmore" class="btn btn-secondary fw-bold">Explore Now</a>
      </div>
      <div>
        <img src="/public/images/2JT/2,030,000(1).png" alt="Sneaker Promo" class="img-fluid rounded">
      </div>
    </div>
  </section> -->

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
            <router-link :to="product.link" class="stretched-link"></router-link>
            <div class="position-relative bg-white d-flex align-items-center justify-content-center" style="aspect-ratio: 4/3; padding: 1rem;">
              <img :src="product.image" :alt="product.name" class="img-fluid" style="object-fit: contain; max-height: 100%; max-width: 100%;" />
            </div>
            <div class="card-body text-start px-3 py-3 d-flex flex-column justify-content-between">
              <div style="min-height: 3.8em;">
                <h6 class="fw-semibold mb-2" style="font-size: 0.95rem; line-height: 1.2em;">
                  {{ product.name }}
                </h6>
              </div>
              <div>
                <p class="fw-bold mb-0 text-success" style="font-size: 1rem;">
                  {{ product.price }}
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