import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Kivoradigitalstore beranda">
      <b>K</b>
      <span>
        kivora<small>digitalstore</small>
      </span>
    </Link>
  );
}
