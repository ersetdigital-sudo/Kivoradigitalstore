"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PRODUCT_ORDER, PRODUCTS } from "@/lib/catalog";
import { Icon } from "./Icon";

const MAX_HITS = 6;

function findHits(term: string): string[] {
  if (!term) return [];
  return PRODUCT_ORDER.filter((slug) =>
    `${PRODUCTS[slug].name} ${PRODUCTS[slug].pub} ${slug}`.toLowerCase().includes(term),
  ).slice(0, MAX_HITS);
}

function Results({
  query,
  hits,
  onPick,
}: {
  query: string;
  hits: string[];
  onPick: () => void;
}) {
  if (!hits.length) {
    return (
      <div className="hs-empty">
        Belum ada &quot;{query.trim()}&quot;. Coba: ml, free fire, pulsa.
      </div>
    );
  }
  return (
    <ul className="hs-list" role="listbox" aria-label="Hasil pencarian">
      {hits.map((slug) => {
        const product = PRODUCTS[slug];
        return (
          <li key={slug} role="option" aria-selected="false">
            <Link href={`/topup?g=${slug}`} className="hs-item" onClick={onPick}>
              <span className="hs-badge dsp" style={{ background: product.bg }}>
                {product.lt}
              </span>
              <span className="hs-text">
                <b>{product.name}</b>
                <small>{product.pub}</small>
              </span>
              <Icon name="arrow" className="hs-go" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Pencarian game & layanan di navbar: kolom di desktop, tombol + panel di ponsel. */
export function HeaderSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const term = query.trim().toLowerCase();
  const hits = findHits(term);

  const closeAll = () => {
    setQuery("");
    setFocused(false);
    setMobileOpen(false);
  };

  // Pindah halaman -> tutup pencarian.
  useEffect(() => {
    setQuery("");
    setFocused(false);
    setMobileOpen(false);
  }, [pathname]);

  // Klik di luar atau tekan Esc -> tutup dropdown.
  useEffect(() => {
    if (!focused && !mobileOpen) return;
    const onDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setFocused(false);
        setMobileOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFocused(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [focused, mobileOpen]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!term) return;
    router.push(hits.length ? `/topup?g=${hits[0]}` : "/game");
    closeAll();
  };

  const field = (idSuffix: string, autoFocus = false) => (
    <form className="hs-field" role="search" onSubmit={submit}>
      <Icon name="search" className="hs-ico" />
      <input
        id={`hs-input-${idSuffix}`}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setFocused(true)}
        className="hs-input"
        placeholder="Cari game atau layanan"
        autoComplete="off"
        autoFocus={autoFocus}
        aria-label="Cari game atau layanan"
      />
    </form>
  );

  return (
    <div ref={rootRef} className="hs">
      {/* Desktop */}
      <div className="hs-desktop hidden lg:block">
        {field("d")}
        {focused && term && (
          <div className="hs-pop">
            <Results query={query} hits={hits} onPick={closeAll} />
          </div>
        )}
      </div>

      {/* Ponsel & tablet */}
      <button
        type="button"
        className="btn btn-w h-[44px] min-h-[44px] w-[44px] p-0 lg:hidden"
        aria-label={mobileOpen ? "Tutup pencarian" : "Buka pencarian"}
        aria-expanded={mobileOpen}
        onClick={() => {
          setMobileOpen((open) => !open);
          setQuery("");
        }}
      >
        <Icon name={mobileOpen ? "x" : "search"} />
      </button>
      {mobileOpen && (
        <div className="hs-m lg:hidden">
          {field("m", true)}
          {term && <Results query={query} hits={hits} onPick={closeAll} />}
        </div>
      )}
    </div>
  );
}
