<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'

const user = ref(null)
const isLoggedIn = ref(false)
const isMenuOpen = ref(false)
const isDarkMode = ref(false)
const searchQuery = ref('')
const router = useRouter()
const route = useRoute()

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

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('AUTH_TOKEN')
  isLoggedIn.value = false
  user.value = null
  router.push('/')
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value)
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
    <div class="container-fluid px-4">
      <RouterLink class="navbar-brand fw-bold text-uppercase font-serif me-4" to="/">
        Lucien Avenue
      </RouterLink>

      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-between" :class="{ show: isMenuOpen }">
        <ul class="navbar-nav mx-auto gap-4">
          <li v-for="i in items" :key="i.to" class="nav-item">
            <RouterLink
              class="nav-link premium-link"
              :class="{ 'active': route.path === i.to }"
              :to="i.to"
              @click="isMenuOpen = false"
            >
              {{ i.name }}
            </RouterLink>
          </li>
        </ul>

        <form class="navbar-search" @submit.prevent="handleSearch">
          <div class="glass-search">
            <i class="bi bi-search"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Lucien Avenue..."
              :class="{ 'text-white': isDarkMode }"
            />
          </div>
        </form>

        <!-- Theme Toggle -->
        <button class="btn btn-sm btn-outline-secondary ms-3" @click="toggleDarkMode">
          <span v-if="isDarkMode">☀️</span>
          <span v-else>🌙</span>
        </button>

        <ul class="navbar-nav ms-3">
          <li v-if="!isLoggedIn" class="nav-item">
            <RouterLink class="nav-link premium-link" to="/login" @click="isMenuOpen = false">Login</RouterLink>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <RouterLink class="nav-link premium-link" to="/register" @click="isMenuOpen = false">Register</RouterLink>
          </li>
          <li v-else class="nav-item dropdown">
            <a class="nav-link dropdown-toggle premium-link" href="#" role="button" data-bs-toggle="dropdown">
              {{ user?.name || 'User' }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
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

  <footer class="w-100 px-4 px-md-5 py-5" :class="isDarkMode ? 'bg-black text-white' : 'bg-dark text-white'">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-4 text-sm">
        <div class="col-md-4">
          <h2 class="h5 fw-bold text-uppercase">LUCIEN AVENUE</h2>
          <p class="text-secondary mb-1">100% Money Back Guarantee</p>
          <p class="text-secondary">Authentic. Trusted. Guaranteed.</p>
        </div>
        <div class="col">
          <p class="fw-semibold">Created by Our Team</p>
          <ul class="list-unstyled text-secondary">
            <li>23.11.5506_Ikhsan</li>
            <li>23.11.5519_Zaidan</li>
            <li>23.11.5533_Wahyu</li>
            <li>23.11.5553_Ian</li>
            <li>23.11.5560_Bagus</li>
            <li>23.11.5521_Wahid</li>
          </ul>
        </div>
        <div class="col text-center text-md-start">
          <p class="fw-semibold">Keep in touch with us!</p>
          <a href="https://www.instagram.com/lucienavenue" target="_blank" class="d-flex align-items-center text-secondary text-decoration-none mb-2">
            <img src="/images/ig.webp" alt="Instagram" style="height: 24px;" class="me-2" />
            <span>@lucienavenue</span>
          </a>
          <a href="https://wa.me/6282281899371" target="_blank" class="d-flex align-items-center text-secondary text-decoration-none">
            <img src="/images/wa.webp" alt="WhatsApp" style="height: 24px;" class="me-2" />
            <span>+62 822-8189-9371</span>
          </a>
        </div>
        <div class="col text-center text-md-start">
          <p class="fw-semibold">Our Partner</p>
          <img src="/images/1W.png" alt="Amikom YK" style="height: 32px;" class="img-fluid">
        </div>
      </div>
      <div class="border-top border-secondary mt-5 pt-4 text-center small text-muted">
        © 2025 LUCIEN AVENUE – ALL RIGHTS RESERVED.
      </div>
    </div>
  </footer>
</template>

<style>
body.dark-mode {
  background-color: #121212;
  color: #e4e4e4;
}
body.dark-mode .navbar,
body.dark-mode .dropdown-menu {
  background-color: #222 !important;
  color: #e4e4e4;
}
body.dark-mode .premium-link {
  color: #eee;
}
body.dark-mode .premium-link.active {
  color: #fff;
}
body.dark-mode .glass-search {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
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
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #111;
  position: relative;
  padding: 6px 2px;
  transition: color 0.2s ease;
  letter-spacing: 0.5px;
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
  gap: 10px;
  padding: 8px 16px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 320px;
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
</style>
