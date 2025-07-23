<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-xl font-bold mb-4">Setting Akses</h2>
    <input
      v-model="secretId"
      placeholder="Masukkan Secret ID"
      class="w-full px-4 py-2 border rounded mb-4"
    />
    <button @click="submitSecret" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Simpan Secret ID
    </button>
    <p class="mt-2 text-sm text-gray-600">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '../services/api'
import { encrypt } from '@/utils/secureStorage' // ✅ import enkripsi

const secretId = ref('')
const message = ref('')

const submitSecret = async () => {
  try {
    const res = await axios.get('/validate-secret', {
      params: { secret_id: secretId.value }
    })

    if (res.data.valid) {
      // ✅ Simpan terenkripsi ke localStorage
      const encryptedSecret = encrypt(secretId.value)
      localStorage.setItem('secret_id', encryptedSecret)

      message.value = 'Secret ID valid. Fitur lengkap diaktifkan.'
    } else {
      message.value = 'Secret ID tidak valid.'
    }
  } catch (e) {
    message.value = 'Secret ID tidak valid.'
  }
}
</script>
