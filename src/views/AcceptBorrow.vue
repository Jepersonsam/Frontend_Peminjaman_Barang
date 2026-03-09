<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden"
  >
    <!-- Decorative Shapes -->
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <div
        class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
      ></div>
      <div
        class="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
      ></div>
    </div>

    <div class="relative z-10 w-full max-w-4xl flex flex-col items-center">
      <!-- Button Kembali -->
      <div class="w-full flex justify-start mb-2">
        <button
          @click="goBack"
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

      <!-- Header -->
      <div class="text-center mb-8 w-full">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-white shadow-lg rounded-2xl mb-4 transform rotate-3 hover:rotate-0 transition-transform duration-300 ring-4 ring-white/50"
        >
          <svg
            class="w-8 h-8 text-blue-600"
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
        <h1
          class="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2 tracking-tight"
        >
          Status Peminjaman
        </h1>
        <p class="text-base md:text-lg text-slate-600 font-medium">
          Pantau riwayat dan status persetujuan barang yang Anda pinjam
        </p>
        <!-- Live Polling Indicator -->
        <div
          class="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
            ></span>
          </span>
          <span
            class="text-xs font-bold text-emerald-700 uppercase tracking-widest"
            >Live</span
          >
          <span class="text-xs text-slate-400 font-medium" v-if="lastUpdated">
            &bull; Diperbarui {{ lastUpdated }}
          </span>
          <svg
            v-if="isPolling"
            class="w-3.5 h-3.5 text-emerald-500 animate-spin ml-0.5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-12 bg-white/40 backdrop-blur-md rounded-3xl w-full max-w-md"
      >
        <div
          class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"
        ></div>
        <p class="text-slate-600 font-medium animate-pulse">
          Sedang memuat data...
        </p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!paginatedBorrowings.length"
        class="bg-white/80 backdrop-blur-md rounded-3xl p-10 text-center shadow-xl border border-white/60 max-w-lg w-full"
      >
        <div
          class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
        >
          <svg
            class="w-10 h-10 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">
          Belum Ada Peminjaman
        </h3>
        <p class="text-slate-500 mb-6 text-sm">
          Anda belum melakukan peminjaman barang apapun saat ini.
        </p>
        <button
          @click="goBack"
          class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Pinjam Barang Sekarang
        </button>
      </div>

      <!-- List View -->
      <div v-else class="w-full space-y-4 pb-24">
        <div
          v-for="b in paginatedBorrowings"
          :key="b.id"
          class="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
        >
          <!-- Colored Status Border -->
          <div
            class="absolute left-0 top-0 bottom-0 w-1.5"
            :class="{
              'bg-amber-400': b.approval_status === 'pending',
              'bg-emerald-500': b.approval_status === 'approved',
              'bg-rose-500': b.approval_status === 'rejected',
            }"
          ></div>

          <div
            class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pl-3"
          >
            <!-- Item Info -->
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-3 mb-2">
                <h3
                  class="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors"
                >
                  {{ b.item.name }}
                </h3>
                <span
                  class="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border shadow-sm"
                  :class="{
                    'bg-amber-50 text-amber-700 border-amber-200':
                      b.approval_status === 'pending',
                    'bg-emerald-50 text-emerald-700 border-emerald-200':
                      b.approval_status === 'approved',
                    'bg-rose-50 text-rose-700 border-rose-200':
                      b.approval_status === 'rejected',
                  }"
                >
                  {{ b.approval_status }}
                </span>
              </div>

              <div class="flex items-center gap-2 mb-4">
                <span
                  class="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-mono border border-slate-200"
                >
                  #{{ b.item.serial_code }}
                </span>
              </div>

              <!-- Dates Grid -->
              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm max-w-md"
              >
                <div
                  class="flex items-center gap-3 text-slate-700 bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-100"
                >
                  <div
                    class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div class="flex flex-col">
                    <span
                      class="text-[10px] text-slate-400 font-bold uppercase tracking-wider"
                      >Tgl Pinjam</span
                    >
                    <span class="font-semibold">{{ b.borrow_date }}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-3 text-slate-700 bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-100"
                >
                  <div
                    class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0"
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div class="flex flex-col">
                    <span
                      class="text-[10px] text-slate-400 font-bold uppercase tracking-wider"
                      >Tgl Kembali</span
                    >
                    <span class="font-semibold">{{ b.return_date }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- User Info (Responsive) -->
            <div
              class="flex items-center md:flex-col md:items-end gap-3 md:gap-1 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100"
            >
              <div
                class="flex items-center gap-3 bg-slate-50 md:bg-transparent p-2 md:p-0 rounded-lg w-full md:w-auto"
              >
                <div
                  class="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold shadow-md ring-2 ring-white"
                >
                  {{ getInitials(b.user.name) }}
                </div>
                <div class="text-left md:text-right">
                  <div class="text-sm font-bold text-slate-800 line-clamp-1">
                    {{ b.user.name }}
                  </div>
                  <div class="text-xs text-indigo-500 font-mono font-medium">
                    {{ b.user.code }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 bg-white/60 p-4 rounded-2xl backdrop-blur-md border border-white/50 shadow-sm"
        >
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 text-sm font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Prev
          </button>

          <span class="text-slate-600 text-sm font-medium">
            Halaman
            <span class="text-slate-900 font-bold">{{ currentPage }}</span> dari
            <span class="text-slate-900 font-bold">{{ totalPages }}</span>
          </span>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 text-sm font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            Next
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "../services/api";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();
const borrowings = ref([]);
const loading = ref(true);
const isPolling = ref(false);
const lastUpdated = ref("");
let pollingInterval = null;
const POLL_INTERVAL_MS = 5000; // 5 detik

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

// Pagination
const currentPage = ref(1);
const perPage = ref(5);

const totalPages = computed(() =>
  Math.ceil(borrowings.value.length / perPage.value),
);

const paginatedBorrowings = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return borrowings.value.slice(start, start + perPage.value);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const goBack = () => {
  router.push("/choose-action");
};

const loadUserBorrowings = async (silent = false) => {
  try {
    if (!userStore.code && !userStore.code_nfc) {
      console.warn("⏳ User belum siap, hentikan loadUserBorrowings");
      return;
    }

    // Hanya tampilkan loading spinner pada fetch pertama (bukan polling)
    if (!silent) loading.value = true;
    isPolling.value = silent;

    let endpoint = userStore.code_nfc
      ? `/public/borrowings/by-nfc/${userStore.code_nfc}`
      : `/public/borrowings/by-code/${encodeURIComponent(userStore.code)}`;

    const res = await axios.get(endpoint);
    borrowings.value = res.data.data || [];
    lastUpdated.value = formatTime();
    console.log("✅ Data peminjaman user:", borrowings.value);
  } catch (err) {
    console.error("❌ Gagal load data:", err);
  } finally {
    if (!silent) loading.value = false;
    isPolling.value = false;
  }
};

const startPolling = () => {
  pollingInterval = setInterval(async () => {
    await loadUserBorrowings(true); // silent = true → tidak reset loading
  }, POLL_INTERVAL_MS);
};

onMounted(async () => {
  if (userStore.code || userStore.code_nfc) {
    await loadUserBorrowings();
    startPolling(); // mulai polling setelah data pertama berhasil dimuat
  } else {
    console.error("❌ User belum ada di Pinia");
  }
});

onUnmounted(() => {
  // Bersihkan interval saat komponen di-destroy (pindah halaman)
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
});

const getInitials = (name) => {
  return (
    name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "??"
  );
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
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
