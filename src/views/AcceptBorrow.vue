<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 via-white to-indigo-500 flex flex-col items-center justify-center p-6 relative">
    <!-- Header -->
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
        <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2" />
        </svg>
      </div>
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Persetujuan Peminjaman Barang</h1>
      <p class="text-lg text-gray-600">Semua peminjaman barang oleh Anda</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-gray-700 font-semibold text-lg">
      ⏳ Memuat data...
    </div>

    <!-- Daftar Peminjaman -->
    <div v-else-if="borrowings.length" class="grid grid-cols-1 gap-6 max-w-4xl w-full">
      <div
        v-for="b in borrowings"
        :key="b.id"
        class="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition"
      >
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-bold text-gray-800">{{ b.item.name }}</h3>
          <span
            class="text-xs px-2 py-1 rounded-full font-semibold capitalize"
            :class="{
              'bg-yellow-100 text-yellow-800': b.approval_status === 'pending',
              'bg-green-100 text-green-800': b.approval_status === 'approved',
              'bg-red-100 text-red-800': b.approval_status === 'rejected',
            }"
          >
            {{ b.approval_status }}
          </span>
        </div>
        <p class="text-sm text-gray-500 mb-2">Serial: {{ b.item.serial_code }}</p>
        <p class="text-sm text-gray-600">Tgl Pinjam: {{ b.borrow_date }}</p>
        <p class="text-sm text-gray-600 mb-2">Tgl Kembali: {{ b.return_date }}</p>
        <div class="flex items-center gap-3 mt-2">
          <div class="w-8 h-8 bg-blue-100 text-blue-700 font-bold rounded-full flex items-center justify-center">
            {{ getInitials(b.user.name) }}
          </div>
          <div class="text-sm text-gray-700">
            {{ b.user.name }} ({{ b.user.code }})
          </div>
        </div>
      </div>
    </div>

    <!-- Tidak Ada Peminjaman -->
    <div v-else class="text-center text-white mt-10">
      <p class="text-lg font-semibold">✅ Tidak ada data peminjaman ditemukan.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../services/api'

const borrowings = ref([])
const user = ref({})
const loading = ref(true)

const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
}

const loadUserBorrowings = async () => {
  try {
    if (!user.value?.id) {
      console.warn('⏳ User belum siap, hentikan loadUserBorrowings')
      return
    }

    loading.value = true
    console.log(`🔍 Ambil data peminjaman untuk user ID: ${user.value.id}`)

    const res = await axios.get(`/borrowings/user/${user.value.id}`)
    borrowings.value = res.data.data || []
    console.log('✅ Data peminjaman user:', borrowings.value)
  } catch (err) {
    console.error('❌ Gagal load data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  getUserFromLocalStorage()
  if (user.value?.id) {
    await loadUserBorrowings()
  } else {
    console.error('❌ User tidak ditemukan di localStorage')
  }
})

const getInitials = (name) => {
  return name?.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase() || '??'
}
</script>
