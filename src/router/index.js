import { createRouter, createWebHistory } from 'vue-router'
import ScanPage from '@/views/ScanPage.vue'
import BorrowPage from '@/views/BorrowPage.vue'
import ScanBarcodeReturn from '@/views/ScanBarcodeReturn.vue'
import ChooseActionPage from '@/views/ChooseActionPage.vue'


const routes = [
  { path: '/', name: 'Scan', component: ScanPage },
  { path: '/borrow', name: 'Borrow', component: BorrowPage },
  { path: '/pengembalian', name: 'PengembalianBarang', component:ScanBarcodeReturn },
  { path: '/choose-action', name: 'ChooseAction', component: ChooseActionPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
