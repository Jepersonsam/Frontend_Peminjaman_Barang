<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden"
  >
    <!-- Decorative Shapes -->
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <div
        class="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
      ></div>
      <div
        class="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
      ></div>
    </div>

    <div class="relative z-10 w-full max-w-2xl flex flex-col items-center">
      <!-- Header -->
      <div class="w-full flex justify-between items-center mb-6">
        <button
          @click="exitToChooseAction"
          class="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur text-slate-600 hover:text-blue-600 font-bold rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <svg
            class="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span class="hidden sm:inline">Kembali ke Menu</span>
        </button>
      </div>

      <div class="text-center mb-8">
        <h1
          class="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2 tracking-tight"
        >
          Pengembalian Barang
        </h1>
        <p class="text-base md:text-lg text-slate-600 font-medium">
          Scan QR code pada barang untuk mengembalikannya
        </p>
      </div>

      <!-- Scanner Card -->
      <div
        class="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 border border-white/50 w-full relative overflow-hidden"
      >
        <!-- Camera View -->
        <div
          class="relative rounded-2xl overflow-hidden bg-slate-900 shadow-inner aspect-square sm:aspect-[4/3]"
        >
          <qrcode-stream
            :key="scannerKey"
            @decode="onDecode"
            @init="onInit"
            class="w-full h-full object-cover"
          >
            <!-- Custom Overlay -->
            <div
              class="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                class="w-64 h-64 border-2 border-white/30 rounded-3xl relative"
              >
                <!-- Corners -->
                <div
                  class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl"
                ></div>
                <div
                  class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl"
                ></div>
                <div
                  class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl"
                ></div>
                <div
                  class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-xl"
                ></div>

                <!-- Scanning Animation -->
                <div
                  class="absolute top-0 left-0 w-full h-0.5 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-scan"
                ></div>
              </div>
            </div>
          </qrcode-stream>
        </div>

        <!-- Manual Input -->
        <div class="mt-8">
          <div class="relative flex items-center">
            <input
              v-model="manualCode"
              type="text"
              placeholder="Atau masukkan kode manual..."
              class="w-full pl-6 pr-32 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-slate-700"
              @keyup.enter="submitManualCode"
            />
            <button
              @click="submitManualCode"
              class="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification (Custom) -->
    <Transition name="toast">
      <div
        v-if="notification && notification.show"
        class="fixed top-6 right-6 z-50 max-w-sm w-full bg-white rounded-2xl shadow-2xl p-4 border-l-4 flex items-start gap-3 backdrop-blur-sm"
        :class="{
          'border-emerald-500': notification.type === 'success',
          'border-rose-500': notification.type === 'error',
          'border-amber-500': notification.type === 'warning',
        }"
      >
        <div class="shrink-0 pt-0.5">
          <svg
            v-if="notification.type === 'success'"
            class="w-6 h-6 text-emerald-500"
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
          <svg
            v-if="notification.type === 'error'"
            class="w-6 h-6 text-rose-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            v-if="notification.type === 'warning'"
            class="w-6 h-6 text-amber-500"
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
        <div class="flex-1">
          <h4 class="font-bold text-slate-800 text-sm">
            {{ notification.title }}
          </h4>
          <p class="text-slate-600 text-sm mt-1">{{ notification.message }}</p>
        </div>
        <button
          @click="hideNotification"
          class="text-slate-400 hover:text-slate-600"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </Transition>

    <!-- Success Modal -->
    <Transition name="fade">
      <div
        v-if="showSuccessModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          @click="closeSuccessModal"
        ></div>
        <div
          class="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 text-center shadow-2xl transform transition-all scale-100"
        >
          <div
            class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-50"
          >
            <svg
              class="w-10 h-10 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-slate-800 mb-2">
            Pengembalian Berhasil!
          </h3>
          <p class="text-slate-600 mb-8">
            Barang
            <strong class="text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{{
              returnedItemName
            }}</strong>
            telah tercatat dikembalikan.
          </p>

          <div class="flex flex-col gap-3">
            <button
              @click="closeSuccessModal"
              class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-0.5"
            >
              Scan Barang Lain
            </button>
            <button
              @click="exitToScanPage"
              class="w-full py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all"
            >
              Selesai & Keluar
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import axios from "@/services/api";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// Ambil user_code dari store atau query param
const userCode =
  userStore.code || userStore.code_nfc || route.query.code?.trim();

const manualCode = ref("");
const notification = ref(null);
const isScanning = ref(false);
const scannerKey = ref(0);
const showSuccessModal = ref(false);
const returnedItemName = ref("");

const audioSuccess = new Audio("/sounds/success-beep.mp3");
const playBeep = () => {
  try {
    audioSuccess.play();
  } catch (e) {
    console.warn("Gagal memutar audio:", e);
  }
};

const showNotification = (type, title, message) => {
  notification.value = { type, title, message, show: false };
  setTimeout(() => (notification.value.show = true), 100);
  setTimeout(() => hideNotification(), 5000);
};

const hideNotification = () => {
  if (notification.value) {
    notification.value.show = false;
    setTimeout(() => (notification.value = null), 300);
  }
};

const exitToScanPage = () => {
  localStorage.removeItem("user_code"); // Hapus kode dari barcode
  localStorage.removeItem("user_code_nfc"); // Hapus kode dari NFC
  localStorage.removeItem("user_data"); // Hapus data user lengkap
  router.push({ name: "Scan" });
};

const exitToChooseAction = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  router.push({ name: "ChooseAction" });
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  returnedItemName.value = "";
  manualCode.value = "";
  scannerKey.value += 1;
};

const onDecode = async (serialCode) => {
  await handleReturn(serialCode);
};

const submitManualCode = async () => {
  if (!manualCode.value.trim()) {
    return showNotification(
      "warning",
      "Kode Kosong",
      "Silakan masukkan kode barang.",
    );
  }
  await handleReturn(manualCode.value);
};

const handleReturn = async (code) => {
  isScanning.value = true;
  hideNotification();

  if (!userCode) {
    showNotification(
      "error",
      "Sesi Tidak Valid",
      "Data pengguna tidak ditemukan. Silakan scan ulang kartu Anda.",
    );
    isScanning.value = false;
    return;
  }

  try {
    const res = await axios.post("/public/return-item", {
      serial_code: code.trim(),
      user_code: userCode,
    });

    const itemName =
      res.data?.data?.borrowing?.item?.name ?? res.data?.data?.item?.name;

    if (itemName) {
      returnedItemName.value = itemName;
      showSuccessModal.value = true;
      playBeep();
    } else {
      showNotification(
        "error",
        "Data Tidak Lengkap",
        "Response dari server tidak memuat nama barang.",
      );
    }
  } catch (err) {
    if (err.response?.status === 404) {
      showNotification(
        "error",
        "Barang Tidak Ditemukan",
        "Kode atau barcode tidak valid.",
      );
    } else if (err.response?.status === 400) {
      showNotification(
        "warning",
        "Barang Sudah Dikembalikan",
        "Barang sudah dikembalikan sebelumnya.",
      );
    } else if (err.response?.status === 403) {
      showNotification(
        "error",
        "Akses Ditolak",
        "Anda bukan peminjam barang ini. Hanya peminjam yang dapat mengembalikan.",
      );
    } else if (err.response?.status === 422) {
      showNotification(
        "error",
        "Data Tidak Valid",
        "Kode pengguna tidak ditemukan. Silakan scan ulang kartu Anda.",
      );
    } else {
      showNotification(
        "error",
        "Kesalahan Sistem",
        "Terjadi kesalahan. Silakan coba lagi.",
      );
    }
    console.error("Gagal mengembalikan barang:", err);
  } finally {
    isScanning.value = false;
  }
};

const onInit = (promise) => {
  promise.catch((err) => {
    showNotification(
      "error",
      "Kamera Tidak Aktif",
      "Pastikan izin kamera sudah diberikan.",
    );
    console.error("Init scanner gagal:", err);
  });
};
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}

@keyframes scan {
  0% {
    top: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}
.animate-scan {
  animation: scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

/* Toast Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Fade Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>