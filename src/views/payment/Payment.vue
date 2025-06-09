<template>
  <div class="container py-5">
    <div class="row g-5">
      <!-- Left Side: Product Summary -->
      <div class="col-lg-6">
        <div class="d-flex align-items-center mb-4">
          <img
            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fd9e3ae5-2b34-42f5-95e7-2f25558a1859/air-jordan-1-low-og-mens-shoes.png"
            alt="Product Image"
            class="img-fluid rounded shadow-sm"
            style="max-width: 200px;"
          />
          <div class="ms-4">
            <h5 class="fw-bold">Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown</h5>
            <div class="text-muted small">Size: <strong>{{ selectedSize }}</strong></div>
            <div class="text-muted small">Quantity: <strong>{{ quantity }}</strong></div>
            <div class="mt-2 fw-bold fs-5 text-danger">IDR {{ formatPrice(price) }}</div>
          </div>
        </div>
        <div>
            If you are uncertain or have any doubts about which size would be the most suitable for you, we highly recommend clicking on the "Size Chart" button to carefully review the detailed measurements provided in the chart. Please note that, in accordance with our company's policy, we do not accept any requests for refunds or returns that are related to sizing issues or incorrect size selection.
        </div>
      </div>

      <!-- Right Side: Payment Section -->
      <div class="col-lg-6">
        <div class="card shadow rounded-4 p-4">
          <h4 class="mb-4 fw-bold text-primary">Pilih Metode Pembayaran</h4>
          <div v-for="method in paymentMethods" :key="method.value" class="form-check mb-3">
            <input
              class="form-check-input"
              type="radio"
              :id="method.value"
              :value="method.value"
              v-model="selectedMethod"
              name="paymentMethod"
            />
            <label class="form-check-label" :for="method.value">
              {{ method.label }}
            </label>
          </div>

          <hr />

          <div class="d-flex justify-content-between fw-bold fs-5 mb-3">
            <span>Total Pembayaran</span>
            <span>IDR {{ formatPrice(price * quantity) }}</span>
          </div>

          <button class="btn btn-dark w-100 rounded-pill py-2 mb-2" @click="payNow">
            Pay Now
          </button>
          <button class="btn btn-outline-secondary w-100 rounded-pill py-2" @click="goBack">
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentPage",
  data() {
    return {
      selectedSize: 42,
      quantity: 1,
      price: 4240000,
      paymentMethods: [
        { value: "bank_transfer", label: "Transfer Bank" },
        { value: "ewallet", label: "E-Wallet (GoPay, OVO, dll)" },
        { value: "credit_card", label: "Kartu Kredit" },
      ],
      selectedMethod: "bank_transfer",
    };
  },
  methods: {
    formatPrice(val) {
      return val.toLocaleString("id-ID");
    },
    payNow() {
      alert(`Pembayaran melalui ${this.selectedMethod} sejumlah Rp ${this.formatPrice(this.price * this.quantity)}`);
    },
    goBack() {
      this.$router.push("/cart");
    },
  },
};
</script>

<style scoped>
.card {
  border: none;
}
.btn-dark {
  background-color: #1a1a1a;
  border: none;
}
</style>