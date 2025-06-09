
  <script>
    const { createApp } = Vue;

    createApp({
      data() {
        return {
          payment: {
            name: '',
            email: '',
            amount: '',
            method: ''
          },
          successMessage: ''
        };
      },
      methods: {
        submitPayment() {
          // Simulasi pengiriman data
          console.log('Sending payment:', this.payment);

          // Reset form
          this.successMessage = 'Payment successful! Thank you, ' + this.payment.name;
          this.payment = { name: '', email: '', amount: '', method: '' };
        }
      }
    }).mount('#app');
  </script>
<template>
<body>
  <div id="app" class="container py-5">
    <h2 class="mb-4 text-center">Payment Page</h2>
    
    <div class="card shadow p-4">
      <form @submit.prevent="submitPayment">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input v-model="payment.name" type="text" class="form-control" required />
        </div>
        
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="payment.email" type="email" class="form-control" required />
        </div>
        
        <div class="mb-3">
          <label class="form-label">Amount</label>
          <input v-model.number="payment.amount" type="number" class="form-control" required min="1" />
        </div>

        <div class="mb-3">
          <label class="form-label">Payment Method</label>
          <select v-model="payment.method" class="form-select" required>
            <option disabled value="">Select method</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="ewallet">E-Wallet</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary w-100">Pay Now</button>
      </form>
    </div>

    <div v-if="successMessage" class="alert alert-success mt-4">
      {{ successMessage }}
    </div>
  </div>
</body>
</template>