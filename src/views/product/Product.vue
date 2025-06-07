
<script setup>
import { ref } from 'vue'

const product = ref({
  name: 'Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown',
  price: 'IDR 4,240,000',
  originalPrice: 'IDR 5,808,219',
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
    '/public/images/4JT/4,240,000.png',
    '/public/images/4JT/4,240,000(2).png',
    '/public/images/4JT/4,240,000(3).png',
    '/public/images/4JT/4,240,000(4).png'
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
    name: 'Air Jordan 1 Retro Low Dior',
    price: 'IDR 100,000,000',
    image: '/images/100JT/100,000,000(1).png'
  },
  {
    name: 'Air Jordan 1 Low SE Craft Light Olive',
    price: 'IDR 3,210,000',
    image: '/images/3JT/3,210,000(1).png'
  },
  {
    name: 'Air Jordan 1 Low SE WRMK Sashiko Denim',
    price: 'IDR 2,050,000',
    image: '/images/2JT/2,050,000(1).png'
  },
  {
    name: 'Air Jordan 1 Low Chloropyll',
    price: 'IDR 1,240,000',
    image: '/images/1JT/1,240,000(1).png'
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
.carousel-item img {
  object-fit: contain;
  height: 100%;
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: rgba(0, 0, 0, 0.5); /* abu gelap semi transparan */
  background-size: 100% 100%;
  border-radius: 50%;
  padding: 10px;
}

.carousel-control-prev,
.carousel-control-next {
  width: 50px;
}
</style>

<template>
  <div class="container py-5">
    <div class="row g-4">
      <!-- Product Images -->
      <div class="col-md-6 h" >
        <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner" style="min-height: 300px;">
            <div
              v-for="(img, index) in product.images"
              :key="index"
              :class="['carousel-item', { active: index === 0 }]"
            >
              <img :src="img" class="d-block w-100 rounded" alt="Product image" />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <!-- Product Details -->
      <div class="col-md-6">
        <h2 class="h4 fw-semibold">{{ product.name }}</h2>

        <div class="mb-3">
          <p class="small text-muted">PRICE</p>
          <div class="d-flex align-items-start gap-2">
            <p class="h5 fw-bold text-dark">{{ product.price }}</p>
            <span class="badge bg-danger">-{{ product.discount }}%</span>
          </div>
          <p class="text-muted text-decoration-line-through">{{ product.originalPrice }}</p>
        </div>

        <!-- Size -->
        <div class="mb-3">
          <label class="form-label">Select Size</label>
          <div class="d-flex flex-wrap gap-2">
            <button
            v-for="size in product.sizes"
            :key="size"
            :class="['btn btn-outline-secondary btn-sm rounded-pill px-3', { active: selectedSize === size }]"
            @click="selectedSize = size">
            {{ size }}
            </button>

          </div>
          <small class="text-muted mt-2 d-block">Selected: {{ selectedSize || '-' }}</small>
        </div>

        <!-- Quantity -->
        <div class="mb-3">
          <label class="form-label">Quantity</label>
          <div class="input-group w-auto">
            <button class="btn btn-outline-dark" @click="decreaseQty">-</button>
            <input
              type="number"
              v-model.number="quantity"
              class="form-control text-center"
              style="width: 60px"
              min="1"
            />
            <button class="btn btn-outline-dark" @click="increaseQty">+</button>
          </div>
        </div>

        <!-- Buttons -->
        <div class="row g-2">
        <div class="col-md-6">
            <button class="btn btn-dark w-100 py-2">Add to Cart</button>
        </div>
        <div class="col-md-6">
            <button class="btn btn-warning w-100 py-2">Buy Now</button>
        </div>
        </div>

        <!-- Accordion -->
        <div class="accordion mt-4" id="accordionInfo">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                Please Make Sure The Size Fits You.
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse">
              <div class="accordion-body small text-muted">
                If you are unsure about your size, please click the size chart button and browse through the chart. Our company policy does not accept refunds or returns for sizing-related issues.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                Authentic. Guaranteed.
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse">
              <div class="accordion-body small text-muted">
                All products sold are 100% authentic and verified by our team of experts. We guarantee original items only.
              </div>
            </div>
          </div>
        </div>

        <!-- Share -->
        <div class="mt-4">
          <p class="mb-2">Share this product to your friends!</p>
          <div class="d-flex gap-3">
            <img src="/images/instagram.png" alt="Instagram" class="" width="24" />
            <img src="/images/facebook.png" alt="Facebook" class="" width="24" />
            <img src="/images/whatsapp.png" alt="WhatsApp" class="" width="24" />
            <img src="/images/twitter.png" alt="Twitter" class="" width="24" />
            <img src="/images/email.png" alt="Email" class="" width="24" />
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

    <!-- Similar Products -->
    <div class="mt-5">
      <h3 class="text-center fw-bold mb-4">Similar Products</h3>
      <div class="row row-cols-2 row-cols-md-4 g-4">
        <div class="col" v-for="(item, idx) in similarProducts" :key="idx">
          <div class="card h-100">
            <img :src="item.image" class="card-img-top" alt="..." />
            <div class="card-body">
              <h6 class="card-title">{{ item.name }}</h6>
              <p class="text-success fw-bold">{{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
