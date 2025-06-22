<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const profileFields = ref([]);
const isLoading = ref(true);
const errorMessage = ref('');
const editing = ref([]);

/**
 * 1. MENGAMBIL DATA DARI SERVER
 */
async function fetchUserProfile() {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await axios.get('/user');
    const user = response.data;

    profileFields.value = [
      { key: 'first_name', label: 'Nama Depan', value: user.first_name },
      { key: 'last_name', label: 'Nama Belakang', value: user.last_name || '' },
      { key: 'email', label: 'E-mail', value: user.email },
      { key: 'no_telepon', label: 'Mobile', value: user.no_telepon || '' },
      { key: 'password', label: 'Kata Sandi', value: '••••••••' }
    ];

    editing.value = profileFields.value.map(() => false);

  } catch (error) {
    errorMessage.value = 'Gagal memuat data pengguna.';
    console.error('Failed to fetch user data:', error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchUserProfile);

/**
 * 2. MENGIRIM PERUBAHAN KE SERVER
 */
async function toggleEdit(index) {
  const field = profileFields.value[index];

  // Jika saat ini sedang dalam mode edit, berarti pengguna mengklik 'Simpan'
  if (editing.value[index]) {
    if (field.key === 'password' && field.value === '••••••••') {
      editing.value[index] = false;
      return;
    }

    try {
      const response = await axios.post('/profile/update', {
        field: field.key,
        value: field.value
      });
      
      alert('Data berhasil diperbarui!');
      if (field.key === 'password') {
        field.value = '••••••••';
      }

    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Gagal mengupdate data.';
      alert(errorMsg);
      console.error(`Failed to update ${field.key}:`, error);
      fetchUserProfile(); 
    }
  }

  // --- PERBAIKAN DI SINI ---
  // Baris ini sekarang dipindahkan ke DALAM fungsi toggleEdit
  editing.value[index] = !editing.value[index];
} // <--- FUNGSI BERAKHIR DI SINI
</script>

<style scoped>
</style>


<template>
  <div class="container py-5 text-center">
    <h2 class="fw-bold mb-4">My Data</h2>

    <div v-if="isLoading" class="text-center">Loading data...</div>
    <div v-if="errorMessage" class="alert alert-danger mx-auto" style="max-width: 640px">{{ errorMessage }}</div>

    <div v-if="!isLoading && !errorMessage" class="mx-auto text-start" style="max-width: 640px">
      <div class="row g-3">
        <div v-for="(item, index) in profileFields" :key="index" class="col-12 border-top pt-3">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <strong class="small text-uppercase">{{ item.label }}</strong>
              <div v-if="!editing[index]">
                <p class="mb-0">{{ item.value }}</p>
              </div>
              <div v-else>
                <input v-model="item.value" class="form-control form-control-sm" />
              </div>
            </div>
            <a href="#" class="text-decoration-underline small ms-2" @click.prevent="toggleEdit(index)">
              {{ editing[index] ? 'Simpan' : 'Edit' }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>