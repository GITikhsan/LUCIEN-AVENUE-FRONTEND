<script setup>
import { ref } from 'vue';
import axios from 'axios';

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
async function login() {
  // Reset pesan dan set status loading
  errorMessage.value = '';
  successMessage.value = '';
  isLoading.value = true;

  try {
    // Kirim permintaan login
    const response = await axios.post('/api/login', {
      email: email.value,
      password: password.value,
    });

    // Proses respons sukses
    successMessage.value = 'Login berhasil! Anda akan dialihkan...';
    console.log('Login successful:', response.data);

    // Simpan token dan data pengguna ke localStorage untuk manajemen sesi
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data));
    
    // Alihkan ke halaman dashboard setelah jeda singkat
    setTimeout(() => {
        window.location.href = 'ViewMore'; // Ganti dengan rute halaman utama Anda
    }, 1500);

  } catch (error) {
    // Tangani error dari API
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'Terjadi kesalahan. Silakan coba lagi.';
    }
    console.error('Login failed:', error);
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
              Belum punya akun?
              <a href="Register" class="text-success fw-bold text-decoration-none">Daftar di sini</a>
            </p>
          </div>

          <form class="mb-4" @submit.prevent="login">
            <!-- Pesan Error dan Sukses -->
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
            
            <div class="mb-3">
              <input type="email" class="form-control" placeholder="Alamat Email" v-model="email" required>
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
                {{ isLoading ? 'Memproses...' : 'Login' }}
              </button>
            </div>
          </form>

          <div class="text-center">
            <a href="Forgot" class="text-success fw-bold text-decoration-none d-block mb-2">
              Lupa password?
            </a>
            <p class="text-muted small mb-2">Atau login dengan akun lain</p>
            <div class="d-flex justify-content-center">
              <img src="/images/googleColor.png" alt="Google" class="cursor-pointer" style="height: 32px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.25)'" onmouseout="this.style.transform='scale(1)'">
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>