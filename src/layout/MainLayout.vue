<script setup>
import { RouterLink, RouterView } from 'vue-router'
const items = [
  { to: '/',          name: 'Home' },
  { to: '/login', name: 'Login' },
  { to: '/register',name: 'Register' },
  { to: '/userProfile', name: 'Profile' },
  { to: '/bag', name: 'Bag' },
  { to: '/aboutUs',   name: 'About Us' }
]
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
  <div class="container-fluid px-4">
    <!-- Brand -->
    <RouterLink class="navbar-brand fw-bold text-uppercase font-serif me-4" style="letter-spacing: 2px; font-size: 1.5rem;" to="/">
      Lucien Avenue
    </RouterLink>

    <!-- Toggler (mobile) -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Menu + Search -->
    <div class="collapse navbar-collapse justify-content-between" id="navbarMain">
            <!-- Navigation: Bold, uppercase, spaced -->
            <ul class="navbar-nav mx-auto gap-4">
        <li v-for="i in items" :key="i.to" class="nav-item">
          <RouterLink
            class="nav-link premium-link"
            :class="{ 'active': $route.path === i.to }"
            :to="i.to"
          >
            {{ i.name }}
          </RouterLink>
        </li>
      </ul>
      <!-- Search -->
      <form class="navbar-search" @submit.prevent="handleSearch">
        <div class="glass-search">
        <i class="bi bi-search"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search Lucien Avenue..."
        />
      </div>
      </form>
          </div>
        </div>
      </nav>


  <!-- Transisi halaman -->
  <transition name="fade-page" mode="out-in">
    <RouterView />
  </transition>



  <!-- Footer -->
  <footer class="bg-dark text-white w-100 px-4 px-md-5 py-5">
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-4 text-sm">
      
      <!-- LOGO & BRAND INFO -->
      <div class="col-md-4">
        <h2 class="h5 fw-bold text-white text-uppercase">LUCIEN AVENUE</h2>
        <p class="text-secondary mb-1">100% Money Back Guarantee</p>
        <p class="text-secondary">Authentic. Trusted. Guaranteed.</p>
      </div>

      <!-- TEAM INFO -->
      <div class="col">
        <p class="fw-semibold text-white">Created by Our Team</p>
        <ul class="list-unstyled text-secondary">
          <li class="d-flex align-items-center gap-2"><img src="/public/images/programmer.png" class="me-2" style="height: 16px; width: 16px;" alt="User Icon">23.11.5506_Ikhsan</li>
          <li class="d-flex align-items-center gap-2"><img src="/public/images/programmer.png" class="me-2" style="height: 16px; width: 16px;" alt="User Icon">23.11.5519_Zaidan</li>
          <li class="d-flex align-items-center gap-2"><img src="/public/images/programmer.png" class="me-2" style="height: 16px; width: 16px;" alt="User Icon">23.11.5533_Wahyu</li>
          <li class="d-flex align-items-center gap-2"><img src="/public/images/programmer.png" class="me-2" style="height: 16px; width: 16px;" alt="User Icon">23.11.5553_Ian</li>
          <li class="d-flex align-items-center gap-2"><img src="/public/images/programmer.png" class="me-2" style="height: 16px; width: 16px;" alt="User Icon">23.11.5560_Bagus</li>
          <li class="d-flex align-items-center gap-2"><img src="/public/images/programmer.png" class="me-2" style="height: 16px; width: 16px;" alt="User Icon">23.11.5521_Wahid</li>
        </ul>
      </div>

      <!-- CONNECT -->
      <div class="col text-center text-md-start">
        <p class="fw-semibold text-white">Keep in touch with us!</p>

        <!-- Instagram -->
        <a href="https://www.instagram.com/lucienavenue" target="_blank" class="d-flex align-items-center justify-content-center justify-content-md-start text-secondary text-decoration-none mb-2">
          <img src="/images/ig.webp" alt="Instagram" style="height: 24px; width: 24px;" class="me-2">
          <span>@lucienavenue</span>
        </a>

        <!-- WhatsApp -->
        <a href="https://wa.me/6282281899371" target="_blank" class="d-flex align-items-center justify-content-center justify-content-md-start text-secondary text-decoration-none">
          <img src="/images/wa.webp" alt="WhatsApp" style="height: 24px; width: 24px;" class="me-2">
          <span>+62 822-8189-9371</span>
        </a>
      </div>

      <!-- DOWNLOAD APP -->
      <div class="col text-center text-md-start">
        <p class="fw-semibold text-white">Download Our App</p>
        <div class="d-flex justify-content-center justify-content-md-start gap-3">
          <img src="/images/appstore.webp" alt="App Store" style="height: 32px;" class="img-fluid">
          <img src="/images/googleplay.webp" alt="Play Store" style="height: 32px;" class="img-fluid">
        </div>
      </div>
    </div>

    <!-- SEPARATOR -->
    <div class="border-top border-secondary mt-5 pt-4 text-center small text-muted">
      © 2025 LUCIEN AVENUE – ALL RIGHTS RESERVED. REGISTERED UNDER PT. LUCIEN CREATIVE INDONESIA.
    </div>
  </div>
</footer>

</template>

<style>
.fade-page-enter-active,
.fade-page-leave-active {
  transition: all 0.4s ease;
}
.fade-page-enter-from {
  opacity: 0; transform: translateY(20px);
}
.fade-page-leave-to {
  opacity: 0; transform: translateY(-20px);
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

.premium-link:hover {
  color: #000;
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
  color: #000;
  width: 100%;
}
.glass-search i {
  color: #000;
}

</style>