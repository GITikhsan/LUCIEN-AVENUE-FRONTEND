<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute, RouterLink, RouterView } from 'vue-router'

const router = useRouter()
const route = useRoute()

const user = ref(null)
const isLoggedIn = ref(false)
const isMenuOpen = ref(false)
const isDarkMode = ref(false)
const searchQuery = ref('')

const items = [
  { to: '/', name: 'Home' },
  { to: '/bag', name: 'Bag' },
  { to: '/aboutUs', name: 'About Us' }
]

const handleSearch = () => {
  alert(`Mencari: ${searchQuery.value}`)
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value)
}

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('AUTH_TOKEN')
  isLoggedIn.value = false
  user.value = null
  router.push('/')
}

watch(isDarkMode, (val) => {
  document.body.classList.toggle('dark-mode', val)
})

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
    isLoggedIn.value = true
  }
  const storedDark = localStorage.getItem('darkMode')
  isDarkMode.value = storedDark === 'true'
  document.body.classList.toggle('dark-mode', isDarkMode.value)
})
</script>

<template>
  <nav class="navbar navbar-expand-lg shadow-sm sticky-top py-3" :class="isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'">
    <div class="container-fluid px-3 px-md-4">
      <RouterLink class="navbar-brand fw-bold text-uppercase" to="/">Lucien Avenue</RouterLink>
      
      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-between" :class="{ show: isMenuOpen }">
        <ul class="navbar-nav mx-auto gap-3">
          <li v-for="i in items" :key="i.to" class="nav-item">
            <RouterLink class="nav-link premium-link" :class="{ active: route.path === i.to }" :to="i.to" @click="isMenuOpen = false">
              {{ i.name }}
            </RouterLink>
          </li>
        </ul>

        <form class="d-flex align-items-center" @submit.prevent="handleSearch">
          <div class="glass-search">
            <i class="bi bi-search"></i>
            <input v-model="searchQuery" type="text" placeholder="Search Lucien Avenue..." :class="{ 'text-white': isDarkMode }" />
          </div>
        </form>

        <button class="btn-darkmode-toggle ms-3" @click="toggleDarkMode">
          <i class="bi" :class="isDarkMode ? 'bi-sun-fill' : 'bi-moon-stars-fill'"></i>
        </button>

        <ul class="navbar-nav ms-3">
          <li v-if="!isLoggedIn" class="nav-item">
            <RouterLink class="nav-link premium-link" to="/login">Login</RouterLink>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <RouterLink class="nav-link premium-link" to="/register">Register</RouterLink>
          </li>
          <li v-else class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" data-bs-toggle="dropdown">
              <i class="bi bi-person-circle" style="font-size: 1.2rem;"></i>
              <span>{{ user?.name || 'User' }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm">
              <li><RouterLink class="dropdown-item" to="/userProfile">Profile</RouterLink></li>
              <li><button class="dropdown-item" @click="logout">Logout</button></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <transition name="fade-page" mode="out-in">
    <RouterView />
  </transition>

  <footer class="footer py-5 mt-5" :class="isDarkMode ? 'bg-black text-white' : 'bg-dark text-white'">
    <div class="container px-4">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 text-sm">
        <div class="col">
          <h5 class="fw-bold text-uppercase">Lucien Avenue</h5>
          <p class="text-secondary mb-1">100% Money Back Guarantee</p>
          <p class="text-secondary">Authentic. Trusted. Guaranteed.</p>
        </div>
        <div class="col">
          <p class="fw-semibold">Created by Our Team</p>
          <ul class="list-unstyled text-secondary small">
            <li>23.11.5506_Ikhsan</li>
            <li>23.11.5519_Zaidan</li>
            <li>23.11.5533_Wahyu</li>
            <li>23.11.5553_Ian</li>
            <li>23.11.5560_Bagus</li>
            <li>23.11.5521_Wahid</li>
          </ul>
        </div>
        <div class="col">
          <p class="fw-semibold">Keep in touch!</p>
          <a href="https://instagram.com/lucienavenue" target="_blank" class="d-flex align-items-center text-secondary text-decoration-none mb-2">
            <img src="/images/ig.webp" alt="IG" style="height: 20px;" class="me-2" />
            <span>@lucienavenue</span>
          </a>
          <a href="https://wa.me/6282281899371" target="_blank" class="d-flex align-items-center text-secondary text-decoration-none">
            <img src="/images/wa.webp" alt="WA" style="height: 20px;" class="me-2" />
            <span>+62 822-8189-9371</span>
          </a>
        </div>
        <div class="col">
          <p class="fw-semibold">Our Partner</p>
          <img src="/images/1W.png" alt="Partner Logo" class="img-fluid" style="max-height: 32px;">
        </div>
      </div>
      <div class="border-top border-secondary mt-4 pt-3 text-center small text-muted">
        © 2025 LUCIEN AVENUE – ALL RIGHTS RESERVED.
      </div>
    </div>
  </footer>
</template>

<style scoped>
body.dark-mode {
  background-color: #121212;
  color: #e4e4e4;
}
body.dark-mode .navbar,
body.dark-mode .dropdown-menu {
  background-color: #333 !important;
  color: #f1f1f1 !important;
  border: 1px solid #444;
}

body.dark-mode .dropdown-menu .dropdown-item {
  color: #f1f1f1;
}

body.dark-mode .dropdown-menu .dropdown-item:hover {
  background-color: #444;
  color: #fff;
}

body.dark-mode .premium-link {
  color: #ddd;
}
body.dark-mode .premium-link.active {
  color: #fff;
}
.fade-page-enter-active,
.fade-page-leave-active {
  transition: all 0.4s ease;
}
.fade-page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.premium-link {
  font-weight: 500;
  color: #111;
  position: relative;
  transition: color 0.2s ease;
}
.premium-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0%;
  height: 2px;
  background-color: #000;
  transition: width 0.3s ease, left 0.3s ease;
}
.premium-link:hover::after {
  width: 100%;
  left: 0;
}
.premium-link.active {
  font-weight: 600;
  color: #000;
}
.premium-link.active::after {
  width: 100%;
  left: 0;
}
.glass-search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 240px;
  transition: 0.3s ease;
}
.glass-search input {
  background: transparent;
  border: none;
  outline: none;
  color: inherit;
  width: 100%;
}
.glass-search i {
  color: inherit;
}
.btn-darkmode-toggle {
  background: transparent;
  border: none;
  font-size: 1.3rem;
  color: inherit;
  cursor: pointer;
}
.btn-darkmode-toggle:hover {
  color: #f39c12;
}

body.dark-mode .navbar {
  background-color: #111 !important;
  color: #f5f5f5;
  border-bottom: 1px solid #333;
}

body.dark-mode .navbar .nav-link,
body.dark-mode .navbar-brand,
body.dark-mode .navbar-toggler-icon {
  color: #f5f5f5 !important;
}

body.dark-mode .navbar .nav-link:hover {
  color: #fff !important;
}

/* Hilangkan border & shadow */
.navbar {
  border-top: none !important;
  border-bottom: none; /* Opsional */
  box-shadow: none !important;
}

/* Pastikan body dan html tidak punya margin/padding/border */
body, html {
  margin: 0;
  padding: 0;
  border: none;
}

</style>
