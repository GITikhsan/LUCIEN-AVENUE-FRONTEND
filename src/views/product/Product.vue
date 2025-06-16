<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '@/api/axios'; // Pastikan path ini benar ke file setup axios kamu

// === 1. STATE MANAGEMENT ===

// State untuk daftar produk yang sudah ada (opsional, untuk ditampilkan di bawah form)
const products = ref([]);
const isLoadingProducts = ref(true);

// State untuk menampung data dari form input produk baru
const newProduct = reactive({
  nama_sepatu: '',
  brand: '',
  harga_retail: '',
  sku: '',
  ukuran: '',
  warna: '',
  gender: 'Male', // Nilai default
  material: '',
  dimensi: '',
  tanggal_rilis: '',
  deskripsi: ''
});

// State untuk menampung file gambar yang akan di-upload
const imageFiles = ref([]);
// State untuk menampung URL preview gambar
const imagePreviews = ref([]);


// === 2. METHODS (LOGIKA) ===

// Mengambil daftar produk yang sudah ada
const fetchProducts = async () => {
  isLoadingProducts.value = true;
  try {
    const response = await api.get('/products');
    products.value = response.data.data;
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
  } finally {
    isLoadingProducts.value = false;
  }
};

// Fungsi untuk menangani saat user memilih file gambar
const handleFileChange = (event) => {
  const files = event.target.files;
  if (!files) return;

  // Reset array setiap kali memilih file baru
  imageFiles.value = [];
  imagePreviews.value = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    imageFiles.value.push(file); // Simpan object File
    
    // Buat URL lokal untuk preview
    const previewUrl = URL.createObjectURL(file);
    imagePreviews.value.push(previewUrl);
  }
};

// Fungsi untuk menghapus gambar dari daftar preview
const removeImage = (index) => {
    imageFiles.value.splice(index, 1);
    imagePreviews.value.splice(index, 1);
}

// Fungsi UTAMA untuk menyimpan produk baru ke backend
const saveProduct = async () => {
  // Gunakan FormData karena kita akan mengirim file
  const formData = new FormData();
  
  // 1. Masukkan semua data teks dari form ke FormData
  for (const key in newProduct) {
    formData.append(key, newProduct[key]);
  }

  // 2. Lampirkan semua file gambar jika ada
  if (imageFiles.value.length > 0) {
    for (const file of imageFiles.value) {
        // Gunakan nama 'images[]' agar Laravel membacanya sebagai array
        formData.append('images[]', file);
    }
  } else {
    alert('Mohon pilih minimal satu gambar produk.');
    return;
  }

  try {
    // 3. Kirim data ke backend dengan header yang sesuai
    const response = await api.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    alert('Produk berhasil disimpan!');
    
    // 4. Reset form setelah berhasil
    document.getElementById('productForm').reset();
    Object.keys(newProduct).forEach(key => newProduct[key] = '');
    imageFiles.value = [];
    imagePreviews.value = [];
    
    // Tambahkan produk baru ke daftar tanpa perlu refresh
    fetchProducts();

  } catch (error) {
    console.error("Gagal menyimpan produk:", error);
    // Tampilkan pesan error dari backend jika ada
    const errorMessages = error.response?.data?.errors;
    if (errorMessages) {
        alert("Gagal menyimpan: \n" + Object.values(errorMessages).flat().join("\n"));
    } else {
        alert("Terjadi kesalahan pada server. Silakan coba lagi.");
    }
  }
};

// === 3. LIFECYCLE HOOK ===
onMounted(() => {
  fetchProducts(); // Ambil data produk saat komponen pertama kali dimuat
});

</script>

<template>
  <div class="admin-container">
    <aside class="sidebar">
      <h1 class="brand">Lucien Avenue</h1>
      <nav>
        <a href="#" class="nav-link">Home</a>
        <a href="#" class="nav-link active">Product</a>
        <a href="#" class="nav-link">Orders</a>
        <a href="#" class="nav-link">Promo</a>
        <a href="#" class="nav-link">Discount</a>
      </nav>
    </aside>

    <main class="content">
      <div class="card product-input-card">
        <div class="card-body">
          <h5 class="card-title">Product Input</h5>
          
          <form id="productForm" @submit.prevent="saveProduct">
            
            <div class="mb-3">
              <label for="productImages" class="form-label">Product Images (Pilih 1 atau lebih)</label>
              <input type="file" @change="handleFileChange" class="form-control" id="productImages" accept="image/*" multiple required />
            </div>

            <div v-if="imagePreviews.length > 0" class="mb-3 image-previews">
              <div v-for="(preview, index) in imagePreviews" :key="index" class="preview-item">
                <img :src="preview" alt="Preview">
                <button @click.prevent="removeImage(index)" class="btn-remove-img">&times;</button>
              </div>
            </div>

            <div class="row g-3">
              <div class="col-md-6">
                <label for="nama_sepatu" class="form-label">Shoe Name</label>
                <input v-model="newProduct.nama_sepatu" type="text" id="nama_sepatu" class="form-control" required>
              </div>
              <div class="col-md-6">
                <label for="brand" class="form-label">Brand</label>
                <input v-model="newProduct.brand" type="text" id="brand" class="form-control" required>
              </div>
              <div class="col-md-6">
                <label for="harga_retail" class="form-label">Price (Rp)</label>
                <input v-model="newProduct.harga_retail" type="number" id="harga_retail" class="form-control" required>
              </div>
              <div class="col-md-6">
                <label for="sku" class="form-label">SKU</label>
                <input v-model="newProduct.sku" type="text" id="sku" class="form-control" required>
              </div>
              <div class="col-md-6">
                <label for="ukuran" class="form-label">Sizes (pisahkan koma)</label>
                <input v-model="newProduct.ukuran" type="text" id="ukuran" class="form-control">
              </div>
              <div class="col-md-6">
                <label for="warna" class="form-label">Color</label>
                <input v-model="newProduct.warna" type="text" id="warna" class="form-control">
              </div>
              <div class="col-md-6">
                 <label for="gender" class="form-label">Gender</label>
                 <select v-model="newProduct.gender" id="gender" class="form-select">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unisex">Unisex</option>
                 </select>
              </div>
              <div class="col-md-6">
                <label for="material" class="form-label">Material</label>
                <input v-model="newProduct.material" type="text" id="material" class="form-control">
              </div>
              <div class="col-md-6">
                <label for="dimensi" class="form-label">Dimension</label>
                <input v-model="newProduct.dimensi" type="text" id="dimensi" class="form-control">
              </div>
              <div class="col-md-6">
                <label for="tanggal_rilis" class="form-label">Release Date</label>
                <input v-model="newProduct.tanggal_rilis" type="date" id="tanggal_rilis" class="form-control">
              </div>
              <div class="col-12">
                <label for="deskripsi" class="form-label">Description</label>
                <textarea v-model="newProduct.deskripsi" class="form-control" id="deskripsi" rows="3"></textarea>
              </div>
            </div>

            <button type="submit" class="btn btn-success w-100 mt-4">Save Product</button>
          </form>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">Existing Products</h5>
          <div v-if="isLoadingProducts">Loading...</div>
          <div v-else class="table-responsive">
             <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.produk_id">
                        <td>{{ product.nama_sepatu }}</td>
                        <td>{{ product.brand }}</td>
                        <td>{{ product.harga_retail }}</td>
                    </tr>
                </tbody>
             </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Basic styling to match the screenshot */
:root {
  --sidebar-bg: #f8f9fa;
  --content-bg: #e9ecef;
  --card-bg: #ffffff;
  --text-color: #212529;
  --active-link-bg: #e9f5e9;
  --active-link-border: #28a745;
}

.admin-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--content-bg);
}

.sidebar {
  width: 260px;
  background-color: var(--card-bg);
  padding: 1.5rem;
  flex-shrink: 0;
}

.brand {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.nav-link {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
}

.nav-link.active {
  background-color: var(--active-link-bg);
  border-left: 4px solid var(--active-link-border);
  font-weight: 600;
  color: var(--active-link-border);
}

.content {
  flex-grow: 1;
  padding: 2rem;
}

.product-input-card {
  max-width: 900px;
  margin: 0 auto;
}

.card {
  border: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.image-previews {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}

.preview-item {
  position: relative;
}

.preview-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.375rem;
}

.btn-remove-img {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #dc3545;
  color: white;
  border: none;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
}
</style>