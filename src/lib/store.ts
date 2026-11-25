// Nomor CS diisi lewat env NEXT_PUBLIC_WHATSAPP (format internasional tanpa "+").
const WA_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP ?? "").replace(/\D/g, "");
export const ADMIN_WA = WA_NUMBER.startsWith("62") ? `0${WA_NUMBER.slice(2)}` : WA_NUMBER;
export const WA_LINK = WA_NUMBER ? `https://wa.me/${WA_NUMBER}` : "";
export const PAID_MESSAGE = "Terima kasih, pembayaran Anda sedang diproses";

export const waLink = (message: string) => `${WA_LINK}?text=${encodeURIComponent(message)}`;

export const formatDateTime = (value: number) =>
  new Date(value).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatDate = (value: number) =>
  new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const formatTime = (value: number) =>
  new Date(value).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
