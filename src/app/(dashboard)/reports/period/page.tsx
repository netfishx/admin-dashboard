import { Suspense } from "react";
import Form from "./form";
import List from "./list";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense fallback={null}>
        <Form />
      </Suspense>
      <List />
    </div>
  );
}
