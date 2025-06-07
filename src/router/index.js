import { createRouter, createWebHistory } from 'vue-router'

import Home       from '@/views/Home.vue'
import AboutUs  from '@/views/AboutUs.vue'
<<<<<<< Updated upstream
import ViewMore from '@/views/ViewMore.vue'
=======
import Experience from '@/views/Experience.vue'
>>>>>>> Stashed changes
import Product  from '@/views/Product.vue'
import Skills     from '@/views/Skills.vue'
import Contact    from '@/views/Contact.vue'
import Fashion    from '@/views/Fashion.vue'

const routes = [
  { path: '/',          name: 'Tentang',    component: Home },
  { path: '/aboutus', name: 'aboutus', component: AboutUs },
<<<<<<< Updated upstream
  { path: '/viewmore',name: 'viewmore', component: ViewMore },
  { path: '/product', name: 'Product', component: Product },
=======
  { path: '/experience',name: 'Pengalaman', component: Experience },
  { path: '/product', name: 'product', component: Product },
>>>>>>> Stashed changes
  { path: '/skills',    name: 'Keahlian',   component: Skills },
  { path: '/contact',   name: 'Kontak',     component: Contact },
  { path: '/Fashion',   name: 'Fashion',     component: Fashion },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

