<template>
  <div class="home">
    <h1>Selamat Datang di Lucien Avenue</h1>
    <p>Ini adalah halaman utama aplikasi frontend Lucien Avenue.</p>
  </div>
</template>

<script setup>
// Tambahkan logic JavaScript di sini jika diperlukan
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
  padding: 8vw 4vw;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  width: 90vw;
}

h1 {
  color: #2c3e50;
  margin-bottom: 16px;
  font-size: 2rem;
}

p {
  color: #555;
  font-size: 1rem;
}

@media (max-width: 600px) {
  .home {
    max-width: 98vw;
    padding: 6vw 2vw;
    border-radius: 8px;
  }
  h1 {
    font-size: 1.3rem;
  }
  p {
    font-size: 0.95rem;
  }
}
</style>