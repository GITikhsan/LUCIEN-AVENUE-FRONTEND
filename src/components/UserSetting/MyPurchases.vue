
<script setup>
const purchases = [
  {
    name: 'Air Jordan 1 Retro Low Dior',
    qty: 1,
    price: 'IDR 100,000,000',
    originalPrice: null,
    total: 'IDR 100,000,000',
    image: '/images/100JT/100,000,000(1).png'
  },
  {
    name: 'Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown',
    qty: 1,
    price: 'IDR 4,240,000',
    originalPrice: 'IDR 5,808,219',
    total: 'IDR 4,240,000',
    image: '/images/4JT/4,240,000.png'
  },
  {
    name: 'Air Jordan 1 Low SE Craft Light Olive',
    qty: 1,
    price: 'IDR 3,210,000',
    originalPrice: null,
    total: 'IDR 3,210,000',
    image: '/images/3JT/3,210,000(1).png'
  }
]
</script>

<style scoped>
</style>

<template>
  <div class="container py-5">
    <h2 class="fw-bold text-center mb-5">PEMBELIAN SAYA</h2>
    <div class="row justify-content-center">
      <div
        v-for="(item, index) in purchases"
        :key="index"
        class="col-md-10 mb-4"
      >
        <div class="card shadow-sm p-3">
          <div class="d-flex align-items-center">
            <img :src="item.image" alt="product" class="rounded me-3" style="width: 80px; height: auto;" />
            <div class="flex-grow-1">
              <div class="fw-semibold">{{ item.name }}</div>
              <div class="text-muted small">x{{ item.qty }}</div>
              <div>
                <span v-if="item.originalPrice" class="text-muted text-decoration-line-through me-2">
                  {{ item.originalPrice }}
                </span>
                <span class="text-danger fw-bold">{{ item.price }}</span>
              </div>
            </div>
            <div class="text-end ms-3">
              <div class="text-danger fw-bold">Total: {{ item.total }}</div>
            </div>
          </div>
          <hr/>
        </div>
      </div>
    </div>
  </div>
</template>

