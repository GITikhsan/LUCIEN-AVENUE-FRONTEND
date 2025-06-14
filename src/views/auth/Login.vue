<script setup>
import { ref } from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';
const router = useRouter()

// --- State Management ---
const passwordVisible = ref(false);
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

// --- Functions ---
/**
 * Mengubah visibilitas input password.
 */
function togglePassword() {
  passwordVisible.value = !passwordVisible.value;
}

/**
 * Menangani proses login pengguna.
 * Mengirim permintaan POST ke endpoint /api/login.
 */
// Ganti seluruh fungsi login() kamu dengan ini. Copy-paste saja.
async function login() {
  // Reset pesan dan set status loading
  errorMessage.value = 'An error occurred. Please try again..';
  isLoading.value = true;

  try {
    const response = await axios.post('http://localhost:8000/api/login', {
      email: email.value,
      password: password.value,
    });

    // =======================================================
    // --- MULAI AREA WAJIB UNTUK DEBUGGING ---
    // =======================================================
    console.clear(); // Ini akan membersihkan console setiap kali login
    console.log("==============================================");
    console.log(">> MEMULAI DEBUGGING REDIRECT SETELAH LOGIN");
    console.log("==============================================");
    
    // 1. Kita lihat seluruh data yang dikirim balik oleh server
    console.log("LANGKAH 1: Seluruh isi response.data:", response.data);

    // 2. Kita coba akses object 'user'
    const user = response.data.user;
    console.log("LANGKAH 2: Isi dari response.data.user:", user);

    // 3. Kita coba akses 'role' di dalam object 'user'
    const role = user ? user.role : "!! USER TIDAK DITEMUKAN !!";
    console.log("LANGKAH 3: Nilai dari role:", role);

    // 4. Kita cek kondisi IF-nya
    console.log("LANGKAH 4: Mengecek apakah (role === 'admin')...");
    if (role === 'admin') {
      successMessage.value = 'Login successful! You will be redirected...';
      router.push('Admin');
    } else {
      successMessage.value = 'Login successful!';
      router.push('/viewmore');
    }

  } catch (error) {
    console.error("!! TERJADI ERROR DI BLOK CATCH !!", error);
    if (error.response) {
      errorMessage.value = error.response.data.message || 'Incorrect email or password.';
    } else {
      errorMessage.value = 'An error occurred. Please try again..';
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <body class="bg-white d-flex align-items-center justify-content-center min-vh-100 font-inter">
    <div class="container">
      <div class="row align-items-center bg-white p-4 p-md-5 rounded shadow-lg mx-auto" style="max-width: 960px;">
        <!-- Bagian Gambar Kiri -->
        <div class="col-md-6 text-center mb-4 mb-md-0">
          <img src="/images/LoginIcon.png" alt="Ilustrasi Login" class="img-fluid" style="max-width: 320px;">
        </div>

        <!-- Bagian Login Kanan -->
        <div class="col-md-6">
          <div class="mb-4">
            <h2 class="h4 fw-semibold mb-2">Login</h2>
            <p class="text-muted small">
              Already have an account?
              <a href="Register" class="text-success fw-bold text-decoration-none">Register here</a>
            </p>
          </div>

          <form class="mb-4" @submit.prevent="login">
            <!-- Pesan Error dan Sukses -->
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
            
            <div class="mb-3">
              <input type="email" class="form-control" placeholder="Email Address" v-model="email" required>
            </div>

            <div class="mb-3 position-relative">
              <input 
                :type="passwordVisible ? 'text' : 'password'" 
                id="password" 
                placeholder="Password" 
                class="form-control pe-5"
                v-model="password"
                required/>

              <button type="button" @click="togglePassword" class="btn position-absolute top-50 end-0 translate-middle-y px-2 py-0 border-0 bg-transparent" tabindex="-1">
                <img :src="passwordVisible ? '/images/password_show.png' : '/images/password_hide.png'" alt="Toggle Password" style="width: 20px; height: 20px;" />
              </button>
            </div>

            <div class="d-grid mb-3">
              <button type="submit" class="btn btn-success" :disabled="isLoading">
                {{ isLoading ? 'Loading...' : 'Login' }}
              </button>
            </div>
          </form>

          <div class="text-center">
            <a href="Forgot" class="text-success fw-bold text-decoration-none d-block mb-2">
              forgot password?
            </a>
            <p class="text-muted small mb-2">Or login with another account</p>
            <div class="d-flex justify-content-center">
              <img src="/images/googleColor.png" alt="Google" class="cursor-pointer" style="height: 32px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.25)'" onmouseout="this.style.transform='scale(1)'">
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>