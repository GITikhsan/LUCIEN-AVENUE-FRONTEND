// File: src/api/axios.js

console.log('%c[TES] File konektor axios.js berhasil dibaca!', 'color: blue; font-weight: bold;');

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default api;