<template>
  <div class="container py-5 text-center">
    <h2 class="fw-bold mb-4">ADD ADDRESS</h2>
    <form class="mx-auto text-start" style="max-width: 500px" @submit.prevent="submitAddress">
      <input v-model="form.name" type="text" placeholder="Name" class="form-control mb-3" />
      <input v-model="form.surname" type="text" placeholder="Surname" class="form-control mb-3" />
      <input v-model="form.email" type="email" placeholder="E-mail" class="form-control mb-3" disabled />
      <div class="input-group mb-3">
        <span class="input-group-text">+62</span>
        <input v-model="form.mobile" type="tel" placeholder="Mobile" class="form-control" />
      </div>
      <input v-model="form.country" type="text" class="form-control mb-3" disabled />
      <textarea v-model="form.address" placeholder="Address" class="form-control mb-3"></textarea>
      <select v-model="form.state" class="form-select mb-3">
        <option disabled value="">County/State</option>
        <option>DIY</option>
      </select>
      <select v-model="form.city" class="form-select mb-3">
        <option disabled value="">Town / City</option>
        <option>Yogyakarta</option>
      </select>
      <select v-model="form.district" class="form-select mb-3">
        <option disabled value="">District</option>
        <option>Bantul</option>
      </select>
      <select v-model="form.subdistrict" class="form-select mb-3">
        <option disabled value="">Sub-district</option>
        <option>Kasihan</option>
      </select>
      <input v-model="form.postcode" type="text" placeholder="Postcode" class="form-control mb-3" />
      <div class="form-check mb-3">
        <input v-model="form.isDefault" class="form-check-input" type="checkbox" id="defaultCheck" />
        <label class="form-check-label" for="defaultCheck">Select as default delivery address</label>
      </div>
      <button type="submit" class="btn btn-dark w-100">Save address</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  surname: '',
  email: 'test@gmail.com',
  mobile: '',
  country: 'Indonesia',
  address: '',
  state: '',
  city: '',
  district: '',
  subdistrict: '',
  postcode: '',
  isDefault: false
})

function submitAddress() {
  console.log('Address submitted:', form.value)
  alert('Alamat disimpan!')
}
</script>

<style scoped>
</style>