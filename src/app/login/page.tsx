import { LoginForm } from "@/app/login/form";
import { APIError } from "@/app/login/toast";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <>
      <Suspense>
        <LoginForm />
      </Suspense>
      <APIError />
    </>
  );
}
