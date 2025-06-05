<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isOpen = ref(false)

const items = [
  { to: '/', name: 'Home' },
  { to: '/contact', name: 'Kontak' },
  { to: '/aboutus', name: 'About Us' },
  { to: '/fashion', name: 'Fashion' },
  { to: '/Skills', name: 'Home' },
  { to: '/Experience', name: 'Kontak' },
  { to: '/fashion', name: 'Fashion' },
  { to: '/product', name: 'Product' },
  { to: '/viewmore', name: 'View More' },
]
</script>

<template>
  <div class="main-layout">
    <header class="main-header">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">Lucien Avenue</h1>
        <!-- Hamburger Button -->
        <button
          class="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
          @click="isOpen = !isOpen"
          aria-label="Toggle navigation"
        >
          <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav :class="[(isOpen ? 'block' : 'hidden'), 'md:block', 'w-full', 'md:w-auto', 'mt-3', 'md:mt-0']">
        <ul class="flex flex-col md:flex-row md:space-x-8 text-center md:text-left">
          <li v-for="item in items" :key="item.to">
            <RouterLink
              :to="item.to"
              class="block py-2 md:py-0 hover:text-gray-300 transition-colors"
              @click="isOpen = false">
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </header>
    <main class="main-content">
      <router-view />
    </main>
    <footer class="main-footer">
      <span>&copy; {{ new Date().getFullYear() }} Lucien Avenue</span>
    </footer>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-header {
  background: #222;
  color: #fff;
  padding: 1rem;
}

.main-content {
  flex: 1;
  padding: 2rem;
  background: #f9f9f9;
}

.main-footer {
  background: #222;
  color: #fff;
  text-align: center;
  padding: 1rem;
}

/* Responsive padding for main-content */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}
</style>