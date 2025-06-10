<template>
    <div class="bg-light">

<div class="container my-5">
  <div class="row">
    <!-- Formulir Pengiriman -->
    <div class="col-md-7">
      <h4 class="mb-4">Informasi Pengiriman</h4>
      <form>
        <div class="mb-3">
          <label for="nama" class="form-label">Nama Lengkap</label>
          <input type="text" class="form-control" id="nama" required>
        </div>
        <div class="mb-3">
          <label for="telepon" class="form-label">Nomor Telepon</label>
          <input type="tel" class="form-control" id="telepon" required>
        </div>
        <div class="mb-3">
          <label for="alamat" class="form-label">Alamat Lengkap</label>
          <textarea class="form-control" id="alamat" rows="3" required></textarea>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="kota" class="form-label">Kota</label>
            <input type="text" class="form-control" id="kota" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="kodepos" class="form-label">Kode Pos</label>
            <input type="text" class="form-control" id="kodepos" required>
          </div>
        </div>
        <h5 class="mt-4">Metode Pembayaran</h5>
        <div class="form-check mt-2">
          <input class="form-check-input" type="radio" name="pembayaran" id="cod" checked>
          <label class="form-check-label" for="cod">
            Bayar di Tempat (COD)
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="pembayaran" id="transfer">
          <label class="form-check-label" for="transfer">
            Transfer Bank
          </label>
        </div>
        <div class="form-check mb-4">
          <input class="form-check-input" type="radio" name="pembayaran" id="ewallet">
          <label class="form-check-label" for="ewallet">
            E-Wallet (OVO, DANA, dll)
          </label>
        </div>

        <button type="submit" class="btn btn-dark w-100">Bayar Sekarang</button>
      </form>
    </div>

    <!-- Ringkasan Belanja -->
    <div class="col-md-5">
      <div class="card">
        <div class="card-header bg-white">
          <h5 class="mb-0">Ringkasan Pesanan</h5>
        </div>
        <div class="card-body">
          <!-- Produk -->
          <div class="d-flex mb-3">
            <img src="/public/images/100JT/100,000,000(1).png" class="me-3 rounded w-25" alt="Sepatu">
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
          <!-- Total -->
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
  </div>
</div>


</div>
</template>