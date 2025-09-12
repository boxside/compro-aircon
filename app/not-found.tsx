import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center flex-col gap-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-muted-foreground">Halaman yang kamu cari tidak ada.</p>
      <Link href="/" className="text-blue-500 underline">
        Kembali ke Home
      </Link>
    </div>
  );
}
