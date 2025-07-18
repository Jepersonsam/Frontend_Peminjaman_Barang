<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-500 via-white to-indigo-500 flex flex-col items-center justify-center p-6"
  >
    <!-- Tombol Kembali -->
    <div class="w-full max-w-4xl flex justify-between items-start mb-8">
      <button
        @click="exitToChooseAction"
        class="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-sm"
      >
        <svg
          class="w-5 h-5 mr-2"
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
        Kembali ke Menu
      </button>
    </div>

    <!-- Judul dan Deskripsi -->
    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
      >
        <svg
          class="w-10 h-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
          />
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Pengembalian Barang</h1>
      <p class="text-lg text-gray-600 max-w-md">
        Scan QR code barang yang ingin dikembalikan
      </p>
    </div>

    <!-- Kartu Scanner -->
    <div
      class="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200 w-full max-w-2xl"
    >
      <!-- QR Scanner -->
      <div class="relative">
        <div
          class="bg-gray-50 rounded-2xl p-6 border-4 border-dashed border-gray-300"
        >
          <qrcode-stream
            :key="scannerKey"
            @decode="onDecode"
            @init="onInit"
            class="w-full h-[400px] bg-black rounded-xl overflow-hidden"
          />
          <div
            class="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              class="w-72 h-72 border-4 border-green-500 rounded-xl relative"
            >
              <div
                class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-lg"
              ></div>
              <div
                class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-lg"
              ></div>
              <div
                class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-lg"
              ></div>
              <div
                class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-lg"
              ></div>
              <div
                class="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Manual -->
      <div class="mt-8">
        <label class="block text-lg font-semibold text-gray-700 mb-2"
          >Masukkan Kode Barang Secara Manual</label
        >
        <div class="flex space-x-4">
          <input
            v-model="manualCode"
            type="text"
            placeholder="Contoh: LT12345"
            class="flex-1 text-xl px-6 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400"
          />
          <button
            @click="submitManualCode"
            class="text-xl bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition duration-200"
          >
            Kirim
          </button>
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
          </div>
          <div class="ml-4 flex-1">
            <h4
              :class="[
                'text-lg font-bold mb-1',
                {
                  'text-green-800': notification.type === 'success',
                  'text-red-800': notification.type === 'error',
                },
              ]"
            >
              {{ notification.title }}
            </h4>
            <p
              :class="[
                'text-sm',
                {
                  'text-green-700': notification.type === 'success',
                  'text-red-700': notification.type === 'error',
                },
              ]"
            >
              {{ notification.message }}
            </p>
          </div>
          <button
            @click="hideNotification"
            class="ml-4 p-2 rounded-full hover:bg-gray-200 transition"
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

    <!-- Modal Sukses -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6"
      @click="closeSuccessModal"
    >
      <div class="bg-white rounded-3xl p-8 max-w-md w-full" @click.stop>
        <div class="text-center mb-6">
          <div
            class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce"
          >
            <svg
              class="w-10 h-10 text-green-600"
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
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">
            Terima Kasih! 🎉
          </h3>
          <p class="text-gray-600 mb-4">
            Barang
            <span class="font-semibold text-green-700"
              >"{{ returnedItemName }}"</span
            >
            berhasil dikembalikan.
          </p>
        </div>
        <div class="flex space-x-3">
          <button
            @click="closeSuccessModal"
            class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl"
          >
            Scan Barang Lain
          </button>
          <button
            @click="exitToScanPage"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl"
          >
            Keluar dari Sistem
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import { useRouter } from "vue-router";
import axios from "@/services/api";

const router = useRouter();

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
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
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
      "Silakan masukkan kode barang."
    );
  }
  await handleReturn(manualCode.value);
};

const handleReturn = async (code) => {
  isScanning.value = true;
  hideNotification();

  try {
    const res = await axios.post("/public/return-item", {
      serial_code: code.trim(),
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
        "Response dari server tidak memuat nama barang."
      );
    }
  } catch (err) {
    if (err.response?.status === 404) {
      showNotification(
        "error",
        "Barang Tidak Ditemukan",
        "Kode atau barcode tidak valid."
      );
    } else if (err.response?.status === 400) {
      showNotification(
        "warning",
        "Barang Sudah Dikembalikan",
        "Barang sudah dikembalikan sebelumnya."
      );
    } else {
      showNotification(
        "error",
        "Kesalahan Sistem",
        "Terjadi kesalahan. Silakan coba lagi."
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
      "Pastikan izin kamera sudah diberikan."
    );
    console.error("Init scanner gagal:", err);
  });
};
</script>
