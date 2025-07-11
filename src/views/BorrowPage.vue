<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-500 via-white to-indigo-500 py-8 px-4"
  >
    <!-- Header -->
    <div class="max-w-5xl mx-auto mb-8">
      <div
        class="bg-white shadow-xl rounded-3xl p-6 border border-gray-100 text-center"
      >
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
        >
          Formulir Peminjaman Barang
        </h1>
        <p class="text-gray-600">Sistem Manajemen Inventaris Digital</p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto">
      <!-- User Info -->
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
            <div class="flex items-center space-x-2 text-sm text-gray-500">
              <!-- <span>Kode User:</span>
              <span
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
                >{{ user?.code || "-" }}</span
              > -->
              <span>Email:</span>
              <span
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
                >{{ user?.email || "-" }}</span
              >
              <span>Phone:</span>
              <span
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
                >{{ user?.phone || "-" }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Barang Dipinjam -->
          <div
            class="bg-white shadow-xl rounded-3xl p-6 border border-gray-100"
          >
            <h2 class="text-xl font-bold text-amber-700 mb-4">
              Barang yang Sedang Dipinjam
            </h2>
            <div class="max-h-40 overflow-y-auto custom-scrollbar">
              <div v-if="barangDipinjam.length" class="space-y-2">
                <div
                  v-for="item in barangDipinjam"
                  :key="item.id"
                  class="flex items-center p-3 bg-amber-50 rounded-xl border border-amber-100"
                >
                  <div class="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                  <span class="text-gray-700 flex-1">{{ item.name }}</span>
                </div>
              </div>
              <div v-else class="text-center py-8 text-gray-500 text-sm">
                Semua barang tersedia
              </div>
            </div>
          </div>

          <!-- Search -->
          <div>
            <label class="block text-lg font-semibold text-gray-700 mb-2"
              >Cari Barang</label
            >
            <input
              type="text"
              v-model="search"
              placeholder="Ketik nama barang..."
              class="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 text-lg focus:ring-4 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white"
            />
          </div>

          <!-- Pilih Barang -->
          <div>
            <label class="block text-lg font-semibold text-gray-700 mb-4"
              >Pilih Barang</label
            >
            <div
              class="grid md:grid-cols-4 gap-6 max-h-100 overflow-y-auto custom-scrollbar"
            >
              <div
                v-for="item in filteredBarangTersedia"
                :key="item.id"
                @click="selectItem(item)"
                :class="[
                  'flex items-center p-4 rounded-xl border cursor-pointer transition',
                  form.item_ids.includes(item.id)
                    ? 'bg-blue-100 border-blue-300'
                    : 'bg-green-50 border-green-100 hover:bg-green-100',
                ]"
              >
                <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span
                  class="text-gray-700 flex-1"
                  v-html="highlightSearchTerm(item.name)"
                ></span>
                <svg
                  v-if="form.item_ids.includes(item.id)"
                  class="w-4 h-4 text-blue-500"
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
          </div>

          <!-- Tanggal -->
          <div class="grid md:grid-cols-2 gap-6">
            <div class="relative">
              <label class="block text-lg font-semibold text-gray-700 mb-2"
                >Tanggal Pinjam</label
              >
              <input
                id="borrowDate"
                v-model="form.borrow_date"
                type="text"
                class="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 pr-12 text-lg focus:ring-4 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 hover:bg-white"
              />
              <svg
                class="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
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

            <div class="relative">
              <label class="block text-lg font-semibold text-gray-700 mb-2"
                >Tanggal Kembali</label
              >
              <input
                id="returnDate"
                v-model="form.return_date"
                type="text"
                class="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 pr-12 text-lg focus:ring-4 focus:ring-pink-500 focus:border-pink-500 bg-gray-50 hover:bg-white"
              />
              <svg
                class="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
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
          </div>

          <!-- Submit -->
          <div class="text-center space-y-4">
            <button
              type="submit"
              class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition"
            >
              Ajukan Peminjaman
            </button>
            <button
              type="button"
              @click="goBack"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-lg font-semibold px-20 py-4 rounded-2xl shadow-md transition-all duration-300"
            >
              Kembali Ke Menu
            </button>
          </div>
        </form>
      </div>

      <!-- Modal -->
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
          <button
            @click="closeModal"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow"
          >
            Pinjam Barang Lain
          </button>
          <button
            @click="goToScan"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow"
          >
            Keluar Dari Sistem
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/services/api.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const route = useRoute();
const router = useRouter();
const userCode = route.query.code?.trim() || localStorage.getItem("user_code");

// Menggunakan objek Date saat ini untuk defaultDate flatpickr
// flatpickr akan memformatnya sesuai dateFormat yang ditentukan
const today = new Date();

const user = ref(null);
const semuaBarang = ref([]);
const barangTersedia = ref([]);
const barangDipinjam = ref([]);
const search = ref("");
const form = ref({
  item_ids: [],
  borrow_date: "", // Akan menyimpan DD-MM-YY
  return_date: "", // Akan menyimpan DD-MM-YY
});
const showBorrowSuccessModal = ref(false);
const borrowedItemName = ref("");

// Helper function to convert DD-MM-YY to YYYY-MM-DD
const convertToYYYYMMDD = (dateString) => {
  if (!dateString) return "";
  // Split DD-MM-YY
  const [day, month, yearTwoDigit] = dateString.split("-");
  // Convert two-digit year to four-digit year (assuming 20xx)
  const year = `20${yearTwoDigit}`;
  return `${year}-${month}-${day}`;
};

// Ambil data user berdasarkan kode
const getUser = async () => {
  if (!userCode) return;
  try {
    const res = await axios.get(`/users/by-code/${userCode}`);
    user.value = res.data.data;
  } catch (err) {
    console.error("Gagal mengambil user:", err);
  }
};

// Ambil semua barang dan pisahkan berdasarkan status
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

// Filter barang berdasarkan pencarian
const filteredBarangTersedia = computed(() => {
  if (!search.value) return barangTersedia.value;
  return barangTersedia.value.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Highlight kata yang dicari
const highlightSearchTerm = (text) => {
  if (!search.value) return text;
  const regex = new RegExp(search.value, "gi");
  return text.replace(regex, (match) => `<span">${match}</span>`);
};

// Toggle pemilihan barang
const selectItem = (item) => {
  const index = form.value.item_ids.indexOf(item.id);
  if (index === -1) {
    form.value.item_ids.push(item.id);
  } else {
    form.value.item_ids.splice(index, 1);
  }
};

// Kirim data peminjaman
const handleSubmit = async () => {
  if (
    !form.value.item_ids.length ||
    !form.value.borrow_date ||
    !form.value.return_date
  ) {
    alert("⚠️ Harap pilih minimal satu barang dan isi tanggal.");
    return;
  }

  // Konversi tanggal dari DD-MM-YY ke YYYY-MM-DD untuk validasi dan pengiriman API
  const formattedBorrowDateForAPI = convertToYYYYMMDD(form.value.borrow_date);
  const formattedReturnDateForAPI = convertToYYYYMMDD(form.value.return_date);

  // Validasi tanggal kembali tidak boleh lebih awal dari tanggal pinjam
  if (
    new Date(formattedReturnDateForAPI) < new Date(formattedBorrowDateForAPI)
  ) {
    alert("⚠️ Tanggal kembali tidak boleh lebih awal dari tanggal pinjam.");
    return;
  }

  try {
    const payload = {
      user_code: user.value.code,
      item_ids: form.value.item_ids,
      borrow_date: formattedBorrowDateForAPI, // Kirim dalam format YYYY-MM-DD
      return_date: formattedReturnDateForAPI, // Kirim dalam format YYYY-MM-DD
    };

    const res = await axios.post("/public/borrowings", payload);

    // Set nama barang yang dipinjam untuk modal sukses
    borrowedItemName.value = semuaBarang.value
      .filter((item) => form.value.item_ids.includes(item.id))
      .map((item) => item.name)
      .join(", ");

    showBorrowSuccessModal.value = true;

    // Reset form setelah sukses
    form.value = { item_ids: [], borrow_date: "", return_date: "" };
    search.value = "";
    // Refresh daftar barang setelah peminjaman
    await getItems();

    if (res.data.skipped_items?.length) {
      alert(
        `⚠️ Beberapa barang tidak tersedia dan dilewati: ${res.data.skipped_items.join(
          ", "
        )}`
      );
    }
  } catch (err) {
    console.error("Gagal melakukan peminjaman:", err);
    alert(
      err.response?.data?.message || "❌ Gagal mengajukan peminjaman barang"
    );
  }
};

const closeModal = () => {
  showBorrowSuccessModal.value = false;
};

const goToScan = () => {
  localStorage.removeItem("user_code");
  router.push("/");
};

const goBack = () => {
  router.push("/choose-action");
};

onMounted(async () => {
  if (!userCode) {
    alert("❌ Tidak ada data pengguna. Silakan scan QR Code terlebih dahulu.");
    router.push({ name: "ScanPage" }); // atau "/" jika nama route-nya begitu
    return;
  }
  await getUser();
  await getItems();

  // Inisialisasi flatpickr untuk Tanggal Pinjam
  const borrowPickerInstance = flatpickr("#borrowDate", {
    defaultDate: today,
    dateFormat: "d-m-y", // Mengatur format tampilan dan nilai input menjadi DD-MM-YY
    onChange: function (selectedDates, dateStr, instance) {
      form.value.borrow_date = dateStr; // Update v-model dengan format DD-MM-YY
    },
  });

  // Inisialisasi flatpickr untuk Tanggal Kembali
  const returnPickerInstance = flatpickr("#returnDate", {
    defaultDate: today,
    dateFormat: "d-m-y", // Mengatur format tampilan dan nilai input menjadi DD-MM-YY
    onChange: function (selectedDates, dateStr, instance) {
      form.value.return_date = dateStr; // Update v-model dengan format DD-MM-YY
    },
  });

  // Set initial form values for dates based on flatpickr's default
  // This ensures v-model is populated with DD-MM-YY format on load
  if (borrowPickerInstance && borrowPickerInstance.selectedDates.length > 0) {
    form.value.borrow_date = borrowPickerInstance.formatDate(
      borrowPickerInstance.selectedDates[0],
      "d-m-y"
    );
  }
  if (returnPickerInstance && returnPickerInstance.selectedDates.length > 0) {
    form.value.return_date = returnPickerInstance.formatDate(
      returnPickerInstance.selectedDates[0],
      "d-m-y"
    );
  }
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
