<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// URL API backend Anda untuk menyimpan alamat
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// --- State untuk data negara ---
const countries = ref([]);
const isLoadingCountries = ref(true);

// --- State untuk form binding ---
const form = ref({
  name: '',
  surname: '',
  phone_code: '', // Dikosongkan, akan diisi otomatis
  mobile: '',
  country: '',    // Dikosongkan agar user memilih
  province: '',   // Tetap sebagai input teks
  city: '',       // Tetap sebagai input teks
  district: '',   // Tetap sebagai input teks
  village: '',    // Tetap sebagai input teks
  postcode: '',
  address: '',
  isDefault: false
});

// --- State UI ---
const isLoadingSubmit = ref(false);
const errorMessage = ref('');

// --- Fungsi untuk mengambil daftar negara ---
async function fetchCountries() {
  isLoadingCountries.value = true;
  try {
    // Mengambil daftar negara dari API publik yang stabil
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2,idd');
    // Urutkan negara berdasarkan abjad
    countries.value = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    errorMessage.value = "Could not load country list. Please refresh the page.";
  } finally {
    isLoadingCountries.value = false;
  }
}

// Ambil data negara saat komponen pertama kali dimuat
onMounted(fetchCountries);

// --- Watcher untuk mengubah kode telepon saat negara berubah ---
watch(() => form.value.country, (newCountryName) => {
  if (!newCountryName || countries.value.length === 0) return;

  const selectedCountry = countries.value.find(c => c.name.common === newCountryName);
  if (selectedCountry && selectedCountry.idd) {
    const root = selectedCountry.idd.root;
    const suffix = selectedCountry.idd.suffixes?.[0] || '';
    form.value.phone_code = `${root}${suffix}`;
  }
});


// --- Fungsi untuk submit form ---
async function submitAddress() {
  isLoadingSubmit.value = true;
  errorMessage.value = '';

  const payload = {
    name: `${form.value.name} ${form.value.surname}`.trim(),
    phone: `${form.value.phone_code}${form.value.mobile}`,
    country: form.value.country,
    province: form.value.province,
    city: form.value.city,
    district: form.value.district,
    subdistrict: form.value.village,
    postcode: form.value.postcode,
    address: form.value.address,
    label: "Home",
    is_default: form.value.isDefault
  };

  try {
    const res = await axios.post(`${API_BASE_URL}/address`, payload, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    alert(res.data.message || "Address saved successfully!");
    router.back(); // Ganti dengan rute yang sesuai
  } catch (err) {
    if (err.response?.status === 422) {
      const errors = err.response.data.errors;
      errorMessage.value = Object.values(errors).map(msg => `- ${msg[0]}`).join('\n');
    } else {
      errorMessage.value = err.response?.data?.message || 'An error occurred while saving the address.';
    }
  } finally {
    isLoadingSubmit.value = false;
  }
}
</script>

<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4 text-center">SET ADDRESS</h2>

    <div v-if="errorMessage" class="alert alert-danger" style="white-space: pre-line;">{{ errorMessage }}</div>

    <form class="mx-auto text-start" style="max-width: 500px" @submit.prevent="submitAddress">
      <input v-model="form.name" type="text" placeholder="First Name" class="form-control mb-3" required />
      <input v-model="form.surname" type="text" placeholder="Last Name" class="form-control mb-3" />

      <select v-model="form.country" class="form-select mb-3" :disabled="isLoadingCountries" required>
        <option disabled value="">
            {{ isLoadingCountries ? 'Loading countries...' : 'Select Country' }}
        </option>
        <option v-for="country in countries" :key="country.cca2" :value="country.name.common">
          {{ country.name.common }}
        </option>
      </select>
      
      <input v-model="form.province" type="text" placeholder="State / Province / Region" class="form-control mb-3" required />
      <input v-model="form.city" type="text" placeholder="City" class="form-control mb-3" required />
      <input v-model="form.district" type="text" placeholder="District / Area" class="form-control mb-3" />
      <input v-model="form.village" type="text" placeholder="Subdistrict / Village" class="form-control mb-3" />
      
      <input v-model="form.postcode" type="text" placeholder="Postal Code" class="form-control mb-3" required />
      <textarea v-model="form.address" placeholder="Street Address, Building, House No." class="form-control mb-3" rows="3" required></textarea>

      <div class="input-group mb-3">
        <select v-model="form.phone_code" class="form-select" style="max-width: 120px" :disabled="isLoadingCountries">
            <option v-if="isLoadingCountries" value="">...</option>
            <option v-for="country in countries" :key="country.cca2 + '-phone'" :value="country.idd.root + (country.idd.suffixes?.[0] || '')">
                {{ country.idd.root }}{{ country.idd.suffixes?.[0] || '' }}
            </option>
        </select>
        <input v-model="form.mobile" type="tel" placeholder="Mobile Number" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-dark w-100" :disabled="isLoadingSubmit">
        <span v-if="isLoadingSubmit" class="spinner-border spinner-border-sm me-2"></span>
        {{ isLoadingSubmit ? 'Saving...' : 'Set Address' }}
      </button>
    </form>
  </div>
</template>