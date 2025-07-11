<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-white to-indigo-500 px-6 py-10"
  >
    <div
      class="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-md w-full p-8 text-center animate-fade-in"
    >
      <!-- Header -->
      <div class="mb-6">
        <div
          class="bg-indigo-100 p-4 rounded-full inline-block mb-4 animate-pulse-subtle"
        >
          <svg
            class="w-10 h-10 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Scan NFC ID Card</h2>
        <p class="text-sm text-gray-600">
          Tap kartu Anda di bagian belakang perangkat untuk mulai.
        </p>
      </div>

      <!-- Error -->
      <div
        v-if="error"
        class="bg-red-50 border-l-4 border-red-400 rounded-xl p-4 mb-4 animate-shake"
      >
        <p class="text-red-800 font-medium">{{ error }}</p>
      </div>

      <!-- Notification -->
      <div
        v-if="notification"
        class="bg-green-50 border-l-4 border-green-400 rounded-xl p-4 mb-4"
      >
        <p class="text-green-800 font-medium">{{ notification }}</p>
      </div>

      <!-- Scan Button -->
      <button
        @click="startScan"
        :disabled="scanning"
        class="mt-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {{ scanning ? "Menunggu Tap..." : "Mulai Scan NFC" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/services/api";

const error = ref("");
const notification = ref("");
const scanning = ref(false);
const router = useRouter();

// 🔍 Validasi kode NFC langsung ke API
const handleCode = async (code) => {
  scanning.value = true;
  try {
    const trimmedCode = code.trim();
    if (!trimmedCode) {
      notification.value = "Kode NFC kosong atau tidak terbaca.";
      return;
    }

    const res = await axios.get(`/users/by-code/${trimmedCode}`);
    if (res.data?.data) {
      localStorage.setItem("user_code", trimmedCode);
      notification.value = `Pengguna ditemukan: ${res.data.data.name}`;
      // ⏩ Navigasi ke halaman aksi
      setTimeout(() => {
        router.push({ name: "ChooseAction", query: { code: trimmedCode } });
      }, 1500);
    } else {
      notification.value = "Kode NFC tidak dikenali dalam sistem.";
    }
  } catch (err) {
    error.value = "Gagal terhubung ke API. Coba lagi nanti.";
    console.error(err);
  } finally {
    scanning.value = false;
  }
};

// 🛸 Inisialisasi NFC Scan
const startScan = async () => {
  error.value = "";
  notification.value = "";

  if (!("NDEFReader" in window)) {
    error.value = "NFC tidak tersedia di perangkat ini.";
    return;
  }

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    scanning.value = true;
    notification.value = "Silakan tap kartu ID...";

    ndef.onreading = async (event) => {
      const decoder = new TextDecoder();
      for (const record of event.message.records) {
        if (record.recordType === "text") {
          const scannedCode = decoder.decode(record.data).trim();
          await handleCode(scannedCode);
        }
      }
    };
  } catch (err) {
    error.value = "Gagal membaca NFC. Pastikan NFC aktif dan coba lagi.";
    scanning.value = false;
  }
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pulse-subtle {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}
.animate-pulse-subtle {
  animation: pulse-subtle 3s ease-in-out infinite;
}
.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>
