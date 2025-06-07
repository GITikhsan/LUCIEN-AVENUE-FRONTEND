<template>
  <div class="d-flex flex-column flex-md-row h-100">
    <!-- Sidebar -->
    <div :class="['bg-white border-end', sidebarOpen ? 'd-block' : 'd-none d-md-block']" style="width: 250px; min-height: 100vh;">
      <div class="text-center py-4 border-bottom">
        <h5>Your Profile</h5>
      </div>
      <ul class="nav flex-column p-3">
        <li class="nav-item" v-for="item in menuItems" :key="item">
          <a href="#" class="nav-link" :class="{ active: currentPanel === item }" @click.prevent="currentPanel = item">
            {{ item }}
          </a>
        </li>
        <li class="nav-item mt-4">
          <button class="btn btn-outline-danger w-100">Log Out</button>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-grow-1 p-4 overflow-auto">
      <button class="btn btn-outline-secondary d-md-none mb-3" @click="sidebarOpen = !sidebarOpen">
        ☰ Menu
      </button>
      <component :is="panelComponents[currentPanel]"></component>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Panel state
const currentPanel = ref('DATA SAYA')
const sidebarOpen = ref(false)

// Menu items
const menuItems = ['DATA SAYA', 'PEMBELIAN SAYA', 'PENGEMBALIAN']

// Panel Components
import DataSaya from '../../components/Data.vue'
import PembelianSaya from '../../components/Pembelian.vue'
import Pengembalian from '../../components/Pengembalian.vue'

const panelComponents = {
  'DATA SAYA': DataSaya,
  'PEMBELIAN SAYA': PembelianSaya,
  'PENGEMBALIAN': Pengembalian
}
</script>
