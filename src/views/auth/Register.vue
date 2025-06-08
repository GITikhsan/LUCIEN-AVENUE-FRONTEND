<script setup>
import { ref } from 'vue';

const passwordVisible = ref(false);

function togglePassword() {
  passwordVisible.value = !passwordVisible.value;
}
</script>


<template>
    <body class="bg-white d-flex align-items-center justify-content-center min-vh-100 font-inter">
  <div class="container">
    <div class="row align-items-center bg-white p-4 p-md-5 rounded shadow-lg mx-auto" style="max-width: 960px;">
      
      <!-- Left Image Section -->
      <div class="col-md-6 text-center mb-4 mb-md-0">
        <img src="/images/LoginIcon.png" alt="Login Illustration" class="img-fluid" style="max-width: 320px;">
      </div>

      <!-- Right Login Section -->
      <div class="col-md-6">
        <div class="mb-4">
          <h2 class="h4 fw-semibold mb-2">Register</h2>
          <p class="text-muted small">
            Already have an account?
            <a href="/Login" class="text-success fw-bold text-decoration-none">Login here</a>
          </p>
        </div>

        <form class="mb-4">
          <div class="mb-3">
            <input type="email" class="form-control" placeholder="Email address" required>
          </div>

          <div class="mb-3 position-relative">
            <input 
                :type="passwordVisible ? 'text' : 'password'" 
                id="password" 
                placeholder="Password" 
                class="form-control pe-5" 
                required/>
                
            <button type="button" @click="togglePassword" class="btn position-absolute top-50 end-0 translate-middle-y px-2 py-0 border-0 bg-transparent" tabindex="-1">
            <img :src="passwordVisible ? '/images/password_show.png' : '/images/password_hide.png'" alt="Toggle Password" style="width: 20px; height: 20px;" />
            </button>
            </div>


          <div class="d-grid mb-3">
            <button type="submit" class="btn btn-success">
             Confirm Registration
            </button>
          </div>
        </form>



        <div class="text-center">
          <a>Your data will be protected and will not be shared</a>

          <p class="text-muted small mb-2">Or register with google account</p>

          <div class="d-flex justify-content-center">
            <img src="/images/googleColor.png" alt="Google" class="cursor-pointer" style="height: 32px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.25)'" onmouseout="this.style.transform='scale(1)'">
          </div>
        </div>
      </div>
    </div>
  </div>

</body>

</template>

 

