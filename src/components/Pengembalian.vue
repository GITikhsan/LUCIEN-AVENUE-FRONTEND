<template>
  <div class="card p-4">
    <h4 class="mb-3">Form Pengembalian</h4>
    <form>
      <div class="mb-3">
        <label class="form-label">Nomor Pesanan</label>
        <input type="text" class="form-control" placeholder="INV123456789" />
      </div>
      <div class="mb-3">
        <label class="form-label">Alasan Pengembalian</label>
        <textarea class="form-control" rows="3"></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Upload Bukti</label>
        <input type="file" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">No WhatsApp</label>
        <input type="tel" class="form-control" maxlength="14" />
      </div>
      <button type="submit" class="btn btn-success">Ajukan Pengembalian</button>
    </form>
  </div>
</template>
