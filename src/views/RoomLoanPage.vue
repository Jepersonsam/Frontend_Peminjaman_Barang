<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-500 via-white to-indigo-500 py-8 px-4"
  >
    <div
      class="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-gray-100"
    >
      <div class="text-center mb-10">
        <div class="flex justify-center mb-4">
          <div
            class="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg"
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
          class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700"
        >
          Formulir Peminjaman Ruangan
        </h1>
        <p class="text-gray-500 mt-2">
          Lengkapi formulir untuk mengajukan peminjaman
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <div>
          <label class="block font-semibold text-lg text-gray-700 mb-2"
            >Nama Peminjam</label
          >
          <input
            v-model="form.borrower_name"
            type="text"
            class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50"
            required
          />
        </div>

        <div>
          <label class="block font-semibold text-lg text-gray-700 mb-2"
            >Kontak</label
          >
          <input
            v-model="form.borrower_contact"
            type="text"
            class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50"
          />
        </div>

        <div>
          <label class="block font-semibold text-lg text-gray-700 mb-2"
            >Tujuan</label
          >
          <input
            v-model="form.purpose"
            type="text"
            class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50"
          />
        </div>

        <div>
          <label class="block font-semibold text-lg text-gray-700 mb-2"
            >Pilih Ruangan</label
          >
          <select
            v-model="form.room_id"
            class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50"
            required
          >
            <option disabled value="">-- Pilih Ruangan --</option>
            <option v-for="room in rooms" :key="room.id" :value="room.id">
              {{ room.name }} - {{ room.location }}
            </option>
          </select>
        </div>

        <div>
          <label class="block font-semibold text-lg text-gray-700 mb-2"
            >Tanggal Peminjaman</label
          >
          <input
            v-model="selectedDate"
            type="date"
            class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50"
            required
          />
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block font-semibold text-lg text-gray-700 mb-2"
              >Waktu Mulai</label
            >
            <input
              v-model="form.start_time_only"
              type="time"
              class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50"
              required
            />
          </div>
          <div>
            <label class="block font-semibold text-lg text-gray-700 mb-2"
              >Waktu Selesai</label
            >
            <input
              v-model="form.end_time_only"
              type="time"
              class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50"
              required
            />
          </div>
        </div>

        <div>
          <label class="block font-semibold text-lg text-gray-700 mb-2"
            >Email (opsional)</label
          >
          <input
            v-model="form.emails"
            type="text"
            placeholder="contoh1@email.com, contoh2@email.com"
            class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50"
          />
        </div>

        <div v-if="bookings.length > 0" class="mt-6">
          <h3 class="font-semibold text-lg text-gray-800 mb-2">
            Daftar Booking di Tanggal Ini:
          </h3>
          <div class="space-y-4">
            <div
              v-for="(booking, index) in bookings"
              :key="index"
              class="p-4 rounded-xl border bg-gray-50 shadow-sm"
            >
              <div class="text-sm font-semibold text-gray-700">
                {{ booking.borrower_name }}
                <span
                  class="text-xs italic text-gray-500"
                  v-if="booking.purpose"
                  >({{ booking.purpose }})</span
                >
              </div>
              <div class="text-xs text-gray-600">
                {{ formatDate(booking.start_time) }} —
                <strong>{{ formatTime(booking.start_time) }}</strong> -
                <strong>{{ formatTime(booking.end_time) }}</strong
                ><br />
                Status:
                <span
                  :class="{
                    'text-green-600 font-bold': booking.status === 'approved',
                    'text-yellow-600 font-bold': booking.status === 'pending',
                    'text-red-600 font-bold': booking.status === 'rejected',
                    'text-gray-500 italic': booking.status === 'cancelled',
                  }"
                >
                  {{ translateStatus(booking.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center pt-4">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-10 py-4 rounded-2xl shadow-lg transition-all duration-300"
          >
            Ajukan Peminjaman
          </button>
          <button
            type="button"
            @click="goBack"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-lg font-semibold px-20 py-4 rounded-2xl shadow-md transition-all duration-300"
          >
            Kembali
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "@/services/api";
import { useRouter } from "vue-router";

const router = useRouter();

const rooms = ref([]);
const bookings = ref([]);
const selectedDate = ref("");

const form = ref({
  room_id: "",
  borrower_name: "",
  borrower_contact: "",
  purpose: "",
  start_time: "",
  end_time: "",
  start_time_only: "",
  end_time_only: "",
  emails: "",
  status: "pending",
});

const getRooms = async () => {
  try {
    const res = await axios.get("/rooms");
    rooms.value = res.data;
  } catch (err) {
    alert("Gagal mengambil data ruangan");
    console.error(err);
  }
};

const isValidMultipleEmails = (emails) => {
  return emails
    .split(",")
    .map((e) => e.trim())
    .every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
};

const checkRoomAvailability = async () => {
  if (!form.value.room_id || !selectedDate.value) return;

  try {
    const res = await axios.get("/room-loans/check-availability", {
      params: {
        room_id: form.value.room_id,
        date: selectedDate.value,
      },
    });
    bookings.value = res.data;
  } catch (err) {
    console.error("❌ Gagal cek ketersediaan ruangan", err);
  }
};

const handleSubmit = async () => {
  form.value.start_time = `${selectedDate.value}T${form.value.start_time_only}`;
  form.value.end_time = `${selectedDate.value}T${form.value.end_time_only}`;

  if (form.value.emails) {
    const emailsArray = form.value.emails
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e !== "");

    if (
      !emailsArray.every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ) {
      alert(
        "⛔ Format email tidak valid! Pastikan email dipisahkan dengan koma."
      );
      return;
    }

    // ✅ ini bagian yang diganti
    form.value.emails = emailsArray; // langsung array of string
    form.value.attendees = emailsArray.map((email) => ({ email })); // untuk Google Calendar
  }

  try {
    await axios.post("/room-loans", form.value);
    alert("✅ Peminjaman berhasil diajukan!");
    form.value = {
      room_id: "",
      borrower_name: "",
      borrower_contact: "",
      purpose: "",
      start_time: "",
      end_time: "",
      start_time_only: "",
      end_time_only: "",
      emails: "",
      status: "pending",
    };
    bookings.value = [];
    selectedDate.value = "";
  } catch (err) {
    if (err.response && err.response.status === 409) {
      alert("⛔ Ruangan sudah dibooking di waktu tersebut!");
    } else {
      alert("❌ Terjadi kesalahan saat mengajukan");
      console.error(err);
    }
  }
};

const formatDate = (dt) => {
  const date = new Date(dt);
  return date.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (dt) => {
  const date = new Date(dt);
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const translateStatus = (status) => {
  switch (status) {
    case "approved":
      return "Disetujui";
    case "pending":
      return "Menunggu Persetujuan";
    case "rejected":
      return "Ditolak";
    case "cancelled":
      return "Dibatalkan";
    default:
      return status;
  }
};

watch([() => form.value.room_id, selectedDate], ([roomId, date]) => {
  if (roomId && date) {
    checkRoomAvailability();
  } else {
    bookings.value = [];
  }
});

const goBack = () => {
  router.push("/");
};

onMounted(getRooms);
</script>
