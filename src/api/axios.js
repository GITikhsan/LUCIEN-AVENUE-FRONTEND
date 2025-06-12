// File: src/api/axios.js

import axios from 'axios';

// Tentukan base URL dari API Laravel Anda.
const API_BASE_URL = 'http://localhost:8000/api';

// Buat sebuah instance axios dengan konfigurasi default
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});


// ==========================================================
// PASTIKAN BARIS DI BAWAH INI ADA DAN TIDAK DI-KOMENTAR
// Ini adalah baris yang hilang menurut pesan error Anda.
// ==========================================================
export default api;