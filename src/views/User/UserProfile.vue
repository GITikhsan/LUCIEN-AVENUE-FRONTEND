
<script setup>
const userName = 'Nama Pengguna'

const menuItems = [
  { to: '/mydata', label: 'My data' },
  { to: '/myPurchases',  label: 'My Purchases' },
  {  to: '/address', label: 'Address' },
  { to: '/help', label: 'Help' },
]
</script>

<style scoped>
.font-serif {
  font-family: 'Georgia', 'Times New Roman', serif;
}
</style>

<template>
  <div class="container py-5 text-center">
    <!-- Nama Pengguna -->
    <h1 class="display-4 fw-normal font-serif mb-5">{{ userName }}</h1>

    <!-- Bantuan Singkat -->
    <div class="text-start mx-auto" style="max-width: 520px">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <strong class="text-uppercase small">Bantuan</strong>
        <a href="#" class="text-decoration-underline small fw-medium">Lihat lainnya</a>
      </div>
      <p class="mb-1">Bagaimana saya dapat membayar pembelian online saya?</p>
      <p class="mb-4">Berapa ukuran saya?</p>
    </div>

    <!-- Daftar Navigasi -->
    <div class="mx-auto text-start" style="max-width: 520px">
      <RouterLink
      v-for="(item, idx) in menuItems"
      :key="idx"
      :to="item.to"
      class="d-flex justify-content-between align-items-center py-3 border-top text-decoration-none text-dark">
      <strong class="text-uppercase small m-0">{{ item.label }}</strong>
      <i class="bi bi-arrow-right"></i>
    </RouterLink>

    </div>
  </div>
</template>

