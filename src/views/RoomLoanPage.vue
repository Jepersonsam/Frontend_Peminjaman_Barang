<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 relative overflow-hidden flex justify-center"
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

    <div class="relative z-10 w-full max-w-5xl">
      <!-- Header Section -->
      <div class="flex items-center justify-between mb-8">
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

        <div class="text-right">
          <h1
            class="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight"
          >
            Peminjaman Ruangan
          </h1>
          <p class="text-sm md:text-base text-slate-500 font-medium">
            Jadwalkan penggunaan ruangan dengan mudah
          </p>
        </div>
      </div>

      <div
        class="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-6 md:p-10 border border-white/50 relative overflow-hidden"
      >
        <!-- Room Selection -->
        <div class="mb-8 max-w-xl mx-auto">
          <label
            class="block font-bold text-sm text-slate-500 uppercase tracking-wider mb-3 text-center"
          >
            Pilih Ruangan yang Tersedia
          </label>

          <Listbox v-model="form.room_id">
            <div class="relative mt-1">
              <ListboxButton
                class="relative w-full cursor-pointer rounded-2xl bg-white py-4 pl-6 pr-12 text-left border border-slate-200 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all text-slate-700 font-semibold text-lg"
              >
                <span class="block truncate">
                  {{
                    rooms.find((room) => room.id === form.room_id)
                      ? rooms.find((room) => room.id === form.room_id).name +
                        " - " +
                        rooms.find((room) => room.id === form.room_id).location
                      : "Pilih Ruangan..."
                  }}
                </span>
                <span
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4"
                >
                  <ChevronUpDownIcon
                    class="h-6 w-6 text-slate-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <Transition
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-white py-2 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50 scroller"
                >
                  <ListboxOption
                    v-for="room in rooms"
                    :key="room.id"
                    :value="room.id"
                    as="template"
                    v-slot="{ active, selected }"
                  >
                    <li
                      :class="[
                        active ? 'bg-blue-50 text-blue-900' : 'text-slate-900',
                        'relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors',
                      ]"
                    >
                      <span
                        :class="[
                          selected ? 'font-bold' : 'font-normal',
                          'block truncate',
                        ]"
                      >
                        {{ room.name }} -
                        <span class="text-slate-500 text-xs uppercase">{{
                          room.location
                        }}</span>
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>
        </div>

        <!-- Calendar Section -->
        <Transition name="fade">
          <div v-if="form.room_id" class="mt-8">
            <div class="flex items-center gap-3 mb-6">
              <div
                class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-xl text-slate-800">
                  Jadwal Penggunaan
                </h3>
                <p class="text-sm text-slate-500">
                  Klik dan tarik pada area kosong untuk meminjam
                </p>
              </div>
            </div>

            <div
              class="bg-white p-4 rounded-3xl border border-slate-100 shadow-inner overflow-hidden custom-calendar-wrapper"
            >
              <FullCalendar
                :options="calendarOptions"
                class="custom-calendar-font"
              />
            </div>
          </div>
          <!-- Empty State for Calendar -->
          <div
            v-else
            class="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50"
          >
            <div
              class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300"
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
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-slate-400">
              Belum ada ruangan yang dipilih
            </h3>
            <p class="text-slate-400">
              Silakan pilih ruangan di atas untuk melihat jadwal.
            </p>
          </div>
        </Transition>
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
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

const rooms = ref([]);
const bookings = ref([]);
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
    userStore.setUser(user.value);
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
    return;
  }
  const dateToCheck =
    selectedDate.value || new Date().toISOString().slice(0, 10);
  try {
    const res = await axios.get("/room-loans/check-availability", {
      params: { room_id: form.value.room_id, date: dateToCheck },
    });
    bookings.value = res.data;
  } catch (err) {
    console.error("Gagal cek ketersediaan ruangan", err);
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
    return bookings.value.map((booking) => ({
      title: `${booking.borrower_name}${
        booking.purpose ? ` (${booking.purpose})` : ""
      }`,
      start: booking.start_time,
      end: booking.end_time,
      color: getStatusColor(booking.status),
      extendedProps: { type: "daily", data: booking },
    }));
  }),
  slotDuration: "00:30:00",
  slotMinTime: "07:00:00",
  slotMaxTime: "21:00:00",
  allDaySlot: false,
  selectable: true,
  selectMirror: true,
  selectOverlap: false,
  height: "auto",
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
      '<span class="text-xl font-bold text-slate-800">Detail Peminjaman</span>',
    html: `
      <div class="flex flex-col gap-3 text-left w-full">
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <strong class="text-xs text-slate-400 uppercase font-bold tracking-wider">Nama Peminjam</strong>
          <div class="text-slate-800 font-medium">${booking.borrower_name}</div>
        </div>
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <strong class="text-xs text-slate-400 uppercase font-bold tracking-wider">Kontak</strong>
          <div class="text-slate-800 font-medium">${
            booking.borrower_contact || "-"
          }</div>
        </div>
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <strong class="text-xs text-slate-400 uppercase font-bold tracking-wider">Email</strong>
          <div class="text-slate-800 font-medium">${
            Array.isArray(booking.emails)
              ? booking.emails.join(", ")
              : booking.emails || "-"
          }</div>
        </div>
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <strong class="text-xs text-slate-400 uppercase font-bold tracking-wider">Tujuan</strong>
          <div class="text-slate-800 font-medium">${
            booking.purpose || "-"
          }</div>
        </div>
        <div class="grid grid-cols-2 gap-3">
             <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <strong class="text-xs text-slate-400 uppercase font-bold tracking-wider">Waktu</strong>
                <div class="text-slate-800 font-medium text-sm">
                    ${formatDateTime(booking.start_time)} <br> ${formatDateTime(
      booking.end_time,
    )}
                </div>
            </div>
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center items-center">
                <strong class="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Status</strong>
                <span class="px-3 py-1 rounded-full text-xs font-bold text-white uppercase" style="background-color:${getStatusColor(
                  booking.status,
                )}">${booking.status}</span>
            </div>
        </div>
      </div>
    `,
    showConfirmButton: true,
    confirmButtonText: "Tutup",
    confirmButtonColor: "#3b82f6",
    buttonsStyling: true,
    customClass: {
      popup: "rounded-3xl shadow-xl border border-slate-100",
      confirmButton: "rounded-xl px-6 py-2.5 font-bold",
    },
    width: "450px",
  });
};

/** === Format DateTime === */
const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  return `${date.toLocaleDateString("id-ID")} ${date.toLocaleTimeString(
    "id-ID",
    { hour: "2-digit", minute: "2-digit" },
  )}`;
};

const handleDrag = (info) => {
  const start = new Date(info.start);
  const end = new Date(info.end);
  const now = new Date();
  now.setSeconds(0, 0);

  if (start < now) {
    Swal.fire({
      icon: "warning",
      title: "Waktu Tidak Valid",
      text: "Anda tidak dapat memilih waktu yang sudah lewat.",
      confirmButtonColor: "#f59e0b",
      customClass: { popup: "rounded-3xl", confirmButton: "rounded-xl" },
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

  // Render form manually inside Swal
  Swal.fire({
    title:
      '<span class="text-2xl font-bold text-slate-800">Booking Form</span>',
    html: `
        <div class="flex flex-col gap-4 text-left mt-2">
            <div class="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                 <div>
                    <label class="block text-xs font-bold text-blue-800 uppercase mb-1">Tanggal</label>
                    <div class="font-bold text-slate-700">${formattedDate}</div>
                 </div>
                 <div class="text-right">
                    <label class="block text-xs font-bold text-blue-800 uppercase mb-1">Jam</label>
                    <div class="font-bold text-slate-700">${startTime} - ${endTime}</div>
                 </div>
            </div>
            
            <div>
                 <label class="block text-sm font-semibold text-slate-600 mb-1">Nama Peminjam</label>
                 <input type="text" value="${
                   user.value.name
                 }" readonly class="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium focus:outline-none cursor-not-allowed">
            </div>

             <div>
                 <label class="block text-sm font-semibold text-slate-600 mb-1">Kontak</label>
                 <input type="text" value="${
                   user.value.phone || "-"
                 }" readonly class="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium focus:outline-none cursor-not-allowed">
            </div>

            <div class="relative">
                 <label class="block text-sm font-semibold text-slate-600 mb-1">Email <span class="text-xs font-normal text-slate-400">(Pisahkan koma)</span></label>
                 <input id="emailInput" class="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" value="${
                   user.value.email ? user.value.email + ", " : ""
                 }">
                 <div id="emailSuggestions" class="absolute z-50 w-full bg-white border border-slate-200 shadow-xl rounded-xl mt-1 max-h-40 overflow-y-auto hidden"></div>
            </div>

             <div>
                 <label class="block text-sm font-semibold text-slate-600 mb-1">Tujuan Penggunaan <span class="text-red-500">*</span></label>
                 <input id="purposeInput" class="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Contoh: Rapat Divisi Tech">
            </div>
        </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Ajukan Booking",
    cancelButtonText: "Batal",
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#94a3b8",
    width: "500px",
    customClass: {
      popup: "rounded-3xl",
      confirmButton: "rounded-xl px-6 py-2.5 font-bold",
      cancelButton: "rounded-xl px-6 py-2.5 font-bold",
    },
    didOpen: () => {
      // Setup Autocomplete logic inside Swal
      const emailInput = document.getElementById("emailInput");
      const suggestionsBox = document.getElementById("emailSuggestions");

      if (emailInput && suggestionsBox) {
        emailInput.addEventListener("input", async (e) => {
          const parts = e.target.value.split(",");
          const query = parts[parts.length - 1].trim();

          if (!query) {
            suggestionsBox.classList.add("hidden");
            return;
          }

          const emails = await fetchEmails(query);
          suggestionsBox.innerHTML = "";

          if (!emails.length) {
            suggestionsBox.classList.add("hidden");
            return;
          }

          suggestionsBox.classList.remove("hidden");

          emails.forEach((email) => {
            const div = document.createElement("div");
            div.className =
              "px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-slate-700";
            div.textContent = email;
            div.onclick = () => {
              let current = emailInput.value.split(",");
              current.pop(); // Remove partial
              current.push(email);
              let newValue = current.join(", ").trim();
              if (!newValue.endsWith(",")) newValue += ", ";
              emailInput.value = newValue;
              suggestionsBox.classList.add("hidden");
              emailInput.focus();
            };
            suggestionsBox.appendChild(div);
          });
        });

        // Hide on click outside
        document.addEventListener("click", (e) => {
          if (
            !emailInput.contains(e.target) &&
            !suggestionsBox.contains(e.target)
          ) {
            suggestionsBox.classList.add("hidden");
          }
        });
      }
    },
    preConfirm: () => {
      const purpose = document.getElementById("purposeInput").value.trim();
      const emails = document
        .getElementById("emailInput")
        .value.split(",")
        .map((e) => e.trim())
        .filter((e) => e);

      if (!purpose) {
        Swal.showValidationMessage("Mohon isi tujuan penggunaan ruangan");
        return false;
      }
      form.value.purpose = purpose;
      form.value.emails = emails;
      return true;
    },
  }).then((result) => {
    if (result.isConfirmed) handleSubmit();
  });
};

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
      title: "Booking Berhasil!",
      text: "Pengajuan peminjaman ruangan telah dikirim.",
      icon: "success",
      confirmButtonText: "Selesai",
      confirmButtonColor: "#10b981",
      customClass: {
        popup: "rounded-3xl",
        confirmButton: "rounded-xl px-6 py-2.5 font-bold",
      },
    });

    // Refresh bookings
    checkRoomAvailability();
  } catch (err) {
    Swal.fire({
      title: "Gagal!",
      text:
        err.response?.data?.message ||
        "Terjadi kesalahan saat mengajukan peminjaman",
      icon: "error",
      customClass: { popup: "rounded-3xl", confirmButton: "rounded-xl" },
    });
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
    Swal.fire({
      title: "Akses Ditolak",
      text: "Silakan scan QR Code identitas Anda terlebih dahulu.",
      icon: "warning",
      confirmButtonText: "Ke Halaman Scan",
      customClass: { popup: "rounded-3xl", confirmButton: "rounded-xl" },
    }).then(() => {
      router.push({ name: "ScanPage" });
    });
    return;
  }

  await getRooms();
  await getUser();

  if (!user.value || !user.value.id) {
    Swal.fire({
      title: "User Tidak Ditemukan",
      text: "Data pengguna tidak valid. Silakan coba scan ulang.",
      icon: "error",
      customClass: { popup: "rounded-3xl", confirmButton: "rounded-xl" },
    }).then(() => {
      router.push({ name: "ScanPage" });
    });
  }
});
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom Scrollbar */
.scroller::-webkit-scrollbar {
  width: 6px;
}
.scroller::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.scroller::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}

/* Calendar Customization */
.custom-calendar-font {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
}
:deep(.fc-header-toolbar) {
  margin-bottom: 1.5rem !important;
}
:deep(.fc-toolbar-title) {
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: #1e293b;
}
:deep(.fc-button) {
  background-color: white !important;
  border: 1px solid #e2e8f0 !important;
  color: #475569 !important;
  text-transform: capitalize !important;
  font-weight: 600 !important;
  border-radius: 0.5rem !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
}
:deep(.fc-button:hover) {
  background-color: #f8fafc !important;
}
:deep(.fc-button-active) {
  background-color: #3b82f6 !important;
  color: white !important;
  border-color: #3b82f6 !important;
}
:deep(.fc-event) {
  border: none !important;
  padding: 2px 4px !important;
  border-radius: 6px !important;
  font-size: 0.85rem !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
