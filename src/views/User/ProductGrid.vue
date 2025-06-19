<script setup>
const backendUrl = 'http://127.0.0.1:8000';

defineProps({
  products: Array,
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div>
    <h2 v-if="title" class="mb-5 fw-bold">{{ title }}</h2>

    <div class="row g-4">
      <div 
        v-for="(product, index) in products" 
        :key="index"
        class="col-12 col-sm-6 col-md-3 mb-4"
      >
        <div 
          class="product-card card border-0 rounded-4 overflow-hidden h-100 position-relative"
          style="transition: transform 0.3s ease; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);"
        >
          <router-link :to="`/product/${product.produk_id}`" class="stretched-link"></router-link>
          
          <!-- Gambar -->
          <div class="position-relative bg-white d-flex align-items-center justify-content-center" style="aspect-ratio: 4/3; padding: 1rem;">
            <img 
              v-if="product.images && product.images.length > 0"
              :src="backendUrl + product.images[0].image_path"
              alt="Product image" 
              class="img-fluid" 
              style="object-fit: contain; max-height: 100%; max-width: 100%;" 
            />
          </div>
          
          <!-- Konten -->
          <div class="card-body text-start px-3 py-3 d-flex flex-column justify-content-between">
            <div>
              <h6 class="fw-semibold mb-1" style="font-size: 0.95rem; line-height: 1.2em;">
                {{ product.nama_sepatu }}
              </h6>
            </div>
            <div>
              <p class="fw-bold mb-0 text-success" style="font-size: 1rem;">
                Rp {{ Number(product.harga_retail).toLocaleString('id-ID') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tombol Explore More -->
    <div class="mt-4 pt-2 text-center">
      <router-link
        to="/viewMore"
        class="explore-btn btn btn-dark rounded-pill px-4 py-2 fw-semibold shadow-sm"
        style="font-size: 0.9rem; transition: all 0.3s ease;">
        Explore More
      </router-link>
    </div>
  </div>
</template>

<style>
/* DARK MODE: Card tampak mewah */
body.dark-mode .product-card {
  background: rgba(40, 40, 40, 0.8); /* transparan lembut */
  color: #e0e0e0;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(6px);
  transition: all 0.3s ease;
}

/* Konten di dalam card */
body.dark-mode .product-card .card-body {
  color: #e0e0e0;
}

/* Gambar background */
body.dark-mode .product-card .bg-white {
  background-color: rgba(60, 60, 60, 0.6) !important;
}

/* Heading atau nama produk */
body.dark-mode .product-card h6 {
  color: #f0f0f0;
}

/* Harga (tetap hijau) */
body.dark-mode .product-card p.text-success {
  color: #4caf50 !important;
}

/* Tombol Explore More */
body.dark-mode .explore-btn {
  background-color: rgba(255, 255, 255, 0.85);
  color: #111;
  font-weight: 600;
  transition: all 0.3s ease;
}
body.dark-mode .explore-btn:hover {
  background-color: #ffffff;
  color: #000;
}

/* Tambahan transisi halus */
.product-card {
  transition: all 0.3s ease;
}
</style>
