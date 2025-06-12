// File: src/services/api.js

// 1. Impor 'api' (default export) dari konektor
import api from '@/api/axios.js';

// 2. Buat fungsi 'ping' dan ekspor dengan 'export const' (named export)
export const ping = () => {
  return api.get('/ping');
}

// Tambahkan fungsi lain dengan 'export const' juga
// export const getAllProducts = () => { ... }