<script setup>
defineProps({
  products: Array,title: {
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
        <div class="card border-0 rounded-4 shadow-sm overflow-hidden h-100 position-relative" style="transition: transform 0.3s ease;">
          <router-link :to="`/product/${product.produk_id}`" class="stretched-link"></router-link>
          
          <div class="position-relative bg-white d-flex align-items-center justify-content-center" style="aspect-ratio: 4/3; padding: 1rem;">
            <img :src="product.image" :alt="product.nama_sepatu" class="img-fluid" style="object-fit: contain; max-height: 100%; max-width: 100%;" />
          </div>
          
          <div class="card-body text-start px-3 py-3 d-flex flex-column justify-content-between">
            <div style="min-height: 3.8em;">
              <h6 class="fw-semibold mb-2" style="font-size: 0.95rem; line-height: 1.2em;">
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

    <div class="mt-4 pt-2 text-center">
      <router-link to="/viewmore"
        class="btn btn-dark rounded-pill px-4 py-2 fw-semibold shadow-sm"
        style="font-size: 0.9rem; transition: all 0.3s ease;">
        Explore More
      </router-link>
    </div>
  </div>
</template>