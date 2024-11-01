import Form from "./form";
import List from "./list";

export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <Form />
        <List />
      </div>
    </>
  );
}
