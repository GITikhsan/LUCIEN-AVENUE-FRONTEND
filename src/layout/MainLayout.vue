<script setup>
import { RouterLink, RouterView } from 'vue-router'
const items = [
  { to: '/',          name: 'Fashion' },
  { to: '/login', name: 'Login' },
  { to: '/register',name: 'Register' },
  { to: '/userProfile', name: 'Profile' },
  { to: '/aboutUs',   name: 'About Us' }
]
</script>

<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">LUCIEN AVENUE</RouterLink>
      
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="nav" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li v-for="i in items" :key="i.to" class="nav-item">
            <RouterLink class="nav-link" :to="i.to">{{ i.name }}</RouterLink>
          </li>
        </ul>
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
          <img src="/images/ig2.png" alt="Instagram" style="height: 24px; width: 24px;" class="me-2">
          <span>@lucienavenue</span>
        </a>

        <!-- WhatsApp -->
        <a href="https://wa.me/6282281899371" target="_blank" class="d-flex align-items-center justify-content-center justify-content-md-start text-secondary text-decoration-none">
          <img src="/images/wafooter.png" alt="WhatsApp" style="height: 24px; width: 24px;" class="me-2">
          <span>+62 822-8189-9371</span>
        </a>
      </div>

      <!-- DOWNLOAD APP -->
      <div class="col text-center text-md-start">
        <p class="fw-semibold text-white">Download Our App</p>
        <div class="d-flex justify-content-center justify-content-md-start gap-3">
          <img src="/images/appstore.png" alt="App Store" style="height: 32px;" class="img-fluid">
          <img src="/images/googleplay.png" alt="Play Store" style="height: 32px;" class="img-fluid">
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
</style>