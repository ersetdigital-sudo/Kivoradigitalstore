export const ORDERS_KEY = "kivoradigitalstore_invoices";

// Nomor CS diisi lewat env NEXT_PUBLIC_WHATSAPP (format internasional tanpa "+").
const WA_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP ?? "").replace(/\D/g, "");
export const ADMIN_WA = WA_NUMBER.startsWith("62") ? `0${WA_NUMBER.slice(2)}` : WA_NUMBER;
export const WA_LINK = WA_NUMBER ? `https://wa.me/${WA_NUMBER}` : "";
export const PAID_MESSAGE = "Terima kasih, pembayaran Anda sedang diproses";

export type RecentInvoice = {
  ref: string;
  name: string;
  item: string;
  slug: string;
  amount: number;
  createdAt: number;
};

export const rememberInvoice = (entry: RecentInvoice): void => {
  if (typeof window === "undefined") return;
  const ref = entry.ref.trim().toUpperCase();
  if (!ref) return;
  try {
    const list = loadInvoices().filter((item) => item.ref !== ref);
    window.localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify([{ ...entry, ref }, ...list].slice(0, 5)),
    );
  } catch {
    /* storage unavailable */
  }
};

export const loadInvoices = (): RecentInvoice[] => {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(ORDERS_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const row = item as Record<string, unknown>;
      if (typeof row.ref !== "string") return [];
      return [
        {
          ref: row.ref,
          name: typeof row.name === "string" ? row.name : "",
          item: typeof row.item === "string" ? row.item : "",
          slug: typeof row.slug === "string" ? row.slug : "ml",
          amount: Number(row.amount) || 0,
          createdAt: Number(row.createdAt) || Date.now(),
        },
      ];
    });
  } catch {
    return [];
  }
};

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
