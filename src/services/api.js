// File: src/api/axios.js

import axios from 'axios';

// Konfigurasi utama koneksi ke backend Anda
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 5000, // Waktu tunggu request dalam milidetik
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Export instance ini agar bisa digunakan oleh file lain
export default api;