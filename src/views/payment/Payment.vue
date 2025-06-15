<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const paymentData = ref({
  metode_pembayaran: 'bca',
  jumlah: 0,
  password: '',
  status_pembayaran: 'pending',
  pesanan_id: null
})

const customerName = ref('')

onMounted(async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/pesanan/1')
    const pesanan = res.data.data

    paymentData.value.jumlah = pesanan.total_harga
    paymentData.value.pesanan_id = pesanan.id
    customerName.value = pesanan.user.name
  } catch (error) {
    console.error('Gagal memuat data pesanan:', error)
  }
})

async function submitPayment() {
  try {
    await axios.post('http://127.0.0.1:8000/api/pembayaran', paymentData.value)
    alert('Pembayaran berhasil dikirim!')
    router.push('/myPurchases')
  } catch (error) {
    console.error('Gagal mengirim pembayaran:', error)
    alert('Gagal mengirim pembayaran!')
  }
}

function copyAccountNumber() {
  const input = document.getElementById("accountNumber")
  input.select()
  input.setSelectionRange(0, 99999)
  document.execCommand("copy")
}
</script>

<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-lg border-0">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">GoPay Payment</h4>
          </div>
          <div class="card-body">
            <p class="mb-3">Please transfer the total amount to the following bank account:</p>

            <div class="border p-3 rounded bg-light mb-4">
              <h5 class="fw-bold mb-1">BANK BCA</h5>
              <p class="mb-1">Account Number:</p>
              <div class="d-flex align-items-center">
                <input
                  id="accountNumber"
                  class="form-control me-2"
                  type="text"
                  readonly
                  value="1234567890"
                />
                <button class="btn btn-outline-dark" @click="copyAccountNumber">Copy</button>
              </div>
              <p>Account Holder: <strong>{{ customerName }}</strong></p>
            </div>

            <div class="mb-3">
              <p><strong>Total Amount:</strong></p>
              <h3 class="text-success fw-bold">Rp {{ paymentData.jumlah.toLocaleString('id-ID') }}</h3>
              <p class="text-muted">*Please transfer the exact amount including the last 3 digits for automatic verification.</p>
            </div>

            <div class="alert alert-info">
              After completing the payment, please click the button below to confirm.
            </div>

            <button @click="submitPayment" class="btn btn-success w-100 fw-bold">I have paid</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
