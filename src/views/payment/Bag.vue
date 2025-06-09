 <script>
    const prices = [20000, 15000, 104000, 8000];

    function updateTotal() {
      const qtyInputs = document.querySelectorAll('.qty-box');
      let total = 0;
      qtyInputs.forEach((input, index) => {
        const qty = parseInt(input.value) || 1;
        total += prices[index] * qty;
      });
      document.getElementById('grand-total').innerText = total.toLocaleString('id-ID');
    }

    function removeItem(btn) {
      const item = btn.closest('.cart-item');
      item.remove();
      updateTotal();
      updateItemCount();
    }

    function updateItemCount() {
      const count = document.querySelectorAll('.cart-item').length;
      document.getElementById('total-items').innerText = count;
    }

    // Hitung total saat pertama kali load
    window.onload = () => {
      updateTotal();
      updateItemCount();
    }
  </script>

<template>
    <div class="bg-light">
  <div class="container py-4">
    <div class="mb-3">
      <a href="#" class="text-decoration-none">&larr; Lanjut Mencari Barang</a>
    </div>
    <h4>Keranjang Produk</h4>
    <p class="text-muted">Kamu memiliki <span id="total-items">4</span> produk</p>

    <!-- List Produk -->
    <div id="cart-list">
      <!-- item -->
      <div class="cart-item d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-3">
          <img src="https://via.placeholder.com/60" class="item-img" alt="Sandal Anak" />
          <div>
            <div><strong>CROCS</strong> - Sandal Anak</div>
            <div class="text-muted">Rp 20.000</div>
          </div>
        </div>
        <div class="d-flex align-items-center gap-3">
          <input type="number" class="form-control qty-box" value="32" min="1" onchange="updateTotal()" />
          <button class="btn btn-outline-danger btn-sm" onclick="removeItem(this)">
            🗑️
          </button>
        </div>
      </div>

      <div class="cart-item d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-3">
          <img src="https://via.placeholder.com/60" class="item-img" alt="Baju Pria" />
          <div>
            <div><strong>TRIPLE</strong> - Baju Pria</div>
            <div class="text-muted">Rp 15.000</div>
          </div>
        </div>
        <div class="d-flex align-items-center gap-3">
          <input type="number" class="form-control qty-box" value="41" min="1" onchange="updateTotal()" />
          <button class="btn btn-outline-danger btn-sm" onclick="removeItem(this)">
            🗑️
          </button>
        </div>
      </div>

      <div class="cart-item d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-3">
          <img src="https://via.placeholder.com/60" class="item-img" alt="Jam Tangan" />
          <div>
            <div><strong>SKYMIE</strong> - Jam Tangan Pria</div>
            <div class="text-muted">Rp 104.000</div>
          </div>
        </div>
        <div class="d-flex align-items-center gap-3">
          <input type="number" class="form-control qty-box" value="41" min="1" onchange="updateTotal()" />
          <button class="btn btn-outline-danger btn-sm" onclick="removeItem(this)">
            🗑️
          </button>
        </div>
      </div>

      <div class="cart-item d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-3">
          <img src="https://via.placeholder.com/60" class="item-img" alt="Kaos Kaki" />
          <div>
            <div><strong>PUMA</strong> - Kaos Kaki</div>
            <div class="text-muted">Rp 8.000</div>
          </div>
        </div>
        <div class="d-flex align-items-center gap-3">
          <input type="number" class="form-control qty-box" value="1" min="1" onchange="updateTotal()" />
          <button class="btn btn-outline-danger btn-sm" onclick="removeItem(this)">
            🗑️
          </button>
        </div>
      </div>
    </div>

    <!-- Checkout -->
    <div class="d-flex justify-content-end mt-4">
      <div class="d-flex align-items-center gap-3">
        <h5 class="mb-0">Rp <span id="grand-total">147000</span></h5>
        <button class="btn btn-checkout">
          Checkout →
        </button>
      </div>
    </div>
  </div>

 
</div>
</template>