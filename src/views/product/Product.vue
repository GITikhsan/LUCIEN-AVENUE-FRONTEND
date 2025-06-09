
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
  },
  {
    name: 'Air Jordan 1 Low Chloropyll',
    price: 'IDR 1,240,000',
    image: '/images/1JT/1,240,000(1).png'
  },
  {
    name: 'Air Jordan 1 Low Chloropyll',
    price: 'IDR 1,240,000',
    image: '/images/1JT/1,240,000(1).png'
  },
  {
    name: 'Air Jordan 1 Low Chloropyll',
    price: 'IDR 1,240,000',
    image: '/images/1JT/1,240,000(1).png'
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

.product-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.product-image-wrapper {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 16px;
  text-align: center;
}

.product-image {
  max-height: 180px; /* diperbesar */
  width: 100%;
  object-fit: contain;
}

.product-info {
  padding: 0 4px;
}

.product-title {
  font-size: 16px; /* diperbesar */
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
}

.product-price {
  font-weight: bold;
  color: #007b33;
  font-size: 15px;
  margin: 0;
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

        <div class="mt-5 mb-4">
        <!-- Label "PRICE" -->
        <p class="text-uppercase text-muted fw-medium small mb-2" style="letter-spacing: 0.05em;">
          Price
        </p>

        <!-- Harga dan Diskon -->
        <div class="d-flex align-items-baseline gap-2">
          <p class="h4 fw-semibold text-dark mb-0">IDR {{ product.price }}</p>
          <span class="badge rounded-pill bg-danger small py-1 px-2">-{{ product.discount }}%</span>
        </div>

        <!-- Harga Coret -->
        <p class="text-muted text-decoration-line-through mt-1 mb-0" style="font-size: 0.9rem;">
          IDR {{ product.originalPrice }}
        </p>
      </div>


        <!-- Size -->
  <div class="mt-4">
    <label class="form-label fw-medium">Select Size</label>
    <div class="d-flex flex-wrap gap-2">
      <button
        v-for="size in product.sizes"
        :key="size"
        :class="['btn border rounded-3', selectedSize === size ? 'btn-dark text-white' : 'btn-light']"
        @click="selectedSize = size"
        style="width: 48px; height: 38px;"
      >
        {{ size }}
      </button>
    </div>
  </div>

  <!-- Quantity -->
  <div class="mt-4">
    <label class="form-label fw-medium">Quantity</label>
    <div class="input-group" style="max-width: 140px;">
      <button class="btn btn-light border" @click="decreaseQty">−</button>
      <input
        v-model.number="quantity"
        type="number"
        class="form-control text-center border-start-0 border-end-0"
        style="background-color: #fafafa"
        min="1"
      />
      <button class="btn btn-light border" @click="increaseQty">+</button>
    </div>
  </div>

  <!-- Buttons -->
  <div class="d-flex gap-3 mt-4">
    <button class="btn btn-dark w-100 py-2 rounded-pill">Add to Cart</button>
    <button class="btn btn-warning w-100 py-2 rounded-pill text-dark fw-semibold">Buy Now</button>
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
    <div class="container mt-5">
  <h3 class="text-center fw-bold mb-4">Similar Products</h3>

  <div class="row row-cols-2 row-cols-md-4 g-4">
    <div class="col" v-for="(item, idx) in similarProducts.slice(0, 8)" :key="idx">
      <div class="product-card">
        <div class="product-image-wrapper">
          <img :src="item.image" alt="Product Image" class="product-image" />
        </div>
        <div class="product-info text-start">
          <p class="product-title">{{ item.name }}</p>
          <p class="product-price">IDR {{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Tombol View More -->
  <div class="text-center mt-4">
    <button class="btn btn-outline-dark px-4 py-2">
      View More
    </button>
  </div>
</div>







  </div>
</template>
