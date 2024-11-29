"use server";

import { redirect } from "next/navigation";

export async function temp() {
  redirect("/login?e=123");
}
