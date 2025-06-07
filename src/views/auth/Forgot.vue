<template>
   <div class="bg-white min-vh-100 d-flex align-items-center justify-content-center font-sans">

  <div class="container">
    <div class="row justify-content-center align-items-center g-4">
      <div class="col-md-10 d-flex flex-column flex-md-row align-items-center bg-white p-4 rounded shadow">

        <!-- Left Image Section -->
        <div class="col-md-6 text-center mb-4 mb-md-0">
          <img src="/images/LoginIcon.png" alt="Forgot Password Illustration" class="img-fluid" style="max-width: 400px;">
        </div>

        <!-- Right Form Section -->
        <div class="col-md-6 px-4">
          <h2 class="mb-2 fw-semibold">Forgot Password</h2>
          <p class="text-muted small mb-4">
            Enter your email address to reset your password
          </p>

          <form class="mb-4">
            <div class="mb-3">
              <input type="email" class="form-control" placeholder="Email address" required>
            </div>
            <button type="submit" class="btn btn-success w-100">
              Send Reset Link
            </button>
          </form>

          <div class="text-center">
            <a href="/login" class="text-success fw-bold text-decoration-none">
              Back to Login
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>

</div>

</template>