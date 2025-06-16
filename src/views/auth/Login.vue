<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();

// --- State Management ---
const passwordVisible = ref(false);
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref(''); // Variabel ini akan kita pakai
const isLoading = ref(false);

// --- Functions ---
function togglePassword() {
  passwordVisible.value = !passwordVisible.value;
}

// Ganti fungsi login kamu dengan ini
async function login() {
  // Reset pesan dan set status loading
  errorMessage.value = '';
  successMessage.value = '';
  isLoading.value = true;

  try {
    const response = await axios.post('/login', {
      email: email.value,
      password: password.value,
    });

    const token = response.data.access_token;
    const user = response.data.user;
    
    // Simpan token dan data pengguna ke localStorage
    localStorage.setItem('auth_token', response.data.access_token);
    localStorage.setItem('user_data', JSON.stringify(response.data.user));

    // =======================================================
    // --- INI BAGIAN YANG DIUBAH ---
    // =======================================================

   if (user && user.role === 'admin') {
      successMessage.value = 'Login as Admin successful! Redirects to Admin page...';
    } else {
      successMessage.value = 'Login successful! Welcome back.';
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // 2. Tunda redirect selama 2 detik (2000 milidetik)
    setTimeout(() => {
      // 3. Setelah 2 detik, jalankan logika redirect
      if (user && user.role === 'admin') {
        // Kamu pakai 'Admin', ini adalah nama route (name)
        router.push({ name: 'Admin' }); 
      } else {
        // Kamu pakai '/viewmore', ini adalah path
        router.push('/view-more');
      }
    }, 1000); // <-- Waktu tunggu 

  } catch (error) {
    if (error.response) {
      errorMessage.value = error.response.data.message || 'Incorrect email or password.';
    } else {
      errorMessage.value = 'Cannot connect to server.';
    }
  } finally {
    // Biarkan loading selesai setelah proses API, bukan setelah timeout
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
          <img src="/images/LR.webp" alt="Ilustrasi Login" class="img-fluid" style="max-width: 320px;">
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