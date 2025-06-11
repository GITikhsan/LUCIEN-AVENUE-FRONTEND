<script setup>
defineProps(['name', 'price', 'image', 'link'])
</script>

<template>
  <div class="card border-0 rounded-4 shadow-sm overflow-hidden h-100 position-relative">
    <a :href="link" class="stretched-link"></a>
    <div class="position-relative bg-white d-flex align-items-center justify-content-center" style="aspect-ratio: 4/3; padding: 1rem;">
      <img :src="image" :alt="name" class="img-fluid" style="object-fit: contain; max-height: 100%; max-width: 100%;" />
    </div>
    <div class="card-body text-start px-3 py-3 d-flex flex-column justify-content-between">
      <div style="min-height: 3.8em;">
        <h6 class="fw-semibold mb-2" style="font-size: 0.95rem; line-height: 1.2em;">{{ name }}</h6>
      </div>
      <div>
        <p class="fw-bold mb-0 text-success" style="font-size: 1rem;">{{ price }}</p>
      </div>
    </div>
  </div>
</template>