// File: src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// === BAGIAN PENTING YANG HILANG ADA DI SINI ===
// Menambahkan Interceptor untuk setiap request
api.interceptors.request.use(config => {
  // Ambil token dari local storage
  const token = localStorage.getItem('auth_token');

  // Jika token ada, tambahkan ke header 'Authorization'
  // sebagai Bearer Token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Kembalikan konfigurasi yang sudah diubah agar request bisa dilanjutkan
  return config;

}, error => {
  // Lakukan sesuatu jika ada error pada request
  return Promise.reject(error);
});
// === AKHIR BAGIAN PENTING ===


// Menggunakan 'export default' karena ini adalah ekspor utama dari file ini
export default api;