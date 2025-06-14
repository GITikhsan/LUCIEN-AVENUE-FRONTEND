<script setup>
import { ref, computed } from 'vue';

// Untuk contoh, kita buat data palsu. Nanti ini bisa dari API.
const cartItems = ref([
  { id: 1, name: 'Air Jordan 1', price: 2200000, quantity: 1, image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Nike Zoom', price: 2000000, quantity: 2, image: 'https://via.placeholder.com/100' },
]);

const increaseQty = (item) => item.quantity++;
const decreaseQty = (item) => { if (item.quantity > 1) item.quantity--; };
const removeItem = (itemId) => { cartItems.value = cartItems.value.filter(item => item.id !== itemId); };

// Total harga dihitung secara otomatis dan reaktif
const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
</script>

<template>
  <div class="container py-5">
    <h2 class="mb-4 fw-bold">My Bag</h2>
    <div v-if="cartItems.length > 0" class="row">
      <div class="col-md-8">
        <div v-for="item in cartItems" :key="item.id" class="card mb-3">
          <div class="card-body">
            <h5>{{ item.name }}</h5>
            <p>{{ formatCurrency(item.price) }}</p>
            </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Summary</h5>
            <hr>
            <div class="d-flex justify-content-between fw-bold">
              <p class="mb-2">Total</p>
              <p class="mb-2">{{ formatCurrency(cartTotal) }}</p>
            </div>
            <RouterLink to="/checkout" class="btn btn-dark w-100 mt-3">Go to checkout</RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center p-5 border rounded">
      <h4>Your bag is empty.</h4>
    </div>
  </div>
</template>