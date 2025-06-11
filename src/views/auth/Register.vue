<script setup>
import { ref } from 'vue';
import axios from 'axios';

// --- State Management ---
const passwordVisible = ref(false);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
// State untuk noTelepon dan alamat dihapus
const successMessage = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

// --- Functions ---
/**
 * Mengubah visibilitas input password.
 */
function togglePassword() {
  passwordVisible.value = !passwordVisible.value;
}

/**
 * Menangani proses registrasi pengguna.
 * Mengirim permintaan POST ke endpoint /api/users.
 */
async function register() {
  // Reset pesan dan set status loading
  errorMessage.value = '';
  successMessage.value = '';
  isLoading.value = true;

  try {
    // Kirim permintaan registrasi hanya dengan data esensial
    const response = await axios.post('/api/users', {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
      // no_telepon dan alamat dihapus dari payload
    });
    
    // Proses respons sukses
    successMessage.value = response.data.message + '. You will be redirected to the login page.';
    
    // Alihkan ke halaman login setelah jeda
    setTimeout(() => {
        window.location.href = 'Login';
    }, 2000);

  } catch (error) {
    // Tangani error validasi atau error lainnya dari API
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