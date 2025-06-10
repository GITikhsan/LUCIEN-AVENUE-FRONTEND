<script>
    const products = [
      {
        name: "Sepatu1 - Sandal Anak",
        price: 20000,
        qty: 1,
        image: "/public/images/4JT/4240(1).webp"
      },
      {
        name: "Sepatu2- Baju Pria",
        price: 15000,
        qty: 1,
        image: "/public/images/4JT/4240(1).webp"
      },
      {
        name: "Sepatu3 - Jam Tangan Pria",
        price: 104000,
        qty: 1,
        image: "/public/images/4JT/4240(1).webp"
      },
      {
        name: "Sepatu4 - Kaos Kaki",
        price: 8000,
        qty: 1,
        image: "/public/images/4JT/4240(1).webp"
      }
    ];

    function renderCart() {
      const cartList = document.getElementById('cart-list');
      cartList.innerHTML = '';
      products.forEach((product, index) => {
        const itemHTML = `
          <div class="cart-item d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
              <img src="${product.image}" class="item-img" alt="${product.name}" />
              <div>
                <div><strong>${product.name.split(' - ')[0]}</strong> - ${product.name.split(' - ')[1]}</div>
                <div class="text-muted">Rp ${product.price.toLocaleString('id-ID')}</div>
              </div>
            </div>
            <div class="d-flex align-items-center gap-3">
              <input type="number" class="form-control qty-box" data-index="${index}" value="${product.qty}" min="1" onchange="updateQty(this)" />
              <button class="btn btn-outline-danger btn-sm" onclick="removeItem(${index})">🗑</button>
            </div>
          </div>`;
        cartList.innerHTML += itemHTML;
      });
      updateTotal();
      updateItemCount();
    }

    function updateQty(input) {
      const index = input.getAttribute('data-index');
      const newQty = parseInt(input.value) || 1;
      products[index].qty = newQty;
      updateTotal();
    }

    function updateTotal() {
      const total = products.reduce((sum, item) => sum + item.price * item.qty, 0);
      document.getElementById('grand-total').innerText = total.toLocaleString('id-ID');
    }

    function removeItem(index) {
      products.splice(index, 1);
      renderCart();
    }

    function updateItemCount() {
      document.getElementById('total-items').innerText = products.length;
    }
    window.onload = renderCart;
  </script>

<style>
    .item-img { width: auto; height: 100px; object-fit: fill; }
    .btn-checkout { background-color: green; color: white; padding: 8px 16px; border: none; }
  </style>
  
<template>
    <div class="bg-light">
    <div class="container py-4">
      <div class="mb-3">
        <a href="ViewMore" class="text-decoration-none">&larr; Lanjut Mencari Barang</a>
      </div>
      <h4>Keranjang Produk</h4>
      <p class="text-muted">Kamu memiliki <span id="total-items">0</span> produk</p>

      <!-- List Produk -->
      <div id="cart-list"></div>

      <!-- Checkout -->
      <div class="d-flex justify-content-end mt-4">
        <div class="d-flex align-items-center gap-3">
          <h5 class="mb-0">Rp <span id="grand-total">0</span></h5>
         <a href="Checkout">Checkout →</a> 
        </div>
      </div>
    </div>
  </div>
</template>
