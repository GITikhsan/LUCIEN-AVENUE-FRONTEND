<script setup>
import { ref, computed } from 'vue'

const gender = ref('')
const size = ref(null)
const discount = ref('any')
const priceRange = ref('')
const selectedColors = ref([])
const selectedBrands = ref([])
const sortOption = ref('')

const sizes = [20, 21, 22, 23, 24, 25, 26, 27]
const discounts = [
  { label: 'Any', value: 'any', class: 'btn-outline-secondary' },
  { label: '10%+', value: 10, class: 'btn-outline-success' },
  { label: '25%+', value: 25, class: 'btn-outline-primary' },
  { label: '50%+', value: 50, class: 'btn-outline-danger' },
]
const priceRanges = [
  { value: '0-1000000', label: '💸 Below IDR 1.000.000' },
  { value: '1000000-3000000', label: '💰 IDR 1.000.000 – 3.000.000' },
  { value: '3000000-5000000', label: '💼 IDR 3.000.000 – 5.000.000' },
  { value: '5000000-10000000', label: '💎 IDR 5.000.000 – 10.000.000' },
  { value: '10000000+', label: '🛍️ Above IDR 10.000.000' },
]
const colors = ['green', 'blue', 'pink', 'red', 'purple', 'yellow', 'maroon']
const brands = ['Nike', 'Adidas', 'Air Jordan', 'Yeezy', 'New Balance']

const products = ref([
  {
    id: 1,
    name: 'Yeezy Boost 350 V2 Dazling Blue (Toddler)',
    image: '/images/youth adidas/2,920,000(1).webp',
    price: 'IDR 2,920,000',
    discount: 10,
    brand: 'Yeezy'
  },
  // ...tambah produk lain
])

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    return true // filter logic bisa ditambahkan
  })
})
</script>

<style scoped>
.card .position-absolute {
  font-size: 0.75rem;
  border-radius: 0 0.5rem 0.5rem 0;
}
</style>


<template>
  <div class="container py-4">
    <div class="row">
      <!-- Sidebar Filter -->
      <div class="col-lg-3 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Select Gender</h5>
            <div class="btn-group w-100 mb-3" role="group">
              <input type="radio" class="btn-check" name="gender" id="men" value="men" v-model="gender">
              <label class="btn btn-outline-secondary" for="men">Men</label>

              <input type="radio" class="btn-check" name="gender" id="women" value="women" v-model="gender">
              <label class="btn btn-outline-secondary" for="women">Women</label>

              <input type="radio" class="btn-check" name="gender" id="youth" value="youth" v-model="gender">
              <label class="btn btn-outline-secondary" for="youth">Youth</label>
            </div>

            <h5 class="card-title">Size</h5>
            <div class="row g-2">
              <div class="col-3" v-for="n in sizes" :key="n">
                <input type="radio" class="btn-check" :id="'size'+n" name="size" :value="n" v-model="size">
                <label class="btn btn-outline-dark w-100" :for="'size'+n">{{ n }}</label>
              </div>
            </div>

            <h5 class="card-title mt-4">Discount</h5>
            <div class="d-flex flex-wrap gap-2">
              <div v-for="d in discounts" :key="d.label">
                <input type="radio" class="btn-check" :id="'discount'+d.value" name="discount" :value="d.value" v-model="discount">
                <label class="btn" :class="d.class" :for="'discount'+d.value">{{ d.label }}</label>
              </div>
            </div>

            <h5 class="card-title mt-4">Price Range</h5>
            <select class="form-select" v-model="priceRange">
              <option disabled value="">Select a range</option>
              <option v-for="range in priceRanges" :value="range.value" :key="range.value">
                {{ range.label }}
              </option>
            </select>

            <h5 class="card-title mt-4">Color</h5>
            <div class="d-flex flex-wrap gap-2">
              <div v-for="(color, i) in colors" :key="i" class="form-check">
                <input class="form-check-input" type="checkbox" :id="'color'+i" :value="color" v-model="selectedColors">
                <label class="form-check-label" :for="'color'+i">
                  <span class="d-inline-block rounded-circle" :style="'width:20px;height:20px;background:'+color"></span>
                </label>
              </div>
            </div>

            <h5 class="card-title mt-4">Brands</h5>
            <div v-for="(brand, i) in brands" :key="brand" class="form-check">
              <input class="form-check-input" type="checkbox" :id="'brand'+i" :value="brand" v-model="selectedBrands">
              <label class="form-check-label" :for="'brand'+i">{{ brand }}</label>
            </div>

          </div>
        </div>
      </div>

      <!-- Produk -->
      <div class="col-lg-9">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Available Sneakers</h4>
          <select class="form-select w-auto" v-model="sortOption">
            <option disabled value="">Sort by</option>
            <option>Featured Items</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>

        <div class="row row-cols-2 row-cols-md-4 g-4">
          <div class="col" v-for="product in filteredProducts" :key="product.id">
            <div class="card h-100">
              <div class="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 small fw-bold">{{ product.discount }}%</div>
              <img :src="product.image" class="card-img-top" :alt="product.name">
              <div class="card-body">
                <h6 class="card-title">{{ product.name }}</h6>
                <p class="card-text text-success fw-bold">{{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>