<script setup>
import MainLayout from '@/layout/MainLayout.vue'
import { onMounted } from 'vue'
import { ping } from './services/api'

onMounted(async () => {
  try {
    const res = await ping()
    console.log('✅ Backend ready:', res.data)
  } catch (err) {
    console.error('❌ Ping gagal:', err.message)
  }
})
</script>

<template>
  <MainLayout />
</template>
