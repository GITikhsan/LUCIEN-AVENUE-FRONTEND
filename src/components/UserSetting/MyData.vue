<script setup>
import { ref } from 'vue'

const profileFields = ref([
  { label: 'Nama', value: 'Test' },
  { label: 'E-mail', value: 'HalloTest@gmail.com' },
  { label: 'Mobile', value: '081233466631' },
  { label: 'Kata Sandi', value: 'hallo123' },
  { label: 'Tanggal Lahir', value: '2005-08-09' },
  { label: 'Jenis Kelamin', value: 'Pria' }
])

const editing = ref(profileFields.value.map(() => false))

function toggleEdit(index) {
  if (editing.value[index]) {
    // Simpan logika penyimpanan di sini (e.g., API call)
    console.log(`Updated ${profileFields.value[index].label}:`, profileFields.value[index].value)
  }
  editing.value[index] = !editing.value[index]
}
</script>

<style scoped>
</style>


<template>
  <div class="container py-5 text-center">
    <h2 class="fw-bold mb-4">DATA SAYA</h2>
    <div class="mx-auto text-start" style="max-width: 640px">
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
        <div class="col-12 border-top pt-3">
          <a href="#" class="text-decoration-underline text-danger small">Hapus akun</a>
        </div>
      </div>
    </div>
  </div>
</template>

