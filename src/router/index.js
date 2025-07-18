import { createRouter, createWebHistory } from 'vue-router'
import ScanPage from '@/views/ScanPage.vue'
import BorrowPage from '@/views/BorrowPage.vue'
import ScanBarcodeReturn from '@/views/ScanBarcodeReturn.vue'
import ChooseActionPage from '@/views/ChooseActionPage.vue'
import RoomLoanPage from '@/views/RoomLoanPage.vue' // ✅ sudah benar
import SettingPage from '@/views/SettingPage.vue'
import NFCScanner from '../views/NFCScanner.vue'
import AcceptBorrow from '@/views/AcceptBorrow.vue' // ✅ sudah benar

const routes = [
  { path: '/', name: 'Scan', component: ScanPage },
  { path: '/borrow', name: 'Borrow', component: BorrowPage },
  { path: '/pengembalian', name: 'PengembalianBarang', component: ScanBarcodeReturn },
  { path: '/choose-action', name: 'ChooseAction', component: ChooseActionPage },
  { path: '/room-loan', name: 'RoomLoan', component: RoomLoanPage },
  { path: '/accept-borrow', name: 'AcceptBorrow', component: AcceptBorrow }, // ✅ sudah benar
  { path: '/setting', name: 'Setting', component: SettingPage },
  {
  path: '/scan-nfc',
  name: 'NFCScanner',
  component: NFCScanner
},
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
