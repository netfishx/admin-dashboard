import { SearchForm } from "@/app/[lang]/search/form";

export default async function SearchPage({
  searchParams,
}: { searchParams: Promise<{ name?: string; age?: number }> }) {
  const { name, age } = await searchParams;

  return (
    <div className="flex flex-col gap-4 p-4">
      name: {name} |age: {age}
      <SearchForm />
    </div>
  );
}
