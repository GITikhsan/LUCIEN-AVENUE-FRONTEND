<script setup>
import { ref } from 'vue';
// --- TIDAK DIUBAH ---
// Tetap menggunakan axios langsung sesuai kodemu
import axios from 'axios';
// --- TAMBAHKAN (INI BERHUBUNGAN) ---
// Impor useRouter untuk navigasi. Ini wajib untuk pindah halaman tanpa reload.
import { useRouter } from 'vue-router';

// --- State Management (TIDAK DIUBAH) ---
const passwordVisible = ref(false);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

// --- TAMBAHKAN (INI BERHUBUNGAN) ---
// Dapatkan instance router untuk bisa menggunakan router.push()
const router = useRouter(); 

// --- Functions ---
function togglePassword() {
  passwordVisible.value = !passwordVisible.value;
}

async function register() {
  // Reset pesan dan set status loading (TIDAK DIUBAH)
  errorMessage.value = '';
  successMessage.value = '';
  isLoading.value = true;

  try {
    // Panggil API menggunakan axios langsung.
    // NOTE: Pastikan URL lengkap karena tidak ada baseURL global
    const response = await axios.post('http://localhost:8000/api/register', {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
    });
    
    // ==============================================================
    // --- INI SATU-SATUNYA BAGIAN LOGIKA YANG DIUBAH ---
    // Ganti logika redirect ke login dengan logika auto-login
    // ==============================================================
    
    // 1. Simpan token & data user ke Local Storage agar login diingat
    localStorage.setItem('authToken', response.data.access_token);
    localStorage.setItem('userData', JSON.stringify(response.data.user));

    // 2. Arahkan ke dashboard yang sesuai menggunakan router
    const userRole = response.data.user.role;
    if (userRole === 'admin') {
      router.push('/Admin'); 
    } else {
      router.push('/viewmore'); 
    }

  } catch (error) {
    // Bagian penanganan error ini tidak diubah, sudah bagus
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = error.response.data.errors;
      const errorMessages = Object.values(errors).flat();
      errorMessage.value = errorMessages.join(' ');
    } else if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'An error occurred during registration.';
    }
    console.error('Registration failed:', error);
  } finally {
    // Bagian finally ini tidak diubah
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

        <!-- Bagian Registrasi Kanan -->
        <div class="col-md-6">
          <div class="mb-4">
            <h2 class="h4 fw-semibold mb-2">Register</h2>
            <p class="text-muted small">
              Already have an account?
              <a href="Login" class="text-success fw-bold text-decoration-none">Login here</a>
            </p>
          </div>

          <form class="mb-4" @submit.prevent="register">
            <!-- Pesan Error dan Sukses -->
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
            
            <div class="row">
                <div class="col-md-6 mb-3">
                    <input type="text" class="form-control" placeholder="Nama Depan" v-model="firstName" required>
                </div>
                <div class="col-md-6 mb-3">
                    <input type="text" class="form-control" placeholder="Nama Belakang" v-model="lastName" required>
                </div>
            </div>

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
            
            <!-- Input untuk no_telepon dan alamat dihapus dari form -->

            <div class="d-grid mb-3">
              <button type="submit" class="btn btn-success" :disabled="isLoading">
                {{ isLoading ? 'Loading...' : 'Confirm' }}
              </button>
            </div>
          </form>

          <div class="text-center">
             <p class="text-muted small mb-2">Or register with a Google account</p>

            <div class="d-flex justify-content-center">
              <img src="/images/googleColor.png" alt="Google" class="cursor-pointer" style="height: 32px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.25)'" onmouseout="this.style.transform='scale(1)'">
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>