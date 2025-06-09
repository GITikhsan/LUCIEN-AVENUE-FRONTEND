<script>
  const panels = {
    "Home": `
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="h5 fw-semibold">Activity</h2>
      </div>
      <div class="row g-3 mb-4">
        ${["New Orders", "Ready to Ship", "New Chats", "New Discussions", "New Reviews"].map(label => `
          <div class="col-6 col-sm-3 col-lg-2">
            <div class="card text-center">
              <div class="card-body p-3">
                <p class="text-muted small">${label}</p>
                <p class="h6 fw-bold">0</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="fw-semibold mb-2">Store and Product Analysis</h5>
          <p class="text-muted small">Last update:</p>
          <div class="bg-light rounded mt-3 p-5 text-center text-muted">[Chart Placeholder]</div>
        </div>
      </div>
    `,

    "Discussion": `
      <div class="card">
        <div class="card-body">
          <h5 class="fw-semibold mb-3">Product Discussion</h5>
          <div class="mb-3 border rounded p-3">
            <p class="fw-semibold mb-1">User123:</p>
            <p>Is this product compatible with Android 12?</p>
            <p class="text-muted small mt-2">2 hours ago</p>
          </div>
          <div class="mb-3 border bg-light rounded p-3">
            <p class="fw-semibold mb-1">Admin:</p>
            <p>Yes, this product is compatible with Android 12 and above.</p>
            <p class="text-muted small mt-2">1 hour ago</p>
          </div>
          <div class="mt-4">
            <textarea class="form-control mb-2" placeholder="Write a reply..." rows="3"></textarea>
            <button class="btn btn-success">Reply</button>
          </div>
        </div>
      </div>
    `,

    "Product": `
      <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content p-4 text-center">
            <h5 class="mb-3">Are you sure?</h5>
            <div class="d-flex justify-content-center gap-2">
              <button id="confirmYes" class="btn btn-outline-success">Yes</button>
              <button id="confirmNo" class="btn btn-outline-secondary" data-bs-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card mx-auto" style="max-width: 600px;">
        <div class="card-body">
          <h5 class="mb-4 fw-semibold">Shoe Data Input</h5>
          <form id="imageUploadForm" class="mb-4">
            <div class="mb-3">
              <label class="form-label">Upload Images (Max 9)</label>
              <div id="dropZone" class="border border-dashed text-center p-4 bg-light rounded cursor-pointer">
                <p>Drag & drop images here or click to select</p>
                <input type="file" id="imageInput" accept="image/*" multiple hidden />
              </div>
              <small class="text-muted">You can upload up to 9 images.</small>
              <div id="imagePreview" class="row mt-3 g-2"></div>
            </div>
            <div class="form-floating mb-2">
              <input type="text" id="nama" class="form-control" placeholder="Shoe Name">
              <label for="nama">Shoe Name</label>
            </div>
            <div class="form-floating mb-2">
              <input type="text" id="merek" class="form-control" placeholder="Brand">
              <label for="merek">Brand</label>
            </div>
            <div class="form-floating mb-2">
              <input type="number" id="harga" class="form-control" placeholder="Price">
              <label for="harga">Price (Rp)</label>
            </div>
            <div class="form-floating mb-2">
              <select id="ukuran" class="form-select">
                ${Array.from({ length: 11 }, (_, i) => 35 + i).map(size => `<option value="${size}">${size}</option>`).join('')}
              </select>
              <label for="ukuran">Size</label>
            </div>
            <div class="form-floating mb-2">
              <select id="Gender" class="form-select">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unisex">Unisex</option>
              </select>
              <label for="Gender">Gender</label>
            </div>
            <div class="form-floating mb-2">
              <input type="text" id="SKU" class="form-control" placeholder="SKU">
              <label for="SKU">SKU</label>
            </div>
            <div class="form-floating mb-2">
              <input type="text" id="Color" class="form-control" placeholder="Color">
              <label for="Color">Color</label>
            </div>
            <div class="form-floating mb-2">
              <input type="text" id="Material" class="form-control" placeholder="Material">
              <label for="Material">Material</label>
            </div>
            <div class="form-floating mb-2">
              <input type="text" id="dimension" class="form-control" placeholder="Dimension">
              <label for="dimension">Dimension</label>
            </div>
            <div class="form-floating mb-2">
              <input type="date" class="form-control" placeholder="Release Date">
              <label>Release Date</label>
            </div>
            <div class="form-floating mb-2">
              <input type="text" id="retail" class="form-control" placeholder="Retail">
              <label for="retail">Retail</label>
            </div>
            <div class="mb-3">
              <label for="Description" class="form-label">Description</label>
              <textarea class="form-control" id="Description" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-success w-100">Save</button>
          </form>
        </div>
      </div>
    `,

    "Orders": `
      <div class="card">
        <div class="card-body">
          <h5 class="fw-semibold mb-3">My Orders</h5>
          <div class="d-flex gap-2 flex-wrap mb-4">
            ${["all", "unpaid", "processing", "shipped", "completed", "cancelled"].map(tab => `
              <button class="btn btn-sm btn-outline-secondary tab-btn" data-tab="${tab}">${tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
            `).join('')}
          </div>
          <div id="orderContent" class="text-center py-5 text-muted"></div>
        </div>
      </div>
    `,
    "promo": `
  <div class="card">
    <div class="card-header bg-warning text-dark">
      <h5 class="mb-0">Input Promo</h5>
    </div>
    <div class="card-body">
      <form id="promoForm">
        <div class="mb-3">
          <label for="promoName" class="form-label">Nama Promo</label>
          <input type="text" class="form-control" id="promoName" required>
        </div>
        <div class="mb-3">
          <label for="promoCode" class="form-label">Kode Promo</label>
          <input type="text" class="form-control" id="promoCode" required>
        </div>
        <div class="mb-3">
          <label for="promoDiscount" class="form-label">Diskon (%)</label>
          <input type="number" class="form-control" id="promoDiscount" required>
        </div>
        <div class="mb-3">
          <label for="promoStart" class="form-label">Tanggal Mulai</label>
          <input type="date" class="form-control" id="promoStart" required>
        </div>
        <div class="mb-3">
          <label for="promoEnd" class="form-label">Tanggal Berakhir</label>
          <input type="date" class="form-control" id="promoEnd" required>
        </div>
        <button type="submit" class="btn btn-success">Simpan Promo</button>
      </form>
    </div>
  </div>
`,
"diskon": `
  <div class="card">
    <div class="card-header bg-success text-white">
      <h5 class="mb-0">Input Diskon Produk</h5>
    </div>
    <div class="card-body">
      <form id="diskonForm">
        <div class="mb-3">
          <label for="produkName" class="form-label">Nama Produk</label>
          <input type="text" class="form-control" id="produkName" required>
        </div>
        <div class="mb-3">
          <label for="diskonPersen" class="form-label">Diskon (%)</label>
          <input type="number" class="form-control" id="diskonPersen" required>
        </div>
        <div class="mb-3">
          <label for="diskonStart" class="form-label">Tanggal Mulai</label>
          <input type="date" class="form-control" id="diskonStart" required>
        </div>
        <div class="mb-3">
          <label for="diskonEnd" class="form-label">Tanggal Berakhir</label>
          <input type="date" class="form-control" id="diskonEnd" required>
        </div>
        <button type="submit" class="btn btn-primary">Simpan Diskon</button>
      </form>
    </div>
  </div>
`

  };

  function loadPanel(name) {
    $("#sidebarMenu a").removeClass("active text-success fw-bold").addClass("text-dark");
    $(`#sidebarMenu a[data-panel='${name}']`).addClass("active text-success fw-bold");
    $("#defaultContent").html(panels[name] || `<p class='text-muted'>Content for "${name}" is not available.</p>`);
  }

  $(document).ready(function () {
    $("#sidebarMenu a").on("click", function (e) {
      e.preventDefault();
      const panelName = $(this).data("panel");
      loadPanel(panelName);
    });

    loadPanel("Home");

    // You can retain your jQuery image upload and modal logic from original script
  });

  $(document).on("click", ".tab-btn", function () {
    $(".tab-btn").removeClass("btn-success text-white").addClass("btn-outline-secondary");
    $(this).removeClass("btn-outline-secondary").addClass("btn-success text-white");
    const selectedTab = $(this).data("tab");
    $("#orderContent").html(`<p>You don't have any order${selectedTab !== 'all' ? ` in ${selectedTab}` : ''}</p>`);
  });
  
  $(document).on("submit", "#promoForm", function (e) {
  e.preventDefault();
  const data = {
    nama: $("#promoName").val(),
    kode: $("#promoCode").val(),
    diskon: $("#promoDiscount").val(),
    mulai: $("#promoStart").val(),
    akhir: $("#promoEnd").val()
  };

  let promos = JSON.parse(localStorage.getItem("promos")) || [];
  promos.push(data);
  localStorage.setItem("promos", JSON.stringify(promos));

  alert("Promo berhasil disimpan!");
  this.reset();
});

$(document).on("submit", "#diskonForm", function (e) {
  e.preventDefault();
  const data = {
    produk: $("#produkName").val(),
    diskon: $("#diskonPersen").val(),
    mulai: $("#diskonStart").val(),
    akhir: $("#diskonEnd").val()
  };

  let diskons = JSON.parse(localStorage.getItem("diskons")) || [];
  diskons.push(data);
  localStorage.setItem("diskons", JSON.stringify(diskons));

  alert("Diskon produk berhasil disimpan!");
  this.reset();
});
</script>

<template>
   <div class="bg-light text-body small">

<div class="d-flex min-vh-100">
  <!-- Sidebar -->
  <aside class="bg-white border-end p-3" style="width: 260px;">
    <div class="mb-4">
      <h1 class="h5 fw-semibold">Lucien Avenue</h1>
      <p class="text-muted small">Dashboard</p>
    </div>
    <nav class="nav flex-column gap-2" id="sidebarMenu">
      <a href="#" data-panel="Home" class="nav-link text-dark">Home</a>
      <a href="#" data-panel="Discussion" class="nav-link text-dark">Chat</a>
      <a href="#" data-panel="Product" class="nav-link text-dark">Product Input</a>
      <a href="#" data-panel="Orders" class="nav-link text-dark">Orders</a>
      <a href="#" data-panel="promo" class="nav-link">Promo</a>
      <a href="#" data-panel="diskon" class="nav-link">Discount</a>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="flex-grow-1 p-4 overflow-auto" id="mainContent">
    <div id="defaultContent"></div>
  </main>
</div>

</div>
</template>
