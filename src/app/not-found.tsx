import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full flex-col gap-2 p-2">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Not Found
      </h2>
      <p className="leading-7">Could not find requested resource</p>
      <Link href="/" className="text-primary underline">
        Return Home
      </Link>
    </div>
  );
}
