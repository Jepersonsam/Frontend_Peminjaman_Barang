<template>
  <div
    class="min-h-screen bg-[#F8FAFC] py-10 px-6 sm:px-8 relative flex flex-col items-center select-none font-sans"
  >
    <!-- Background Blur Decorative -->
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <div
        class="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[100px]"
      ></div>
      <div
        class="absolute top-[-5%] right-[-15%] w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[100px]"
      ></div>
    </div>

    <div class="w-full max-w-[1000px] relative z-10 flex flex-col gap-6 pb-24">
      <!-- Top: Back Button and Title -->
      <div class="relative flex flex-col items-center justify-center mb-4">
        <button
          @click="goBack"
          class="absolute left-0 top-1/2 -translate-y-1/2 group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur text-slate-600 hover:text-blue-600 font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
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
              stroke-width="2.5"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span class="hidden sm:inline">Kembali ke Menu</span>
        </button>
        <div class="text-center">
          <h1 class="text-4xl font-black text-[#1E293B] tracking-tight">
            Formulir Peminjaman
          </h1>
          <p class="text-slate-500 font-medium text-[1.05rem] mt-1.5">
            Lengkapi data untuk meminjam barang inventaris
          </p>
        </div>
      </div>

      <!-- 1. User Card -->
      <div
        class="bg-white rounded-[1.5rem] p-8 shadow-sm border border-[#F1F5F9] relative overflow-hidden"
      >
        <!-- Subtly deco circles in card -->
        <div class="absolute top-6 right-6 flex gap-2">
          <div class="w-6 h-6 rounded-full bg-[#F1F5F9]"></div>
          <div class="w-10 h-10 rounded-full bg-[#F8FAFC] -mt-2 -mr-2"></div>
        </div>

        <div class="flex items-start gap-4 mb-6">
          <div
            class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-blue-50 border border-blue-100 text-blue-600 font-bold text-3xl shrink-0"
          >
            {{ user?.name?.charAt(0) || "S" }}
          </div>
          <div class="flex flex-col pt-1.5">
            <h2 class="text-xl font-bold text-slate-800 leading-none mb-2">
              {{ user?.name || "Memuat..." }}
            </h2>
            <p class="text-slate-400 font-semibold text-sm tracking-wider">
              {{ user?.code || "-" }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            class="flex items-center gap-3 bg-[#F8FAFC] px-4 py-3.5 rounded-2xl border border-[#F1F5F9]"
          >
            <svg
              class="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span class="text-slate-600 font-bold text-sm truncate">{{
              user?.email || "-"
            }}</span>
          </div>
          <div
            class="flex items-center gap-3 bg-[#F8FAFC] px-4 py-3.5 rounded-2xl border border-[#F1F5F9]"
          >
            <svg
              class="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span class="text-slate-600 font-bold text-sm">{{
              user?.phone || "-"
            }}</span>
          </div>
        </div>
      </div>

      <!-- 2. Barang Dipinjam Card -->
      <div
        class="bg-white rounded-[1.5rem] p-8 shadow-sm border border-[#F1F5F9]"
      >
        <h3 class="font-black text-slate-800 text-[1.25rem] mb-4">
          Barang Sedang Dipinjam
        </h3>

        <div v-if="barangDipinjam.length > 0" class="flex flex-col gap-3">
          <div
            v-for="item in barangDipinjam"
            :key="item.id"
            class="flex items-center gap-4 bg-[#FFFBF0] border border-[#FEF3C7] px-5 py-4 rounded-xl"
          >
            <div
              class="w-10 h-10 rounded-lg bg-[#FEF3C7] flex flex-col items-center justify-center shrink-0"
            >
              <!-- Small box icon -->
              <svg
                class="w-5 h-5 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <span
              class="font-extrabold text-base text-slate-700 bg-transparent truncate"
            >
              {{ item.name }}
            </span>
          </div>
        </div>
        <div
          v-else
          class="text-center py-6 text-slate-400 font-bold text-base bg-slate-50 border border-dashed border-slate-200 rounded-xl"
        >
          Tidak ada barang dipinjam.
        </div>
      </div>

      <!-- 3. Form Card -->
      <div
        class="bg-white rounded-[1.5rem] p-8 shadow-sm border border-[#F1F5F9]"
      >
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
          <!-- Top Box: Legend -->
          <div class="flex justify-end -mb-2">
            <div
              class="flex items-center gap-2 bg-amber-50 border border-amber-100 px-3 py-2 rounded-lg"
            >
              <div
                class="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.5)]"
              ></div>
              <span class="text-amber-700 font-bold text-[0.8rem]">
                Barang dengan tanda ini memerlukan persetujuan Admin
              </span>
            </div>
          </div>

          <!-- Filters (Dropdown & Search) -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Dropdown -->
            <div class="relative" ref="dropdownRef">
              <button
                type="button"
                @click="isDropdownOpen = !isDropdownOpen"
                class="w-full flex items-center justify-between px-5 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:bg-slate-100 transition focus:outline-none"
              >
                <span
                  class="font-bold text-[1.05rem] text-[#334155] truncate"
                  >{{ selectedCategoryLabel }}</span
                >
                <svg
                  class="w-5 h-5 text-slate-400 shrink-0 transition-transform"
                  :class="{ 'rotate-180': isDropdownOpen }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <Transition name="fade">
                <div
                  v-if="isDropdownOpen"
                  class="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-[250px] overflow-y-auto py-2"
                >
                  <button
                    type="button"
                    @click="
                      selectCategory('');
                      isDropdownOpen = false;
                    "
                    class="w-full text-left px-5 py-3 hover:bg-slate-50 font-bold text-base text-slate-600"
                  >
                    Semua Kategori
                  </button>
                  <button
                    v-for="cat in categories"
                    :key="cat.id"
                    type="button"
                    @click="
                      selectCategory(cat.id);
                      isDropdownOpen = false;
                    "
                    class="w-full text-left px-5 py-3 hover:bg-slate-50 font-bold text-base text-slate-600"
                  >
                    {{ cat.name }}
                  </button>
                </div>
              </Transition>
            </div>

            <!-- Search -->
            <div class="relative w-full">
              <svg
                class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                v-model="search"
                type="text"
                placeholder="Cari nama barang..."
                class="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl font-bold text-[1.05rem] text-[#334155] placeholder-slate-400 focus:outline-none focus:border-blue-400 transition"
              />
            </div>
          </div>

          <!-- Item Grid -->
          <div class="flex flex-col gap-3 mt-2">
            <h4
              class="font-extrabold text-[0.8rem] tracking-widest text-[#94A3B8] uppercase"
            >
              Pilih Barang
            </h4>
            <div
              class="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2 pb-2"
            >
              <div
                v-for="item in filteredBarangTersedia"
                :key="item.id"
                @click="selectItem(item)"
                class="relative flex items-center gap-3 p-5 bg-white border rounded-xl cursor-pointer transition select-none"
                :class="
                  form.item_ids.includes(item.id)
                    ? 'border-blue-500 shadow-sm bg-blue-50/20'
                    : 'border-[#E2E8F0] hover:border-slate-300'
                "
              >
                <!-- Indicator Orange Dot for Approval -->
                <div
                  v-if="item.is_approval"
                  class="absolute top-4 right-4 w-[10px] h-[10px] rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]"
                ></div>

                <!-- Checkbox -->
                <div
                  class="w-[20px] h-[20px] rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-colors"
                  :class="
                    form.item_ids.includes(item.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'bg-white border-slate-300'
                  "
                >
                  <svg
                    v-if="form.item_ids.includes(item.id)"
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <!-- Info -->
                <div class="flex flex-col flex-1 truncate pr-3">
                  <span
                    class="font-extrabold text-[#1E293B] text-[1.1rem] truncate"
                    v-html="highlightSearchTerm(item.name)"
                  ></span>
                  <span
                    class="font-semibold text-slate-400 text-[0.75rem] uppercase tracking-wider bg-slate-100 rounded self-start px-1.5 mt-1"
                  >
                    {{ item.serial_code || "IOT-" + item.id }}
                  </span>
                </div>
              </div>

              <!-- Empty State -->
              <div
                v-if="filteredBarangTersedia.length === 0"
                class="col-span-2 text-center py-8 text-slate-400 font-bold text-base"
              >
                Tidak ada barang tersedia.
              </div>
            </div>
          </div>

          <!-- Dates -->
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="flex flex-col gap-2">
              <label
                class="font-extrabold text-[0.75rem] tracking-widest text-[#94A3B8] uppercase"
                >Tanggal Pinjam</label
              >
              <div class="relative">
                <svg
                  class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
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
                <input
                  id="borrowDate"
                  v-model="form.borrow_date"
                  type="text"
                  class="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl font-bold text-[1.05rem] text-[#334155] focus:outline-none"
                  readonly
                />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label
                class="font-extrabold text-[0.75rem] tracking-widest text-[#94A3B8] uppercase"
                >Tanggal Kembali</label
              >
              <div class="relative">
                <svg
                  class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
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
                <input
                  id="returnDate"
                  v-model="form.return_date"
                  type="text"
                  class="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl font-bold text-[1.05rem] text-[#334155] focus:outline-none"
                  readonly
                />
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex flex-col gap-3 mt-6">
            <button
              type="submit"
              class="w-full bg-[#4338CA] hover:bg-[#3730A3] active:scale-[0.99] text-white font-bold text-[1.1rem] py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <span>Ajukan Peminjaman</span>
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
            <button
              type="button"
              @click="goBack"
              class="w-full py-3 text-slate-400 hover:text-slate-600 font-bold text-[1rem] rounded-xl transition"
            >
              Batalkan
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modals (Success & Approval) -->
    <Transition name="fade">
      <div
        v-if="showBorrowSuccessModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
        @click="closeModal"
      >
        <div
          class="bg-white rounded-[2rem] p-10 max-w-sm w-full text-center shadow-xl border border-slate-100"
          @click.stop
        >
          <div
            class="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500"
          >
            <svg
              class="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-black text-slate-800 mb-2">Berhasil!</h3>
          <p class="text-slate-500 text-sm mb-8 leading-relaxed">
            Peminjaman
            <span class="font-bold text-slate-700">{{ borrowedItemName }}</span>
            berhasil diajukan.
          </p>
          <div class="flex flex-col gap-3">
            <button
              @click="closeModal"
              class="w-full py-3.5 bg-emerald-500 text-white font-bold rounded-xl active:scale-[0.98] transition"
            >
              Pinjam Lagi
            </button>
            <button
              @click="goToScan"
              class="w-full py-3.5 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div
        v-if="showApprovalAlert"
        class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
        @click="showApprovalAlert = false"
      >
        <div
          class="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-xl border border-slate-100"
          @click.stop
        >
          <div
            class="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5 text-amber-500"
          >
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p class="text-slate-600 font-medium text-sm mb-6 leading-relaxed">
            Barang
            <span class="font-bold text-amber-600 px-1">{{
              approvalItemName
            }}</span>
            butuh persetujuan admin sebelum dapat dipinjam.
          </p>
          <button
            @click="showApprovalAlert = false"
            class="w-full py-3 bg-amber-500 text-white font-bold rounded-xl active:scale-[0.98] transition"
          >
            Mengerti
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import axios from "@/services/api.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

// Code could come from params or store
const userCode =
  userStore.code || userStore.code_nfc || route.query.code?.trim();
const today = new Date();

const user = ref(null);
const semuaBarang = ref([]);
const barangTersedia = ref([]);
const barangDipinjam = ref([]);
const categories = ref([]);
const selectedCategoryId = ref("");
const search = ref("");
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

const selectedCategoryLabel = computed(() => {
  if (!selectedCategoryId.value) return "Semua Kategori";
  const cat = categories.value.find((c) => c.id === selectedCategoryId.value);
  return cat ? cat.name : "Semua Kategori";
});

const selectCategory = (id) => {
  selectedCategoryId.value = id;
};

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isDropdownOpen.value = false;
  }
};

const form = ref({
  item_ids: [],
  borrow_date: "",
  return_date: "",
});
const showBorrowSuccessModal = ref(false);
const borrowedItemName = ref("");
const showApprovalAlert = ref(false);
const approvalItemName = ref("");

// Helper Date
const convertToYYYYMMDD = (dateString) => {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length !== 3) return new Date().toISOString().split("T")[0];
  const [day, month, yearTwoDigit] = parts;
  const year = `20${yearTwoDigit}`;
  return `${year}-${month}-${day}`;
};

// API Calls
const getUser = async () => {
  if (userStore.id && userStore.name) {
    user.value = { ...userStore.$state };
    return;
  }
  if (!userCode) return;

  try {
    let endpoint = `/users/by-code/${userCode}`;
    if (userStore.code_nfc && userCode === userStore.code_nfc) {
      endpoint = "/users/by-nfc/" + userCode;
    }
    const res = await axios.get(endpoint);
    user.value = res.data.data;
    userStore.setUser(user.value);
  } catch (err) {
    console.error("User fetch error:", err);
  }
};

const getCategories = async () => {
  try {
    const res = await axios.get("/public/categories");
    categories.value = res.data.data || [];
  } catch (err) {
    try {
      const res2 = await axios.get("/categories");
      categories.value = res2.data.data || [];
    } catch (e) {}
  }
};

const getItems = async () => {
  try {
    const res = await axios.get("/public/items");
    semuaBarang.value = res.data.data;
    barangTersedia.value = semuaBarang.value.filter(
      (i) => i.is_available && i.is_active,
    );
    barangDipinjam.value = semuaBarang.value.filter(
      (i) => !i.is_available && i.is_active,
    );
  } catch (err) {
    console.error(err);
  }
};

// Computed
const filteredBarangTersedia = computed(() => {
  let list = barangTersedia.value;
  if (selectedCategoryId.value) {
    const catId = parseInt(selectedCategoryId.value);
    list = list.filter(
      (i) => i.category_id === catId || i.category?.id === catId,
    );
  }
  if (search.value) {
    const s = search.value.toLowerCase();
    list = list.filter((i) => i.name.toLowerCase().includes(s));
  }
  return list;
});

const highlightSearchTerm = (text) => {
  if (!search.value) return text;
  const re = new RegExp(search.value, "gi");
  return text.replace(
    re,
    (match) => `<span class="text-blue-600 bg-blue-100/50">${match}</span>`,
  );
};

// Interactions
const selectItem = (item) => {
  const idx = form.value.item_ids.indexOf(item.id);
  if (idx === -1) {
    form.value.item_ids.push(item.id);
    if (item.is_approval) {
      approvalItemName.value = item.name;
      showApprovalAlert.value = true;
    }
  } else {
    form.value.item_ids.splice(idx, 1);
  }
};

const handleSubmit = async () => {
  if (
    !form.value.item_ids.length ||
    !form.value.borrow_date ||
    !form.value.return_date
  ) {
    alert("Mohon lengkapi data peminjaman.");
    return;
  }
  const bDate = convertToYYYYMMDD(form.value.borrow_date);
  const rDate = convertToYYYYMMDD(form.value.return_date);

  if (new Date(rDate) < new Date(bDate)) {
    alert("Tanggal kembali tidak valid.");
    return;
  }

  try {
    await axios.post("/public/borrowings", {
      user_code: user.value.code,
      item_ids: form.value.item_ids,
      borrow_date: bDate,
      return_date: rDate,
    });

    borrowedItemName.value =
      semuaBarang.value
        .filter((i) => form.value.item_ids.includes(i.id))
        .map((i) => i.name)
        .join(", ") || "Item";

    showBorrowSuccessModal.value = true;
    form.value.item_ids = [];
    form.value.borrow_date = "";
    form.value.return_date = "";
    await getItems();
  } catch (err) {
    alert(err.response?.data?.message || "Gagal meminjam.");
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
    // router.push({ name: "Scan" });
  }
  document.addEventListener("click", handleClickOutside);
  await getUser();
  await getCategories();
  await getItems();

  const fpConfig = {
    defaultDate: today,
    dateFormat: "d-m-y",
    disableMobile: true,
    minDate: "today",
  };

  const fpBorrow = flatpickr("#borrowDate", {
    ...fpConfig,
    onChange: (d, s) => (form.value.borrow_date = s),
  });
  const fpReturn = flatpickr("#returnDate", {
    ...fpConfig,
    onChange: (d, s) => (form.value.return_date = s),
  });

  if (fpBorrow.input) form.value.borrow_date = fpBorrow.input.value;
  if (fpReturn.input) form.value.return_date = fpReturn.input.value;
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
