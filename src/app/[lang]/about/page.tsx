import { A } from "@/app/[lang]/about/a";

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <h1 className="text-2xl font-bold">about</h1>
      <A />
    </div>
  );
}
