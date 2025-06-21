<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// Pastikan URL ini menunjuk ke backend Laravel Anda
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// --- State untuk data wilayah ---
const provinces = ref([]);
const cities = ref([]);
const districts = ref([]);
const subdistricts = ref([]);

// --- State untuk form binding ---
const form = ref({
  name: '',
  surname: '',
  phone_code: '+62',
  mobile: '',
  country: 'Indonesia',
  province_id: '',
  city_id: '',
  district_id: '',
  subdistrict_id: '',
  postcode: '',
  address: '',
  isDefault: false
});

// --- State untuk UI (loading & error) ---
const isLoading = ref({
  provinces: false,
  cities: false,
  districts: false,
  subdistricts: false,
  submit: false
});
const errorMessage = ref('');

// --- Fungsi untuk mengambil data wilayah dari backend Laravel ---
async function fetchWilayah(endpoint, targetRef, loadingKey, errorText) {
  isLoading.value[loadingKey] = true;
  errorMessage.value = '';
  try {
    const response = await axios.get(`${API_BASE_URL}/wilayah/${endpoint}`);
    console.log("Data yang diterima dari backend:", response.data);
    if (response.data.success) {
      // Data dari backend ada di dalam `response.data.data`
      targetRef.value = response.data.data;
    } else {
      throw new Error(response.data.message || errorText);
    }
  } catch (error) {
    console.error(`Gagal fetch ${endpoint}:`, error);
    errorMessage.value = errorText;
  } finally {
    isLoading.value[loadingKey] = false;
  }
}

// Ambil data provinsi saat komponen pertama kali dimuat
onMounted(() => {
  fetchWilayah('provinsi', provinces, 'provinces', 'Gagal memuat provinsi.');
});

// --- Watcher untuk dropdown dinamis ---

watch(() => form.value.province_id, (id) => {
  // Reset dropdown anak
  cities.value = [];
  districts.value = [];
  subdistricts.value = [];
  form.value.city_id = '';
  form.value.district_id = '';
  form.value.subdistrict_id = '';

  if (id) {
    fetchWilayah(`kabupaten/${id}`, cities, 'cities', 'Gagal memuat kota/kabupaten.');
  }
});

watch(() => form.value.city_id, (id) => {
  districts.value = [];
  subdistricts.value = [];
  form.value.district_id = '';
  form.value.subdistrict_id = '';
  
  if (id) {
    fetchWilayah(`kecamatan/${id}`, districts, 'districts', 'Gagal memuat kecamatan.');
  }
});

watch(() => form.value.district_id, (id) => {
  subdistricts.value = [];
  form.value.subdistrict_id = '';

  if (id) {
    fetchWilayah(`kelurahan/${id}`, subdistricts, 'subdistricts', 'Gagal memuat kelurahan/desa.');
  }
});

// --- Fungsi untuk submit form ---
async function submitAddress() {
  isLoading.value.submit = true;
  errorMessage.value = '';

  const payload = {
    name: `${form.value.name} ${form.value.surname}`.trim(),
    phone: `${form.value.phone_code}${form.value.mobile}`,
    address: form.value.address,
    province: provinces.value.find(p => p.id === form.value.province_id)?.name || '',
    city: cities.value.find(c => c.id === form.value.city_id)?.name || '',
    district: districts.value.find(d => d.id === form.value.district_id)?.name || '',
    subdistrict: subdistricts.value.find(s => s.id === form.value.subdistrict_id)?.name || '',
    postcode: form.value.postcode,
    label: "Rumah",
    is_default: form.value.isDefault
  };

  try {
    // Mengirim data ke endpoint `POST /api/address` di Laravel
    const res = await axios.post(`${API_BASE_URL}/address`, payload, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Pastikan token ada
      }
    });
    alert(res.data.message || "Alamat berhasil disimpan!");
    router.push('/userProfile');
  } catch (err) {
    if (err.response?.status === 422) {
      const errors = err.response.data.errors;
      errorMessage.value = Object.values(errors).map(msg => `- ${msg[0]}`).join('\n');
    } else {
      errorMessage.value = err.response?.data?.message || 'Terjadi kesalahan saat menyimpan alamat.';
    }
  } finally {
    isLoading.value.submit = false;
  }
}
</script>

<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4 text-center">ADD ADDRESS</h2>

    <div v-if="errorMessage" class="alert alert-danger" style="white-space: pre-line;">{{ errorMessage }}</div>

    <form class="mx-auto text-start" style="max-width: 500px" @submit.prevent="submitAddress">
      <input v-model="form.name" type="text" placeholder="First name" class="form-control mb-3" required />
      <input v-model="form.surname" type="text" placeholder="Last name" class="form-control mb-3" />

      <div class="input-group mb-3">
        <span class="input-group-text">+62</span>
        <input v-model="form.mobile" type="tel" placeholder="Mobile" class="form-control" required />
      </div>

      <select v-model="form.country" class="form-select mb-3" disabled>
        <option value="Indonesia">Indonesia</option>
      </select>

      <select v-model="form.province_id" class="form-select mb-3" :disabled="isLoading.provinces" required>
        <option disabled value="">
          {{ isLoading.provinces ? 'Memuat provinsi...' : 'Pilih Provinsi' }}
        </option>
        <option v-for="province in provinces" :key="province.id" :value="province.id">
          {{ province.name }}
        </option>
      </select>

      <select v-model="form.city_id" class="form-select mb-3" :disabled="isLoading.cities || !form.province_id" required>
        <option disabled value="">
          {{ isLoading.cities ? 'Memuat kota...' : (form.province_id ? 'Pilih Kabupaten/Kota' : 'Pilih Provinsi Dahulu') }}
        </option>
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>

      <select v-model="form.district_id" class="form-select mb-3" :disabled="isLoading.districts || !form.city_id" required>
        <option disabled value="">
          {{ isLoading.districts ? 'Memuat kecamatan...' : (form.city_id ? 'Pilih Kecamatan' : 'Pilih Kota Dahulu') }}
        </option>
        <option v-for="district in districts" :key="district.id" :value="district.id">
          {{ district.name }}
        </option>
      </select>

      <select v-model="form.subdistrict_id" class="form-select mb-3" :disabled="isLoading.subdistricts || !form.district_id" required>
        <option disabled value="">
          {{ isLoading.subdistricts ? 'Memuat kelurahan...' : (form.district_id ? 'Pilih Kelurahan/Desa' : 'Pilih Kecamatan Dahulu') }}
        </option>
        <option v-for="subdistrict in subdistricts" :key="subdistrict.id" :value="subdistrict.id">
          {{ subdistrict.name }}
        </option>
      </select>

      <input v-model="form.postcode" type="text" placeholder="Postal code" class="form-control mb-3" required />
      <textarea v-model="form.address" placeholder="Nama Jalan, Gedung, No. Rumah" class="form-control mb-3" rows="3" required></textarea>

      <div class="form-check mb-3">
        <input v-model="form.isDefault" class="form-check-input" type="checkbox" id="defaultCheck" />
        <label class="form-check-label" for="defaultCheck">Jadikan alamat utama</label>
      </div>

      <button type="submit" class="btn btn-dark w-100" :disabled="isLoading.submit">
        <span v-if="isLoading.submit" class="spinner-border spinner-border-sm me-2"></span>
        {{ isLoading.submit ? 'Menyimpan...' : 'Simpan Alamat' }}
      </button>
    </form>
  </div>
</template>