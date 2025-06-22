<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

// State yang sudah ada untuk data profil
const profileFields = ref([]);
const isLoading = ref(true);
const errorMessage = ref('');
const editing = ref([]);

// State untuk proses hapus akun
const router = useRouter();
const showDeleteModal = ref(false);
const deleteIsLoading = ref(false);
const deleteError = ref('');

/**
 * 1. MENGAMBIL DATA DARI SERVER (SUDAH DIPERBAIKI)
 */
async function fetchUserProfile() {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    // Menggunakan endpoint asli Anda '/user'
    const response = await axios.get('/user');
    // Membaca data langsung dari response.data
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
 * 2. MENGIRIM PERUBAHAN KE SERVER (Tidak ada perubahan)
 */
async function toggleEdit(index) {
  const field = profileFields.value[index];
  if (editing.value[index]) {
    if (field.key === 'password' && (field.value === '••••••••' || field.value === '')) {
      editing.value[index] = false;
      return;
    }
    try {
      await axios.post('/profile/update', {
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
  editing.value[index] = !editing.value[index];
}

/**
 * 3. FUNGSI UNTUK HAPUS AKUN (Tidak ada perubahan)
 */
const auth = useAuthStore();
const route = useRouter();

async function deleteAccount() {
  deleteIsLoading.value = true;
  deleteError.value = '';

  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Authentication token not found.');

    await axios.delete('/user/delete', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    auth.logout(); 
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');

    alert('Akun Anda telah berhasil dihapus.');
    route.push('/');

  } catch (error) {
    console.error('Failed to delete account:', error);
    deleteError.value = error.response?.data?.message || 'Tidak dapat menghapus akun. Silakan coba lagi.';
  } finally {
    deleteIsLoading.value = false;
  }
}
</script>

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
                <input v-model="item.value" :type="item.key === 'password' ? 'password' : 'text'" class="form-control form-control-sm" />
              </div>
            </div>
            <a href="#" class="text-decoration-underline small ms-2 flex-shrink-0" @click.prevent="toggleEdit(index)">
              {{ editing[index] ? 'Simpan' : 'Edit' }}
            </a>
          </div>
        </div>

        <div class="col-12 border-top pt-3">
          <a href="#" @click.prevent="showDeleteModal = true" class="text-decoration-underline text-danger small">Delete Account</a>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showDeleteModal" class="modal fade show" style="display: block; background-color: rgba(0,0,0,0.5);" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirm Account Deletion</h5>
          <button type="button" class="btn-close" @click="showDeleteModal = false"></button>
        </div>
        <div class="modal-body">
          <p>Apakah Anda benar-benar yakin ingin menghapus akun Anda?</p>
          <p class="fw-bold text-danger">Tindakan ini tidak dapat diurungkan. Semua data Anda akan hilang secara permanen.</p>
          
          <div v-if="deleteError" class="alert alert-danger mt-3">{{ deleteError }}</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showDeleteModal = false" :disabled="deleteIsLoading">
            Batal
          </button>
          <button type="button" class="btn btn-danger" @click="deleteAccount" :disabled="deleteIsLoading">
            <span v-if="deleteIsLoading" class="spinner-border spinner-border-sm"></span>
            {{ deleteIsLoading ? ' Menghapus...' : 'Ya, Hapus Akun Saya' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>