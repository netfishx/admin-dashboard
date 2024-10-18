"use client";

import bg from "@/assets/images/bg.png";
import { useTheme } from "next-themes";
import Image from "next/image";

export function Bg() {
  const { theme } = useTheme();
  return <Image src={bg} alt="Bg" className="object-cover -z-10" fill />;
}
