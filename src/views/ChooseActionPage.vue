<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-500 via-white to-indigo-500 flex flex-col items-center justify-center p-6"
  >
    <!-- Header -->
    <div class="text-center mb-12">
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6"
      >
        <svg
          class="w-10 h-10 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          ></path>
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        Sistem Inventaris dan Peminjaman
      </h1>
      <p class="text-lg text-gray-600 max-w-md">
        Silakan pilih aksi yang ingin Anda lakukan untuk mengelola barang
        inventaris
      </p>
    </div>

    <!-- Action Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      <!-- Hanya tampil jika punya secret ID -->
      <template v-if="hasSecret">
        <!-- Peminjaman -->
        <div class="group">
          <button
            @click="goToBorrow"
            class="w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 p-8 text-center group-hover:border-blue-200"
          >
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6 group-hover:bg-blue-600 transition-colors duration-300"
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
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-3">Peminjaman</h3>
            <p class="text-gray-600 mb-6">
              Pinjam barang inventaris untuk keperluan Anda disini
            </p>
            <div
              class="flex items-center justify-center text-blue-500 font-medium"
            >
              <span class="mr-2">Mulai Peminjaman</span>
              <svg
                class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
          </button>
        </div>

        <!-- Pengembalian -->
        <div class="group">
          <button
            @click="goToReturn"
            class="w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 p-8 text-center group-hover:border-green-200"
          >
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6 group-hover:bg-green-600 transition-colors duration-300"
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
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                ></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-3">Pengembalian</h3>
            <p class="text-gray-600 mb-6">
              Kembalikan barang yang telah dipinjam sebelumnya
            </p>
            <div
              class="flex items-center justify-center text-green-500 font-medium"
            >
              <span class="mr-2">Mulai Pengembalian</span>
              <svg
                class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </template>

      <!-- Peminjaman Ruangan (selalu muncul) -->
      <div class="group col-span-1 md:col-span-2">
        <button
          @click="goToRoomLoan"
          class="w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 p-8 text-center group-hover:border-blue-200"
        >
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6 group-hover:bg-blue-600 transition-colors duration-300"
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
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-3">
            Peminjaman Ruangan
          </h3>
          <p class="text-gray-600 mb-6">Pinjam ruangan sesuai kebutuhan Anda</p>
          <div
            class="flex items-center justify-center text-blue-500 font-medium"
          >
            <span class="mr-2">Mulai Peminjaman</span>
            <svg
              class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </div>

    <!-- Tombol ke Setting -->
    <!-- <div class="mt-8">
      <router-link
        to="/setting"
        class="mt-8 text-blue-600 hover:text-blue-800 transition-colors duration-200"
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
            d="M15 7a2 2 0 012 2v2a2 2 0 002 2h1a2 2 0 012 2v2a2 2 0 01-2 2h-6a2 2 0 01-2-2v-1H9v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2h1a2 2 0 002-2V9a2 2 0 012-2h4z"
          />
        </svg>
      </router-link>
    </div> -->

    <!-- Dekoratif -->
    <div
      class="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-50 animate-pulse"
    ></div>
    <!-- Dekoratif Kanan Bawah dengan Ikon Kunci -->
    <div
      class="absolute bottom-10 right-10 w-16 h-16 bg-green-100 rounded-full opacity-50 animate-pulse flex items-center justify-center group hover:opacity-80 transition"
    >
      <router-link
        to="/setting"
        class="text-green-800 hover:text-green-600 transition"
        title="Atur Secret ID"
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
            d="M15 7a2 2 0 012 2v2a2 2 0 002 2h1a2 2 0 012 2v2a2 2 0 01-2 2h-6a2 2 0 01-2-2v-1H9v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2h1a2 2 0 002-2V9a2 2 0 012-2h4z"
          />
        </svg>
      </router-link>
    </div>

    <div
      class="absolute top-1/2 left-5 w-12 h-12 bg-indigo-100 rounded-full opacity-30 animate-bounce"
    ></div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const route = useRoute();
const userCode = route.query.code;

const hasSecret = ref(false);

onMounted(() => {
  const secret = localStorage.getItem("secret_id");
  hasSecret.value = !!secret;
});

const goToBorrow = () => {
  router.push({ name: "Borrow", query: { code: userCode } });
};

const goToReturn = () => {
  router.push({ name: "PengembalianBarang", query: { code: userCode } });
};

const goToRoomLoan = () => {
  router.push({ name: "RoomLoan", query: { code: userCode } });
};
</script>
