<script setup>
const userName = 'Nama Pengguna'

const menuItems = [
  {  to: '/addaddress', label: 'Add Address' },
]
</script>

<template>
    <div class="bg-light py-5">
    <div class="container">
      <div class="row">
        <!-- Ringkasan Pesanan di Kiri -->
        <div class="col-lg-7 order-1 order-lg-2 mb-4">
          <div class="card">
            <div class="card-header bg-white">
              <h5 class="mb-0">Ringkasan Pesanan</h5>
            </div>
            <div class="card-body">
              <!-- Produk -->
              <div class="d-flex mb-3">
                <img src="/public/images/100JT/100,000,000(1).png" class="me-3 rounded w-50" alt="Sepatu">
                <div>
                  <h6 class="mb-1">Sepatu Sneakers Pria</h6>
                  <small>Ukuran: 42</small><br>
                  <small>Jumlah: 1</small>
                </div>
                <div class="ms-auto text-end">
                  <p class="mb-0">Rp 450.000</p>
                </div>
              </div>
              <hr>
              <div class="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>Rp 450.000</span>
              </div>
              <div class="d-flex justify-content-between">
                <span>Ongkir</span>
                <span>Rp 30.000</span>
              </div>
              <hr>
              <div class="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>Rp 480.000</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Pengiriman di Kanan -->
       <div class="col-lg-5 order-2 order-1">
          
          <form>
           
              <div class="card text-start border p-1 rounded bg-white ">
            <div class="card-header bg-white">
              <h5 class="mb-0 fw-bold">Address</h5>
            </div>
              <div class="d-flex justify-content-between mb-2 p-1 m-2">
                <div>
                  <p class="mb-1 fw-medium">Ikhsan</p>
                  <p class="mb-1">ikhsanfauzi537@gmail.com</p>
                  <p class="mb-1">+62 81233466631</p>
                  <p class="mb-1">
                    GANG KENANGA NO 212, RT 5, SORAGAN, NGESTIHARJO, KASIHAN, BANTUL, D.I.YOGYAKARTA, 55182, DI Yogyakarta, Bantul, Ngestiharjo, Kasihan
                  </p>
                  <span class="badge bg-dark border mt-2">Alamat pengiriman default</span>
                </div>
                <div>
                  <router-link to="/EditAddress" class="text-decoration-underline small">Edit</router-link>
                </div>
              </div>
              <router-link to="/AddAddress" class="btn btn-outline-dark mt-3 m-3 px-4 py-2 fw-bold">Add Address</router-link>
            </div>

            <h5 class="mt-4">Metode Pembayaran</h5>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="pembayaran" id="transfer">
              <label class="form-check-label" for="transfer">Transfer Bank</label>
            </div>
            <div class="form-check mb-4">
              <input class="form-check-input" type="radio" name="pembayaran" id="ewallet">
              <label class="form-check-label" for="ewallet">E-Wallet (OVO, DANA, dll)</label>
            </div>

            <button type="submit" class="btn btn-dark w-100">Bayar Sekarang</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>