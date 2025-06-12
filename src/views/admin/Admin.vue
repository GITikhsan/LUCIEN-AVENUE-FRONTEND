<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '@/api/axios'; // Pastikan path ini benar

// === 1. STATE MANAGEMENT ===

// State untuk mengontrol panel mana yang sedang aktif
const activePanel = ref('Home');

// State untuk data produk
const products = ref([]); // Untuk daftar produk yang sudah ada
const isLoadingProducts = ref(true);
const newProduct = reactive({ // Untuk menampung data dari form input produk
  nama_sepatu: '',
  brand: '',
  harga_retail: '',
  sku: '',
  ukuran: '',
  warna: '',
  gender: 'Male',
  material: '',
  dimensi: '',
  tanggal_rilis: '',
  deskripsi: ''
});
const imageFile = ref(null); // State khusus untuk menampung file gambar

// State untuk data promo (bisa Anda kembangkan nanti)
const promos = ref([]);
const newPromo = reactive({ /* ... field promo ... */ });

// State untuk data diskon (bisa Anda kembangkan nanti)
const diskons = ref([]);
const newDiskon = reactive({ /* ... field diskon ... */ });


// === 2. METHODS (LOGIKA) ===

// --- Logika untuk Produk ---
const fetchProducts = async () => {
  isLoadingProducts.value = true;
  try {
    const response = await api.get('/products');
    // Jika API Anda menggunakan paginasi, data ada di response.data.data
    products.value = response.data.data ? response.data.data : response.data;
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
  } finally {
    isLoadingProducts.value = false;
  }
};

const handleFileChange = (event) => {
  imageFile.value = event.target.files[0];
};

const saveProduct = async () => {
  const formData = new FormData();
  // Masukkan semua data teks dari form ke FormData
  for (const key in newProduct) {
    formData.append(key, newProduct[key]);
  }
  // Lampirkan file gambar jika ada
  if (imageFile.value) {
    formData.append('image', imageFile.value);
  }

  try {
    const response = await api.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    products.value.unshift(response.data.data); // Tambah produk baru ke daftar
    document.getElementById('productForm').reset(); // Reset form HTML
    for(const key in newProduct) { newProduct[key] = '' } // Reset state reactive
    imageFile.value = null;
    alert('Produk berhasil disimpan ke database!');
  } catch (error) {
    console.error("Gagal menyimpan produk:", error);
    alert("Gagal menyimpan: " + JSON.stringify(error.response?.data?.errors || error.message));
  }
};

// --- Logika untuk Promo & Diskon (Bisa Anda buat nanti polanya sama) ---
const savePromo = async () => {
  alert('Logika simpan promo ke API belum dibuat.');
  // const response = await api.post('/promos', newPromo);
  // ...
}

const saveDiskon = async () => {
  alert('Logika simpan diskon ke API belum dibuat.');
  // const response = await api.post('/discounts', newDiskon);
  // ...
}

// === 3. LIFECYCLE HOOK ===
// Saat komponen pertama kali dimuat, langsung ambil data produk
onMounted(() => {
  fetchProducts();
});

</script>

<template>
  <div class="bg-light text-body small">
    <div class="d-flex min-vh-100">
      <aside class="bg-white border-end p-3" style="width: 260px;">
        <div class="mb-4">
          <h1 class="h5 fw-semibold">Lucien Avenue</h1>
          <p class="text-muted small">Dashboard</p>
        </div>
        <nav class="nav flex-column gap-2" id="sidebarMenu">
          <a href="#" @click.prevent="activePanel = 'Home'" class="nav-link" :class="{'active text-success fw-bold': activePanel === 'Home', 'text-dark': activePanel !== 'Home'}">Home</a>
          <a href="#" @click.prevent="activePanel = 'Product'" class="nav-link" :class="{'active text-success fw-bold': activePanel === 'Product', 'text-dark': activePanel !== 'Product'}">Product</a>
          <a href="#" @click.prevent="activePanel = 'Orders'" class="nav-link" :class="{'active text-success fw-bold': activePanel === 'Orders', 'text-dark': activePanel !== 'Orders'}">Orders</a>
          <a href="#" @click.prevent="activePanel = 'promo'" class="nav-link" :class="{'active text-success fw-bold': activePanel === 'promo', 'text-dark': activePanel !== 'promo'}">Promo</a>
          <a href="#" @click.prevent="activePanel = 'diskon'" class="nav-link" :class="{'active text-success fw-bold': activePanel === 'diskon', 'text-dark': activePanel !== 'diskon'}">Discount</a>
        </nav>
      </aside>

      <main class="flex-grow-1 p-4 overflow-auto">
        <div v-if="activePanel === 'Home'">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="h5 fw-semibold">Activity</h2>
          </div>
          <div class="row g-3 mb-4">
            <div v-for="label in ['New Orders', 'Ready to Ship', 'New Chats', 'New Discussions', 'New Reviews']" :key="label" class="col-6 col-sm-3 col-lg-2">
              <div class="card text-center">
                <div class="card-body p-3">
                  <p class="text-muted small">{{ label }}</p>
                  <p class="h6 fw-bold">0</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="fw-semibold mb-2">Store and Product Analysis</h5>
              <p class="text-muted small">Last update:</p>
              <div class="bg-light rounded mt-3 p-5 text-center text-muted">[Chart Placeholder]</div>
            </div>
          </div>
        </div>

        <div v-if="activePanel === 'Product'">
          <div class="card mx-auto mb-5" style="max-width: 700px;">
            <div class="card-body">
              <h5 class="mb-4 fw-semibold">Product Input</h5>
              <form id="productForm" @submit.prevent="saveProduct">
                
                <div class="mb-3">
                  <label for="productImage" class="form-label">Product Image</label>
                  <input type="file" @change="handleFileChange" class="form-control" id="productImage" accept="image/*" />
                </div>

                <div class="row">
                    <div class="col-md-6 form-floating mb-2">
                      <input v-model="newProduct.nama_sepatu" type="text" id="nama_sepatu" class="form-control" placeholder="Shoe Name" required>
                      <label for="nama_sepatu" class="ms-2">Shoe Name</label>
                    </div>
                    <div class="col-md-6 form-floating mb-2">
                      <input v-model="newProduct.brand" type="text" id="brand" class="form-control" placeholder="Brand" required>
                      <label for="brand" class="ms-2">Brand</label>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6 form-floating mb-2">
                      <input v-model="newProduct.harga_retail" type="number" id="harga" class="form-control" placeholder="Price (Rp)" required>
                      <label for="harga" class="ms-2">Price (Rp)</label>
                    </div>
                    <div class="col-md-6 form-floating mb-2">
                      <input v-model="newProduct.sku" type="text" id="SKU" class="form-control" placeholder="SKU" required>
                      <label for="SKU" class="ms-2">SKU</label>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 form-floating mb-2">
                      <input v-model="newProduct.ukuran" type="text" id="ukuran" class="form-control" placeholder="Sizes (e.g. 40,41,42)">
                      <label for="ukuran" class="ms-2">Sizes (pisahkan koma)</label>
                    </div>
                    <div class="col-md-6 form-floating mb-2">
                      <input v-model="newProduct.warna" type="text" id="warna" class="form-control" placeholder="Color">
                      <label for="warna" class="ms-2">Color</label>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 form-floating mb-2">
                      <select v-model="newProduct.gender" id="gender" class="form-select">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                      <label for="gender" class="ms-2">Gender</label>
                    </div>
                    <div class="col-md-6 form-floating mb-2">
                      <input v-model="newProduct.material" type="text" id="material" class="form-control" placeholder="Material">
                      <label for="material" class="ms-2">Material</label>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 form-floating mb-2">
                      <input v-model="newProduct.dimensi" type="text" id="dimensi" class="form-control" placeholder="Dimension">
                      <label for="dimensi" class="ms-2">Dimension</label>
                    </div>
                    <div class="col-md-6 form-floating mb-2">
                      <input v-model="newProduct.tanggal_rilis" type="date" id="tanggal_rilis" class="form-control" placeholder="Release Date">
                      <label for="tanggal_rilis" class="ms-2">Release Date</label>
                    </div>
                </div>

                <div class="form-floating mb-2">
                    <textarea v-model="newProduct.deskripsi" class="form-control" placeholder="Description" id="Description" style="height: 100px"></textarea>
                    <label for="Description">Description</label>
                </div>

                <button type="submit" class="btn btn-success w-100 mt-3">Save Product</button>
              </form>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
                </div>
          </div>
        </div>
                
        <div v-if="activePanel === 'Orders'">... Konten Orders di sini ...</div>
        <div v-if="activePanel === 'promo'">... Konten form Promo di sini ...</div>
        <div v-if="activePanel === 'diskon'">... Konten form Diskon di sini ...</div>

      </main>
    </div>
  </div>
</template>

<style scoped>
/* Pindahkan semua CSS dari file lama Anda ke sini, tidak perlu diubah */
.nav-link.active {
    background-color: #e9f5e9;
    border-right: 3px solid #28a745;
}
</style>