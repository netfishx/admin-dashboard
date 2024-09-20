import { SearchForm } from "@/app/[locale]/search/form";

export default function SearchPage({
  searchParams,
}: { searchParams: { q: string } }) {
  console.info(searchParams?.q, new Date());
  return (
    <div className="flex flex-col gap-4 p-4">
      Search
      <SearchForm />
    </div>
  );
}
