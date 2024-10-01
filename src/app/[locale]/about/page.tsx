import { A } from "@/app/[locale]/about/a";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <h1 className="text-2xl font-bold">about</h1>
      <A />
      <div className="flex gap-4">
        <Button asChild variant="link">
          <Link href="/about">About</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/list">List</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/search">Search</Link>
        </Button>
      </div>
    </div>
  );
}
