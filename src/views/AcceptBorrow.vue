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
      <p class="text-lg text-gray-600">Barang yang sedang menunggu persetujuan admin</p>
    </div>

    <!-- Daftar Persetujuan -->
    <div v-if="borrowings.length" class="grid grid-cols-1  gap-6 max-w-4xl w-full">
      <div v-for="b in borrowings" :key="b.id" class="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition">
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

    <!-- Tidak Ada Persetujuan -->
    <div v-else class="text-center text-white mt-10">
      <p class="text-lg font-semibold">✅ Semua permintaan telah diproses. Tidak ada yang menunggu.</p>
    </div>

    <!-- Dekoratif -->
    <div class="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
    <div class="absolute top-1/2 left-5 w-12 h-12 bg-indigo-100 rounded-full opacity-30 animate-bounce"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../services/api'

const borrowings = ref([])

const loadPendingApprovals = async () => {
  try {
    const res = await axios.get('/borrowings?approval_status=pending')
    borrowings.value = res.data.data.filter(b => b.item?.is_approval)
  } catch (err) {
    console.error('Gagal load data persetujuan:', err)
  }
}

const getInitials = (name) => {
  return name?.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase() || '??'
}

onMounted(loadPendingApprovals)
</script>