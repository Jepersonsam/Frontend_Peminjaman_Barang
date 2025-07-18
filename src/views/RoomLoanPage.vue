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

        <div v-if="form.room_id" class="mt-6">
          <div>
            <h1 class="text-lg font-semibold text-gray-800 mb-2">Noted:</h1>
            <ol class="space-y-2 text-xl-1">
              <li class="flex items-center space-x-2">
                <span
                  class="w-3 h-3 bg-yellow-400 rounded-full inline-block"
                ></span>
                <span class="text-gray-700">Menunggu Persetujuan</span>
              </li>
              <li class="flex items-center space-x-2">
                <span
                  class="w-3 h-3 bg-green-500 rounded-full inline-block"
                ></span>
                <span class="text-gray-700">Disetujui</span>
              </li>
            </ol>
          </div>
          <h3 class="font-semibold text-lg text-gray-800 mb-2 mt-6">
            Jadwal Ruangan:
          </h3>
          <FullCalendar :options="calendarOptions" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-10 py-4 rounded-2xl shadow-lg transition-all duration-300"
          >
            Ajukan Peminjaman
          </button>
          <button
            type="button"
            @click="goBack"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-lg font-semibold px-10 py-4 rounded-2xl shadow-md transition-all duration-300"
          >
            Kembali
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import axios from "@/services/api";
import { useRouter } from "vue-router";
import flatpickr from "flatpickr";
import Swal from "sweetalert2";
import "flatpickr/dist/flatpickr.min.css";
import "sweetalert2/dist/sweetalert2.min.css";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const router = useRouter();
const rooms = ref([]);
const bookings = ref([]);
const weeklyBookings = ref([]);
const selectedDate = ref("");

const form = ref({
  room_id: "",
  borrower_name: "",
  borrower_contact: "",
  purpose: "",
  borrow_date: "",
  start_time: "",
  end_time: "",
  start_time_only: "",
  end_time_only: "",
  emails: "",
  status: "pending",
});

const codeFromQuery = router.currentRoute.value.query.code?.trim();
const codeFromBarcode = localStorage.getItem("user_code");
const codeFromNFC = localStorage.getItem("user_code_nfc");

const userCode = codeFromQuery || codeFromBarcode || codeFromNFC;
const user = ref({});

// ✅ Ambil user info
const getUser = async () => {
  if (!userCode) return;
  try {
    let endpoint = `/users/by-code/${userCode}`;
    if (userCode === codeFromNFC) endpoint = `/users/by-nfc/${userCode}`;

    const res = await axios.get(endpoint);
    user.value = res.data.data;

    form.value.borrower_name = user.value.name;
    form.value.borrower_contact = user.value.phone || user.value.contact;
    form.value.emails = user.value.email;
  } catch (err) {
    console.error("Gagal mengambil user:", err);
  }
};

// ✅ Ambil daftar ruangan
const getRooms = async () => {
  try {
    const res = await axios.get("/rooms");
    rooms.value = res.data;
  } catch (err) {
    Swal.fire("Gagal!", "Gagal mengambil data ruangan", "error");
  }
};

// ✅ Ambil peminjaman harian
const checkRoomAvailability = async () => {
  if (!form.value.room_id) {
    bookings.value = [];
    weeklyBookings.value = [];
    return;
  }
  const dateToCheck =
    selectedDate.value || new Date().toISOString().slice(0, 10);

  try {
    const res = await axios.get("/room-loans/check-availability", {
      params: { room_id: form.value.room_id, date: dateToCheck },
    });
    bookings.value = res.data;

    await getWeeklyBookings(form.value.room_id);
  } catch (err) {
    console.error("Gagal cek ketersediaan ruangan", err);
  }
};

// ✅ Ambil peminjaman mingguan
const getWeeklyBookings = async (roomId) => {
  try {
    const res = await axios.get(`/weekly-room-loans/by-room`, {
      params: { room_id: roomId },
    });
    weeklyBookings.value = res.data;
  } catch (err) {
    console.error("Gagal mengambil booking mingguan", err);
  }
};

// ✅ Event untuk FullCalendar
const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "timeGridWeek",
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  initialDate: new Date().toISOString().slice(0, 10),
  events: computed(() => {
    const dailyEvents = bookings.value.map((booking) => ({
      title: `${booking.borrower_name}${
        booking.purpose ? ` (${booking.purpose})` : ""
      }`,
      start: booking.start_time,
      end: booking.end_time,
      color: getStatusColor(booking.status),
      extendedProps: { type: "daily", data: booking },
    }));

    const weeklyEvents = weeklyBookings.value.map((booking) => ({
      title: `${booking.borrower_name}${
        booking.purpose ? ` (${booking.purpose})` : ""
      }`,
      daysOfWeek: [booking.day_of_week],
      startTime: booking.start_time,
      endTime: booking.end_time,
      startRecur: booking.start_date,
      endRecur: booking.end_date,
      color: getStatusColor(booking.status),
      extendedProps: { type: "weekly", data: booking },
    }));

    return [...dailyEvents, ...weeklyEvents];
  }),
  slotDuration: "00:30:00",
  slotMinTime: "07:00:00",
  slotMaxTime: "20:00:00",
  allDaySlot: false,
  locale: "id",
  selectable: true,
  selectMirror: true,
  selectOverlap: false,

  // ✅ Pilih tanggal & jam → isi form otomatis
  select: (info) => {
    const start = new Date(info.start);
    const end = new Date(info.end);

    const day = String(start.getDate()).padStart(2, "0");
    const month = String(start.getMonth() + 1).padStart(2, "0");
    const year = start.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const startTime = start.toTimeString().slice(0, 5);
    const endTime = end.toTimeString().slice(0, 5);

    form.value.borrow_date = formattedDate;
    form.value.start_time_only = startTime;
    form.value.end_time_only = endTime;

    // ✅ Tambahkan event sementara ke calendar
    info.view.calendar.addEvent({
      title: `Dipilih (${startTime}-${endTime})`,
      start: info.start,
      end: info.end,
      color: "#3B82F6", // biru
      className: "selected-slot",
    });

    Swal.fire({
      title: "Waktu Dipilih",
      html: `
      <p><strong>Tanggal:</strong> ${formattedDate}</p>
      <p><strong>Jam:</strong> ${startTime} - ${endTime}</p>
    `,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#2563EB",
    });
  },

  // ✅ Klik event → tampilkan detail
  eventClick: (info) => {
    const booking = info.event.extendedProps.data;
    const type = info.event.extendedProps.type;

    let detailHtml = `
      <div style="text-align: left; font-size: 16px;">
        <p><strong>Peminjam:</strong> ${booking.borrower_name}</p>
        <p><strong>Kontak:</strong> ${booking.borrower_contact || "-"}</p>
        <p><strong>Keperluan:</strong> ${booking.purpose || "-"}</p>
    `;

    if (type === "daily") {
      detailHtml += `
        <p><strong>Tanggal:</strong> ${new Date(
          booking.start_time
        ).toLocaleDateString("id-ID")}</p>
        <p><strong>Jam:</strong> ${booking.start_time
          .split("T")[1]
          .slice(0, 5)} - ${booking.end_time.split("T")[1].slice(0, 5)}</p>
      `;
    }

    if (type === "weekly") {
      detailHtml += `
        <p><strong>Hari:</strong> ${
          ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][
            booking.day_of_week
          ]
        }</p>
        <p><strong>Jam:</strong> ${booking.start_time.slice(
          0,
          5
        )} - ${booking.end_time.slice(0, 5)}</p>
        <p><strong>Berlaku:</strong> ${booking.start_date} s/d ${
        booking.end_date
      }</p>
      `;
    }

    detailHtml += `<p><strong>Status:</strong> ${booking.status}</p></div>`;

    Swal.fire({
      title: "Detail Peminjaman",
      html: detailHtml,
      icon: "info",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#2563EB",
      customClass: {
        popup: "rounded-xl shadow-lg",
        title: "text-xl font-bold mb-4",
        htmlContainer: "text-left",
      },
    });
  },
});

const handleSubmit = async () => {
  try {
    // Gabungkan tanggal & waktu menjadi ISO format
    const [day, month, year] = form.value.borrow_date.split("-");
    const startDateTime = `${year}-${month}-${day}T${form.value.start_time_only}:00`;
    const endDateTime = `${year}-${month}-${day}T${form.value.end_time_only}:00`;

    const payload = {
      room_id: form.value.room_id,
      borrower_name: form.value.borrower_name,
      borrower_contact: form.value.borrower_contact,
      purpose: form.value.purpose,
      start_time: startDateTime,
      end_time: endDateTime,
      emails: form.value.emails
        ? form.value.emails.split(",").map((email) => email.trim())
        : [],
      status: "pending",
    };

    const res = await axios.post("/room-loans", payload);

    Swal.fire({
      title: "Berhasil!",
      text: "Peminjaman berhasil diajukan.",
      icon: "success",
      confirmButtonText: "OK",
    });

    // Reset form setelah sukses
    form.value = {
      room_id: "",
      borrower_name: user.value.name,
      borrower_contact: user.value.phone || "",
      purpose: "",
      borrow_date: "",
      start_time_only: "",
      end_time_only: "",
      emails: user.value.email,
      status: "pending",
    };
  } catch (err) {
    if (err.response && err.response.status === 409) {
      Swal.fire({
        title: "Gagal!",
        text: err.response.data.message || "Ruangan sudah dibooking.",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat mengajukan peminjaman.",
        icon: "error",
      });
      console.error(err);
    }
  }
};

const getStatusColor = (status) => {
  const colors = {
    approved: "#10B981",
    pending: "#F59E0B",
    rejected: "#EF4444",
    cancelled: "#6B7280",
  };
  return colors[status] || "#3B82F6";
};

watch([() => form.value.room_id, selectedDate], checkRoomAvailability);

const goBack = () => router.push("/choose-action");

onMounted(() => {
  if (!userCode) {
    Swal.fire(
      "QR Belum Dipindai",
      "Silakan scan QR Code terlebih dahulu.",
      "warning"
    );
    router.push({ name: "ScanPage" });
    return;
  }
  getRooms();
  getUser();
  flatpickr("#borrowDate", {
    dateFormat: "d-m-Y",
    minDate: "today",
    onChange: (selectedDates, dateStr) => {
      if (selectedDates.length) {
        form.value.borrow_date = dateStr;
        selectedDate.value = selectedDates[0].toISOString().slice(0, 10);
      }
    },
  });
});
</script>
