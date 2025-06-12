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