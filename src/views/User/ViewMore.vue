<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

// --- LOGIKA RESPONSIVE  ---
const sidebarVisible = ref(false)
const isDesktop = ref(window.innerWidth >= 992) // Pakai 992px untuk breakpoint 'lg' Bootstrap

// Fungsi untuk update state berdasarkan lebar layar
const updateLayout = () => {
  isDesktop.value = window.innerWidth >= 992
  // Di desktop, sidebar selalu terlihat. Di mobile, defaultnya tersembunyi.
  if (isDesktop.value) {
    sidebarVisible.value = true
  } else {
    // Saat beralih ke mobile, pastikan sidebar tertutup kecuali dibuka manual
    sidebarVisible.value = false
  }
}

// Tombol untuk membuka/menutup sidebar di mobile
const toggleSidebar = () => {
  // Fungsi ini hanya boleh berjalan di mode mobile
  if (!isDesktop.value) {
    sidebarVisible.value = !sidebarVisible.value
  }
}

// Event listener untuk resize window
onMounted(() => {
  window.addEventListener('resize', updateLayout)
  updateLayout() // Panggil sekali saat komponen dimuat
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateLayout)
})


// --- DATA FILTER & PRODUK ---
const gender = ref('')
const size = ref(null)
const discount = ref('any')
const priceRange = ref('')
const selectedColors = ref([])
const selectedBrands = ref([])
const sortOption = ref('')

const sizes = [20, 21, 22, 23, 24, 25, 26, 27]
const discounts = [
  { label: 'Any', value: 'any' },
  { label: '10%+', value: 10 },
  { label: '25%+', value: 25 },
  { label: '50%+', value: 50 }
]
const priceRanges = [
  { value: '0-1000000', label: 'Below IDR 1.000.000' },
  { value: '1000000-3000000', label: 'IDR 1.000.000 – 3.000.000' },
  { value: '3000000-5000000', label: 'IDR 3.000.000 – 5.000.000' },
  { value: '5000000-10000000', label: 'IDR 5.000.000 – 10.000.000' },
  { value: '10000000+', label: 'Above IDR 10.000.000' }
]
const colors = ['green', 'blue', 'pink', 'red', 'purple', 'yellow', 'maroon']
const brands = ['Nike', 'Adidas', 'Air Jordan', 'Yeezy', 'New Balance']

const products = ref([
  {
    id: 1,
    name: 'Yeezy Boost 350 V2 Dazzling Blue (Toddler)',
    image: '/images/youth adidas/2,920,000(1).webp',
    price: 'IDR 2,920,000',
    discount: 10,
    brand: 'Yeezy'
  },
  {
    id: 2,
    name: 'Yeezy Boost 350 V2 Dazzling Blue (Toddler)',
    image: '/images/youth adidas/2,920,000(1).webp',
    price: 'IDR 2,920,000',
    discount: 10,
    brand: 'Yeezy'
  },
  {
    id: 3,
    name: 'Yeezy Boost 350 V2 Dazzling Blue (Toddler)',
    image: '/images/youth adidas/2,920,000(1).webp',
    price: 'IDR 2,920,000',
    discount: 10,
    brand: 'Yeezy'
  },
  {
    id: 4,
    name: 'Yeezy Boost 350 V2 Dazzling Blue (Toddler)',
    image: '/images/youth adidas/2,920,000(1).webp',
    price: 'IDR 2,920,000',
    discount: 10,
    brand: 'Yeezy'
  },
  {
    id: 5,
    name: 'Yeezy Boost 350 V2 Dazzling Blue (Toddler)',
    image: '/images/youth adidas/2,920,000(1).webp',
    price: 'IDR 2,920,000',
    discount: 10,
    brand: 'Yeezy'
  },
  {
    id: 6,
    name: 'Yeezy Boost 350 V2 Dazzling Blue (Toddler)',
    image: '/images/youth adidas/2,920,000(1).webp',
    price: 'IDR 2,920,000',
    discount: 10,
    brand: 'Yeezy'
  },
  {
    id: 7,
    name: 'Yeezy Boost 350 V2 Dazzling Blue (Toddler)',
    image: '/images/youth adidas/2,920,000(1).webp',
    price: 'IDR 2,920,000',
    discount: 10,
    brand: 'Yeezy'
  },
  {
    id: 8,
    name: 'Yeezy Boost 350 V2 Dazzling Blue (Toddler)',
    image: '/images/youth adidas/2,920,000(1).webp',
    price: 'IDR 2,920,000',
    discount: 10,
    brand: 'Yeezy'
  },
  {
    id: 9,
    name: 'Yeezy Boost 350 V2 Dazzling Blue (Toddler)',
    image: '/images/youth adidas/2,920,000(1).webp',
    price: 'IDR 2,920,000',
    discount: 10,
    brand: 'Yeezy'
  }
])

const filteredProducts = computed(() => {
  return products.value // filter logic bisa ditambahkan nanti
})
</script>

<template>
  <div class="container-fluid py-5">
    <button
      v-if="!isDesktop"
      @click="toggleSidebar"
      class="btn btn-dark position-fixed shadow-lg"
      style="bottom: 20px; right: 20px; z-index: 1050; border-radius: 50px; padding: 10px 15px;"
    >
      <i class="bi bi-funnel-fill"></i>
      <span class="ms-2">Filter</span>
    </button>

    <div class="d-flex gap-4">
      <aside
        v-if="sidebarVisible"
        id="filterSidebar"
        :class="{
          'sidebar-filter p-4 bg-white border rounded shadow-sm': isDesktop,
          'sidebar-mobile-overlay': !isDesktop
        }"
      >
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold mb-0">Filters</h5>
          <button v-if="!isDesktop" @click="toggleSidebar" class="btn-close"></button>
        </div>

        <h6 class="fw-semibold mb-3">Select Gender</h6>
        <div class="d-flex justify-content-between mb-3 gap-2">
          <button
            class="btn w-100 fw-semibold border"
            :class="gender === 'men' ? 'btn-men-active' : 'btn-men'"
            @click="gender = 'men'"
          >
            Men
          </button>

          <button
            class="btn w-100 fw-semibold border"
            :class="gender === 'women' ? 'btn-women-active' : 'btn-women'"
            @click="gender = 'women'"
          >
            Women
          </button>

          <button
            class="btn w-100 fw-semibold border"
            :class="gender === 'youth' ? 'btn-youth-active' : 'btn-youth'"
            @click="gender = 'youth'"
          >
            Youth
          </button>
        </div>

        <h6 class="fw-semibold mb-3">Size</h6>
        <div class="row g-2 mb-3">
          <div class="col-3" v-for="n in sizes" :key="n">
            <input
              type="radio"
              class="visually-hidden"
              :id="'size' + n"
              name="size"
              :value="n"
              v-model="size"
            />
            <label
              class="btn w-100 py-2 size-tile text-center"
              :for="'size' + n"
              :class="{ active: size === n }"
            >
              {{ n }}
            </label>
          </div>
        </div>

        <h6 class="fw-semibold mb-3">Discount</h6>
        <div class="row row-cols-2 g-3 mb-3">
          <div class="col-6 col-md-3" v-for="d in discounts" :key="d.label">
            <input
              type="radio"
              class="btn-check"
              :id="'discount' + d.value"
              name="discount"
              :value="d.value"
              v-model="discount"
            />
            <label
              class="btn w-100 py-2 text-white fw-semibold glow-anim"
              :for="'discount' + d.value"
              :class="[
                discount === d.value ? 'selected' : '',
                {
                  'bg-success': d.value === 10,
                  'bg-primary': d.value === 25,
                  'bg-danger': d.value === 50,
                  'bg-secondary': d.value === 'any'
                }
              ]"
            >
              {{ d.label }}
            </label>
          </div>
        </div>

        <h6 class="fw-semibold mb-3">Price Range</h6>
        <div class="mb-3">
          <select class="form-select shadow-sm rounded-3 border-dark" v-model="priceRange">
            <option disabled value="">Select a range</option>
            <option
              v-for="range in priceRanges"
              :value="range.value"
              :key="range.value"
            >
              {{ range.label }}
            </option>
          </select>
        </div>

        <h6 class="fw-semibold mb-3">Color</h6>
        <div class="row g-3 mb-4">
          <div
            class="col-2 d-flex justify-content-center"
            v-for="(color, i) in colors.slice(0, 6)"
            :key="i"
          >
            <div class="position-relative">
              <input
                class="visually-hidden"
                type="checkbox"
                :id="'color' + i"
                :value="color"
                v-model="selectedColors"
              />
              <label
                class="rounded-circle border"
                :for="'color' + i"
                :style="{
                  backgroundColor: color,
                  width: '34px',
                  height: '34px',
                  display: 'inline-block',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: selectedColors.includes(color) ? 'scale(1.15)' : 'scale(1)',
                  boxShadow: selectedColors.includes(color)
                    ? '0 0 8px rgba(0, 0, 0, 0.4)'
                    : 'none'
                }"
              ></label>
            </div>
          </div>
        </div>

        <h6 class="fw-semibold mb-2">Brands</h6>
        <div v-for="(brand, i) in brands" :key="brand" class="form-check">
          <input class="form-check-input" type="checkbox" :id="'brand'+i" :value="brand" v-model="selectedBrands">
          <label class="form-check-label" :for="'brand'+i">{{ brand }}</label>
        </div>
      </aside>

      <section class="flex-grow-1">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="fw-bold">Available Sneakers</h5>
          <div class="dropdown d-inline-block">
            <button
              class="btn btn-light border rounded-pill px-3 py-1 d-flex align-items-center gap-2 shadow-sm"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="font-size: 0.875rem; font-weight: 500; color: #333;"
            >
              <i class="bi bi-sliders2-vertical"></i>
              {{ sortOption || 'Sort by' }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow rounded-4 p-1" style="min-width: 180px;">
              <li><a class="dropdown-item rounded-2" href="#" @click.prevent="sortOption = 'Featured Items'">🌟 Featured Items</a></li>
              <li><a class="dropdown-item rounded-2" href="#" @click.prevent="sortOption = 'Price: Low to High'">⬆️ Price: Low to High</a></li>
              <li><a class="dropdown-item rounded-2" href="#" @click.prevent="sortOption = 'Price: High to Low'">⬇️ Price: High to Low</a></li>
              <li><a class="dropdown-item rounded-2" href="#" @click.prevent="sortOption = 'Newest'">🆕 Newest</a></li>
            </ul>
          </div>
        </div>

        <div class="row row-cols-2 row-cols-md-4 g-4">
          <div class="col" v-for="product in filteredProducts" :key="product.id">
            <div class="card h-100 border-0 shadow-sm position-relative rounded-4">
              <div
                class="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 small rounded-end"
                style="font-size: 0.75rem;"
              >
                {{ product.discount }}%
              </div>

              <div
                class="p-3 d-flex justify-content-center align-items-center"
                style="height: 200px;"
              >
                <img
                  :src="product.image"
                  class="img-fluid"
                  :alt="product.name"
                  style="max-height: 160px; object-fit: contain;"
                />
              </div>

              <div class="card-body px-3 pt-0 pb-3">
                <h6
                  class="card-title mb-1"
                >
                  {{ product.name }}
                </h6>
                <p class="text-success fw-bold mb-0">
                  {{ product.price }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* DITAMBAHKAN: Style untuk sidebar overlay di mobile */
.sidebar-mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1045;
  overflow-y: auto;
  padding: 1.5rem;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* KODE CSS ASLI KAMU (TIDAK DIUBAH) */
.glow-anim {
  transition: transform 0.25s ease, box-shadow 0.3s ease;
}

.selected {
  transform: scale(1.08);
  animation: glow 0.8s ease-in-out infinite alternate;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

@keyframes glow {
  from {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
  }
  to {
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
  }
}

.container-fluid {
  padding-left: 3rem;
  padding-right: 3rem;
}

.sidebar-filter {
  width: 340px;
  min-width: 320px;
  flex-shrink: 0;
}

.card .position-absolute {
  font-size: 0.75rem;
}

.btn.active {
  background-color: #343a40;
  color: white;
}

/* Tambahan: agar grid produk ada ruang */
.row-cols-md-4 > * {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.product-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

/* Warna */
.size-tile {
  border-radius: 10px;
  background: linear-gradient(135deg, #f1f3f5, #dee2e6);
  color: #212529;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.size-tile:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #e9ecef, #ced4da);
}

.size-tile.active {
  background: linear-gradient(135deg, #4dabf7, #228be6);
  color: white;
  border-color: #228be6;
  box-shadow: 0 4px 10px rgba(34, 139, 230, 0.4);
  transform: scale(1.05);
}

/* Gender */
.btn-men,
.btn-women,
.btn-youth {
  background-color: #f8f9fa;
  color: #333;
  border-radius: 8px;
  transition: background-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
}

.btn-men-active {
  background-color: #0d6efd !important;
  color: #fff !important;
  box-shadow: 0 0 6px rgba(13, 110, 253, 0.4);
  transform: scale(1.03);
}

.btn-women-active {
  background-color: #d63384 !important;
  color: #fff !important;
  box-shadow: 0 0 6px rgba(214, 51, 132, 0.4);
  transform: scale(1.03);
}

.btn-youth-active {
  background-color: #20c997 !important;
  color: #fff !important;
  box-shadow: 0 0 6px rgba(32, 201, 151, 0.4);
  transform: scale(1.03);
}

.sidebar-filter {
  width: 340px;
  min-width: 320px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding-right: 0.5rem; /* agar isi sidebar tidak tertutup scrollbar */
}

/* Scrollbar elegan untuk WebKit (Chrome, Safari, Edge) */
.sidebar-filter::-webkit-scrollbar {
  width: 8px;
}

.sidebar-filter::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-filter::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.sidebar-filter::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

/* Untuk Firefox */
.sidebar-filter {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

@media (min-width: 480px) {
  .product-title {
    font-size: 0.6rem; /* <-- UKURAN MOBILE */
    height: auto; 
    line-height: 1.4;
  }
  .product-price {
    font-size: 0.6rem; /* <-- UKURAN MOBILE */
  }
}
/* 2. Style untuk DESKTOP (layar lebih besar dari 992px) */
/* Aturan ini akan menimpa style mobile jika syarat terpenuhi */
@media (min-width: 992px) {
  .product-title {
    font-size: 0.95rem; /* <-- UKURAN DESKTOP */
    min-height: 50px; /* Untuk alignment kartu agar rapi */
  }
  .product-price {
    font-size: 0.95rem; /* <-- UKURAN DESKTOP */
  }
}

</style>