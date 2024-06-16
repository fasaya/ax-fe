import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-center">
        <span className="text-3xl">Hello!</span>
        <br />
        Please login <Link href="/login" className="text-blue-700">here</Link>
      </p>
    </main>
  );
}
