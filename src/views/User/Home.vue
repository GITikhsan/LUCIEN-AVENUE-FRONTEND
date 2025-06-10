<script setup>
import { onMounted } from 'vue'
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
        <a href="viewmore" class="btn btn-light fw-bold px-4 py-2">Explore Now</a>
    </div>
    </div>
  </header>
 <section class="py-5 text-center">
    <div class="container">
      <h2 class="mb-5 fw-bold">Our Featured Products</h2>
      <div class="row g-4">
        <!-- Card Product -->
        <!-- Ulangi blok ini sesuai jumlah produk -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100 shadow-sm">
            <img src="/public/images/15JT/15000.webp" class="card-img-top" alt="Product 1">
            <div class="card-body">
              <h5 class="card-title">Air Jordan 1 Low Fragment x Travis Scott</h5>
              <p class="card-text">Rp 15,000,000</p>
              <a href="Product" class="btn btn-outline-secondary w-100">Detail</a>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100 shadow-sm">
            <img src="/public/images/3JT/3900.webp" class="card-img-top" alt="Product 1">
            <div class="card-body">
              <h5 class="card-title">Air Jordan Jumpman Jack TR Travis Scott Bright Cactus</h5>
              <p class="card-text">Rp 3,900,000</p>
              <a href="Product" class="btn btn-outline-secondary w-100">Detail</a>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100 shadow-sm">
            <img src="/public/images/2JT/2200.webp" class="card-img-top" alt="Product 1">
            <div class="card-body">
              <h5 class="card-title">Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown</h5>
              <p class="card-text">Rp 4.240.000</p>
              <a href="Product" class="btn btn-outline-secondary w-100">Detail</a>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100 shadow-sm">
            <img src="/public/images/7JT/7400.webp" class="card-img-top" alt="Product 1">
            <div class="card-body">
              <h5 class="card-title">Air Jordan 1 Retro Low OG Doernbecher (2023)</h5>
              <p class="card-text">Rp 7,400,000</p>
              <a href="Product" class="btn btn-outline-secondary w-100">Detail</a>
            </div>
          </div>
        </div>
    
      </div>
      <div class="mt-4">
        <a href="viewmore" class="btn btn-secondary fw-bold px-4 py-2">Explore Now</a>
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
        
        <a href="viewmore" class="btn btn-light fw-bold px-4 py-2">Explore Now</a>
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
      <h2 class="mb-5 fw-bold">Our Featured Men Products</h2>
      <div class="row g-4">
        <!-- Card Product -->
        <!-- Ulangi blok ini sesuai jumlah produk -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100 shadow-sm">
            <img src="/public/images/2JT/2200.webp" class="card-img-top" alt="Product 1">
            <div class="card-body">
              <h5 class="card-title">Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown</h5>
              <p class="card-text">Rp 4.240.000</p>
              <a href="Product" class="btn btn-outline-secondary w-100">Detail</a>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100 shadow-sm">
            <img src="/public/images/2JT/2200.webp" class="card-img-top" alt="Product 1">
            <div class="card-body">
              <h5 class="card-title">Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown</h5>
              <p class="card-text">Rp 4.240.000</p>
              <a href="Product" class="btn btn-outline-secondary w-100">Detail</a>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100 shadow-sm">
            <img src="/public/images/2JT/2200.webp" class="card-img-top" alt="Product 1">
            <div class="card-body">
              <h5 class="card-title">Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown</h5>
              <p class="card-text">Rp 4.240.000</p>
              <a href="Product" class="btn btn-outline-secondary w-100">Detail</a>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100 shadow-sm">
            <img src="/public/images/2JT/2200.webp" class="card-img-top" alt="Product 1">
            <div class="card-body">
              <h5 class="card-title">Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown</h5>
              <p class="card-text">Rp 4.240.000</p>
              <a href="Product" class="btn btn-outline-secondary w-100">Detail</a>
            </div>
          </div>
        </div>  
      </div>
      <div class="mt-4">
        <a href="viewmore" class="btn btn-secondary fw-bold px-4 py-2">Explore Now</a>
      </div>
    </div>
  </section>

  <section>
     <div class="position-relative w-100 vh-100 bg-cover bg-center d-flex align-items-center justify-content-center text-center text-white"
     style="background-image: url('/public/images/fashion/sepatu11.png'); background-size: cover; background-position: center;">
    
    <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
    
    <div class="container position-relative z-1">
        <h2 class="display-4 fw-bold text-uppercase mb-4">Women Products</h2>
        
        <a href="viewmore" class="btn btn-light fw-bold px-4 py-2">Explore Now</a>
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
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100 shadow-sm">
            <img src="/public/images/2JT/2200.webp" class="card-img-top" alt="Product 1">
            <div class="card-body">
              <h5 class="card-title">Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown</h5>
              <p class="card-text">Rp 4.240.000</p>
              <a href="Product" class="btn btn-outline-secondary w-100">Detail</a>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100 shadow-sm">
            <img src="/public/images/2JT/2200.webp" class="card-img-top" alt="Product 1">
            <div class="card-body">
              <h5 class="card-title">Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown</h5>
              <p class="card-text">Rp 4.240.000</p>
              <a href="Product" class="btn btn-outline-secondary w-100">Detail</a>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100 shadow-sm">
            <img src="/public/images/2JT/2200.webp" class="card-img-top" alt="Product 1">
            <div class="card-body">
              <h5 class="card-title">Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown</h5>
              <p class="card-text">Rp 4.240.000</p>
              <a href="Product" class="btn btn-outline-secondary w-100">Detail</a>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100 shadow-sm">
            <img src="/public/images/2JT/2200.webp" class="card-img-top" alt="Product 1">
            <div class="card-body">
              <h5 class="card-title">Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown</h5>
              <p class="card-text">Rp 4.240.000</p>
              <a href="Product" class="btn btn-outline-secondary w-100">Detail</a>
            </div>
          </div>
        </div>  
      </div>
      <div class="mt-4">
        <a href="viewmore" class="btn btn-secondary fw-bold px-4 py-2">Explore Now</a>
      </div>
    </div>
  </section>

</template>