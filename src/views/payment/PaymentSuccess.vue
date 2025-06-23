<template>
  <div class="success-page">
    <div class="success-card">
      <div class="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      
      <h1>Payment Successful!</h1>
      <p class="subtitle">Thank you for shopping with us. We have received your order and will process it shortly.</p>
      
      <div class="button-group">
        <router-link to="/myPurchases" class="btn btn-primary">View Purchase History</router-link>
        <router-link to="/" class="btn btn-secondary">Back to Homepage</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No special JavaScript logic is needed for this page,
// unless you want to fetch the latest order data.
// For now, we'll keep it static.
</script>

<style scoped>
.success-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f7f7f7;
  padding: 2rem;
}

.success-card {
  background: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
}

h1 {
  color: #2c3e50;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2.5rem;
}

.btn {
  padding: 0.8rem 1.6rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}
.btn-secondary:hover {
  background-color: #5a6268;
}

/* Animation for checkmark icon */
.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}
.checkmark-check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke-width: 3;
  stroke: #7ac142;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}
@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
