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
  localStorage.removeItem('user_data')
  localStorage.removeItem('auth_token')
  isLoggedIn.value = false
  user.value = null
  router.push('/')
}

watch(isDarkMode, (val) => {
  document.body.classList.toggle('dark-mode', val)
})

onMounted(() => {
  const storedUser = localStorage.getItem('user_data')
  const token = localStorage.getItem('auth_token')
  if (storedUser && token) {
    try {
      user.value = JSON.parse(storedUser)
      isLoggedIn.value = true
    } catch {
      console.warn('Gagal parse user_data')
    }
  }

  const storedDark = localStorage.getItem('darkMode')
  isDarkMode.value = storedDark === 'true'
  document.body.classList.toggle('dark-mode', isDarkMode.value)
})
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-top shadow-sm py-3" :class="isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'">
    <div class="container-fluid px-4">
      <!-- Brand -->
      <RouterLink class="navbar-brand fw-bold text-uppercase" to="/">Lucien Avenue</RouterLink>

      <!-- Toggler -->
      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 💡 Mobile Search (selalu tampil, di luar collapse) -->
      <form class="d-flex align-items-center my-2 d-flex d-lg-none w-100" @submit.prevent="handleSearch">
        <div class="glass-search w-100">
          <i class="bi bi-search"></i>
          <input v-model="searchQuery" type="text" placeholder="Search..." />
        </div>
      </form>

      <!-- Collapse Menu -->
      <div class="collapse navbar-collapse justify-content-between" :class="{ show: isMenuOpen }">
        <ul class="navbar-nav mx-auto gap-3">
          <li v-for="i in items" :key="i.to" class="nav-item">
            <RouterLink class="nav-link premium-link" :class="{ active: route.path === i.to }" :to="i.to" @click="isMenuOpen = false">
              {{ i.name }}
            </RouterLink>
          </li>
        </ul>

        <!-- 💡 Desktop Search -->
        <form class="d-flex align-items-center d-none d-lg-flex" @submit.prevent="handleSearch">
          <div class="glass-search">
            <i class="bi bi-search"></i>
            <input v-model="searchQuery" type="text" placeholder="Search..." />
          </div>
        </form>

        <!-- Dark Mode Toggle -->
        <button class="btn-darkmode-toggle ms-3" @click="toggleDarkMode">
          <i class="bi" :class="isDarkMode ? 'bi-sun-fill' : 'bi-moon-stars-fill'"></i>
        </button>

        <!-- Auth Menu -->
        <ul class="navbar-nav ms-3">
          <template v-if="!isLoggedIn">
            <li class="nav-item">
              <RouterLink class="nav-link premium-link" to="/login">Login</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link premium-link" to="/register">Register</RouterLink>
            </li>
          </template>
          <template v-else>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-person-circle" style="font-size: 1.2rem;"></i>
                <span>{{ user?.name || 'User' }}</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                <li><RouterLink class="dropdown-item" to="/userProfile">Profile</RouterLink></li>
                <li><button class="dropdown-item" @click="logout">Logout</button></li>
              </ul>
            </li>
          </template>
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
/* DARK MODE ELEGAN - GLOBAL */
body.dark-mode {
  background: linear-gradient(145deg, #0f0f0f, #1c1c1c);
  color: #eaeaea;
  font-family: 'Poppins', sans-serif;
  transition: background 0.4s ease, color 0.4s ease;
  background-attachment: fixed;
}

/* NAVBAR */
body.dark-mode .navbar {
  background-color: rgba(24, 24, 24, 0.8) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

body.dark-mode .navbar-brand,
body.dark-mode .nav-link {
  color: #eaeaea !important;
}

body.dark-mode .nav-link:hover,
body.dark-mode .nav-link.active {
  color: #ffffff !important;
}

body.dark-mode .dropdown-menu {
  background-color: #1e1e1e;
  border: 1px solid #333;
}

body.dark-mode .dropdown-item {
  color: #eaeaea;
}

body.dark-mode .dropdown-item:hover {
  background-color: #2a2a2a;
}

/* DARK MODE: SEARCH BAR */
body.dark-mode .glass-search {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #eaeaea;
}

body.dark-mode .glass-search input {
  color: #eaeaea;
}

/* DARK MODE TOGGLE BUTTON */
body.dark-mode .btn-darkmode-toggle {
  color: #eaeaea;
}
body.dark-mode .btn-darkmode-toggle:hover {
  color: #f39c12;
}

/* PREMIUM LINK */
.premium-link {
  font-weight: 500;
  position: relative;
  transition: color 0.2s ease;
}
.premium-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0%;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease, left 0.3s ease;
}
.premium-link:hover::after,
.premium-link.active::after {
  width: 100%;
  left: 0;
}
.premium-link.active {
  font-weight: 600;
}

body:not(.dark-mode) .premium-link {
  color: #111;
}
body.dark-mode .premium-link {
  color: #eaeaea;
}

/* FOOTER */
/* FOOTER DARK MODE */
body.dark-mode footer {
  background-color: #181818;
  color: #f0f0f0;
  border-top: 1px solid #2a2a2a;
  padding: 3rem 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
}

/* Judul & teks footer */
body.dark-mode footer h5,
body.dark-mode footer p,
body.dark-mode footer li,
body.dark-mode footer a,
body.dark-mode footer span {
  color: #dcdcdc;
}

/* Judul tim dan kontak */
body.dark-mode footer p.fw-semibold {
  color: #ffffff;
  font-weight: 600;
}

/* Hover efek link */
body.dark-mode footer a:hover {
  color: #ffffff;
  text-decoration: underline;
}

/* Divider agar terlihat */
body.dark-mode footer .border-top {
  border-color: #333 !important;
}

/* Logo partner agar terlihat pas */
body.dark-mode footer img {
  filter: brightness(1.2);
}
/* Tulisan copyright bawah biar kontras */
body.dark-mode footer .text-muted,
body.dark-mode footer small,
body.dark-mode footer .text-center {
  color: #bfbfbf !important;
  font-weight: 500;
  letter-spacing: 0.3px;
}

/* ANIMASI */
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

/* SEARCH BAR (Light & Dark Shared) */
.glass-search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  width: 240px;
  transition: all 0.3s ease;
}
.glass-search input {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
}

/* DARKMODE TOGGLE */
.btn-darkmode-toggle {
  background: transparent;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
}

/* Tambahan efek visual elegan di background */
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
  opacity: 0.4;
}

html.dark-mode,
body.dark-mode {
  background: linear-gradient(145deg, #0f0f0f, #1c1c1c);
  color: #eaeaea;
}

</style>
