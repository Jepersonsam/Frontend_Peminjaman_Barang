import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import ScanPage from '@/views/ScanPage.vue'
import BorrowPage from '@/views/BorrowPage.vue'
import ChooseActionPage from '@/views/ChooseActionPage.vue'
import RoomLoanPage from '@/views/RoomLoanPage.vue' // ✅ sudah benar
import SettingPage from '@/views/SettingPage.vue'
import NFCScanner from '../views/NFCScanner.vue'
import AcceptBorrow from '@/views/AcceptBorrow.vue' // ✅ sudah benar

const routes = [
  { path: '/', name: 'Scan', component: ScanPage },
  { path: '/borrow', name: 'Borrow', component: BorrowPage },
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

// Route Protection (Navigation Guard)
router.beforeEach((to, from, next) => {
  // Daftar URL yang BOLEH diakses meskipun belum login/scan
  const publicPages = ['/', '/scan-nfc', '/setting']
  
  // Apakah rute yang dituju butuh login?
  const authRequired = !publicPages.includes(to.path)

  if (authRequired) {
    // Insialisasi store di DALAM guard setelah pinia aktif
    const userStore = useUserStore()

    // Jika store tidak punya kode user / kode nfc (berarti belum login)
    if (!userStore.code && !userStore.code_nfc) {
      // Tendang kembali ke halaman utama "/"
      return next('/')
    }
  }

  // Jika aman (sudah login / menuju halaman public), izinkan lewat
  next()
})

export default router
