import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full grid place-content-center gap-2">
      <div>
        <h2 className="font-semibold">404 ｜ Not Found</h2>
        <p className="mt-2">Could not find requested resource</p>
      </div>
      <div className="mt-4 text-zinc-800">
        <Link
          className="mx-auto px-4 h-9 w-max flex items-center text-sm rounded-lg border hover:bg-zinc-100"
          href="/"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
