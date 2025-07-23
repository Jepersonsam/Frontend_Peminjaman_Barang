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
      <div class="bg-white shadow-xl rounded-3xl p-6 mb-8 border border-gray-100">
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4"
        >
          <!-- Avatar -->
          <div
            class="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-full flex items-center justify-center"
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

          <!-- User Details -->
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-800 mb-1">
              {{ user?.name || "Loading..." }}
            </h3>
            <div class="flex flex-wrap gap-2 text-sm text-gray-600">
              <span class="font-medium">Email:</span>
              <span
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold"
              >
                {{ user?.email || "Tidak tersedia" }}
              </span>
              <span class="font-medium">Telepon:</span>
              <span
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold"
              >
                {{ user?.phone || "Tidak tersedia" }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Barang Dipinjam -->
          <div class="bg-white shadow-xl rounded-3xl p-6 border border-gray-100">
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

      <!-- Modal Approval -->
      <div
        v-if="showApprovalAlert"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      >
        <div
          class="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center border border-gray-200"
        >
          <div
            class="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-yellow-100"
          >
            <svg
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-800 mb-2">Butuh Persetujuan</h2>
          <p class="text-gray-600 mb-4">
            Barang <span class="font-semibold text-yellow-600">{{ approvalItemName }}</span>
            memerlukan persetujuan admin sebelum dapat dipinjam.
          </p>
          <button
            @click="showApprovalAlert = false"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl font-semibold shadow"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import axios from "@/services/api.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const userCode = userStore.code || userStore.code_nfc || route.query.code?.trim();
const today = new Date();

const user = ref(null);
const semuaBarang = ref([]);
const barangTersedia = ref([]);
const barangDipinjam = ref([]);
const search = ref("");
const form = ref({
  item_ids: [],
  borrow_date: "",
  return_date: "",
});
const showBorrowSuccessModal = ref(false);
const borrowedItemName = ref("");
const showApprovalAlert = ref(false);
const approvalItemName = ref("");

// Konversi tanggal ke YYYY-MM-DD
const convertToYYYYMMDD = (dateString) => {
  if (!dateString) return "";
  const [day, month, yearTwoDigit] = dateString.split("-");
  const year = `20${yearTwoDigit}`;
  return `${year}-${month}-${day}`;
};

// Ambil data user
const getUser = async () => {
  if (userStore.id) {
    user.value = {
      id: userStore.id,
      name: userStore.name,
      email: userStore.email,
      phone: userStore.phone,
      code: userStore.code,
      code_nfc: userStore.code_nfc,
    };
    return;
  }

  if (!userCode) return;

  try {
    let endpoint = "/users/by-code/" + userCode;
    if (userStore.code_nfc && userCode === userStore.code_nfc) {
      endpoint = "/users/by-nfc/" + userCode;
    }

    const res = await axios.get(endpoint);
    user.value = res.data.data;
    userStore.setUser(user.value);
  } catch (err) {
    console.error("Gagal mengambil user:", err);
  }
};

// Ambil data barang
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

// Highlight pencarian
const highlightSearchTerm = (text) => {
  if (!search.value) return text;
  const regex = new RegExp(search.value, "gi");
  return text.replace(regex, (match) => `<span>${match}</span>`);
};

// Pilih / batal pilih barang
const selectItem = (item) => {
  const index = form.value.item_ids.indexOf(item.id);
  if (index === -1) {
    form.value.item_ids.push(item.id);
    if (item.is_approval) {
      approvalItemName.value = item.name;
      showApprovalAlert.value = true;
    }
  } else {
    form.value.item_ids.splice(index, 1);
  }
};

// Submit peminjaman
const handleSubmit = async () => {
  if (!form.value.item_ids.length || !form.value.borrow_date || !form.value.return_date) {
    alert("⚠️ Harap pilih minimal satu barang dan isi tanggal.");
    return;
  }

  const formattedBorrowDate = convertToYYYYMMDD(form.value.borrow_date);
  const formattedReturnDate = convertToYYYYMMDD(form.value.return_date);

  if (new Date(formattedReturnDate) < new Date(formattedBorrowDate)) {
    alert("⚠️ Tanggal kembali tidak boleh lebih awal dari tanggal pinjam.");
    return;
  }

  try {
    const payload = {
      user_code: user.value.code,
      item_ids: form.value.item_ids,
      borrow_date: formattedBorrowDate,
      return_date: formattedReturnDate,
    };

    await axios.post("/public/borrowings", payload);

    borrowedItemName.value = semuaBarang.value
      .filter((item) => form.value.item_ids.includes(item.id))
      .map((item) => item.name)
      .join(", ");

    showBorrowSuccessModal.value = true;
    form.value = { item_ids: [], borrow_date: "", return_date: "" };
    search.value = "";
    await getItems();
  } catch (err) {
    console.error("Gagal melakukan peminjaman:", err);
    alert(err.response?.data?.message || "❌ Gagal mengajukan peminjaman barang");
  }
};

const closeModal = () => {
  showBorrowSuccessModal.value = false;
};

const goToScan = () => {
  userStore.clearUser();
  router.push("/");
};

const goBack = () => {
  router.push("/choose-action");
};

// Lifecycle
onMounted(async () => {
  if (!userCode) {
    alert("❌ Tidak ada data pengguna. Silakan scan QR Code terlebih dahulu.");
    router.push({ name: "ScanPage" });
    return;
  }

  await getUser();
  await getItems();

  const borrowPickerInstance = flatpickr("#borrowDate", {
    defaultDate: today,
    dateFormat: "d-m-y",
    onChange: (selectedDates, dateStr) => {
      form.value.borrow_date = dateStr;
    },
  });

  const returnPickerInstance = flatpickr("#returnDate", {
    defaultDate: today,
    dateFormat: "d-m-y",
    onChange: (selectedDates, dateStr) => {
      form.value.return_date = dateStr;
    },
  });

  form.value.borrow_date = borrowPickerInstance.input.value;
  form.value.return_date = returnPickerInstance.input.value;
});
</script>



<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(107, 114, 128, 0.5);
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(107, 114, 128, 0.8);
}
span {
  font-weight: bold;
}
</style>
