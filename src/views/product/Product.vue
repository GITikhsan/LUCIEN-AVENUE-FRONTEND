<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/axios' // Pastikan path ini benar

// --- STATE MANAGEMENT ---

// Siapkan "kerangka" data produk yang kosong. Strukturnya SAMA PERSIS
// dengan data hardcode Anda sebelumnya agar template tidak error.
const product = ref({
  name: '',
  price: '0',
  originalPrice: '0',
  discount: 0,
  sizes: [],
  description: '',
  details: {
    sku: '',
    material: '',
    release: '',
    color: '',
    dimension: '',
    retail: ''
  },
  images: [] // Akan diisi dengan URL gambar dari API
});

// State untuk menampilkan pesan loading dan error
const isLoading = ref(true);
const error = ref(null);

// Data similarProducts bisa dibiarkan statis atau diambil dari API lain nanti
const similarProducts = ref([
    { name: 'Air Jordan 1 Retro Low OG SP Travis Scott Canary (Women)', price: '3,700,000', image: '/images/3JT/3700.webp' },
    { name: 'Air Jordan 1 Retro Low OG Swarovski Stealth (Women)', price: '21,510,000', image: '/images/21JT/21510.webp' },
    { name: 'Nike Zoom Field Jaxx Travis Scott Leche Blue', price: '2,000,000', image: '/images/2JT/2000.webp' },
    { name: 'Air Jordan 1 Low Fragment x Travis Scott', price: '15,000,000', image: '/images/15JT/15000.webp' },
]);


// --- ROUTER & API CALL ---

const route = useRoute(); // Untuk akses ke parameter URL (misal: /product/45)

// Fungsi untuk format angka menjadi Rupiah
const formatCurrency = (value) => {
  if (!value) return '0';
  const numberValue = Math.floor(parseFloat(value));
  return new Intl.NumberFormat('id-ID').format(numberValue);
};

// Fungsi untuk mengambil dan memetakan data produk dari API
const fetchProduct = async (productId) => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await api.get(`/products/${productId}`);
    const apiData = response.data.data; // Data mentah dari Laravel

    // === MAPPING DATA API KE STRUKTUR FRONTEND ===
    product.value = {
      name: apiData.nama_sepatu,
      price: formatCurrency(apiData.harga_retail),
      originalPrice: apiData.harga_coret ? formatCurrency(apiData.harga_coret) : null,
      discount: apiData.diskon_persen || 0,
      sizes: apiData.ukuran ? apiData.ukuran.split(',').map(s => s.trim()) : [],
      description: apiData.deskripsi,
      details: {
        sku: apiData.sku,
        material: apiData.material,
        release: apiData.tanggal_rilis,
        color: apiData.warna,
        dimension: apiData.dimensi,
        retail: formatCurrency(apiData.harga_retail)
      },
      // Menggunakan gambar utama dari field 'image' dan galeri dari relasi 'images' jika ada
      images: apiData.images && apiData.images.length > 0 
        ? apiData.images.map(img => img.url) 
        : (apiData.image ? [apiData.image] : []) // Jika tidak ada, gunakan gambar utama atau array kosong
    };

  } catch (err) {
    console.error("Gagal mengambil detail produk:", err);
    error.value = "Produk tidak ditemukan atau terjadi kesalahan pada server.";
  } finally {
    isLoading.value = false;
  }
};

// Jalankan fetchProduct() saat komponen dimuat
onMounted(() => {
  const productId = route.params.id;
  if (productId) {
    fetchProduct(productId);
  } else {
    error.value = "Halaman tidak valid. ID Produk tidak ditemukan.";
    isLoading.value = false;
  }
});

// Logika UI lainnya (tidak berubah)
const selectedSize = ref(null);
const quantity = ref(1);
</script>

<template>
  <div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="min-height: 80vh;">
    <div class="spinner-border text-dark" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else-if="error" class="container py-5">
    <div class="alert alert-danger text-center">{{ error }}</div>
  </div>

  <div v-else-if="product" class="container py-5">
    <div class="row g-5">
      <div class="col-md-6">
        <div class="position-relative mt-4" style="max-width: 420px; margin: 0 auto;">
          <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div
                v-for="(image, index) in product.images"
                :key="index"
                class="carousel-item"
                :class="{ active: index === 0 }"
              >
                <img :src="image" class="d-block w-100 img-fluid product-image" :alt="product.name + ' image ' + (index + 1)" />
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

      <div class="col-md-6">
        <h2 class="h4 fw-bold mb-3">{{ product.name }}</h2>

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

        <div class="d-flex flex-column flex-sm-row gap-3 mb-4">
          <button class="btn btn-dark w-100 py-2 rounded-pill">Add to Cart</button>
          <button class="btn btn-warning w-100 py-2 rounded-pill text-dark fw-semibold">Buy Now</button>
        </div>

        <div class="accordion" id="accordionInfo">
            <div class="accordion-item border-0 border-bottom">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed custom-accordion-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                  Please Make Sure The Size Fits You.
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionInfo">
                <div class="accordion-body small text-muted">
                  If you are unsure about your size, please click the size chart button and browse through the chart. Our company policy does not accept refunds or returns for sizing-related issues.
                </div>
              </div>
            </div>
            <div class="accordion-item border-0 border-bottom">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed custom-accordion-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
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
      <h3 class="text-center fw-bold mb-4">Similar Products</h3>
      <div class="row row-cols-2 row-cols-md-4 g-4">
        <div class="col" v-for="(item, idx) in similarProducts.slice(0, 8)" :key="idx">
          <div class="product-card-similar text-start p-3 d-flex flex-column h-100">
            <div class="image-wrapper-similar mb-3">
              <img :src="item.image" alt="Product Image" class="product-image-similar" />
            </div>
            <div class="product-text-wrapper mt-auto">
              <p class="product-name">{{ item.name }}</p>
              <p class="product-price-similar">IDR {{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-5 mb-5">
        <router-link to="/ViewMore" class="btn btn-dark rounded-pill px-5 py-2 shadow-sm">
          View More
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
  SALIN DAN TEMPEL SELURUH CSS ANDA DARI FILE LAMA KE SINI.
  INI AKAN MEMASTIKAN TAMPILAN DAN RESPONSIFNYA SAMA PERSIS.
*/
.active {
  background-color: #000;
  color: #fff;
}
.carousel-item {
  background-color: #fff;
}
.carousel-item img {
  object-fit: contain;
  height: 260px;
  margin: 50px auto 20px auto;
  display: block;
  padding: 0;
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: rgba(0, 0, 0, 0.5);
  background-size: 100% 100%;
  border-radius: 50%;
  padding: 10px;
}
.carousel-control-prev,
.carousel-control-next {
  width: 36px;
  height: 36px;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border-radius: 50%;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 20px;
  z-index: 10;
  opacity: 1;
}
.carousel-control-prev:hover,
.carousel-control-next:hover {
  background-color: black;
}
.carousel-control-prev span,
.carousel-control-next span {
  color: black;
  font-size: 22px;
  font-weight: bold;
}
.carousel-control-prev:hover span,
.carousel-control-next:hover span {
  color: white;
}
.carousel-control-prev {
  left: 10px;
}
.carousel-control-next {
  right: 10px;
}
.product-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.product-image-wrapper {
  width: 100%;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.product-image {
  max-height: 320px;
  object-fit: contain;
}
@media (max-width: 576px) {
  .product-carousel-container {
    padding: 0 10px;
  }
  .carousel-control-prev,
  .carousel-control-next {
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
  .product-image {
    max-height: 280px;
  }
}
.product-info {
  margin-top: auto;
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
.accordion-button::after {
  display: none !important;
}
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
  font-size: 0.875rem;
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
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
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
.product-text-wrapper {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 80px;
}
.product-name {
  font-weight: 500;
  font-size: 0.95rem;
  color: #333;
  min-height: 40px;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product-price-similar {
  color: #28a745;
  font-weight: bold;
}
</style>