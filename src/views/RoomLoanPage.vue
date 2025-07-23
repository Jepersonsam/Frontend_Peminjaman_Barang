<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-500 via-white to-indigo-500 py-8 px-4"
  >
    <div
      class="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-gray-100"
    >
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800">Peminjaman Ruangan</h1>
        <p class="text-gray-500">Pilih ruangan dan buat jadwal peminjaman</p>
      </div>

      <!-- Pilih Ruangan -->
      <div class="mb-6">
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

      <!-- Tampilkan Kalender jika sudah pilih ruangan -->
      <div v-if="form.room_id" class="mt-6">
        <h3 class="font-semibold text-lg text-gray-800 mb-2">
          Jadwal Ruangan:
        </h3>
        <FullCalendar :options="calendarOptions" />
      </div>

      <!-- Tombol kembali -->
      <div class="text-center mt-8">
        <button
          @click="goBack"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-8 py-3 rounded-2xl"
        >
          Kembali
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "@/services/api";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useUserStore } from "@/stores/userStore"; // 🔥 Pinia Store

const router = useRouter();
const userStore = useUserStore(); // Ambil user dari Pinia

const rooms = ref([]);
const bookings = ref([]);
const weeklyBookings = ref([]);
const selectedDate = ref("");

const user = ref({});
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

const route = router.currentRoute.value;
const userCode =
  userStore.code || userStore.code_nfc || route.query.code?.trim();

/** === Ambil data user === */
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
    let endpoint = `/users/by-code/${userCode}`;
    if (userCode === userStore.code_nfc) endpoint = `/users/by-nfc/${userCode}`;
    const res = await axios.get(endpoint);
    user.value = res.data.data;
    userStore.setUser(user.value); // ✅ Simpan user ke Pinia
  } catch (err) {
    console.error("Gagal mengambil user:", err);
  }
};

/** === Ambil data ruangan === */
const getRooms = async () => {
  try {
    const res = await axios.get("/rooms");
    rooms.value = res.data.data.filter((room) => room.is_active);
  } catch (err) {
    Swal.fire("Gagal!", "Gagal mengambil data ruangan", "error");
  }
};

/** === Cek ketersediaan ruangan === */
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

/** === Ambil jadwal mingguan === */
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

/** === Opsi kalender === */
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
  selectable: true,
  selectMirror: true,
  selectOverlap: false,
  select: (info) => handleDrag(info),
  eventClick: (info) => showBookingDetail(info.event.extendedProps.data),
});

/** === Autocomplete Email === */
const fetchEmails = async (query) => {
  if (!query) return [];
  try {
    const res = await axios.get("/autocomplete-email", { params: { query } });
    return res.data;
  } catch (err) {
    console.error("Gagal mengambil email:", err);
    return [];
  }
};

/** === Detail Booking === */
const showBookingDetail = (booking) => {
  Swal.fire({
    title:
      '<div style="font-size:1.6rem; font-weight:800; color:#1e293b;">Detail Peminjaman</div>',
    html: `
      <div style="display:flex; flex-direction:column; gap:12px; text-align:left; width:100%; padding:8px;">
        <div style="background:#DDDDDD; padding:10px 14px; border-radius:10px;">
          <strong style="color:#374151;">Nama Peminjam:</strong><br>${
            booking.borrower_name
          }
        </div>
        <div style="background:#DDDDDD; padding:10px 14px; border-radius:10px;">
          <strong style="color:#374151;">Kontak:</strong><br>${
            booking.borrower_contact || "-"
          }
        </div>
        <div style="background:#DDDDDD; padding:10px 14px; border-radius:10px;">
          <strong style="color:#374151;">Email:</strong><br>${
            Array.isArray(booking.emails)
              ? booking.emails.join(", ")
              : booking.emails || "-"
          }
        </div>
        <div style="background:#DDDDDD; padding:10px 14px; border-radius:10px;">
          <strong style="color:#374151;">Tujuan:</strong><br>${
            booking.purpose || "-"
          }
        </div>
        <div style="background:#DDDDDD; padding:10px 14px; border-radius:10px;">
          <strong style="color:#374151;">Waktu:</strong><br>${formatDateTime(
            booking.start_time
          )} - ${formatDateTime(booking.end_time)}
        </div>
        <div style="background:#DDDDDD; padding:10px 14px; border-radius:10px;">
          <strong style="color:#374151;">Status:</strong><br><span style="color:${getStatusColor(
            booking.status
          )}; font-weight:600;">${booking.status.toUpperCase()}</span>
        </div>
      </div>
    `,
    confirmButtonText: "Tutup",
    width: "600px",
    background: "linear-gradient(135deg, #fff, #f9fafb)",
    color: "#111827",
    confirmButtonColor: "#2563eb",
  });
};

/** === Format DateTime === */
const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  return `${date.toLocaleDateString("id-ID")} ${date.toLocaleTimeString(
    "id-ID",
    { hour: "2-digit", minute: "2-digit" }
  )}`;
};

/** === Handle Drag (Pilih Jadwal) === */
const handleDrag = (info) => {
  const start = new Date(info.start);
  const end = new Date(info.end);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (start < today) {
    Swal.fire({
      icon: "warning",
      title: "Tanggal Tidak Valid",
      text: "Anda tidak dapat memilih tanggal yang sudah lewat.",
    });
    return;
  }

  const day = String(start.getDate()).padStart(2, "0");
  const month = String(start.getMonth() + 1).padStart(2, "0");
  const year = start.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  const startTime = start.toTimeString().slice(0, 5);
  const endTime = end.toTimeString().slice(0, 5);

  form.value.borrow_date = formattedDate;
  form.value.start_time_only = startTime;
  form.value.end_time_only = endTime;

  Swal.fire({
    title:
      '<div style="font-size: 1.7rem; font-weight: 800; color: #1e293b;">Konfirmasi Peminjaman</div>',
    html: bookingFormHTML(formattedDate, startTime, endTime),
    showCancelButton: true,
    confirmButtonText: "Ajukan",
    cancelButtonText: "Batal",
    width: "700px",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(249,250,251,0.95))",
    preConfirm: () => {
      const purpose = document.getElementById("purposeInput").value.trim();
      const emails = document
        .getElementById("emailInput")
        .value.split(",")
        .map((e) => e.trim())
        .filter((e) => e);
      if (!purpose) {
        Swal.showValidationMessage("Tujuan harus diisi");
        return false;
      }
      form.value.purpose = purpose;
      form.value.emails = emails;
      return true;
    },
  }).then((result) => {
    if (result.isConfirmed) handleSubmit();
  });

  // Autocomplete Email
  setTimeout(() => {
    const emailInput = document.getElementById("emailInput");
    const suggestionsBox = document.getElementById("emailSuggestions");

    if (emailInput && suggestionsBox) {
      emailInput.addEventListener("input", async (e) => {
        const query = e.target.value.split(",").pop().trim();
        if (!query) {
          suggestionsBox.style.display = "none";
          return;
        }

        const emails = await fetchEmails(query);
        suggestionsBox.innerHTML = "";

        if (!emails.length) {
          suggestionsBox.style.display = "none";
          return;
        }

        emails.forEach((email) => {
          const div = document.createElement("div");
          div.textContent = email;
          div.style.padding = "8px";
          div.style.cursor = "pointer";
          div.addEventListener("click", () => {
            let current = emailInput.value.split(",");
            current.pop();
            current.push(email);
            let newValue = current.join(", ").trim();

            // Tambahkan koma di akhir jika belum ada
            if (!newValue.endsWith(",")) {
              newValue += ", ";
            }

            emailInput.value = newValue;
            suggestionsBox.style.display = "none";
          });
          suggestionsBox.appendChild(div);
        });

        suggestionsBox.style.display = "block";
      });
    }
  }, 500);
};

/** === Booking Form HTML === */
const bookingFormHTML = (formattedDate, startTime, endTime) => `
  <div style="display:flex; flex-direction:column; gap:16px; text-align:left; width:100%;">
    <div>
      <label style="font-weight:600; color:#374151;">Nama Peminjam</label>
      <input style="width:100%; padding:12px; border:1px solid #d1d5db; border-radius:12px;" value="${
        user.value.name
      }" readonly>
    </div>
    <div>
      <label style="font-weight:600; color:#374151;">Kontak</label>
      <input style="width:100%; padding:12px; border:1px solid #d1d5db; border-radius:12px;" value="${
        user.value.phone || "-"
      }" readonly>
    </div>
    <div style="position: relative; z-index:10;">
      <label style="font-weight:600; color:#374151;">Email (pisahkan dengan koma)</label>
      <input id="emailInput" style="width:100%; padding:12px; border:1px solid #d1d5db; border-radius:12px;" value="${
        user.value.email ? user.value.email + ", " : ""
      }">
      <div id="emailSuggestions" style="position: absolute; top: 100%; left: 0; width: 100%; background: white; border: 1px solid #ddd; border-top: none; max-height: 150px; overflow-y: auto; display: none; z-index: 99999; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"></div>
    </div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
      <div>
        <label style="font-weight:600; color:#374151;">Tanggal</label>
        <input style="width:100%; padding:12px; border:1px solid #d1d5db; border-radius:12px;" value="${formattedDate}" readonly>
      </div>
      <div>
        <label style="font-weight:600; color:#374151;">Jam</label>
        <input style="width:100%; padding:12px; border:1px solid #d1d5db; border-radius:12px;" value="${startTime} - ${endTime}" readonly>
      </div>
    </div>
    <div>
      <label style="font-weight:600; color:#374151;">Tujuan</label>
      <input id="purposeInput" style="width:100%; padding:12px; border:1px solid #d1d5db; border-radius:12px;" placeholder="Masukkan tujuan" required>
    </div>
  </div>
`;

/** === Submit Peminjaman === */
const handleSubmit = async () => {
  try {
    const [day, month, year] = form.value.borrow_date.split("-");
    const startDateTime = `${year}-${month}-${day}T${form.value.start_time_only}:00`;
    const endDateTime = `${year}-${month}-${day}T${form.value.end_time_only}:00`;

    const payload = {
      room_id: form.value.room_id,
      user_id: user.value.id,
      borrower_name: user.value.name,
      borrower_contact: user.value.phone || "",
      purpose: form.value.purpose,
      start_time: startDateTime,
      end_time: endDateTime,
      emails: form.value.emails,
      status: "pending",
    };

    await axios.post("/room-loans", payload);

    Swal.fire({
      title: "Berhasil!",
      text: "Peminjaman berhasil diajukan.",
      icon: "success",
      confirmButtonText: "OK",
      background: "linear-gradient(135deg, #fff, #f9fafb)",
      color: "#111827",
      confirmButtonColor: "#2563eb",
    });
  } catch (err) {
    Swal.fire("Error!", "Gagal mengajukan peminjaman", "error");
  }
};

/** === Status Color === */
const getStatusColor = (status) => {
  const colors = {
    approved: "#10B981",
    pending: "#F59E0B",
    rejected: "#EF4444",
  };
  return colors[status] || "#3B82F6";
};

watch(() => form.value.room_id, checkRoomAvailability);

const goBack = () => router.push("/choose-action");

/** === Lifecycle === */
onMounted(async () => {
  if (!userCode) {
    Swal.fire(
      "QR Belum Dipindai",
      "Silakan scan QR Code terlebih dahulu.",
      "warning"
    );
    router.push({ name: "ScanPage" });
    return;
  }

  await getRooms();
  await getUser();

  // Kalau user tetap null setelah getUser
  if (!user.value || !user.value.id) {
    Swal.fire(
      "User tidak ditemukan",
      "Silakan scan ulang kartu atau QR.",
      "error"
    );
    router.push({ name: "ScanPage" });
  }
});
</script>
