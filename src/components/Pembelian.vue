<template>
  <div>
    <h4 class="mb-4">PEMBELIAN SAYA</h4>
    <div class="card mb-3" v-for="item in items" :key="item.nama">
      <div class="card-body d-flex">
        <img :src="item.img" class="me-3" style="width: 80px; height: 80px;">
        <div>
          <h5>{{ item.nama }}</h5>
          <p class="mb-1">x1</p>
          <p class="text-danger fw-bold">{{ item.harga }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const items = [
  { nama: 'Air Jordan 1 Retro Low Dior', harga: 'IDR 100,000,000', img: '/images/100JT/100,000,000(1).png' },
  { nama: 'Travis Scott', harga: 'IDR 4,240,000', img: '/images/4JT/4,240,000.png' },
  { nama: 'Light Olive', harga: 'IDR 3,210,000', img: '/images/3JT/3,210,000(1).png' }
]
</script>
