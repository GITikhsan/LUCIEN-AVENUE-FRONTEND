<script setup>
import { onMounted } from 'vue'
// Impor 'ping' (named export) menggunakan kurung kurawal {}
import { ping } from './services/api' 

onMounted(async () => {
  try {
    const res = await ping()
    console.log('✅ Backend ready:', res.data)
  } catch (err) {
    console.error('❌ Ping gagal:', err)
  }
})
</script>

<template>
  <router-view />
</template>

<style>
/* --- GLOBAL DARK MODE RULES --- */

/* Warna dasar halaman */
body.dark-mode {
  background-color: #121212;
  color: #eaeaea;
  font-family: 'Poppins', sans-serif;
  transition: background 0.3s ease, color 0.3s ease;
}

/* Container dan Section */
body.dark-mode .container,
body.dark-mode section {
  background-color: transparent;
  color: #eaeaea;
}

/* Card, box, dll */
body.dark-mode .card {
  background-color: #1e1e1e;
  color: #eaeaea;
  border: none;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.05);
}

/* Input, search bar, dll */
body.dark-mode input,
body.dark-mode select,
body.dark-mode textarea {
  background-color: #2a2a2a;
  color: #f0f0f0;
  border: 1px solid #444;
}

body.dark-mode input::placeholder {
  color: #aaa;
}

/* Link dan teks */
body.dark-mode a {
  color: #dcdcdc;
}
body.dark-mode a:hover {
  color: #ffffff;
}

/* Footer */
body.dark-mode footer {
  background-color: #181818;
  color: #eaeaea;
  border-top: 1px solid #2a2a2a;
}
body.dark-mode footer .text-muted {
  color: #bfbfbf !important;
}

/* Tambahan efek latar */
body.dark-mode::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.03), transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.02), transparent 50%);
  z-index: -1;
  pointer-events: none;
  opacity: 0.3;
}
</style>
