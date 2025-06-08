
<script setup>
import { ref, onMounted } from 'vue'


const activePanel = ref('EditProfile')
const showSidebar = ref(false)

const profile = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: ''
})

const shippingAddress = ref('')
const profilePreview = ref('/images/User.png')

const setPanel = (panel) => {
  activePanel.value = panel
  if (panel === 'ShippingAddress') setTimeout(initMap, 100)
  if (window.innerWidth < 768) showSidebar.value = false
}

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const onImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => profilePreview.value = e.target.result
    reader.readAsDataURL(file)
  }
}

const submitProfile = () => {
  alert('Profile updated (dummy handler)')
}

function initMap() {
  const map = L.map('map').setView([-6.2, 106.8167], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map)

  let marker = null
  map.on('click', function (e) {
    const lat = e.latlng.lat
    const lng = e.latlng.lng
    if (marker) marker.setLatLng(e.latlng)
    else marker = L.marker(e.latlng).addTo(map)
  })
}

onMounted(() => {
  setPanel('EditProfile')
})
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
</style>

<template>
  <div class="d-flex flex-column min-vh-100 bg-light">
    <!-- Navbar -->
    <StickNavbar />

    <!-- Mobile Header -->
    <div class="d-md-none bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
      <h1 class="h5 fw-semibold mb-0">More Settings</h1>
      <button class="btn" @click="toggleSidebar">
        <i class="bi bi-chevron-down fs-4"></i>
      </button>
    </div>

    <!-- Main Layout -->
    <div class="d-flex flex-grow-1">
      <!-- Sidebar -->
      <aside :class="['bg-white shadow-sm p-3 position-fixed h-100 z-3', { 'd-none d-md-block': !showSidebar }, 'w-100 w-md-25']">
        <h2 class="h6 fw-bold">Lucien Avenue</h2>
        <p class="small text-muted mb-4">Settings</p>
        <nav class="nav flex-column">
          <button class="nav-link text-start" :class="{ 'text-success fw-semibold': activePanel === 'EditProfile' }" @click="setPanel('EditProfile')">Edit your profile</button>
          <button class="nav-link text-start" :class="{ 'text-success fw-semibold': activePanel === 'ShippingAddress' }" @click="setPanel('ShippingAddress')">Your address</button>
          <button class="nav-link text-start" :class="{ 'text-success fw-semibold': activePanel === 'ChangePassword' }" @click="setPanel('ChangePassword')">Change your password</button>
          <button class="nav-link text-start" :class="{ 'text-success fw-semibold': activePanel === 'Deleteacc' }" @click="setPanel('Deleteacc')">Delete account</button>
        </nav>
      </aside>

      <!-- Content -->
      <main class="flex-grow-1 p-4 offset-md-3">
        <div v-if="activePanel === 'EditProfile'">
          <!-- Edit Profile -->
          <div class="card p-4">
            <h2 class="h5 fw-bold mb-3">Edit Profile</h2>
            <form @submit.prevent="submitProfile">
              <div class="d-flex align-items-start mb-3">
                <img :src="profilePreview" alt="Profile" class="rounded-circle me-3" width="80" height="80" />
                <div class="flex-fill">
                  <label class="form-label">Profile Picture</label>
                  <input type="file" class="form-control" @change="onImageChange" />
                </div>
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-control" v-model="profile.firstName" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-control" v-model="profile.lastName" />
                </div>
                <div class="col-12">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" v-model="profile.email" />
                </div>
                <div class="col-12">
                  <label class="form-label">Phone Number</label>
                  <input type="tel" class="form-control" v-model="profile.phone" />
                </div>
                <div class="col-12">
                  <label class="form-label">Date of Birth</label>
                  <input type="date" class="form-control" v-model="profile.dob" />
                </div>
              </div>
              <div class="mt-4">
                <button class="btn btn-secondary">Save Profile</button>
              </div>
            </form>
          </div>
        </div>

        <div v-else-if="activePanel === 'ShippingAddress'">
          <!-- Shipping Address -->
          <div class="card p-4">
            <h3 class="h6 fw-bold mb-3">Select Location on Map</h3>
            <div id="map" class="w-100 rounded" style="height: 300px;"></div>
            <label class="form-label mt-3">Add address</label>
            <textarea class="form-control" rows="3" v-model="shippingAddress"></textarea>
            <button class="btn btn-secondary mt-3">Save address</button>
          </div>
        </div>

        <div v-else-if="activePanel === 'ChangePassword'">
          <!-- Change Password -->
          <div class="card p-4">
            <h2 class="h5 fw-bold mb-3">Change Password</h2>
            <form>
              <div class="mb-3">
                <label class="form-label">Current Password</label>
                <input type="password" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">New Password</label>
                <input type="password" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Confirm New Password</label>
                <input type="password" class="form-control" />
              </div>
              <button class="btn btn-secondary">Confirm</button>
            </form>
          </div>
        </div>

        <div v-else-if="activePanel === 'Deleteacc'">
          <!-- Delete Account -->
          <div class="card p-4">
            <p class="text-muted">Do you wanna delete your account?</p>
            <button class="btn btn-link text-danger">Delete account</button>
          </div>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <FooterSection />
  </div>
</template>