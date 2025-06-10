<script setup>
import { ref } from 'vue'

const product = ref({
  name: 'Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown',
  price: '4,240,000',
  originalPrice: '5,808,219',
  discount: 27,
  sizes: [38, 39, 40, 41, 42],
  description:
    'Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown blends Travis Scott’s signature style with Jordan Brand’s iconic silhouette. Featuring a reversed Swoosh, premium suede in earthy tones, and Cactus Jack branding, this low-top delivers both standout looks and everyday comfort. A must-have for fans and collectors alike.',
  details: {
    sku: 'DM7866 202',
    material: '-',
    release: '-',
    color: 'Dark Mocha / Black / Velvet Brown',
    dimension: '-',
    retail: '-'
  },
  images: [
    '/public/images/4JT/4240(1).webp',
    '/public/images/4JT/4240(2).webp',
    '/public/images/4JT/4240(3).webp',
    '/public/images/4JT/4240(4).webp'
  ]
})

const selectedSize = ref(null)
const quantity = ref(1)

const increaseQty = () => quantity.value++
const decreaseQty = () => {
  if (quantity.value > 1) quantity.value--
}

const similarProducts = ref([
  {
    name: 'Air Jordan 1 Retro Low OG SP Travis Scott Canary (Women) ',
    price: '3,700,000',
    image: '/images/3JT/3700.webp'
  },
  {
    name: 'Air Jordan 1 Retro Low OG Swarovski Stealth (Women)',
    price: '21,510,000',
    image: '/images/21JT/21510.webp'
  },
  {
    name: 'Nike Zoom Field Jaxx Travis Scott Leche Blue',
    price: '2,000,000',
    image: '/images/2JT/2000.webp'
  },
  {
    name: 'Air Jordan 1 Low Fragment x Travis Scott',
    price: '15,000,000',
    image: '/images/15JT/15000.webp'
  },
  {
    name: 'Air Jordan Jumpman Jack TR Travis Scott Bright Cactus',
    price: '3,900,000',
    image: '/images/3JT/3900.webp'
  },
  {
    name: 'Air Jordan 1 Retro Low OG Doernbecher (2023)',
    price: '7,400,000',
    image: '/images/7JT/7400.webp'
  },
  {
    name: 'Air Jordan 1 Retro Low OG Mocha',
    price: '2,200,000',
    image: '/images/2JT/2200.webp'
  },
  {
    name: 'Air Jordan 1 Low Illuminates Vivid Orange',
    price: '3,630,000',
    image: '/images/3JT/3630.webp'
  }
])
</script>

<style scoped>
.active {
  background-color: #000;
  color: #fff;
}
.carousel-item {
  background-color: #fff; 
}
/* --- IMAGE SLIDER REFINEMENT --- */
.carousel-item img {
  object-fit: contain;
  height: 260px;
  margin: 120px auto 20px auto; /* turun lebih jauh ke bawah */
  display: block;
  padding: 0;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: rgba(0, 0, 0, 0.5); /* abu gelap semi transparan */
  background-size: 100% 100%;
  border-radius: 50%;
  padding: 10px;
}

/* Custom Control Buttons */
.carousel-control-prev,
.carousel-control-next {
  width: 42px;
  height: 42px;
  top: calc(50% + 20px); /* geser turun sedikit seiring gambar turun */
  transform: translateY(-50%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 50%;
  opacity: 1;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  background-color: black;
}

.carousel-control-prev span,
.carousel-control-next span {
  color: black;
  font-size: 24px;
  line-height: 1;
}

.carousel-control-prev:hover span,
.carousel-control-next:hover span {
  color: white;
}

/* Position buttons closer to the image */
.carousel-control-prev {
  left: -20px;
}

.carousel-control-next {
  right: -20px;
}
.product-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* kiri semua */
}

.product-image-wrapper {
  width: 100%;
  height: 160px; /* seragamkan tinggi gambar */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.product-image {
  max-height: 320px;
  object-fit: contain;
  margin-top: 20px;
}

.product-info {
  margin-top: auto; /* dorong ke bawah */
  width: 100%;
}

.product-title {
  font-size: 1rem;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-size: 1rem;
  font-weight: bold;
  color: #28a745;
  margin: 0;
}

/* Hapus panah default Bootstrap */
.accordion-button::after {
  display: none !important;
}

/* Tambahkan simbol + / − di akhir tombol */
.accordion-button {
  position: relative;
}

.accordion-button::before {
  content: "+";
  position: absolute;
  right: 1.25rem;
  font-size: 1.2rem;
  font-weight: bold;
  transition: transform 0.3s ease;
}

/* Saat accordion terbuka, ganti ke − */
.accordion-button:not(.collapsed)::before {
  content: "−";
}

.accordion-button:focus {
  box-shadow: none !important;
  outline: none !important;
}

.accordion-button:not(.collapsed) {
  background-color: transparent;
  color: inherit;
}

.custom-accordion-btn {
  font-size: 0.875rem; /* ukuran kecil */
  font-weight: 500;
}



.size-button {
  width: 48px;
  height: 38px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid #ccc;
  background-color: white;
  color: #333;
}

.size-button:hover {
  border-color: #000;
  color: #000;
}

.active-size {
  background-color: #000 !important;
  color: #fff !important;
  border-color: #000 !important;
}

.inactive-size {
  background-color: #fff;
  color: #333;
}

.product-card-similar {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  cursor: pointer;
}

.product-card-similar:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
}

.image-wrapper-similar {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image-similar {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.product-name {
  font-weight: 500;
  font-size: 0.95rem;
  margin: 0;
  color: #333;
  white-space: normal;       /* Biarkan teks bisa membungkus */
  word-break: break-word;    /* Boleh pecah kata kalau perlu */
  min-height: 40px;          /* Tambahan agar tingginya seragam */
}


.product-price-similar {
  font-weight: bold;
  color: #28a745;
  font-size: 1rem;
}


</style>

<template>
  <div class="container py-5">
  <div class="row g-5">
    <!-- Product Images -->
    <div class="col-md-6">
      <div class="position-relative mt-4" style="max-width: 420px; margin: 0 auto;">
  <!-- Product Image Carousel -->
<div class="product-carousel-container position-relative mt-4 mx-auto" style="max-width: 420px;">
  <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="/public/images/4JT/4240(1).webp" class="d-block product-image" alt="Product Image 1" />
      </div>
      <div class="carousel-item">
        <img src="/public/images/4JT/4240(2).webp" class="d-block product-image" alt="Product Image 2" />
      </div>
      <div class="carousel-item">
        <img src="/public/images/4JT/4240(3).webp" class="d-block product-image" alt="Product Image 2" />
      </div>
      <div class="carousel-item">
        <img src="/public/images/4JT/4240(4).webp" class="d-block product-image" alt="Product Image 2" />
      </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
      <span>&#10094;</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
      <span>&#10095;</span>
    </button>
  </div>
</div>
      </div>
    </div>
    <!-- Product Details -->
    <div class="col-md-6">
      <h2 class="h4 fw-bold mb-3">{{ product.name }}</h2>

      <!-- Price Section -->
      <div class="mb-4">
        <p class="text-uppercase text-muted small mb-1" style="letter-spacing: 0.05em;">Price</p>
        <div class="d-flex align-items-center gap-2">
          <p class="h4 fw-semibold text-dark mb-0">IDR {{ product.price }}</p>
          <span v-if="product.discount" class="badge rounded-pill bg-danger small py-1 px-2">-{{ product.discount }}%</span>
        </div>
        <p v-if="product.originalPrice" class="text-muted text-decoration-line-through mt-1 mb-0" style="font-size: 0.9rem;">
          IDR {{ product.originalPrice }}
        </p>
      </div>

      <!-- Size Options -->
      <div class="mb-4">
        <label class="form-label fw-semibold mb-2">Select Size</label>
        <div class="d-flex flex-wrap gap-2">
          <button
            v-for="size in product.sizes"
            :key="size"
            :class="[
              'btn size-button',
              selectedSize === size ? 'active-size' : 'inactive-size'
            ]"
            @click="selectedSize = size"
          >
            {{ size }}
          </button>
        </div>
      </div>


      <!-- Action Buttons -->
      <div class="d-flex flex-column flex-sm-row gap-3 mb-4">
        <button class="btn btn-dark w-100 py-2 rounded-pill">Add to Cart</button>
        <button class="btn btn-warning w-100 py-2 rounded-pill text-dark fw-semibold">Buy Now</button>
      </div>

      <!-- Accordion Info -->
      <div class="accordion" id="accordionInfo">
  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed custom-accordion-btn" type="button"
        data-bs-toggle="collapse" data-bs-target="#collapseOne">
        Please Make Sure The Size Fits You.   
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionInfo">
      <div class="accordion-body small text-muted">
        If you are unsure about your size, please click the size chart button and browse through the chart.
        Our company policy does not accept refunds or returns for sizing-related issues.
      </div>
    </div>
  </div>

  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed custom-accordion-btn" type="button"
        data-bs-toggle="collapse" data-bs-target="#collapseOne">
        Authentic. Guaranteed.
      </button>

    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionInfo">
      <div class="accordion-body small text-muted">
        All products sold are 100% authentic and verified by our team of experts. We guarantee original items only.
      </div>
    </div>
  </div>
</div>


      
    </div>
  </div>


    <!-- Description -->
    <div class="mt-5 border-top pt-4">
      <h3 class="h5 fw-bold">Description</h3>
      <p class="text-muted">{{ product.description }}</p>

      <div class="row bg-light rounded p-4 mt-4">
        <div class="col-md-6">
          <p class="small text-muted mb-1">SKU</p>
          <p class="fw-bold">{{ product.details.sku }}</p>
          <p class="small text-muted mt-3 mb-1">Material</p>
          <p class="text-muted">{{ product.details.material }}</p>
          <p class="small text-muted mt-3 mb-1">Release Date</p>
          <p class="text-muted">{{ product.details.release }}</p>
        </div>
        <div class="col-md-6">
          <p class="small text-muted mb-1">Color</p>
          <p class="fw-bold">{{ product.details.color }}</p>
          <p class="small text-muted mt-3 mb-1">Dimension</p>
          <p class="text-muted">{{ product.details.dimension }}</p>
          <p class="small text-muted mt-3 mb-1">Retail (approx.)</p>
          <p class="text-muted">{{ product.details.retail }}</p>
        </div>
      </div>
    </div>

    <div class="container mt-5">
  <!-- Grid Produk -->
  <div class="container mt-5">
  <h3 class="text-center fw-bold mb-4">Similar Products</h3>

  <div class="row row-cols-2 row-cols-md-4 g-4">
    <div class="col" v-for="(item, idx) in similarProducts.slice(0, 8)" :key="idx">
      <div class="product-card-similar text-start p-3">
        <div class="image-wrapper-similar mb-3">
          <img :src="item.image" alt="Product Image" class="product-image-similar" />
        </div>
        <div>
          <p class="product-name mb-1">{{ item.name }}</p>
          <p class="product-price-similar">IDR {{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
  </div>

  <!-- Tombol View More -->
  <div class="text-center mt-5 mb-5">
    <router-link to="/ViewMore" class="btn btn-dark rounded-pill px-5 py-2 shadow-sm">
      View More
    </router-link>
  </div>
</div>

</div>
</template>
