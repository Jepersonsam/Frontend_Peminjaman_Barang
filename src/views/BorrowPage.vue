<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-500 via-white to-indigo-500 py-8 px-4"
  >
    <!-- Header Card -->
    <div class="max-w-5xl mx-auto mb-8">
      <div class="bg-white shadow-xl rounded-3xl p-6 border border-gray-100">
        <div class="flex items-center justify-center mb-4">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full shadow-lg"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
        </div>
        <h1
          class="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
        >
          Formulir Peminjaman Barang
        </h1>
        <p class="text-center text-gray-600">
          Sistem Manajemen Inventaris Digital
        </p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto">
      <!-- User Info Card -->
      <div
        class="bg-white shadow-xl rounded-3xl p-6 mb-8 border border-gray-100"
      >
        <div class="flex items-center space-x-4">
          <div
            class="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-full"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800">
              {{ user?.name || "Loading..." }}
            </h3>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500">Kode User:</span>
              <span
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ user?.code || "-" }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Inventory Status Cards -->
      <div class="grid lg:grid-cols-2 gap-6 mb-8">
        <!-- Available Items -->
        <div
          class="bg-white shadow-xl rounded-3xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <div
              class="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-full shadow-lg"
            >
              <svg
                class="w-6 h-6 text-white"
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
            <div class="ml-4">
              <h2 class="text-xl font-bold text-green-700">Barang Tersedia</h2>
              <p class="text-sm text-gray-500">
                {{ barangTersedia.length }} item siap dipinjam
              </p>
            </div>
          </div>
          <div class="max-h-40 overflow-y-auto custom-scrollbar">
            <div v-if="barangTersedia.length" class="space-y-2">
              <div
                v-for="item in barangTersedia"
                :key="item.id"
                class="flex items-center p-3 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition-colors duration-200"
              >
                <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span class="text-gray-700 flex-1">{{ item.name }}</span>
                <svg
                  class="w-4 h-4 text-green-500"
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
            </div>
            <div v-else class="text-center py-8">
              <svg
                class="w-12 h-12 text-gray-300 mx-auto mb-3"
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
              <p class="text-gray-500 text-sm">Tidak ada barang tersedia</p>
            </div>
          </div>
        </div>

        <!-- Borrowed Items -->
        <div
          class="bg-white shadow-xl rounded-3xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <div
              class="bg-gradient-to-r from-amber-400 to-orange-500 p-3 rounded-full shadow-lg"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-xl font-bold text-amber-700">Sedang Dipinjam</h2>
              <p class="text-sm text-gray-500">
                {{ barangDipinjam.length }} item tidak tersedia
              </p>
            </div>
          </div>
          <div class="max-h-40 overflow-y-auto custom-scrollbar">
            <div v-if="barangDipinjam.length" class="space-y-2">
              <div
                v-for="item in barangDipinjam"
                :key="item.id"
                class="flex items-center p-3 bg-amber-50 rounded-xl border border-amber-100"
              >
                <div class="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                <span class="text-gray-700 flex-1">{{ item.name }}</span>
                <svg
                  class="w-4 h-4 text-amber-500"
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
            </div>
            <div v-else class="text-center py-8">
              <svg
                class="w-12 h-12 text-gray-300 mx-auto mb-3"
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
              <p class="text-gray-500 text-sm">Semua barang tersedia</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <div class="bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
        <div class="flex items-center mb-6">
          <div
            class="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-lg"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 ml-4">Form Peminjaman</h2>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Search & Select Item -->
          <div class="space-y-4">
            <div>
              <label
                class="flex items-center text-lg font-semibold text-gray-700 mb-3"
              >
                <svg
                  class="w-5 h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Cari Barang
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="search"
                  placeholder="Ketik nama barang yang ingin dipinjam..."
                  class="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 pl-12 text-lg focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
                <svg
                  class="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label
                class="flex items-center text-lg font-semibold text-gray-700 mb-3"
              >
                <svg
                  class="w-5 h-5 mr-2 text-green-500"
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
                Pilih Barang
              </label>
              <div class="relative">
                <select
                  v-model="form.item_id"
                  class="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 text-lg focus:ring-4 focus:ring-green-500 focus:ring-opacity-30 focus:border-green-500 transition-all duration-300 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                >
                  <option value="">Pilih barang yang ingin dipinjam...</option>
                  <option
                    v-for="item in filteredBarangTersedia"
                    :key="item.id"
                    :value="item.id"
                    class="py-2"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <svg
                  class="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Date Inputs -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label
                class="flex items-center text-lg font-semibold text-gray-700 mb-3"
              >
                <svg
                  class="w-5 h-5 mr-2 text-purple-500"
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
                Tanggal Pinjam
              </label>
              <div class="relative">
                <input
                  type="date"
                  v-model="form.borrow_date"
                  class="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 pr-12 text-lg focus:ring-4 focus:ring-purple-500 focus:ring-opacity-30 focus:border-purple-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
                <CalendarIcon
                  class="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label
                class="flex items-center text-lg font-semibold text-gray-700 mb-3"
              >
                <svg
                  class="w-5 h-5 mr-2 text-pink-500"
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
                Tanggal Kembali
              </label>
              <div class="relative">
                <input
                  type="date"
                  v-model="form.return_date"
                  class="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 pr-12 text-lg focus:ring-4 focus:ring-pink-500 focus:ring-opacity-30 focus:border-pink-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
                <CalendarIcon
                  class="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="text-center pt-4">
            <button
              type="submit"
              class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl flex items-center mx-auto space-x-3"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span>Ajukan Peminjaman</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Exit Button -->
      <div class="text-center mt-8">
        <button
          @click="handleKeluar"
          class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto space-x-3 border border-gray-200"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Keluar dari Sistem</span>
        </button>
      </div>

      <!-- Modal Sukses Peminjaman -->
      <div
        v-if="showBorrowSuccessModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      >
        <div
          class="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-200"
        >
          <div
            class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100"
          >
            <svg
              class="w-8 h-8 text-green-600"
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
          <h2 class="text-2xl font-bold text-gray-800 mb-2">
            Peminjaman Berhasil!
          </h2>
          <p class="text-gray-600 mb-6">
            Barang
            <span class="font-semibold text-green-600"
              >"{{ borrowedItemName }}"</span
            >
            berhasil dipinjam.
          </p>
          <div class="flex justify-center space-x-4">
            <button
              @click="closeModal"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow"
            >
              Pinjam Barang Lain
            </button>
            <button
              @click="handleKeluar"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-xl font-semibold shadow"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/services/api.js";
import { CalendarIcon } from "@heroicons/vue/24/solid";

const route = useRoute();
const router = useRouter();

const userCode = route.query.code?.trim();
const user = ref(null);
const semuaBarang = ref([]);
const barangTersedia = ref([]);
const barangDipinjam = ref([]);
const search = ref("");

const form = ref({
  item_id: "",
  borrow_date: "",
  return_date: "",
});

const showBorrowSuccessModal = ref(false);
const borrowedItemName = ref("");

const getUser = async () => {
  if (!userCode) return;
  try {
    const res = await axios.get(`/users/by-code/${userCode}`);
    user.value = res.data.data;
  } catch (err) {
    console.error("Gagal mengambil user:", err);
  }
};

const audioSuccess = new Audio("/sounds/success-beep.mp3");
const playBeep = () => {
  try {
    audioSuccess.play();
  } catch (e) {
    console.warn("Gagal memutar audio:", e);
  }
};

const getItems = async () => {
  try {
    const res = await axios.get("/public/items");
    semuaBarang.value = res.data.data;
    barangTersedia.value = semuaBarang.value.filter(
      (item) => item.is_available && item.is_active
    );
    barangDipinjam.value = semuaBarang.value.filter(
      (item) => !item.is_available && item.is_active
    );
  } catch (err) {
    console.error("Gagal mengambil data item:", err);
  }
};

const filteredBarangTersedia = computed(() => {
  if (!search.value) return barangTersedia.value;
  return barangTersedia.value.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

const handleSubmit = async () => {
  try {
    const selectedItem = semuaBarang.value.find(
      (item) => item.id === form.value.item_id
    );

    const payload = {
      user_code: user.value.code,
      item_id: form.value.item_id,
      borrow_date: form.value.borrow_date,
      return_date: form.value.return_date,
    };

    await axios.post("/public/borrowings", payload);

    borrowedItemName.value = selectedItem?.name || "Barang";
    showBorrowSuccessModal.value = true;

    // Reset form
    form.value = { item_id: "", borrow_date: "", return_date: "" };
    search.value = "";

    await getItems();
    playBeep();
  } catch (err) {
    console.error("Gagal melakukan peminjaman:", err);
    alert("❌ Gagal mengajukan peminjaman barang");
  }
};

const handleKeluar = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  router.push({ name: "Scan" });
};

const closeModal = () => {
  showBorrowSuccessModal.value = false;
};

onMounted(async () => {
  await getUser();
  await getItems();
});
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>