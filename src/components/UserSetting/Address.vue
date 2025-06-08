<script setup>
const userName = 'Nama Pengguna'

const menuItems = [
  {  to: '/addaddress', label: 'Add Address' },
]
</script>
<template>
  <div class="container py-5 text-center">
    <h2 class="fw-bold mb-4">ALAMAT SAYA</h2>
    <div class="mx-auto text-start border p-4" style="max-width: 640px;">
      <div class="d-flex justify-content-between mb-2">
        <div>
          <p class="mb-1 fw-medium">Ikhsan</p>
          <p class="mb-1">ikhsanfauzi537@gmail.com</p>
          <p class="mb-1">+62 81233466631</p>
          <p class="mb-1">
            GANG KENANGA NO 212, RT 5, SORAGAN, NGESTIHARJO, KASIHAN, BANTUL, D.I.YOGYAKARTA., 55182,
            DI Yogyakarta, Bantul, Ngestiharjo, Kasihan
          </p>
          <span class="badge bg-dark border mt-2">Alamat pengiriman default</span>
        </div>
        <div>
          <router-link to="/EditAddress" class="text-decoration-underline small">Edit</router-link>
        </div>
      </div>
    </div>
    <router-link to="/AddAddress" class="btn btn-dark mt-4 px-5 py-2 fw-bold">Add Address</router-link>
  </div>
</template>