import { SearchForm } from "@/app/[locale]/search/form";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export default async function SearchPage({
  searchParams,
}: { searchParams: Promise<{ name?: string; age?: number }> }) {
  const { name, age } = await searchParams;

  return (
    <div className="flex flex-col gap-4 p-4">
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
      name: {name} |age: {age}
      <SearchForm />
    </div>
  );
}
