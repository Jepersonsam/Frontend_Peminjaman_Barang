<template>
  <div
    class="kiosk-root min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-12 select-none"
  >
    <!-- Animated Gradient Background -->
    <div class="bg-layer"></div>
    <div class="noise-layer"></div>

    <!-- Floating Blobs -->
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <!-- Grid Lines Decoration -->
    <div class="grid-overlay absolute inset-0 pointer-events-none z-0"></div>

    <!-- Top Bar Navigation -->
    <nav
      class="absolute top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50"
    >
      <!-- Logo / Brand -->
      <div class="flex items-center gap-4">
        <div class="logo-icon">
          <svg
            class="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <div>
          <h2
            class="font-extrabold text-xl text-white tracking-tight leading-none"
          >
            Sistem Peminjaman Barang & Ruangan
          </h2>
          <p
            class="text-white/50 text-xs font-semibold tracking-widest uppercase mt-0.5"
          >
            Kiosk Mode
          </p>
        </div>
      </div>

      <!-- Exit Button -->
      <button
        @click="goToScan"
        class="exit-btn group flex items-center gap-2.5 px-5 py-2.5"
      >
        <span
          class="text-sm font-bold text-white/80 group-hover:text-white transition-colors"
          >Keluar</span
        >
        <div class="exit-btn-icon">
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
        </div>
      </button>
    </nav>

    <!-- Main Content -->
    <div
      class="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center"
    >
      <!-- Header -->
      <div class="text-center mb-14 animate-fade-in-down">
        <div class="welcome-pill mb-6">
          <span
            class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
          ></span>
          <span
            class="text-xs font-bold text-white/70 tracking-widest uppercase"
            >Sistem Aktif</span
          >
        </div>
        <h1 class="hero-title">Selamat Datang</h1>
        <p class="hero-subtitle">Pilih layanan yang ingin Anda gunakan</p>
      </div>

      <!-- Cards Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-2 mx-auto"
      >
        <!-- Card: Pinjam Barang -->
        <button
          @click="goToBorrow"
          class="action-card group animate-fade-in-up"
          style="animation-delay: 100ms"
        >
          <div class="action-card-glow glow-blue"></div>
          <div class="action-card-inner">
            <div
              class="card-icon-wrap bg-blue-500/20 text-blue-300 group-hover:bg-blue-500/30 group-hover:scale-110 transition-all duration-300"
            >
              <svg
                class="w-9 h-9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div class="card-content">
              <h3
                class="card-title group-hover:text-blue-300 transition-colors"
              >
                Pinjam Barang
              </h3>
              <p class="card-desc">
                Ajukan peminjaman barang inventaris dengan mudah
              </p>
            </div>
            <div
              class="card-arrow text-blue-400/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300"
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
                  stroke-width="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
          <!-- <div class="card-badge card-badge-blue">Tersedia</div> -->
        </button>

        <!-- Card: Booking Ruangan -->
        <button
          @click="goToRoomLoan"
          class="action-card group animate-fade-in-up"
          style="animation-delay: 300ms"
        >
          <div class="action-card-glow glow-purple"></div>
          <div class="action-card-inner">
            <div
              class="card-icon-wrap bg-purple-500/20 text-purple-300 group-hover:bg-purple-500/30 group-hover:scale-110 transition-all duration-300"
            >
              <svg
                class="w-9 h-9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div class="card-content">
              <h3
                class="card-title group-hover:text-purple-300 transition-colors"
              >
                Booking Ruangan
              </h3>
              <p class="card-desc">Cek ketersediaan dan reservasi ruangan</p>
            </div>
            <div
              class="card-arrow text-purple-400/40 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300"
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
                  stroke-width="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
          <!-- <div class="card-badge card-badge-purple">Baru</div> -->
        </button>

        <!-- Card: Status Pengajuan -->
        <button
          @click="goToAcceptBorrow"
          class="action-card group animate-fade-in-up"
          style="animation-delay: 400ms"
        >
          <div class="action-card-glow glow-amber"></div>
          <div class="action-card-inner">
            <div
              class="card-icon-wrap bg-amber-500/20 text-amber-300 group-hover:bg-amber-500/30 group-hover:scale-110 transition-all duration-300"
            >
              <svg
                class="w-9 h-9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="card-content">
              <h3
                class="card-title group-hover:text-amber-300 transition-colors"
              >
                Status Pengajuan
              </h3>
              <p class="card-desc">Pantau status persetujuan peminjaman Anda</p>
            </div>
            <div
              class="card-arrow text-amber-400/40 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300"
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
                  stroke-width="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
          <!-- <div class="card-badge card-badge-amber">Real-time</div> -->
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="absolute bottom-6 w-full text-center z-10">
      <p class="text-white/20 text-xs font-semibold tracking-widest uppercase">
        &copy; {{ new Date().getFullYear() }} Sistem Inventaris Digital &mdash;
        Kiosk v1.0
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";

const router = useRouter();
const route = useRoute();
const userCode = route.query.code;
const userStore = useUserStore();

const hasSecret = ref(false);

onMounted(() => {
  const secret = localStorage.getItem("secret_id");
  hasSecret.value = !!secret;
});

const goToBorrow = () => {
  router.push({ name: "Borrow", query: { code: userCode } });
};

const goToRoomLoan = () => {
  router.push({ name: "RoomLoan", query: { code: userCode } });
};

const goToAcceptBorrow = () => {
  router.push({ name: "AcceptBorrow", query: { code: userCode } });
};

const goToScan = () => {
  userStore.clearUser();
  router.push({ name: "Scan" });
};
</script>

<style scoped>
/* ── Root ── */
.kiosk-root {
  font-family: "Inter", system-ui, sans-serif;
}

/* ── Background ── */
.bg-layer {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%);
  z-index: 0;
}
.noise-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* ── Blobs ── */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: blobMove 12s infinite ease-in-out;
}
.blob-1 {
  top: -15%;
  left: -10%;
  width: 480px;
  height: 480px;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.35) 0%,
    transparent 70%
  );
}
.blob-2 {
  top: -5%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.25) 0%,
    transparent 70%
  );
  animation-delay: 3s;
}
.blob-3 {
  bottom: -20%;
  left: 20%;
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.2) 0%,
    transparent 70%
  );
  animation-delay: 6s;
}
@keyframes blobMove {
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -40px) scale(1.08);
  }
  66% {
    transform: translate(-20px, 25px) scale(0.95);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

/* ── Grid Overlay ── */
.grid-overlay {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ── Logo Icon ── */
.logo-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
}

/* ── Exit Button ── */
.exit-btn {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition: all 0.2s;
}
.exit-btn:hover {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.3);
}
.exit-btn:active {
  transform: scale(0.95);
}
.exit-btn-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f87171;
}

/* ── Welcome Pill ── */
.welcome-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
}

/* ── Hero Typography ── */
.hero-title {
  font-size: clamp(2.8rem, 8vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: #fff;
  margin-bottom: 1rem;
}
.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.45);
  font-weight: 500;
}

/* ── Action Card ── */
.action-card {
  position: relative;
  border-radius: 28px;
  padding: 2px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.04) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  text-align: left;
}
.action-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
}
.action-card:active {
  transform: scale(0.98);
}

.action-card-glow {
  position: absolute;
  inset: 0;
  border-radius: 28px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}
.action-card:hover .action-card-glow {
  opacity: 1;
}
.glow-blue {
  background: radial-gradient(
    ellipse at top left,
    rgba(59, 130, 246, 0.15) 0%,
    transparent 60%
  );
}
.glow-emerald {
  background: radial-gradient(
    ellipse at top left,
    rgba(16, 185, 129, 0.15) 0%,
    transparent 60%
  );
}
.glow-purple {
  background: radial-gradient(
    ellipse at top left,
    rgba(139, 92, 246, 0.15) 0%,
    transparent 60%
  );
}
.glow-amber {
  background: radial-gradient(
    ellipse at top left,
    rgba(245, 158, 11, 0.15) 0%,
    transparent 60%
  );
}

.action-card-inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 28px;
  border-radius: 26px;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(16px);
  min-height: 130px;
}

/* ── Card Icon ── */
.card-icon-wrap {
  flex-shrink: 0;
  width: 68px;
  height: 68px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Card Content ── */
.card-content {
  flex: 1;
}
.card-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #f1f5f9;
  margin-bottom: 6px;
  line-height: 1.2;
  letter-spacing: -0.01em;
}
.card-desc {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.38);
  font-weight: 500;
  line-height: 1.5;
}

/* ── Card Arrow ── */
.card-arrow {
  flex-shrink: 0;
}

/* ── Card Badge ── */
.card-badge {
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 999px;
  backdrop-filter: blur(8px);
}
.card-badge-blue {
  background: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
  border: 1px solid rgba(59, 130, 246, 0.2);
}
.card-badge-emerald {
  background: rgba(16, 185, 129, 0.15);
  color: #6ee7b7;
  border: 1px solid rgba(16, 185, 129, 0.2);
}
.card-badge-purple {
  background: rgba(139, 92, 246, 0.15);
  color: #c4b5fd;
  border: 1px solid rgba(139, 92, 246, 0.2);
}
.card-badge-amber {
  background: rgba(245, 158, 11, 0.15);
  color: #fcd34d;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

/* ── Animations ── */
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fade-in-down 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}
</style>
