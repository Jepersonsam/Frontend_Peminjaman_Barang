<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-500 via-white to-indigo-500 flex items-center justify-center px-4 py-8"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div
        class="absolute inset-0"
        style="
          background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%234F46E5\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
        "
      ></div>
    </div>

    <div
      class="relative z-10 bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center animate-fade-in border border-gray-100"
    >
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex justify-center mb-6">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full shadow-xl animate-pulse-subtle"
          >
            <svg
              class="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 16h4.01M16 12h4.01"
              />
              <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="2"
                ry="2"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
              />
            </svg>
          </div>
        </div>

        <h1
          class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
        >
          Scan QR Code
        </h1>

        <div class="space-y-2">
          <p class="text-gray-600 text-lg">Sistem Inventaris Digital</p>
          <div
            class="flex items-center justify-center space-x-2 text-sm text-gray-500"
          >
            <svg
              class="w-4 h-4"
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
            <span>Arahkan kamera ke QRcode pengguna</span>
          </div>
        </div>
      </div>

      <!-- Scanner Section -->
      <div class="mb-8">
        <div class="relative">
          <!-- Scanner Frame -->
          <div
            class="relative border-4 border-gradient-to-r from-blue-400 to-purple-500 rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
          >
            <qrcode-stream
              @decode="onDecode"
              @init="onInit"
              class="w-full h-80 bg-black rounded-xl"
            />

            <!-- Scanner Overlay -->
            <div class="absolute inset-0 pointer-events-none">
              <!-- Corner Brackets -->
              <div
                class="absolute top-4 left-4 w-6 h-6 border-l-4 border-t-4 border-white rounded-tl-lg animate-pulse"
              ></div>
              <div
                class="absolute top-4 right-4 w-6 h-6 border-r-4 border-t-4 border-white rounded-tr-lg animate-pulse"
              ></div>
              <div
                class="absolute bottom-4 left-4 w-6 h-6 border-l-4 border-b-4 border-white rounded-bl-lg animate-pulse"
              ></div>
              <div
                class="absolute bottom-4 right-4 w-6 h-6 border-r-4 border-b-4 border-white rounded-br-lg animate-pulse"
              ></div>

              <!-- Scanning Line -->
              <div
                class="absolute inset-x-0 top-1/2 transform -translate-y-1/2"
              >
                <div
                  class="h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-scan-line shadow-lg shadow-green-400/50"
                ></div>
              </div>

              <!-- Center Target -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div
                  class="w-32 h-32 border-2 border-white border-dashed rounded-xl opacity-30 animate-pulse-slow"
                ></div>
              </div>
            </div>
          </div>

          <!-- Scanner Status -->
          <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
            <div
              class="bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200 flex items-center space-x-2"
            >
              <div
                class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
              ></div>
              <span class="text-sm font-medium text-gray-700"
                >Ready to Scan</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div
        class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-100"
      >
        <div class="flex items-start space-x-4">
          <div class="bg-blue-100 rounded-full p-2 flex-shrink-0">
            <svg
              class="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <div class="text-left">
            <h3 class="font-semibold text-gray-800 mb-2">Cara Menggunakan:</h3>
            <ul class="text-sm text-gray-600 space-y-1">
              <li class="flex items-center">
                <span class="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                Posisikan QR Code di dalam frame
              </li>
              <li class="flex items-center">
                <span class="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                Pastikan pencahayaan cukup terang
              </li>
              <li class="flex items-center">
                <span class="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                Tunggu hingga QR Code terbaca otomatis
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mb-6">
        <div
          class="bg-red-50 border-l-4 border-red-400 rounded-xl p-4 animate-shake"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="w-6 h-6 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-red-800 font-medium">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Indicator -->
      <div v-if="isScanning" class="mb-6">
        <div class="bg-green-50 border-l-4 border-green-400 rounded-xl p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="w-6 h-6 text-green-400 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-green-800 font-medium">Memproses barcode...</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="notification"
      :class="[
        'fixed top-8 right-8 z-50 max-w-md w-full transform transition-all duration-300 ease-in-out',
        notification.show
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0',
      ]"
    >
      <div
        :class="[
          'rounded-2xl shadow-2xl p-6 border-l-4',
          {
            'bg-red-50 border-red-400': notification.type === 'error',
            'bg-yellow-50 border-yellow-400': notification.type === 'warning',
            'bg-green-50 border-green-400': notification.type === 'success',
            'bg-blue-50 border-blue-400': notification.type === 'info',
          },
        ]"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <!-- Error Icon -->
            <svg
              v-if="notification.type === 'error'"
              class="w-7 h-7 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>

            <!-- Warning Icon -->
            <svg
              v-if="notification.type === 'warning'"
              class="w-7 h-7 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>

            <!-- Success Icon -->
            <svg
              v-if="notification.type === 'success'"
              class="w-7 h-7 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <!-- Info Icon -->
            <svg
              v-if="notification.type === 'info'"
              class="w-7 h-7 text-blue-400"
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

          <div class="ml-4 flex-1">
            <h4
              :class="[
                'text-lg font-bold mb-1',
                {
                  'text-red-800': notification.type === 'error',
                  'text-yellow-800': notification.type === 'warning',
                  'text-green-800': notification.type === 'success',
                  'text-blue-800': notification.type === 'info',
                },
              ]"
            >
              {{ notification.title }}
            </h4>
            <p
              :class="[
                'text-sm leading-relaxed',
                {
                  'text-red-700': notification.type === 'error',
                  'text-yellow-700': notification.type === 'warning',
                  'text-green-700': notification.type === 'success',
                  'text-blue-700': notification.type === 'info',
                },
              ]"
            >
              {{ notification.message }}
            </p>
          </div>

          <button
            @click="notification.show = false"
            :class="[
              'ml-4 flex-shrink-0 rounded-full p-1.5 hover:bg-opacity-20 transition-colors',
              {
                'hover:bg-red-500': notification.type === 'error',
                'hover:bg-yellow-500': notification.type === 'warning',
                'hover:bg-green-500': notification.type === 'success',
                'hover:bg-blue-500': notification.type === 'info',
              },
            ]"
          >
            <svg
              class="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { QrcodeStream } from "vue-qrcode-reader";
import axios from "@/services/api";

const error = ref("");
const isScanning = ref(false);
const showManualInput = ref(false);
const manualCode = ref("");
const notification = ref(null);
const router = useRouter();

const showNotification = (type, title, message, duration = 4000) => {
  notification.value = { type, title, message, show: true };

  setTimeout(() => {
    if (notification.value) {
      notification.value.show = false;
      setTimeout(() => {
        notification.value = null;
      }, 300);
    }
  }, duration);
};

const onDecode = async (code) => {
  const extractLastSegment = (input) => {
    try {
      const parts = input.trim().split("/");
      return parts[parts.length - 1];
    } catch {
      return input;
    }
  };

  await handleCode(extractLastSegment(code));
};

const handleCode = async (code) => {
  error.value = "";
  isScanning.value = true;

  const trimmedCode = code?.trim();
  if (!trimmedCode) {
    showNotification(
      "error",
      "Gagal Membaca",
      "Barcode tidak dapat dibaca. Silakan posisikan kamera dengan benar dan coba lagi."
    );
    isScanning.value = false;
    return;
  }

  try {
    // Add delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await axios.get(`/users/by-code/${trimmedCode}`);
    if (res.data && res.data.data) {
      showNotification(
        "success",
        "Berhasil!",
        `Pengguna ditemukan: ${res.data.data.name}`,
        2000
      );

      // Delay before navigation to show success message
      setTimeout(() => {
        router.push({ name: "ChooseAction", query: { code: trimmedCode } });
      }, 1500);
    } else {
      showNotification(
        "warning",
        "Kode Tidak Dikenali",
        "Barcode ini bukan milik pengguna yang terdaftar. Pastikan Anda memindai barcode pengguna, bukan barcode barang."
      );
    }
  } catch (err) {
    console.error(err);

    // Different error messages based on status code
    if (err.response?.status === 404) {
      showNotification(
        "error",
        "Pengguna Tidak Ditemukan",
        "Barcode ini bukan milik pengguna yang terdaftar dalam sistem. Silakan hubungi administrator untuk bantuan."
      );
    } else if (err.response?.status >= 500) {
      showNotification(
        "error",
        "Server Error",
        "Terjadi kesalahan pada server. Silakan coba lagi dalam beberapa saat."
      );
    } else {
      showNotification(
        "error",
        "Barcode Tidak Valid",
        "Ini bukan barcode pengguna yang valid. Pastikan Anda memindai barcode ID pengguna, bukan barcode barang atau dokumen lain."
      );
    }
  } finally {
    isScanning.value = false;
  }
};

const handleManualSubmit = async () => {
  await handleCode(manualCode.value);
  showManualInput.value = false;
  manualCode.value = "";
};

const onInit = (promise) => {
  promise.catch((err) => {
    console.error(err);
    showNotification(
      "error",
      "Kamera Tidak Tersedia",
      "Tidak dapat mengakses kamera. Pastikan browser memiliki izin akses kamera dan perangkat kamera berfungsi dengan baik."
    );
  });
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

@keyframes scan-line {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
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

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-scan-line {
  animation: scan-line 2s linear infinite;
}

.animate-pulse-subtle {
  animation: pulse-subtle 3s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* Custom gradient border effect */
.border-gradient-to-r {
  border-image: linear-gradient(to right, #60a5fa, #a855f7) 1;
}
</style>
