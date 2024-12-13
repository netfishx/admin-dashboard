"use client";

import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function MenuItem({
  icon,
  label,
  href,
  hasChildren,
  subHref = [],
  ...props
}: {
  icon?: ReactNode;
  label: string;
  href?: string;
  hasChildren?: boolean;
  subHref?: string[];
}) {
  const pathname = usePathname();
  const h = href?.split("?")[0];
  const handleIsActive = () => {
    return pathname === h || subHref?.includes(pathname);
  };

  const isActive = handleIsActive();

  return (
    <Button
      variant="ghost"
      className={cn([
        "group w-full justify-start font-normal",
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
