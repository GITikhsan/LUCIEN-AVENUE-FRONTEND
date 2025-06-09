// pingTest.js
import axios from 'axios'

axios.get('http://localhost:8000/api/hello')
  .then(res => console.log('✅ Backend ready:', res.data))
  .catch(err => console.error('❌ Gagal:', err.message))