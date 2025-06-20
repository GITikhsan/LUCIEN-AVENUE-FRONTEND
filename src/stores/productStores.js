// src/stores/productStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    searchQuery: '',
    products: []
  }),
  actions: {
    async fetchProducts() {
      try {
        const res = await axios.get('http://localhost:8000/api/products/search', {
          params: { q: this.searchQuery }
        })
        this.products = res.data
      } catch (error) {
        console.error('Gagal ambil produk pencarian:', error)
      }
    },
    setSearchQuery(query) {
      this.searchQuery = query
    }
  }
})
