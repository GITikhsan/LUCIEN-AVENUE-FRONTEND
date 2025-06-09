
<script setup>
import MainLayout from '@/layout/MainLayout.vue'
import HelloAPI from './components/HelloAPI.vue'
import { onMounted } from 'vue'
import { ping } from './services/api'
onMounted(async () => {
  try {
    const res = await ping()
    console.log(res.data)
  } catch (err) {
    console.error('Ping gagal:', err)
  }
})
</script>

<template>
  <MainLayout />
  <HelloAPI />
</template>

<style scoped>
</style>