<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])
const isLoading = ref(true)
const error = ref(null)

// State untuk popup konfirmasi
const showPopup = ref(false)
const popupMessage = ref('')
const popupCallback = ref(null)
const showNotification = ref(false)
const notificationMessage = ref('')
const notificationType = ref('success') // or 'error'

// Fungsi menampilkan popup konfirmasi
const showConfirmPopup = (message, callback) => {
  popupMessage.value = message
  popupCallback.value = callback
  showPopup.value = true
}

const confirmYes = () => {
  if (popupCallback.value) popupCallback.value()
  showPopup.value = false
}

const confirmNo = () => {
  showPopup.value = false
}

// Fungsi notifikasi setelah aksi
const showNotif = (message, type = 'success') => {
  notificationMessage.value = message
  notificationType.value = type
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

const handleDeleteHistory = async (orderId) => {
  showConfirmPopup('Yakin ingin menghapus pesanan ini?', async () => {
    try {
      const response = await axios.delete(`/orders/${orderId}`)
      orders.value = orders.value.filter(o => o.pesanan_id !== orderId)
      showNotif(response.data.message)
    } catch (err) {
      console.error('Gagal menghapus:', err)
      showNotif('Gagal menghapus riwayat pesanan.', 'error')
    }
  })
}

const handleCancelOrder = async (orderToCancel) => {
  showConfirmPopup('Yakin ingin membatalkan pesanan ini?', async () => {
    try {
      const response = await axios.post(`/orders/${orderToCancel.pesanan_id}/cancel`)
      const index = orders.value.findIndex(o => o.pesanan_id === orderToCancel.pesanan_id)
      if (index !== -1) orders.value[index] = response.data.order
      showNotif(response.data.message)
    } catch (err) {
      console.error('Gagal membatalkan:', err)
      showNotif('Gagal membatalkan pesanan.', 'error')
    }
  })
}

const formatCurrency = (value) => {
  return Number(value).toLocaleString('id-ID')
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

onMounted(async () => {
  try {
    const response = await axios.get('/orders')
    orders.value = response.data
  } catch (err) {
    error.value = 'Gagal memuat riwayat pembelian.'
  } finally {
    isLoading.value = false
  }
})
</script>


<template>

  <div v-if="showPopup" class="overlay">
  <div class="popup-box">
    <p>{{ popupMessage }}</p>
    <div class="d-flex justify-content-end gap-2 mt-3">
      <button class="btn btn-secondary" @click="confirmNo">Batal</button>
      <button class="btn btn-danger" @click="confirmYes">Ya</button>
    </div>
  </div>
</div>

<!-- Notifikasi -->
<div v-if="showNotification" :class="['notif', notificationType === 'success' ? 'notif-success' : 'notif-error']">
  {{ notificationMessage }}
</div>


  <div class="container py-5">
    <h1>My Purchases</h1>

    <div v-if="isLoading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading purchase history...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-else-if="orders.length === 0" class="text-center py-5">
      <p>You haven't made any purchases yet.</p>
    </div>
    
    <div v-else>
      <div v-for="order in orders" :key="order.pesanan_id" class="card mb-4">
        
        <div class="card-header d-flex justify-content-between align-items-center">
          <div>
            <strong>Order #{{ order.pesanan_id }}</strong>
            <small class="d-block text-muted">Tanggal: {{ formatDate(order.created_at) }}</small>
          </div>
          <span class="badge" :class="{
            'bg-warning text-dark': order.status_pesanan === 'pending',
            'bg-success': order.status_pesanan === 'dibayar',
            'bg-secondary': order.status_pesanan === 'dibatalkan',
            'bg-info': order.status_pesanan === 'dikirim'
          }">
            {{ order.status_pesanan }}
          </span>
        </div>

        <div class="card-body">
          <div v-for="item in order.items" :key="item.barang_pesanan_id" class="d-flex mb-3">
            <img 
              v-if="item.product && item.product.images && item.product.images.length > 0" 
              :src="'http://127.0.0.1:8000' + item.product.images[0].image_path" 
              alt="product image"
              style="width: 60px; height: 60px; object-fit: contain; margin-right: 15px;"
            >
            <div class="flex-grow-1">
              <h6 class="mb-1">{{ item.product ? item.product.nama_sepatu : 'Produk tidak ditemukan' }}</h6>
              <small>{{ item.quantity }} x Rp {{ formatCurrency(item.harga) }}</small>
            </div>
          </div>
        </div>

        <div class="card-footer d-flex justify-content-between align-items-center">
  <strong>Total: Rp {{ formatCurrency(order.jumlah_total) }}</strong>

          <div> <button
      v-if="order.status_pesanan === 'pending'"
      @click="handleCancelOrder(order)"
      class="btn btn-sm btn-outline-danger me-2"> Batalkan Pesanan
    </button>
          
          <button
      v-if="order.status_pesanan === 'dibatalkan' || order.status_pesanan === 'dibayar'"
      @click="handleDeleteHistory(order.pesanan_id)"
      class="btn btn-sm btn-outline-secondary">
      Hapus
    </button>
          
        </div>
      </div> 
    </div>
  </div>
  </div>
</template>

<style>
.overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.popup-box {
  background: #fff;
  padding: 20px 30px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
.notif {
  position: fixed;
  top: 20px; right: 20px;
  padding: 12px 20px;
  border-radius: 8px;
  z-index: 1001;
  color: white;
  font-weight: 500;
}
.notif-success {
  background-color: #198754;
}
.notif-error {
  background-color: #dc3545;
}
</style>