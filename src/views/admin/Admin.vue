<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '@/api/axios'; // Pastikan path ini benar
const editingProductId = ref(null);

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
// DIUBAH: State untuk menampung BANYAK file gambar
const imageFiles = ref([]); 
// BARU: State untuk menampung URL preview gambar
const imagePreviews = ref([]);

// State untuk data promo & diskon (bisa dikembangkan nanti)
const promos = ref([]);
const newPromo = reactive({ /* ... field promo ... */ });
const diskons = ref([]);
const newDiskon = reactive({ /* ... field diskon ... */ });


// === 2. METHODS (LOGIKA) ===

// --- Logika untuk Produk ---
const fetchProducts = async () => {
  isLoadingProducts.value = true;
  try {
    const response = await api.get('/products');
    
    // PERBAIKANNYA DI SINI:
    // Kita masuk satu level .data lebih dalam untuk mengambil array dari objek paginasi
    if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
      products.value = response.data.data.data;
    } else {
      // Jika struktur data tidak sesuai, set ke array kosong untuk mencegah error
      console.error("Struktur data produk dari API tidak sesuai ekspektasi.", response.data);
      products.value = []; 
    }

  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
    products.value = []; // Jika gagal fetch, pastikan products tetap array
  } finally {
    isLoadingProducts.value = false;
  }
};

// DIUBAH: Fungsi ini sekarang menangani banyak file
const handleFileChange = (event) => {
  const files = event.target.files;
  if (!files) return;

  // Reset array file dan preview setiap kali memilih file baru
  imageFiles.value = [];
  imagePreviews.value = [];

  // Looping sebanyak file yang dipilih
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    imageFiles.value.push(file); // Simpan object File-nya
    
    // Buat URL lokal untuk preview
    const previewUrl = URL.createObjectURL(file);
    imagePreviews.value.push(previewUrl); // Simpan URL preview-nya
  }
};

// BARU: Fungsi untuk menghapus salah satu gambar dari preview
const removeImage = (index) => {
    imageFiles.value.splice(index, 1);
    imagePreviews.value.splice(index, 1);
}

// DIUBAH: Fungsi ini sekarang mengirim banyak gambar
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
    // Cek apakah kita sedang dalam mode UPDATE atau CREATE
    if (editingProductId.value) {
      // --- Logika UPDATE ---
      formData.append('_method', 'PUT'); // Trik untuk Laravel agar mengenali method PUT
      response = await api.post(`/products/${editingProductId.value}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Cari produk yang lama di array dan ganti dengan data baru dari response
      const index = products.value.findIndex(p => p.produk_id === editingProductId.value);
      if (index !== -1) {
        products.value[index] = response.data.data;
      }
      alert('Produk berhasil di-update!');
    } else {
      // --- Logika CREATE (sama seperti kodemu yang lama) ---
      response = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      products.value.unshift(response.data.data);
      alert('Produk baru berhasil disimpan!');
    }
    resetForm(); // Panggil fungsi reset form setelah semua selesai
  } catch (error) {
    console.error("Gagal menyimpan produk:", error);
    alert("Gagal menyimpan: " + JSON.stringify(error.response?.data?.errors || error.message));
  }
};

// --- Logika lain (tidak diubah) ---
const savePromo = async () => { alert('Logika simpan promo ke API belum dibuat.'); }
const saveDiskon = async () => { alert('Logika simpan diskon ke API belum dibuat.'); }

// BARU: Fungsi untuk mereset form dan keluar dari mode edit
const resetForm = () => {
    document.getElementById('productForm').reset();
    // Menggunakan Object.keys untuk mereset semua field di reactive object
    Object.keys(newProduct).forEach(key => { newProduct[key] = ''; });
    // Set nilai default lagi jika perlu
    newProduct.gender = 'Male'; 
    imageFiles.value = [];
    imagePreviews.value = [];
    // Keluar dari mode edit
    editingProductId.value = null; 
}

// BARU: Fungsi untuk memulai proses edit saat tombol di tabel diklik
const startEdit = (product) => {
  // Salin semua data dari produk yang dipilih ke dalam form 'newProduct'
  Object.keys(newProduct).forEach(key => {
    if (product[key] !== undefined) {
      newProduct[key] = product[key];
    }
  });
  
  // Tandai bahwa kita sekarang sedang dalam mode edit dengan menyimpan ID produk
  editingProductId.value = product.produk_id;

  // Kosongkan preview gambar, karena user mungkin tidak ingin mengubah gambar
  imagePreviews.value = [];
  imageFiles.value = [];
  
  alert(`Mode Edit untuk: ${product.nama_sepatu}. Silakan ubah data di form input.`);

  // Scroll ke atas agar form terlihat
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// BARU: Fungsi untuk menghapus produk saat tombol di tabel diklik
const deleteProduct = async (id, index) => {
  if (!confirm('Yakin ingin menghapus produk ini? Aksi ini permanen.')) {
    return;
  }
  try {
    await api.delete(`/products/${id}`);
    // Hapus dari array di tampilan agar UI langsung update
    products.value.splice(index, 1);
    alert('Produk berhasil dihapus.');
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    alert('Gagal menghapus produk.');
  }
};

// === 3. LIFECYCLE HOOK ===
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
        <!-- DIKEMBALIKAN: Konten Home sekarang sudah lengkap lagi -->
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
                
                <!-- DIUBAH: Input file sekarang bisa multiple -->
                <div class="mb-3">
                  <label for="productImages" class="form-label">Product Images (Pilih 1 atau lebih)</label>
                  <input type="file" @change="handleFileChange" class="form-control" id="productImages" accept="image/*" multiple />
                </div>

                <!-- BARU: Area untuk menampilkan preview gambar -->
                <div v-if="imagePreviews.length > 0" class="mb-3">
                    <label class="form-label">Image Previews:</label>
                    <div class="d-flex flex-wrap gap-2 border rounded p-2">
                        <div v-for="(preview, index) in imagePreviews" :key="index" class="position-relative">
                            <img :src="preview" alt="Preview" class="rounded" style="width: 100px; height: 100px; object-fit: cover;">
                            <button @click.prevent="removeImage(index)" class="btn btn-sm btn-danger rounded-circle position-absolute top-0 end-0" style="width: 25px; height: 25px; line-height: 1; padding: 0;">
                                &times;
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Form input lain tidak diubah -->
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
                        <input v-model="newProduct.sku" type="text" id="sku" class="form-control" placeholder="sku" required>
                        <label for="sku" class="ms-2">SKU</label>
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
                        <input v-model="newProduct.material" type="text" id="material" class="form-control" placeholder="material">
                        <label for="material" class="ms-2">Material</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 form-floating mb-2">
                        <input v-model="newProduct.dimensi" type="text" id="dimensi" class="form-control" placeholder="Dimensi">
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
                <h5 class="fw-semibold">Existing Products</h5>
                <div v-if="isLoadingProducts" class="text-center p-4">
                  <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div v-else class="table-responsive">
                  <table class="table table-hover align-middle small">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Shoe Name</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Price</th>
                        <th scope="col">SKU</th>
                        <th scope="col">Sizes</th>
                        <th scope="col">Color</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Material</th>
                        <th scope="col">Dimension</th>
                        <th scope="col">Release Date</th>
                        <th scope="col" class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="products.length === 0">
                        <td colspan="12" class="text-center text-muted py-4">No products found.</td>
                      </tr>
                      <tr v-for="(product, index) in products" :key="product.produk_id">
                        <td>
                          <img v-if="product.images && product.images.length > 0" :src="product.images[0].image_path" alt="Img" style="width: 50px; height: 50px; object-fit: cover;" class="rounded">
                          <div v-else class="bg-light border rounded" style="width: 50px; height: 50px;"></div>
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
                          <button @click="deleteProduct(product.produk_id, index)" class="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
