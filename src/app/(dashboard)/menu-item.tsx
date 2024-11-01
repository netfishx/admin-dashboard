"use client";

import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function MenuItem({
  icon,
  label,
  href,
  isOpen,
  hasChildren,
  ...props
}: {
  icon?: ReactNode;
  label: string;
  href?: string;
  isOpen?: boolean;
  hasChildren?: boolean;
}) {
  const pathname = usePathname();
  const isActive = !!href && pathname === href;
  return (
    <Button
      variant="ghost"
      className={cn([
        "w-full justify-start font-normal group",
        isActive && "bg-accent text-primary !opacity-100",
      ])}
      disabled={isActive}
      {...props}
      asChild={!!href && !isActive}
    >
      <MenuItemLink href={href} isActive={isActive}>
        {icon}
        <span className="flex-grow text-left">{label}</span>
        {hasChildren && (
          <ChevronRight className="h-4 w-4 transition-transform group-data-[state='open']:rotate-90" />
        )}
      </MenuItemLink>
    </Button>
  );
}

export function MenuItemLink({
  href,
  children,
  isActive,
  className,
}: {
  href?: string;
  isActive?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return href && !isActive ? (
    <Link
      href={href}
      className={cn([
        buttonVariants({ variant: "ghost" }),
        "font-normal",
        className,
      ])}
    >
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
}
