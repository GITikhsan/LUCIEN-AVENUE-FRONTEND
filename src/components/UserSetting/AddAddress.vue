<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import router untuk redirect

const router = useRouter();
// --- State untuk data geografis ---
const countries = ref([]);
const provinces = ref([]);
const cities = ref([]);
const districts = ref([]);
const subdistricts = ref([]);

// --- State untuk form input ---
const form = ref({
  name: '', surname: '', phone_code: '+62', mobile: '',
  country: 'Indonesia', province_id: '', city_id: '',
  district_id: '', subdistrict_id: '', postcode: '',
  address: '', isDefault: false
});

// --- State untuk loading ---
const isLoading = ref({
  countries: true, provinces: false, cities: false,
  districts: false, subdistricts: false,
});

// --- FUNGSI-FUNGSI LOGIKA ---

async function fetchProvinces() {
  isLoading.value.provinces = true;
  try {
    const response = await axios.get('/wilayah/provinsi');
    provinces.value = response.data;
  } catch (error) { console.error("Failed to fetch provinces:", error); } 
  finally { isLoading.value.provinces = false; }
}

onMounted(async () => {
  isLoading.value.countries = true;
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2,idd');
    countries.value = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    if (form.value.country === 'Indonesia') {
      fetchProvinces();
    }
  } catch (error) { console.error("Failed to fetch countries:", error); } 
  finally { isLoading.value.countries = false; }
});

watch(() => form.value.country, (newCountry) => {
  provinces.value = []; cities.value = []; districts.value = []; subdistricts.value = [];
  form.value.province_id = ''; form.value.city_id = ''; form.value.district_id = ''; form.value.subdistrict_id = '';
  if (newCountry === 'Indonesia') fetchProvinces();
});

watch(() => form.value.province_id, async (newProvinceId) => {
  cities.value = []; districts.value = []; subdistricts.value = [];
  form.value.city_id = ''; form.value.district_id = ''; form.value.subdistrict_id = '';
  if (newProvinceId) {
    isLoading.value.cities = true;
    try {
      const response = await axios.get(`/wilayah/kota/${newProvinceId}`);
      cities.value = response.data;
    } catch (error) { console.error("Gagal memuat kota:", error); } 
    finally { isLoading.value.cities = false; }
  }
});

watch(() => form.value.city_id, async (newCityId) => {
    districts.value = []; subdistricts.value = [];
    form.value.district_id = ''; form.value.subdistrict_id = '';
    if(newCityId){
        isLoading.value.districts = true;
        try {
            const response = await axios.get(`/wilayah/kecamatan/${newCityId}`);
            districts.value = response.data;
        } catch (error) { console.error("Gagal memuat kecamatan:", error); } 
        finally { isLoading.value.districts = false; }
    }
});

watch(() => form.value.district_id, async (newDistrictId) => {
    subdistricts.value = [];
    form.value.subdistrict_id = '';
    if(newDistrictId){
        isLoading.value.subdistricts = true;
        try {
            const response = await axios.get(`/wilayah/desa/${newDistrictId}`);
            subdistricts.value = response.data;
        } catch (error) { console.error("Gagal memuat kelurahan:", error); } 
        finally { isLoading.value.subdistricts = false; }
    }
});

async function submitAddress() {
  isLoading.value.submit = true; // Tambahkan state loading untuk tombol

  // Mengambil NAMA dari wilayah yang dipilih berdasarkan ID
  const selectedProvince = provinces.value.find(p => p.id === form.value.province_id)?.name || '';
  const selectedCity = cities.value.find(c => c.id === form.value.city_id)?.name || '';
  const selectedDistrict = districts.value.find(d => d.id === form.value.district_id)?.name || '';
  const selectedSubdistrict = subdistricts.value.find(s => s.id === form.value.subdistrict_id)?.name || '';

  // Gabungkan semua field menjadi satu string alamat yang lengkap
  const fullAddress = [
    form.value.address_detail,
    selectedSubdistrict,
    selectedDistrict,
    selectedCity,
    selectedProvince,
    form.value.country,
    form.value.postcode
  ].filter(Boolean).join(', '); // Hapus bagian yang kosong dan gabungkan dengan koma

  console.log('Header yang akan dikirim:', axios.defaults.headers.common);

  try {
    // Kirim HANYA alamat lengkap ke endpoint /address
    const response = await axios.post('/address', {
      alamat: fullAddress
    });

    alert(response.data.message); // Tampilkan pesan sukses dari server
    router.push('/address'); // Arahkan kembali ke halaman daftar alamat

  } catch (error) {
    alert('Gagal menyimpan alamat. Silakan coba lagi.');
    console.error('Failed to save address:', error);
  } finally {
    isLoading.value.submit = false;
  }
}
</script>

<template>
  <div class="container py-5 text-center">
    <h2 class="fw-bold mb-4">ADD ADDRESS</h2>

    <div v-if="isLoading.countries" class="text-center">
      <p>Loading initial data...</p>
    </div>
    
    <div v-else-if="errorMessage" class="alert alert-danger mx-auto" style="max-width: 500px;">
        {{ errorMessage }}
    </div>

    <form v-else class="mx-auto text-start" style="max-width: 500px" @submit.prevent="submitAddress">
      <input v-model="form.name" type="text" placeholder="First name" class="form-control mb-3" required />
      <input v-model="form.surname" type="text" placeholder="Last name" class="form-control mb-3" />
      
      <div class="input-group mb-3">
        <select v-model="form.phone_code" class="form-select" style="max-width: 120px;">
          <option v-for="country in countries" :key="country.cca2" :value="country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '')">
            {{ country.cca2 }} ({{ country.idd.root }}{{ country.idd.suffixes ? country.idd.suffixes[0] : '' }})
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
          <option disabled value="">
            {{ isLoading.provinces ? 'Loading...' : 'Select Province' }}
          </option>
          <option v-for="province in provinces" :key="province.id" :value="province.id">
            {{ province.name }}
          </option>
        </select>

        <select v-model="form.city_id" class="form-select mb-3" :disabled="!form.province_id || isLoading.cities" required>
          <option disabled value="">
            {{ isLoading.cities ? 'Loading...' : 'Select City/Regency' }}
          </option>
          <option v-for="city in cities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>

        <!-- <select v-model="form.district_id" class="form-select mb-3" :disabled="!form.city_id || isLoading.districts" required>
          <option disabled value="">
            {{ isLoading.districts ? 'Memuat...' : 'Pilih Kecamatan' }}
          </option>
          <option v-for="district in districts" :key="district.id" :value="district.id">
            {{ district.name }}
          </option>
        </select>

         <select v-model="form.subdistrict_id" class="form-select mb-3" :disabled="!form.district_id || isLoading.subdistricts" required>
          <option disabled value="">
            {{ isLoading.subdistricts ? 'Memuat...' : 'Pilih Kelurahan/Desa' }}
          </option>
          <option v-for="subdistrict in subdistricts" :key="subdistrict.id" :value="subdistrict.id">
            {{ subdistrict.name }}
          </option>
        </select> -->
      </div> 
      
      <input v-model="form.postcode" type="text" placeholder="Postal code" class="form-control mb-3" required />
      <textarea v-model="form.address" placeholder="Other details (eg. Street Name, House No., Block)" class="form-control mb-3" required></textarea>
      
      <div class="form-check mb-3">
        <input v-model="form.isDefault" class="form-check-input" type="checkbox" id="defaultCheck" />
        <label class="form-check-label" for="defaultCheck">Make your shipping address primary</label>
      </div>

      <button type="submit" class="btn btn-dark w-100">Save Address</button>
    </form>
  </div>
</template>