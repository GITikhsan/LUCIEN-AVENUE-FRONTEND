<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const API_BASE_URL = 'http://127.0.0.1:8000/index.php/api';

const countries = ref([]);
const provinces = ref([]);
const cities = ref([]);
const districts = ref([]);
const subdistricts = ref([]);

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

const isLoading = ref({
  countries: true,
  provinces: false,
  cities: false,
  districts: false,
  subdistricts: false,
  submit: false
});
const errorMessage = ref('');

async function fetchProvinces() {
  isLoading.value.provinces = true;
  errorMessage.value = '';
  try {
    const response = await axios.get(`${API_BASE_URL}/wilayah/provinsi`);
    console.log("DATA PROVINCE:", response.data);
    provinces.value = response.data.decoded || [];
  } catch (error) {
    console.error("Failed to fetch provinces:", error);
    errorMessage.value = "Gagal memuat daftar provinsi.";
  } finally {
    isLoading.value.provinces = false;
  }
}

onMounted(async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2,idd');
    countries.value = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    if (form.value.country === 'Indonesia') await fetchProvinces();
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    errorMessage.value = "Gagal memuat daftar negara.";
  } finally {
    isLoading.value.countries = false;
  }
});

watch(() => form.value.country, (newVal) => {
  provinces.value = [];
  cities.value = [];
  districts.value = [];
  subdistricts.value = [];
  form.value.province_id = '';
  form.value.city_id = '';
  form.value.district_id = '';
  form.value.subdistrict_id = '';
  if (newVal === 'Indonesia') fetchProvinces();
});

watch(() => form.value.province_id, async (id) => {
  cities.value = [];
  districts.value = [];
  subdistricts.value = [];
  form.value.city_id = '';
  if (!id) return;
  isLoading.value.cities = true;
  try {
    const res = await axios.get(`${API_BASE_URL}/wilayah/kota/${id}`);
    cities.value = res.data;
  } catch (err) {
    errorMessage.value = "Gagal memuat kota.";
  } finally {
    isLoading.value.cities = false;
  }
});

watch(() => form.value.city_id, async (id) => {
  districts.value = [];
  subdistricts.value = [];
  form.value.district_id = '';
  if (!id) return;
  isLoading.value.districts = true;
  try {
    const res = await axios.get(`${API_BASE_URL}/wilayah/kecamatan/${id}`);
    districts.value = res.data;
  } catch (err) {
    errorMessage.value = "Gagal memuat kecamatan.";
  } finally {
    isLoading.value.districts = false;
  }
});

watch(() => form.value.district_id, async (id) => {
  subdistricts.value = [];
  form.value.subdistrict_id = '';
  if (!id) return;
  isLoading.value.subdistricts = true;
  try {
    const res = await axios.get(`${API_BASE_URL}/wilayah/desa/${id}`);
    subdistricts.value = res.data;
  } catch (err) {
    errorMessage.value = "Gagal memuat desa.";
  } finally {
    isLoading.value.subdistricts = false;
  }
});

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
    const res = await axios.post(`${API_BASE_URL}/address`, payload, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    alert(res.data.message || "Alamat berhasil disimpan!");
    router.push('/userProfile');
  } catch (err) {
    if (err.response?.status === 422) {
      const errors = err.response.data.errors;
      errorMessage.value = Object.values(errors).map(msg => `- ${msg[0]}`).join('\n');
    } else {
      errorMessage.value = 'Terjadi kesalahan saat menyimpan alamat.';
    }
  } finally {
    isLoading.value.submit = false;
  }
}
</script>

<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4 text-center">ADD ADDRESS</h2>

    <div v-if="isLoading.countries" class="text-center">
      <div class="spinner-border" role="status"></div>
      <p>Loading initial data...</p>
    </div>

    <div v-if="errorMessage" class="alert alert-danger white-space-pre-line">{{ errorMessage }}</div>

    <form v-else class="mx-auto text-start" style="max-width: 500px" @submit.prevent="submitAddress">
      <input v-model="form.name" type="text" placeholder="First name" class="form-control mb-3" required />
      <input v-model="form.surname" type="text" placeholder="Last name" class="form-control mb-3" />

      <div class="input-group mb-3">
        <select v-model="form.phone_code" class="form-select" style="max-width: 120px">
          <option v-for="country in countries" :key="country.cca2" :value="country.idd.root + (country.idd.suffixes?.[0] || '')">
            {{ country.cca2 }} ({{ country.idd.root }}{{ country.idd.suffixes?.[0] || '' }})
          </option>
        </select>
        <input v-model="form.mobile" type="tel" placeholder="Mobile" class="form-control" required />
      </div>

      <select v-model="form.country" class="form-select mb-3" required>
        <option disabled value="">Select Country</option>
        <option v-for="country in countries" :key="country.cca2" :value="country.name.common">
          {{ country.name.common }}
        </option>
      </select>

      <div v-if="form.country === 'Indonesia'">
        <select v-model="form.province_id" class="form-select mb-3" required>
          <option disabled value="">Select Province</option>
          <option v-for="province in provinces" :key="province.id" :value="province.id">
            {{ province.name }}
          </option>
        </select>

        <select v-model="form.city_id" class="form-select mb-3" required>
          <option disabled value="">Select City/Regency</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>

        <select v-model="form.district_id" class="form-select mb-3" required>
          <option disabled value="">Select District</option>
          <option v-for="district in districts" :key="district.id" :value="district.id">
            {{ district.name }}
          </option>
        </select>

        <select v-model="form.subdistrict_id" class="form-select mb-3" required>
          <option disabled value="">Select Subdistrict/Village</option>
          <option v-for="subdistrict in subdistricts" :key="subdistrict.id" :value="subdistrict.id">
            {{ subdistrict.name }}
          </option>
        </select>
      </div>

      <input v-model="form.postcode" type="text" placeholder="Postal code" class="form-control mb-3" required />
      <textarea v-model="form.address" placeholder="Street address, block, house no." class="form-control mb-3" rows="3" required></textarea>

      <div class="form-check mb-3">
        <input v-model="form.isDefault" class="form-check-input" type="checkbox" id="defaultCheck" />
        <label class="form-check-label" for="defaultCheck">Make this your primary shipping address</label>
      </div>

      <button type="submit" class="btn btn-dark w-100" :disabled="isLoading.submit">
        <span v-if="isLoading.submit" class="spinner-border spinner-border-sm"></span>
        {{ isLoading.submit ? 'Saving...' : 'Save Address' }}
      </button>
    </form>
  </div>
</template>