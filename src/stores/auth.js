// stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Baca token dari local storage saat store diinisialisasi
    token: localStorage.getItem('authToken') || null, 
  }),
  getters: {
    // Getter untuk memeriksa apakah pengguna terotentikasi
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    logout() {
      // Hapus token dari state dan local storage
      this.token = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    },
  },
});