<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import api from '@/api/axios';

const backendUrl = 'http://127.0.0.1:8000';

// === 1. STATE MANAGEMENT ===
const activePanel = ref('Home');
const editingProductId = ref(null);
const searchQuery = ref('');

const products = ref([]);
const isLoadingProducts = ref(true);

const newProduct = reactive({
  nama_sepatu: '',
  brand: '',
  harga_retail: '',
  sku: '',
  ukuran: '',
  warna: '',
  gender: '',
  material: '',
  dimensi: '',
  tanggal_rilis: '',
  deskripsi: ''
});

const imageFiles = ref([]);
const imagePreviews = ref([]);

// === 2. COMPUTED PROPERTY (Untuk Search) ===
const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products.value;
  }
  const searchTerm = searchQuery.value.toLowerCase();
  return products.value.filter(product =>
    (product.nama_sepatu && product.nama_sepatu.toLowerCase().includes(searchTerm)) ||
    (product.brand && product.brand.toLowerCase().includes(searchTerm)) ||
    (product.sku && product.sku.toLowerCase().includes(searchTerm))
  );
});

// === 3. METHODS (Fungsi-Fungsi) ===

const fetchProducts = async () => {
  isLoadingProducts.value = true;
  try {
    const response = await api.get('/products');
    if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
      products.value = response.data.data.data;
    } else {
      products.value = [];
    }
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
    products.value = [];
  } finally {
    isLoadingProducts.value = false;
  }
};

const handleFileChange = (event) => {
  const files = event.target.files;
  if (!files) return;
  imageFiles.value = [];
  imagePreviews.value = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    imageFiles.value.push(file);
    imagePreviews.value.push(URL.createObjectURL(file));
  }
};

const removeImage = (index) => {
  imageFiles.value.splice(index, 1);
  imagePreviews.value.splice(index, 1);
};

const resetForm = () => {
  if(document.getElementById('productForm')) {
    document.getElementById('productForm').reset();
  }
  Object.keys(newProduct).forEach(key => { newProduct[key] = ''; });
  newProduct.gender = 'Male';
  imageFiles.value = [];
  imagePreviews.value = [];
  editingProductId.value = null;
};

const startEdit = (product) => {
  Object.keys(newProduct).forEach(key => {
    if (product[key] !== undefined && product[key] !== null) {
      newProduct[key] = product[key];
    } else {
      newProduct[key] = '';
    }
  });
  editingProductId.value = product.produk_id;
  imagePreviews.value = [];
  imageFiles.value = [];
  alert(`Mode Edit untuk: ${product.nama_sepatu}. Silakan ubah data di form input.`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const deleteProduct = async (id) => {
  if (!confirm('Yakin ingin menghapus produk ini? Aksi ini tidak bisa dibatalkan.')) {
    return;
  }
  try {
    await api.delete(`/products/${id}`);
    products.value = products.value.filter(p => p.produk_id !== id);
    alert('Produk berhasil dihapus.');
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    alert('Gagal menghapus produk.');
  }
};

const saveProduct = async () => {
  const formData = new FormData();
  for (const key in newProduct) {
    formData.append(key, newProduct[key]);
  }
  if (imageFiles.value.length > 0) {
    for (const file of imageFiles.value) {
      formData.append('images[]', file);
    }
  }

  try {
    let response;
    if (editingProductId.value) {
      // --- Logika UPDATE ---
      formData.append('_method', 'PUT');
      response = await api.post(`/products/${editingProductId.value}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const index = products.value.findIndex(p => p.produk_id === editingProductId.value);
      if (index !== -1) {
        products.value[index] = response.data.data;
      }
      alert('Produk berhasil di-update!');
    } else {
      // --- Logika CREATE ---
      response = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      products.value.unshift(response.data.data);
      alert('Produk baru berhasil disimpan!');
    }
    resetForm();
  } catch (error) {
    console.error("Gagal menyimpan produk:", error);
    alert("Gagal menyimpan: " + JSON.stringify(error.response?.data?.errors || error.message));
  }
};

const props = defineProps({
  activePanel: String
});

const newPromo = reactive({
  nama_promo: '',
  kode: '',
  diskonP: '',
  mulai_tanggal: '',
  selesai_tanggal: ''
});

const formMessage = ref('');
const formSuccess = ref(false);
const promotions = ref([]);
const editingPromoId = ref(null); // ⬅️ Tambahkan ini


const fetchPromotions = async () => {
  try {
    const response = await api.get('/promotions');
    promotions.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch promo data:', error);
    promotions.value = [];
  }
};

const savePromo = async () => {
  try {
    const response = await api.post('/promotions', newPromo);
    promotions.value.unshift(response.data.data);
    formMessage.value = 'Promo successfully added';
    formSuccess.value = true;
    Object.keys(newPromo).forEach(key => newPromo[key] = '');
  } catch (error) {
    console.error('Failed to save the promo:', error);
    formMessage.value = 'Failed to add promo';
    formSuccess.value = false;
  }
};

const startEditPromo = (promo) => {
  Object.keys(newPromo).forEach(key => {
    let value = promo[key] ?? '';
    // Format tanggal agar sesuai dengan input[type="date"]
    if (key === 'mulai_tanggal' || key === 'selesai_tanggal') {
      value = value.split(' ')[0]; // Ambil hanya "YYYY-MM-DD"
    }
    newPromo[key] = value;
  });
  editingPromoId.value = promo.promo_id;
  formMessage.value = 'Edit mode enabled. Make your changes.';
  formSuccess.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


const deletePromo = async (id) => {
  if (!confirm("Are you sure you want to delete this promotion?")) return;

  try {
    await api.delete(`/promotions/${id}`);
    promotions.value = promotions.value.filter(p => p.promo_id !== id);
    formMessage.value = 'Promotion deleted';
    formSuccess.value = true;
  } catch (error) {
    console.error("Failed to delete promotion:", error);
    formMessage.value = 'Failed to delete promotion';
    formSuccess.value = false;
  }
};

const isPromoActive = (promo) => {
  const today = new Date().toISOString().slice(0, 10);
  return promo.mulai_tanggal <= today && promo.selesai_tanggal >= today;
};
// === 4. LIFECYCLE HOOK ===
onMounted(() => {
  fetchProducts();
  fetchPromotions();
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
              <h5 class="mb-4 fw-semibold">{{ editingProductId ? 'Edit Product' : 'Product Input' }}</h5>
              <form id="productForm" @submit.prevent="saveProduct">
                <div class="mb-3">
                  <label for="productImages" class="form-label">Product Images (Pilih 1 atau lebih)</label>
                  <input type="file" @change="handleFileChange" class="form-control" id="productImages" accept="image/*" multiple />
                </div>
                <div v-if="imagePreviews.length > 0" class="mb-3">
                  <label class="form-label">Image Previews:</label>
                  <div class="d-flex flex-wrap gap-2 border rounded p-2">
                    <div v-for="(preview, index) in imagePreviews" :key="index" class="position-relative">
                      <img :src="preview" alt="Preview" class="rounded" style="width: 100px; height: 100px; object-fit: cover;">
                      <button @click.prevent="removeImage(index)" class="btn btn-sm btn-danger rounded-circle position-absolute top-0 end-0" style="width: 25px; height: 25px; line-height: 1; padding: 0;">&times;</button>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 form-floating mb-2"><input v-model="newProduct.nama_sepatu" type="text" id="nama_sepatu" class="form-control" placeholder="x" required><label for="nama_sepatu" class="ms-2">Shoe Name</label></div>
                  <div class="col-md-6 form-floating mb-2"><input v-model="newProduct.brand" type="text" id="brand" class="form-control" placeholder="x" required><label for="brand" class="ms-2">Brand</label></div>
                </div>
                <div class="row">
                  <div class="col-md-6 form-floating mb-2"><input v-model="newProduct.harga_retail" type="number" id="harga" class="form-control" placeholder="x" required><label for="harga" class="ms-2">Price (Rp)</label></div>
                  <div class="col-md-6 form-floating mb-2"><input v-model="newProduct.sku" type="text" id="sku" class="form-control" placeholder="x" required><label for="sku" class="ms-2">SKU</label></div>
                </div>
                <div class="row">
                  <div class="col-md-6 form-floating mb-2"><input v-model="newProduct.ukuran" type="text" id="ukuran" class="form-control" placeholder="x"><label for="ukuran" class="ms-2">Sizes (pisahkan koma)</label></div>
                  <div class="col-md-6 form-floating mb-2"><input v-model="newProduct.warna" type="text" id="warna" class="form-control" placeholder="x"><label for="warna" class="ms-2">Color</label></div>
                </div>
                <div class="row">
                  <div class="col-md-6 form-floating mb-2"><select v-model="newProduct.gender" id="gender" class="form-select"><option>Male</option><option>Female</option><option>Unisex</option></select><label for="gender" class="ms-2">Gender</label></div>
                  <div class="col-md-6 form-floating mb-2"><input v-model="newProduct.material" type="text" id="material" class="form-control" placeholder="x"><label for="material" class="ms-2">Material</label></div>
                </div>
                <div class="row">
                  <div class="col-md-6 form-floating mb-2"><input v-model="newProduct.dimensi" type="text" id="dimensi" class="form-control" placeholder="x"><label for="dimensi" class="ms-2">Dimension</label></div>
                  <div class="col-md-6 form-floating mb-2"><input v-model="newProduct.tanggal_rilis" type="date" id="tanggal_rilis" class="form-control" placeholder="x"><label for="tanggal_rilis" class="ms-2">Release Date</label></div>
                </div>
                <div class="form-floating mb-2"><textarea v-model="newProduct.deskripsi" class="form-control" placeholder="x" id="Description" style="height: 100px"></textarea><label for="Description">Description</label></div>
                <div class="d-grid gap-2 mt-3">
                  <button type="submit" class="btn btn-success">{{ editingProductId ? 'Update Product' : 'Save Product' }}</button>
                  <button v-if="editingProductId" @click.prevent="resetForm" type="button" class="btn btn-secondary">Cancel Edit</button>
                </div>
              </form>
            </div>
          </div>
          
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-semibold mb-0">Existing Products</h5>
                <input type="search" class="form-control form-control-sm" style="max-width: 250px;" placeholder="Cari (Nama, Brand, SKU)..." v-model="searchQuery">
              </div>
              <div v-if="isLoadingProducts" class="text-center p-4">
                <div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div>
              </div>
              <div v-else class="table-responsive">
                <table class="table table-hover align-middle small">
                  <!-- BUNGKUS DENGAN DIV SCROLL -->
<div style="max-height: 400px; overflow-y: auto;">
  <table class="table">
    <thead>
      <tr>
        <th>Image</th>
        <th>Shoe Name</th>
        <th>Brand</th>
        <th>Price</th>
        <th>SKU</th>
        <th>Sizes</th>
        <th>Color</th>
        <th>Gender</th>
        <th>Material</th>
        <th>Dimension</th>
        <th>Release Date</th>
        <th class="text-end">Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="filteredProducts.length === 0">
        <td colspan="12" class="text-center text-muted py-4">No products found.</td>
      </tr>
      <tr v-for="product in filteredProducts" :key="product.produk_id">
        <td>
          <img
            v-if="product.images && product.images.length > 0"
            :src="backendUrl + product.images[0].image_path"
            alt="Product image"
            style="width: 50px; height: 50px; object-fit: cover;"
            class="rounded"
          />
        </td>
        <td class="fw-bold">{{ product.nama_sepatu }}</td>
        <td>{{ product.brand }}</td>
        <td>Rp {{ new Intl.NumberFormat('id-ID').format(product.harga_retail) }}</td>
        <td>{{ product.sku }}</td>
        <td>{{ product.ukuran }}</td>
        <td>{{ product.warna }}</td>
        <td>{{ product.gender }}</td>
        <td>{{ product.material }}</td>
        <td>{{ product.dimensi }}</td>
        <td>{{ product.tanggal_rilis }}</td>
        <td class="text-end">
          <button @click="startEdit(product)" class="btn btn-sm btn-outline-primary me-1">Edit</button>
          <button @click="deleteProduct(product.produk_id)" class="btn btn-sm btn-outline-danger">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

                </table>
              </div>
            </div>
          </div>
        </div>
                
        <div v-if="activePanel === 'Orders'">... Konten Orders di sini ...</div>
        <div v-if="activePanel === 'promo'">
<div class="card mx-auto mb-5" style="max-width: 700px;">
  <div class="card-body">
    <h5 class="mb-4 fw-semibold">Promo Input</h5>
    <form @submit.prevent="savePromo">
      <div class="row">
        <div class="col-md-6 form-floating mb-2">
          <input v-model="newPromo.nama_promo" type="text" id="nama_promo" class="form-control" placeholder="x" required>
          <label for="nama_promo" class="ms-2">Promo Name</label>
        </div>
        <div class="col-md-6 form-floating mb-2">
          <input v-model="newPromo.kode" type="text" id="kode" class="form-control" placeholder="x" required>
          <label for="kode" class="ms-2">Code</label>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 form-floating mb-2">
          <input v-model="newPromo.diskonP" type="number" id="diskonP" class="form-control" placeholder="x" min="1" max="100" required>
          <label for="diskonP" class="ms-2">Discount (%)</label>
        </div>
        <div class="col-md-6 form-floating mb-2">
          <input v-model="newPromo.mulai_tanggal" type="date" id="mulai_tanggal" class="form-control" placeholder="x" required>
          <label for="mulai_tanggal" class="ms-2">Start Date</label>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 form-floating mb-2">
          <input v-model="newPromo.selesai_tanggal" type="date" id="selesai_tanggal" class="form-control" placeholder="x" required>
          <label for="selesai_tanggal" class="ms-2">End Date</label>
        </div>
      </div>

      <div class="d-grid gap-2 mt-3">
        <button type="submit" class="btn btn-success">Save Promo</button>
      </div>
      <p v-if="formMessage" class="mt-2 text-sm" :class="{ 'text-success': formSuccess, 'text-danger': !formSuccess }">
        {{ formMessage }}
      </p>
    </form>
  </div>
</div>

<!-- Promo Table -->
<div class="card">
  <div class="card-body">
    <h5 class="fw-semibold mb-3">Promo List</h5>
    <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
      <table class="table table-hover align-middle small">
        <thead>
          <tr>
            <th>Code</th>
            <th>Promo Name</th>
            <th>Discount</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="promotions.length === 0">
            <td colspan="7" class="text-center text-muted py-4">No promotions available.</td>
          </tr>
          <tr v-for="promo in promotions" :key="promo.promo_id">
            <td>{{ promo.kode }}</td>
            <td>{{ promo.nama_promo }}</td>
            <td>{{ promo.diskonP }}%</td>
            <td>{{ promo.mulai_tanggal }}</td>
            <td>{{ promo.selesai_tanggal }}</td>
            <td>
              <span :class="isPromoActive(promo) ? 'text-success' : 'text-muted'">
                {{ isPromoActive(promo) ? 'Active' : 'Expired' }}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-primary me-2" @click="startEditPromo(promo)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="deletePromo(promo.promo_id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
      
        </div>
        <div v-if="activePanel === 'diskon'">... Konten form Diskon di sini ...</div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.nav-link.active {
    background-color: #e9f5e9;
    border-right: 3px solid #28a745;
}
</style>