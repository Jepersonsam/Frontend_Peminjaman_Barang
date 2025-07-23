// src/utils/secureStorage.js
import CryptoJS from "crypto-js";

const SECRET_KEY = "S3CRET-K3Y-!@#"; // Ganti dengan kunci rahasia yang aman

export function encrypt(data) {
  const stringified = typeof data === "string" ? data : JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
}

export function decrypt(ciphertext) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (e) {
    console.error("Gagal mendekripsi:", e);
    return null;
  }
}
